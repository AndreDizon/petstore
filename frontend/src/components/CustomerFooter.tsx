import React from 'react'
import Logo from '../assets/petstore-logo.svg'

export default function CustomerFooter() {
  return (
    <footer className="site-footer mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <img src={Logo} alt="Petstore logo" className="h-10 w-10" />
              <div className="text-lg font-semibold">Petstore</div>
            </div>
            <p className="text-sm mt-2 text-stone-100/90">
              A premium marketplace for discovering pets with personality. Adopt joy, shop with confidence.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide">Customer Care</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:text-amber-300" href="#">Shipping & Returns</a></li>
              <li><a className="hover:text-amber-300" href="#">Care Guides</a></li>
              <li><a className="hover:text-amber-300" href="#">Support</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide">Visit & Contact</div>
            <p className="text-sm mt-3 text-stone-100/90">Mon–Sat • 9am–6pm</p>
            <p className="text-sm text-stone-100/90">hello@petstore.test</p>
            <div className="mt-3 flex gap-3">
              <span className="text-xs px-2 py-1 rounded-full bg-white/15">Family Friendly</span>
              <span className="text-xs px-2 py-1 rounded-full bg-white/15">Vet Approved</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-sm">
          <div>© {new Date().getFullYear()} Petstore — All rights reserved</div>
          <div className="mt-3 sm:mt-0 space-x-4">
            <a className="hover:text-amber-300" href="#">About</a>
            <a className="hover:text-amber-300" href="#">Contact</a>
            <a className="hover:text-amber-300" href="#">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
