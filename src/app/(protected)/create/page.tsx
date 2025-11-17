'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { uploadImage } from '@/utils/imageUpload'
import RichTextEditor from '@/app/components/editor/RichTextEditor'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [tags, setTags] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)

  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploadProgress(0)
    
    const result = await uploadImage(file)
    
    setUploadProgress(null)
    
    if (!result.success || !result.url) {
      throw new Error(result.error || 'Image upload failed')
    }
    
    return result.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('You must be logged in to create a post')
      return
    }

    if (!title.trim() || !content.trim()) {
      alert('Title and content are required')
      return
    }

    setIsSubmitting(true)

    try {
      const postData = {
        title: title.trim(),
        content,
        excerpt: excerpt.trim() || content.substring(0, 150) + '...',
        slug: generateSlug(title),
        author_id: user.id,
        published: isPublished,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        read_time: calculateReadTime(content),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...(isPublished && { published_at: new Date().toISOString() })
      }

      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()
        .single()

      if (error) throw error

      // Redirect to the new post or dashboard
      if (isPublished) {
        router.push(`/post/${data.slug}`)
      } else {
        router.push('/dashboard')
      }

    } catch (error: any) {
      console.error('Error creating post:', error)
      alert('Failed to create post: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Story</h1>
        <p className="text-gray-600 mt-2">Share your thoughts and ideas with the world</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            placeholder="Your amazing story title..."
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (Optional)
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Brief description of your story..."
          />
          <p className="text-sm text-gray-500 mt-1">
            {excerpt.length}/150 characters
          </p>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="technology, programming, web-development"
          />
          <p className="text-sm text-gray-500 mt-1">
            Separate tags with commas
          </p>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write your story here..."
          />
          {uploadProgress !== null && (
            <div className="mt-2">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">Uploading image... {uploadProgress}%</p>
            </div>
          )}
        </div>

        {/* Publish Options */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="publish"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="publish" className="ml-2 block text-sm text-gray-900">
              Publish immediately
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publishing...' : (isPublished ? 'Publish' : 'Save Draft')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}