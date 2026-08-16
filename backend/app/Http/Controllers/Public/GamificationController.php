<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\ImpactPointLedger;
use App\Models\Reward;
use App\Models\RewardRedemption;
use App\Models\UserBadge;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GamificationController extends Controller
{
    public function summary(Request $request): JsonResponse
    {
        $user = $request->user();

        $points = ImpactPointLedger::query()->where('user_id', $user->id)->sum('points');
        $badges = UserBadge::query()->where('user_id', $user->id)->with('badge')->get();

        return response()->json([
            'data' => [
                'points' => (int) $points,
                'badges' => $badges->map(fn ($b) => ['id' => $b->badge?->id, 'slug' => $b->badge?->slug, 'name' => $b->badge?->name, 'earnedAt' => $b->earned_at]),
            ],
            'message' => 'Ringkasan gamification berhasil dimuat.',
        ]);
    }

    public function points(Request $request): JsonResponse
    {
        $user = $request->user();

        $items = ImpactPointLedger::query()
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->limit(100)
            ->get();

        return response()->json(['data' => $items]);
    }

    public function badges(Request $request): JsonResponse
    {
        $user = $request->user();
        $all = Badge::query()->where('active', true)->orderBy('tier')->get();
        $earnedIds = UserBadge::query()->where('user_id', $user->id)->pluck('badge_id')->toArray();

        $list = $all->map(fn ($b) => [
            'id' => $b->id,
            'slug' => $b->slug,
            'name' => $b->name,
            'icon' => $b->icon,
            'description' => $b->description,
            'earned' => in_array($b->id, $earnedIds),
        ]);

        return response()->json(['data' => $list]);
    }

    public function rewards(Request $request): JsonResponse
    {
        $rewards = Reward::query()->where('active', true)->get();
        return response()->json(['data' => $rewards]);
    }

    public function redeem(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $reward = Reward::query()->findOrFail($id);

        if (! $reward->active) {
            return response()->json(['message' => 'Reward tidak tersedia.'], 404);
        }

        $points = (int) ImpactPointLedger::query()->where('user_id', $user->id)->sum('points');

        if ($points < $reward->cost_points) {
            return response()->json(['message' => 'Saldo poin tidak cukup.'], 400);
        }

        if ($reward->stock <= 0) {
            return response()->json(['message' => 'Stock reward habis.'], 400);
        }

        DB::beginTransaction();
        try {
            // create redemption
            $redemption = RewardRedemption::create([
                'id' => (string) Str::ulid(),
                'user_id' => $user->id,
                'reward_id' => $reward->id,
                'cost_points' => $reward->cost_points,
                'status' => 'pending',
            ]);

            // decrement stock
            $reward->decrement('stock');

            // add negative ledger entry
            ImpactPointLedger::create([
                'id' => (string) Str::ulid(),
                'user_id' => $user->id,
                'points' => -1 * $reward->cost_points,
                'source' => 'redeem',
                'source_id' => $redemption->id,
                'created_at' => now(),
            ]);

            DB::commit();

            return response()->json(['data' => $redemption, 'message' => 'Permintaan redeem berhasil dibuat.'], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal memproses redeem.'], 500);
        }
    }

    public function redemptions(Request $request): JsonResponse
    {
        $user = $request->user();
        $items = RewardRedemption::query()->where('user_id', $user->id)->orderByDesc('created_at')->limit(100)->get();
        return response()->json(['data' => $items]);
    }
}
