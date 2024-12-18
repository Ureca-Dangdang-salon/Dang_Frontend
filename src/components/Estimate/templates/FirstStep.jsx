import { Box } from '@mui/material';
import Button from '@components/Common/Button/Button';
import SelectDogList from '../modules/SelectDogList';
import SetDesc from '../modules/SetDesc';
import { useEffect } from 'react';
import { getEstimateDog, postEstimate } from '@/api/estimate';
import { useState } from 'react';
import useEstimateStore from '@/store/useEstimateStore';
import { groomerProfile } from '@/api/groomerProfile';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';
import { createChatRoom } from '@/api/chat';

const FirstStep = ({ requestId }) => {
  const [dogList, setDogList] = useState();
  const { estimateInfo, setEstimateInfo, priceValidList, resetEstimateInfo } =
    useEstimateStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDog = async () => {
      const res = await getEstimateDog(requestId);
      setDogList(res);
    };
    const fetchIds = async () => {
      setEstimateInfo({ requestId: requestId });
      const res = await groomerProfile();
      if (res) setEstimateInfo({ groomerProfileId: res.profileId });
    };
    fetchDog();
    fetchIds();
  }, []);

  const submitEstimate = async () => {
    const estimateId = await postEstimate(estimateInfo);
    if (estimateId) {
      resetEstimateInfo();
      const res = await createChatRoom(estimateId);
      if (res.roomId) navigate(paths.chatRoom.replace(':id', res.roomId));
    }
  };

  const isValid = () => {
    return !priceValidList.includes(false);
  };

  const setDesc = (field, value) => {
    setEstimateInfo({ [field]: value });
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={8}>
        <SelectDogList title="반려견 요청 목록 *" selectDogList={dogList} />
        <SetDesc info={estimateInfo} set={setDesc} />
      </Box>
      <Button
        label="견적서 보내기"
        size="large"
        backgroundColor={isValid() ? 'primary' : 'n3'}
        onClick={async (e) => {
          if (isValid()) await submitEstimate();
          e.stopPropagation();
        }}
      />
    </>
  );
};

export default FirstStep;
