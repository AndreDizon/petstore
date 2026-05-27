import React from 'react'
import { Drawer, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Box, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { Pet } from '../App'

type CartItem = {
  pet: Pet
  quantity: number
}

type Props = {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onCheckout: () => void
  onRemoveItem?: (petId?: number) => void
}

export default function CartDrawer({ open, onClose, items, onCheckout, onRemoveItem }: Props) {
  const total = items.reduce((s, it) => s + it.pet.price * it.quantity, 0)

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: { bgcolor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(6px)' } // bg-stone-900/40 + backdrop-blur-sm
      }}
      PaperProps={{
        sx: { width: 360, p: 2, boxShadow: '0 30px 60px -20px rgba(15,23,42,0.5)' } // shadow-2xl shadow-stone-900/50
      }}
    >
      <Box role="presentation">
        <div className="flex items-center justify-between">
          <Typography variant="h6">Your cart</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </div>
        <Divider className="my-2" />
        <List>
          {items.map((it, idx) => (
            <div key={it.pet.id} className={`${idx < items.length - 1 ? 'border-b border-stone-100' : ''}`}>
              <ListItem secondaryAction={<div className="flex items-center space-x-2"><Typography>${(it.pet.price * it.quantity).toFixed(2)}</Typography><IconButton edge="end" aria-label="remove" color="error" size="small" onClick={() => onRemoveItem && onRemoveItem(it.pet.id)}><DeleteIcon fontSize="small" /></IconButton></div>}>
                <ListItemAvatar>
                  <Avatar src={it.pet.imageUrl || undefined} alt={it.pet.name} />
                </ListItemAvatar>
                <ListItemText primary={it.pet.name} secondary={`Qty: ${it.quantity} — $${it.pet.price.toFixed(2)}`} />
              </ListItem>
            </div>
          ))}
        </List>
        <Divider className="my-2" />
        <div className="flex items-center justify-between mt-4">
          <div>
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </div>
          <Button variant="contained" color="primary" onClick={onCheckout}>Checkout</Button>
        </div>
      </Box>
    </Drawer>
  )
}
