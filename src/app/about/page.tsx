export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Medium Clone</h1>
        
        <p className="text-xl text-gray-600 mb-6">
          A modern publishing platform where anyone can share insightful stories, ideas, and expertise.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              To create an open platform where quality content thrives and diverse voices can be heard. 
              We believe everyone has a story worth sharing.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="text-gray-700 list-disc list-inside space-y-2">
              <li>Rich text editing experience</li>
              <li>Seamless publishing workflow</li>
              <li>Engaging community features</li>
              <li>Modern, responsive design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}