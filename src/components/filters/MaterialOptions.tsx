import { Box, ListItem, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import { useState } from 'react';

interface MaterialOptionsProps {
  setSelectedMaterial: (material: string) => void;
}

export default function MaterialOptions({ setSelectedMaterial }: MaterialOptionsProps) {
  const [selectedMaterial, setSelectedMaterialState] = useState<string | null>(null);

  const handleSelectMaterial = (material: string) => {
    setSelectedMaterialState(material);
    setSelectedMaterial(material);
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
          Material:
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {['Plastic', 'Steel', 'Aluminium', 'Carbon', 'Textile'].map((value, index) => {
            const labelId = `radio-list-label-${index + 1}`;
            const materialIndex: string = (index + 1).toString();

            return (
              <ListItem key={value} disablePadding>
                <ListItemButton role={undefined} onClick={() => handleSelectMaterial(materialIndex)} dense>
                  <ListItemIcon>
                    <Radio
                      edge="start"
                      checked={selectedMaterial === value}
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
