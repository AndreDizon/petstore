import React from 'react'
import { TextField, MenuItem, Box, Grid, InputAdornment, Paper } from '@mui/material'

type Props = {
  query: string
  onQueryChange: (q: string) => void
  species: string
  onSpeciesChange: (s: string) => void
  speciesOptions: string[]
}

export default function SearchFilterBar({ query, onQueryChange, species, onSpeciesChange, speciesOptions }: Props) {
  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 900, display: 'flex', gap: 2, alignItems: 'center', px: 1 }}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search pets by name..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start">🔎</InputAdornment> }}
          sx={{ backgroundColor: '#fff', borderRadius: 1, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            select
            size="small"
            variant="outlined"
            value={species}
            onChange={(e) => onSpeciesChange(e.target.value)}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                const value = selected as string
                return value
                  ? value
                  : <span className="text-stone-400">Filter by species</span>
              }
            }}
            sx={{ minWidth: 160, backgroundColor: '#fff', borderRadius: 1, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}
          >
            <MenuItem value="">All</MenuItem>
            {speciesOptions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
        </Box>
      </Box>
    </Box>
  )
}
