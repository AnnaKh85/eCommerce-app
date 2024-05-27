import type { SelectChangeEvent } from '@mui/material';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

interface SortOptionsProps {
  setSort: (sort: string) => void;
}

export default function SortByPrice({ setSort }: SortOptionsProps) {
  const [sort, setSortState] = useState<string>('');

  const handleSortChange = (event: SelectChangeEvent) => {
    const newSort = event.target.value as string;
    setSortState(newSort);
    setSort(newSort);
  };

  return (
    <Box
      sx={{
        minWidth: 150,
        width: {
          xs: '100%',
          sm: '200px',
        },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="sort-label">Sort by price</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={sort}
          label="Sort by price"
          variant="standard"
          onChange={handleSortChange}
        >
          <MenuItem value={'price asc'}>Price (Low to High)</MenuItem>
          <MenuItem value={'price desc'}>Price (High to Low)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
