import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer bg-stone-900 text-stone-100 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-sm text-stone-100">© {new Date().getFullYear()} Petstore — All rights reserved</div>
        <div className="mt-3 sm:mt-0 space-x-4">
          <a className="text-sm text-stone-100 hover:text-amber-400" href="#">About Us</a>
          <a className="text-sm text-stone-100 hover:text-amber-400" href="#">Contact</a>
          <a className="text-sm text-stone-100 hover:text-amber-400" href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}
