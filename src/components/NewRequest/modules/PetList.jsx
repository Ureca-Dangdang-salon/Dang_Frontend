import { useState } from 'react';
import { Grid2 } from '@mui/material';
import PetItem from '@components/NewRequest/atoms/PetItem';

const PetList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const list = new Array(40).fill(0);

  const handleSelect = (idx) => {
    setSelectedItems((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  return (
    <Grid2
      container
      spacing={7}
      rowSpacing={4}
      justifyContent="center"
      py={4}
      width="100%"
    >
      {list.map((_, idx) => (
        <PetItem
          key={idx}
          isSelected={selectedItems.includes(idx)}
          onSelect={() => handleSelect(idx)}
        />
      ))}
    </Grid2>
  );
};

export default PetList;
