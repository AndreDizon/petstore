import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import { Pet } from '../App'

type Props = {
  open: boolean
  pet?: Pet
  onClose: () => void
  onSave: (updated: Pet) => void
}

export default function EditPetModal({ open, pet, onClose, onSave }: Props) {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    setName(pet?.name || '')
    setSpecies(pet?.species || '')
    setPrice(pet?.price ?? '')
    setImageUrl(pet?.imageUrl || '')
  }, [pet])

  const save = () => {
    console.log('EditPetModal.save called, pet=', pet)
    if (!pet || !pet.id) {
      console.warn('EditPetModal: missing pet or id, not saving')
      return
    }
    if (!name.trim() || !species.trim() || price === '') {
      console.warn('EditPetModal: validation failed', { name, species, price })
      return
    }
    const updated: Pet = { id: pet.id, name: name.trim(), species: species.trim(), price: Number(price), imageUrl: imageUrl.trim() }
    onSave(updated)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit pet</DialogTitle>
      <DialogContent>
        <div className="space-y-4 mt-2">
          <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Species" fullWidth value={species} onChange={(e) => setSpecies(e.target.value)} />
          <TextField label="Price" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} />
          <TextField label="Image URL" fullWidth value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={save}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
