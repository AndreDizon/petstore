import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { IconButton, Badge, Button, Box, useTheme, ToggleButtonGroup, ToggleButton } from '@mui/material'
import Logo from '../assets/petstore-logo.svg'

type Props = {
  cartCount: number
  onOpenAdd: () => void
  onOpenCart?: () => void
  viewMode: 'customer' | 'admin'
  onViewModeChange: (mode: 'customer' | 'admin') => void
}

export default function NavBar({ cartCount, onOpenAdd, onOpenCart, viewMode, onViewModeChange }: Props) {
  const theme = useTheme()
  return (
  <Box component="header" className="site-header bg-stone-900 text-stone-100" sx={{ borderBottom: 0 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="Petstore logo" className="h-10 w-10" />
              <div>
                <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.25rem' }}>Petstore</span>
                <div className="text-sm text-stone-200">A beautiful place for pets</div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ToggleButtonGroup
              color="primary"
              size="small"
              value={viewMode}
              exclusive
              onChange={(_, value) => value && onViewModeChange(value)}
              aria-label="dashboard mode"
            >
              <ToggleButton value="customer">Customer</ToggleButton>
              <ToggleButton value="admin">Admin</ToggleButton>
            </ToggleButtonGroup>
            {viewMode === 'admin' && (
              <Button variant="contained" color="primary" size="small" onClick={onOpenAdd}>Add Pet</Button>
            )}
            {viewMode === 'customer' && (
              <IconButton aria-label="cart" color="primary" onClick={() => onOpenCart && onOpenCart()}>
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </Box>
  )
}
