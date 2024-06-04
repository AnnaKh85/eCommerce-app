import { Box, ListItem, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import { useState } from 'react';

interface CountryOptionsProps {
  setSelectedCountry: (country: string) => void;
}

export default function CountryOptions({ setSelectedCountry }: CountryOptionsProps) {
  const [selectedCountry, setSelectedCountryState] = useState<string | null>(null);

  const handleSelectCountry = (country: string) => {
    setSelectedCountryState(country);
    setSelectedCountry(country);
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
          Country:
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {['Russia', 'Germany', 'China'].map((value, index) => {
            const labelId = `radio-list-label-${index + 1}`;
            const countryIndex: string = (index + 1).toString();

            return (
              <ListItem key={value} disablePadding>
                <ListItemButton role={undefined} onClick={() => handleSelectCountry(countryIndex)} dense>
                  <ListItemIcon>
                    <Radio
                      edge="start"
                      checked={selectedCountry === countryIndex}
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
