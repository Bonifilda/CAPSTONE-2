export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Platform */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Platform
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900 text-base">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-gray-900 text-base">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900 text-base">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/help" className="text-gray-600 hover:text-gray-900 text-base">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-gray-900 text-base">
                  Blog
                </a>
              </li>
              <li>
                <a href="/newsletter" className="text-gray-600 hover:text-gray-900 text-base">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/careers" className="text-gray-600 hover:text-gray-900 text-base">
                  Careers
                </a>
              </li>
              <li>
                <a href="/press" className="text-gray-600 hover:text-gray-900 text-base">
                  Press
                </a>
              </li>
              <li>
                <a href="/partners" className="text-gray-600 hover:text-gray-900 text-base">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="col-span-1 md:col-span-4 mt-8 md:mt-0">
            <p className="text-gray-500 text-base">
              &copy; {new Date().getFullYear()} Medium Clone. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
