import { useState } from 'react';
import DeleteButton from '@components/Common/DeleteButton/DeleteButton';
import { Box } from '@mui/material';
import InputText from '@components/Common/InputText/InputText';
import AddButton from '@components/Common/AddButton/AddButton';
import { RegionModal } from '@components/Common/RegionModal/RegionModal';

const ServiceRegionForm = ({ regions, setServiceAreas }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSetLocation = (selectedCity, selectedDistrict) => {
    setServiceAreas((prev) => [
      ...prev,
      { city: selectedCity, district: selectedDistrict },
    ]);
    setIsModalOpen(false);
  };

  return (
    <>
      {regions.map((area, index) => (
        <Box
          key={area.district}
          mb={1.5}
          sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}
        >
          <InputText
            size="large"
            value={`${area.city} ${area.district}`}
            readOnly
            onChange={() => setIsModalOpen(true)}
          />
          <DeleteButton
            size="medium"
            label=""
            onClick={() => {
              setServiceAreas((prev) => prev.filter((_, i) => i !== index));
            }}
          />
        </Box>
      ))}
      <AddButton
        size="large"
        label="추가하기"
        onClick={() => setIsModalOpen(true)}
      />
      <RegionModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        setLocation={handleSetLocation}
      />
    </>
  );
};

export default ServiceRegionForm;
