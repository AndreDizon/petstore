import React, { useState } from 'react'
import { Pet } from '../App'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Chip, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import EditPetModal from './EditPetModal'

type Props = {
  pets: Pet[]
  onDelete: (id?: number) => void
}

export default function AdminPetTable({ pets, onDelete }: Props) {
  const [editOpen, setEditOpen] = useState(false)
  const [selected, setSelected] = useState<Pet | undefined>(undefined)

  const openEdit = (pet: Pet) => {
    setSelected(pet)
    setEditOpen(true)
  }

  const handleSave = (updated: Pet) => {
    const ev = new CustomEvent('pet-updated', { detail: updated })
    window.dispatchEvent(ev)
  }

  return (
    <Box className="mt-6">
      <TableContainer component={Paper} className="shadow-sm rounded-xl overflow-hidden" sx={{ border: '1px solid #e7e2da' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f6eee4' }}>
              <TableCell sx={{ fontWeight: 700 }}>Preview</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Species</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Image URL</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet, idx) => (
              <TableRow key={pet.id} hover sx={{ backgroundColor: idx % 2 === 0 ? '#fffdf9' : '#ffffff' }}>
                <TableCell>
                  {pet.imageUrl ? (
                    <img
                      src={pet.imageUrl}
                      alt={pet.name}
                      className="h-10 w-14 rounded-md object-cover border border-stone-200"
                      onError={(e) => {
                        const el = e.currentTarget
                        el.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="h-10 w-14 rounded-md bg-stone-100 border border-stone-200" />
                  )}
                </TableCell>
                <TableCell className="font-semibold">{pet.name}</TableCell>
                <TableCell className="capitalize">
                  <Chip size="small" label={pet.species} sx={{ backgroundColor: '#fff3e0' }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>${pet.price.toFixed(2)}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {pet.imageUrl ? (
                    <Tooltip title={pet.imageUrl}>
                      <span className="block max-w-xs truncate">{pet.imageUrl}</span>
                    </Tooltip>
                  ) : (
                    <span className="text-stone-400">(none)</span>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => openEdit(pet)} className="border border-stone-200">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={() => onDelete(pet.id)} className="border border-stone-200 ml-2">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <EditPetModal open={editOpen} pet={selected} onClose={() => setEditOpen(false)} onSave={handleSave} />
      </TableContainer>
    </Box>
  )
}
