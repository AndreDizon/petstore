import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import { Pet } from '../App'

type Props = {
  open: boolean
  onClose: () => void
  onCreate: (pet: Pet) => void
}

export default function AddPetModal({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [imageUrl, setImageUrl] = useState('')

  const submit = () => {
    if (!name || !species || price === '') return
    onCreate({ name, species, price: Number(price), imageUrl })
    setName(''); setSpecies('dog'); setPrice(''); setImageUrl('');
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add a pet</DialogTitle>
      <DialogContent>
        <div className="space-y-4 mt-2">
          <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Species" fullWidth value={species} onChange={(e) => setSpecies(e.target.value)} placeholder="e.g. dog, falcon, axolotl" />
          <TextField label="Price" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} />
          <TextField label="Image URL" fullWidth value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}
