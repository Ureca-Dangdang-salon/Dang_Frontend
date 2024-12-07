import { useState, useEffect } from 'react';
import { Box, Grid2 } from '@mui/material';
import PetItem from '@components/NewRequest/atoms/PetItem';
import { getDogProfiles } from '@/api/request';
import useRequestStore from '@/store/useRequestStore';

const PetList = () => {
  const { selectDogs, addDog, removeDog } = useRequestStore();
  const [dogList, setDogList] = useState([]);

  useEffect(() => {
    getDogs();
  }, []);

  const getDogs = async () => {
    const list = await getDogProfiles();
    setDogList(list);
  };

  const handleSelect = (id) => {
    if (selectDogs.includes(id)) {
      removeDog(id);
    } else {
      addDog(id);
    }
  };

  return (
    <Box minHeight="85%">
      <Grid2
        container
        spacing={7}
        rowSpacing={4}
        justifyContent="center"
        py={4}
        width="100%"
      >
        {dogList.length
          ? dogList.map((e, idx) => (
              <PetItem
                key={idx}
                isSelected={selectDogs.includes(e.dogProfileId)}
                onSelect={() => handleSelect(e.dogProfileId)}
                data={e}
              />
            ))
          : '반려견이 없습니다. 등록해주세요'}
      </Grid2>
    </Box>
  );
};

export default PetList;
