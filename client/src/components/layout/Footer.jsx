function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-400">
              ByteBlog
            </span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-amber-400 transition-colors duration-200">About</a>
            <a href="#" className="hover:text-amber-400 transition-colors duration-200">Contact</a>
            <a href="#" className="hover:text-amber-400 transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-amber-400 transition-colors duration-200">Terms</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-600 text-center text-slate-300 text-sm">
          <p>© {new Date().getFullYear()} ByteBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;