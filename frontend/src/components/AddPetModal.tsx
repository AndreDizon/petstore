import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import { Pet } from '../App'

type Props = {
  open: boolean
  onClose: () => void
  onCreate: (pet: Pet) => Promise<void | { errors?: Record<string, string> }>
}

export default function AddPetModal({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [imageUrl, setImageUrl] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (!name || !species || price === '') return
    setSubmitting(true)
    setFieldErrors({})
    try {
      const result = await onCreate({ name, species, price: Number(price), imageUrl })
      if (result && result.errors) {
        setFieldErrors(result.errors)
        return
      }
      // success: reset and close
      setName(''); setSpecies('dog'); setPrice(''); setImageUrl('');
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add a pet</DialogTitle>
      <DialogContent>
        <div className="space-y-4 mt-2">
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!fieldErrors.name}
            helperText={fieldErrors.name}
          />
          <TextField
            label="Species"
            fullWidth
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            placeholder="e.g. dog, falcon, axolotl"
            error={!!fieldErrors.species}
            helperText={fieldErrors.species}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
            error={!!fieldErrors.price}
            helperText={fieldErrors.price}
          />
          <TextField
            label="Image URL"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            error={!!fieldErrors.imageUrl}
            helperText={fieldErrors.imageUrl}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>Cancel</Button>
        <Button variant="contained" onClick={submit} disabled={submitting}>{submitting ? 'Creating...' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  )
}
