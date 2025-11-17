export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  author_id: string
  published: boolean
  featured_image?: string
  tags: string[]
  created_at: string
  updated_at: string
  published_at?: string
  read_time: number
}

export interface CreatePostData {
  title: string
  content: string
  excerpt: string
  published: boolean
  tags: string[]
  featured_image?: string
}

export interface UpdatePostData {
  title?: string
  content?: string
  excerpt?: string
  published?: boolean
  tags?: string[]
  featured_image?: string
}

export interface PostWithAuthor extends Post {
  author: {
    id: string
    full_name: string
    username: string
    avatar_url?: string
  }
}