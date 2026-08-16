<?php

namespace App\Providers;

use App\Events\ReportStatusChanged;
use App\Listeners\AwardPointsOnReportStatusChange;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        ReportStatusChanged::class => [
            AwardPointsOnReportStatusChange::class,
        ],
    ];
}
