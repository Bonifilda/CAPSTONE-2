import Link from 'next/link'

export default function Home() {
  const featuredPosts = [
    {
      id: 1,
      title: 'Getting Started with Next.js 14',
      excerpt: 'Learn how to build modern web applications with the latest features of Next.js 14.',
      author: 'Jane Smith',
      date: '2024-01-15',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'The Future of React Server Components',
      excerpt: 'Exploring how Server Components are changing the way we think about React architecture.',
      author: 'John Doe',
      date: '2024-01-14',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'Building Accessible Web Applications',
      excerpt: 'A comprehensive guide to creating web applications that everyone can use.',
      author: 'Alex Johnson',
      date: '2024-01-13',
      readTime: '6 min read'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Stay curious.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <Link
          href="/signup"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Start reading
        </Link>
      </section>

      {/* Featured Posts Grid */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="mt-4 text-xs text-gray-400">
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Trending Topics</h2>
        <div className="flex flex-wrap gap-3">
          {['Technology', 'Programming', 'Design', 'Productivity', 'JavaScript', 'React', 'Next.js'].map((topic) => (
            <Link
              key={topic}
              href={`/tag/${topic.toLowerCase()}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {topic}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
