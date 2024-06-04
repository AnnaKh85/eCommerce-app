import { Box, ListItem, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import { useState } from 'react';

interface PriceOptionsProps {
  setSelectedPriceRange: (priceRange: string) => void;
}

export default function PriceOptions({ setSelectedPriceRange }: PriceOptionsProps) {
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const handleSelectPriceRange = (priceRange: string) => {
    setSelectedPrice(priceRange);
    setSelectedPriceRange(priceRange);
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
          Price:
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {['0-5000', '5001-10000', '10001-50000', '50001-500000'].map((value) => {
            const labelId = `radio-list-label-${value}`;

            return (
              <ListItem key={value} disablePadding>
                <ListItemButton role={undefined} onClick={() => handleSelectPriceRange(value)} dense>
                  <ListItemIcon>
                    <Radio
                      edge="start"
                      checked={selectedPrice === value}
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
