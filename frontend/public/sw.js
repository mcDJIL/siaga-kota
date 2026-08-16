self.addEventListener('push', (event) => {
  if (!event.data) {
    return
  }

  const payload = event.data.json()
  const url = payload.url === '/warga/prediksi' ? '/prediction' : payload.url ?? '/prediction'

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      tag: payload.tag,
      data: { url },
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const url = event.notification.data?.url ?? '/prediction'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
      const existingWindow = windows.find((client) => new URL(client.url).pathname === url)

      if (existingWindow && 'focus' in existingWindow) {
        return existingWindow.focus()
      }

      return clients.openWindow(url)
    })
  )
})
