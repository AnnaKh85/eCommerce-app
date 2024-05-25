import type { SelectChangeEvent } from '@mui/material';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

interface SortOptionsProps {
  setSort: (sort: string) => void;
}

export default function SortByName({ setSort }: SortOptionsProps) {
  const [sort, setSortState] = useState<string>('');

  const handleSortChange = (event: SelectChangeEvent) => {
    const newSort = event.target.value as string;
    setSortState(newSort);
    setSort(newSort);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sort-label">Sort by name</InputLabel>
        <Select labelId="sort-label" id="sort-select" value={sort} label="Sort by name" onChange={handleSortChange}>
          <MenuItem value={'name.en-GB asc'}>Name (A-Z)</MenuItem>
          <MenuItem value={'name.en-GB desc'}>Name (Z-A)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
