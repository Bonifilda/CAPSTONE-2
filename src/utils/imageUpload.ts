import { createClient } from '@/lib/supabase/client'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export async function uploadImage(file: File): Promise<UploadResult> {
  try {
    const supabase = createClient()
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
    const filePath = `post-images/${fileName}`

    // Upload image to Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (error) {
      throw new Error(`Upload failed: ${error.message}`)
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return {
      success: true,
      url: publicUrl
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}

export async function handleImageUpload(
  file: File, 
  onProgress?: (progress: number) => void
): Promise<UploadResult> {
  // Simulate progress for better UX
  if (onProgress) {
    onProgress(30)
    await new Promise(resolve => setTimeout(resolve, 300))
    onProgress(70)
    await new Promise(resolve => setTimeout(resolve, 300))
    onProgress(100)
  }

  return await uploadImage(file)
}