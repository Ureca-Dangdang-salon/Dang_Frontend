import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { koreaRegions } from './KoreaRegions';

export const RegionModal = ({ setLocation, open, setOpen }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    if (selectedRegion) setLocation(selectedCity, selectedRegion);
    handleClose();
  };

  const isSelected = (current, selected) =>
    current === selected ? 'p3.main' : 'inherit';

  const cities = Object.keys(koreaRegions);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: '12px' } }}
    >
      <DialogTitle
        fontSize={16}
        fontWeight={600}
        textAlign="center"
        color="text.main"
        mt={1}
      >
        지역을 선택하세요
      </DialogTitle>
      <Typography variant="body2" textAlign="center" sx={{ my: 1 }}>
        {selectedCity
          ? `${selectedCity} ${selectedRegion ? `- ${selectedRegion}` : ''}`
          : '선택된 지역 없음'}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          overflowY: 'auto',
          maxHeight: '600px',
        }}
      >
        <Box width={150}>
          <List>
            {cities.map((city) => (
              <ListItem
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setSelectedRegion(null);
                }}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  mb: 1,
                  bgcolor: isSelected(city, selectedCity),
                }}
              >
                <ListItemText primary={city} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            mx: 2,
            position: 'sticky',
            top: 0,
          }}
        />

        <Box width={200}>
          {selectedCity ? (
            <List>
              {koreaRegions[selectedCity].map((region) => (
                <ListItem
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '8px',
                    mb: 1,
                    bgcolor: isSelected(region, selectedRegion),
                  }}
                >
                  <ListItemText primary={region} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              도시를 선택해주세요.
            </Typography>
          )}
        </Box>
      </Box>

      <DialogActions>
        <Box width="100%" textAlign="center" mb={2}>
          <Button
            onClick={handleClose}
            sx={{
              borderRadius: '10px',
              bgcolor: 'grey.300',
              color: 'text.primary',
              minWidth: '100px',
              minHeight: '40px',
              fontWeight: 700,
              mr: 1,
              '&:hover': { bgcolor: 'n4.main' },
            }}
          >
            닫기
          </Button>
          <Button
            onClick={handleAction}
            disabled={!selectedRegion}
            autoFocus
            sx={{
              borderRadius: '10px',
              bgcolor: 'primary.main',
              color: 'white.main',
              minWidth: '100px',
              minHeight: '40px',
              fontWeight: 700,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            확인
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
