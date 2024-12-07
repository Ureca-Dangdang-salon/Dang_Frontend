import { Box } from '@mui/material';
import SubTitle from '../atoms/SubTitle';
import SelectDogItem from '../atoms/SelectDogItem';
import useRequestStore from '@/store/useRequestStore';
import { useEffect, useState } from 'react';
import { getDogProfiles } from '@/api/request';
import usePageStore from '@/store/usePageStore';

const SelectDog = ({ title }) => {
  const { setDogStep } = usePageStore();
  const { requestInfo, setDogIndex } = useRequestStore();
  const [dogList, setDogList] = useState([]);

  useEffect(() => {
    getDogs();
  }, []);

  const getDogs = async () => {
    const list = await getDogProfiles();
    setDogList(list);
  };

  return (
    <div>
      <SubTitle title={title} />
      <Box>
        {requestInfo.dogEstimateRequestList.map((e, idx) => {
          const dogData = dogList.find(
            (dog) => dog.dogProfileId === e.dogProfileId
          );
          return (
            <Box
              key={idx}
              onClick={() => {
                setDogIndex(idx);
                setDogStep(1);
              }}
            >
              <SelectDogItem data={dogData} idx={idx} />
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default SelectDog;
