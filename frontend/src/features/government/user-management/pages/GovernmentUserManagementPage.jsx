import { motion } from 'framer-motion'
import { Plus, ShieldCheck, TrendingUp, Users } from 'lucide-react'
import { Button } from '../../../../components/ui/Button'
import { UserStatisticCard } from '../shared/components/UserStatisticCard'
import { UserManagementTable } from '../shared/components/UserManagementTable'
import { AddOfficerModal } from '../shared/components/AddOfficerModal'
import { EditUserModal } from '../shared/components/EditUserModal'
import { DeleteUserModal } from '../shared/components/DeleteUserModal'
import {
  StatisticCardSkeleton,
  UserTableSkeleton,
  HeaderSkeleton,
  RoleBreakdownSkeleton,
} from '../shared/components/UserManagementSkeleton'
import { useUsers } from '../hooks/useUsers'

export function GovernmentUserManagementPage() {
  const {
    paginated,
    totalCount,
    page,
    totalPages,
    onPageChange,
    searchInput,
    onSearchChange,
    roleFilter,
    onRoleFilterChange,
    statusFilter,
    onStatusFilterChange,
    districtFilter,
    onDistrictFilterChange,
    onSort,
    onToggleStatus,
    isAddOpen,
    onOpenAdd,
    onCloseAdd,
    onAddOfficer,
    editTarget,
    onOpenEdit,
    onCloseEdit,
    onUpdateUser,
    deleteTarget,
    onOpenDelete,
    onCloseDelete,
    onDeleteUser,
    isDeleting,
    isLoading,
    statistics,
  } = useUsers()

  // Format statistics untuk display
  const userStats = {
    totalUsers: statistics?.total_users ?? 0,
    roleBreakdown: statistics?.role_breakdown ?? [],
    newUsersThisMonth: {
      value: statistics?.new_this_month ?? 0,
      trendPercent: statistics?.trend_percent ?? 0,
    },
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        {isLoading ? (
          <HeaderSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-2"
          >
            <h1 className="font-heading text-4xl leading-[56px] font-semibold tracking-[-0.96px] text-text-body">
              Manajemen Pengguna
            </h1>
            <p className="text-base text-text-muted">Kelola akses, peran, dan status staf serta warga.</p>
          </motion.div>
        )}

        <Button variant="navy" onClick={onOpenAdd} disabled={isLoading}>
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Tambah Petugas Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {isLoading ? (
          <>
            <StatisticCardSkeleton />
            <StatisticCardSkeleton />
            <StatisticCardSkeleton />
          </>
        ) : (
          <>
            <UserStatisticCard icon={Users} iconBg="bg-navy/10" iconColor="text-navy" label="Total Users" value={userStats.totalUsers} />

            <UserStatisticCard icon={ShieldCheck} iconBg="bg-brand-green-light" iconColor="text-brand-green-dark" label="Role Breakdown" value="">
              {isLoading ? <RoleBreakdownSkeleton /> : (
                <div className="mt-1 flex flex-wrap gap-2">
                  {userStats.roleBreakdown.map((item) => (
                    <span key={item.role} className="rounded bg-[#E5EEFF] px-2 py-1 text-xs font-semibold tracking-[0.6px] text-text-body">
                      {item.role}: {item.count}
                    </span>
                  ))}
                </div>
              )}
            </UserStatisticCard>

            <UserStatisticCard
              icon={TrendingUp}
              iconBg="bg-[#C9A82C]/20"
              iconColor="text-[#715C00]"
              label="New Users (Month)"
              value={userStats.newUsersThisMonth.value}
              trendText={`${userStats.newUsersThisMonth.trendPercent}%`}
            />
          </>
        )}
      </div>

      {isLoading ? (
        <UserTableSkeleton />
      ) : (
        <UserManagementTable
          items={paginated}
          totalCount={totalCount}
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          searchInput={searchInput}
          onSearchChange={onSearchChange}
          roleFilter={roleFilter}
          onRoleFilterChange={onRoleFilterChange}
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
          districtFilter={districtFilter}
          onDistrictFilterChange={onDistrictFilterChange}
          onSort={onSort}
          onToggleStatus={onToggleStatus}
          onOpenEdit={onOpenEdit}
          onOpenDelete={onOpenDelete}
          isLoading={isLoading}
        />
      )}

      <AddOfficerModal isOpen={isAddOpen} onClose={onCloseAdd} onSubmit={onAddOfficer} />
      <EditUserModal user={editTarget} onClose={onCloseEdit} onSave={onUpdateUser} />
      <DeleteUserModal user={deleteTarget} onClose={onCloseDelete} onConfirm={onDeleteUser} isDeleting={isDeleting} />
    </div>
  )
}
