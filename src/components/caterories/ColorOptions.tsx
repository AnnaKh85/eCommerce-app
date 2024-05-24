import { Box, ListItem, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
export default function ColorOptions() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'noWrap',
          flexDirection: 'column',
          overflow: 'hidden',
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Color:
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {[0, 5000, 10000, 50000].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem key={value} disablePadding>
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
}
