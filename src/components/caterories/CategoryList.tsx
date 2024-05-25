import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import * as React from 'react';

import type { ICategory } from '../../services/interfaces.ts';
import { useCategories } from './useCategories.ts';

interface CategoryListProps {
  setSelectedCategory: (id: string | null) => void;
}

export default function CategoryList({ setSelectedCategory }: CategoryListProps) {
  const [selected, setSelected] = React.useState<string | null>(null); // Use a single state for the selected category
  const { categories, error } = useCategories();

  const handleToggle = (value: ICategory) => () => {
    setSelected(value.id);
    setSelectedCategory(value.id);
  };

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'noWrap',
          flexDirection: 'column',
          overflow: 'hidden',
          p: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Categories:
        </Typography>
        <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
          {categories &&
            categories.results.map((category: ICategory) => {
              const labelId = `radio-button-label-${category.id}`;

              return (
                <ListItem key={category.id} disablePadding>
                  <ListItemButton role={undefined} onClick={handleToggle(category)} dense>
                    <ListItemIcon>
                      <Radio
                        edge="start"
                        checked={selected === category.id}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={category.name['en-GB']} />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </Box>
    </>
  );
}
