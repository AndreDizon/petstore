import React from 'react'
import { Pet } from '../App'
import ProductCard from './ProductCard'

type Props = {
  pets: Pet[]
  onAddToCart?: (pet: Pet) => void
  onDelete?: (id?: number) => void
  showAdminActions?: boolean
}

export default function ProductGrid({ pets, onAddToCart, onDelete, showAdminActions = false }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pets.map((pet, index) => (
        <ProductCard
          key={pet.id}
          pet={pet}
          revealIndex={index}
          onAddToCart={onAddToCart}
          onDelete={onDelete}
          showAdminActions={showAdminActions}
        />
      ))}
    </div>
  )
}
