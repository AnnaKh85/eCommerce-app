import { CircularProgress } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

import type { ICategory } from '../../services/interfaces.ts';
import { useCategories } from './useCategories.ts';

export default function CategoryList() {
  const [checked, setChecked] = React.useState<ICategory[]>([]);
  const { isLoading, categories, error } = useCategories();

  const handleToggle = (value: ICategory) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
      {categories &&
        categories.results.map((category: ICategory) => {
          const labelId = `checkbox-list-label-${category.id}`;

          return (
            <ListItem key={category.id} disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(category)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(category) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={category.name['en-US']} />
              </ListItemButton>
            </ListItem>
          );
        })}
    </List>
  );
}
