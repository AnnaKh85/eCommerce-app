import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';

import type { ICategory } from '../../services/interfaces.ts';
import { useCategories } from './useCategories.ts';

interface CategoryListProps {
  setSelectedCategory: (id: string | null) => void;
}

export default function CategoryList({ setSelectedCategory }: CategoryListProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const { categories, error } = useCategories();

  const handleToggle = (category: ICategory) => () => {
    setSelected(category.id);
    setSelectedCategory(category.id);
  };

  const handleClick = (categoryId: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [categoryId]: !prevOpen[categoryId] }));
  };

  if (error) return <div>An error occurred: {error.message}</div>;

  const renderCategory = (category: ICategory, isSubcategory = false) => {
    const labelId = `radio-button-label-${category.id}`;
    const hasChildren = categories?.results.some((cat: ICategory) => cat.parent?.id === category.id);
    const isOpen = open[category.id] || false;

    return (
      <React.Fragment key={category.id}>
        <ListItem sx={{ pl: isSubcategory ? 4 : 2 }} disablePadding>
          <ListItemButton role={undefined} onClick={handleToggle(category)} dense>
            <ListItemIcon>
              <ListItemText primary={selected === category.id ? '>' : ''} />
            </ListItemIcon>
            <ListItemText id={labelId} primary={category.name['en-GB']} />
            {hasChildren && (
              <ListItemIcon onClick={() => handleClick(category.id)}>
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
            )}
          </ListItemButton>
        </ListItem>
        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categories?.results
                .filter((cat: ICategory) => cat.parent?.id === category.id)
                .map((subcat: ICategory) => renderCategory(subcat, true))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'noWrap', flexDirection: 'column', overflow: 'hidden', p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Categories:
      </Typography>
      <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
        {categories &&
          categories.results
            .filter((category: ICategory) => !category.ancestors || category.ancestors.length === 0)
            .map((category: ICategory) => renderCategory(category))}
      </List>
    </Box>
  );
}
