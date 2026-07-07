import imageCompression from 'browser-image-compression'

const COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
}

export async function compressImage(file) {
  try {
    return await imageCompression(file, COMPRESSION_OPTIONS)
  } catch (error) {
    console.error('Gagal mengompresi gambar:', error)
    return file
  }
}
