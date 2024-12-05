import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import Button from '@components/Common/Button/Button';
import InputText from '@components/Common/InputText/InputText';
import { useState, useEffect } from 'react';
import SelectRegion from '@components/NewRequest/modules/SelectRegion';
import SubTitle from '@components/NewRequest/atoms/SubTitle';
import toast, { Toaster } from 'react-hot-toast';
import { socialProfile, updateSocialProfile } from '@/api/socialProfile';

const EditSocialProfile = () => {
  const [location, setLocation] = useState(null);
  const [districtId, setDistrictId] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSocialProfile = async () => {
      const res = await socialProfile();
      setData(res);
      setLoading(false);
    };
    getSocialProfile();
  }, []);

  const handleSubmit = () => {
    updateSocialProfile(districtId);
  };

  if (loading) return <Typography>LOADING</Typography>;

  return (
    <Box>
      <Toaster />
      <DetailHeader label={'소셜 로그인 계정 수정'} />
      <Box p={4} color="text.main" textAlign="center">
        <img
          src={data?.imageKey}
          width="150px"
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid',
            borderColor: '#9747FF',
          }}
        />

        <Box mt={3}>
          <SubTitle title="이메일 *" />
          <InputText disabled value={data?.email || ''} />
        </Box>

        <Box mt={3}>
          <SubTitle title="지역 *" />
          <SelectRegion
            setLocation={setLocation}
            setDistrictId={setDistrictId}
            origLocation={`${data?.city} ${data?.district}`}
          />
        </Box>

        <Box mt={5} />
        <Button
          size="large"
          backgroundColor="primary"
          label="저장하기"
          onClick={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export default EditSocialProfile;
