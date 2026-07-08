import { motion } from 'framer-motion'
import { AnnouncementForm } from '../shared/components/AnnouncementForm'
import { AnnouncementTable } from '../shared/components/AnnouncementTable'
import { EditAnnouncementModal } from '../shared/components/EditAnnouncementModal'
import { DeleteAnnouncementModal } from '../shared/components/DeleteAnnouncementModal'
import { useAnnouncements } from '../hooks/useAnnouncements'

export function GovernmentAnnouncementsPage() {
  const {
    paginated,
    totalCount,
    page,
    totalPages,
    onPageChange,
    statusFilter,
    onStatusFilterChange,
    onPublish,
    editTarget,
    onOpenEdit,
    onCloseEdit,
    onUpdate,
    deleteTarget,
    onOpenDelete,
    onCloseDelete,
    onDelete,
  } = useAnnouncements()

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-2"
      >
        <h1 className="font-heading text-[32px] leading-10 font-semibold tracking-[-0.32px] text-text-body">
          Kelola Pengumuman Publik
        </h1>
        <p className="text-base text-text-muted">Buat dan kelola informasi publik untuk warga kota.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <AnnouncementForm onPublish={onPublish} />
        <AnnouncementTable
          items={paginated}
          totalCount={totalCount}
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
          onOpenEdit={onOpenEdit}
          onOpenDelete={onOpenDelete}
        />
      </div>

      <EditAnnouncementModal announcement={editTarget} onClose={onCloseEdit} onSave={onUpdate} />
      <DeleteAnnouncementModal announcement={deleteTarget} onClose={onCloseDelete} onConfirm={onDelete} />
    </div>
  )
}
