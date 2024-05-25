import type { SelectChangeEvent } from '@mui/material';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

interface SortOptionsProps {
  setSort: (sort: string) => void;
}

export default function SortByCreatedAt({ setSort }: SortOptionsProps) {
  const [sort, setSortState] = useState<string>('');

  const handleSortChange = (event: SelectChangeEvent) => {
    const newSort = event.target.value as string;
    setSortState(newSort);
    setSort(newSort);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sort-label">Sort by new/old</InputLabel>
        <Select labelId="sort-label" id="sort-select" value={sort} label="Sort by new/old" onChange={handleSortChange}>
          <MenuItem value={'createdAt desc'}>Newest</MenuItem>
          <MenuItem value={'createdAt asc'}>Oldest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
