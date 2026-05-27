import React, { useEffect, useRef, useState } from 'react'
import { Pet } from '../App'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import EditPetModal from './EditPetModal'
import Logo from '../assets/petstore-logo.svg'

type Props = {
  pet: Pet
  revealIndex?: number
  onAddToCart?: (pet: Pet) => void
  onDelete?: (id?: number) => void
  showAdminActions?: boolean
}

export default function ProductCard({ pet, revealIndex = 0, onAddToCart, onDelete, showAdminActions = false }: Props) {
  const [editOpen, setEditOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!cardRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSave = (updated: any) => {
    console.log('ProductCard.handleSave dispatching pet-updated', updated)
    // bubble up to parent via onDelete or another prop — we'll use a custom event via DOM for now
    const ev = new CustomEvent('pet-updated', { detail: updated })
    window.dispatchEvent(ev)
  }
  return (
  <div
      ref={cardRef}
      style={{ ['--flip-delay' as any]: `${revealIndex * 120}ms` }}
  className={`group rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] flex flex-col h-full min-h-[420px] card-reveal flip-card ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={Logo} alt="Petstore logo" className="h-16 w-16" />
          <span className="mt-2 text-xs font-semibold tracking-wide text-stone-500">Petstore</span>
        </div>
        <div className="flip-card-back bg-white">
          {/* Image Container */}
          <div className="relative h-48 bg-stone-100 overflow-hidden flex items-center justify-center">
            {/* species badge overlay */}
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-medium capitalize shadow">{pet.species}</span>
            </div>

            {(() => {
              const hasImage = !!(pet.imageUrl && pet.imageUrl.trim() !== '')
              if (!hasImage || imgError) {
                return (
                  <svg className="w-full h-full object-cover" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="No image available">
                    <rect width="100%" height="100%" fill="#f3f4f6" />
                    <g transform="translate(24,24)" fill="#e6e0d7">
                      <rect x="0" y="0" width="352" height="192" rx="10" />
                    </g>
                    <g fill="#d1c6bb" opacity="0.9">
                      <rect x="40" y="60" width="120" height="80" rx="8" />
                      <rect x="176" y="40" width="140" height="120" rx="8" />
                    </g>
                  </svg>
                )
              }

              return (
                <img
                  src={pet.imageUrl}
                  alt={pet.name || 'Pet image'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => setImgError(true)}
                />
              )
            })()}
          </div>

          {/* Content Area */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-stone-800 capitalize pet-name">{pet.name}</h3>
              </div>
              <p className="text-xl font-bold text-stone-900 pet-price">${pet.price.toFixed(2)}</p>
            </div>

            {/* Bottom Actions Row - Cleanly Aligned Side-by-Side */}
            <div className="flex items-center gap-2 mt-4">
              {onAddToCart && (
                <button
                  onClick={() => onAddToCart(pet)}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  ADD TO CART
                </button>
              )}
              {showAdminActions && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete && onDelete(pet.id);
                    }}
                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-stone-200"
                    title="Delete Pet"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditOpen(true)
                    }}
                    className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-50 rounded-lg transition-colors border border-stone-200"
                    title="Edit Pet"
                  >
                    <EditIcon fontSize="small" />
                  </button>
                </>
              )}
            </div>
          </div>
          <EditPetModal open={editOpen} pet={pet} onClose={() => setEditOpen(false)} onSave={handleSave} />
        </div>
      </div>
    </div>
  )
}
