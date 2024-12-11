import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import Button from '@components/Common/Button/Button';
import InputText from '@components/Common/InputText/InputText';
import { useState, useEffect } from 'react';
import SelectRegion from '@components/Request/modules/SelectRegion';
import SubTitle from '@components/Request/atoms/SubTitle';
import { socialProfile, updateSocialProfile } from '@/api/socialProfile';
import ProfileSelector from '@components/Features/ProfileSelector';
import { useNavigate } from 'react-router-dom';

const EditSocialProfile = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [districtId, setDistrictId] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSocialProfile = async () => {
      const res = await socialProfile();
      setData(res);
      setDistrictId(res.districtId);
      setLoading(false);
    };
    getSocialProfile();
  }, []);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (image) => {
    handleChange('imageKey', image);
  };

  const handleSubmit = () => {
    updateSocialProfile(data.imageKey, data.email, districtId);
    navigate(-1);
  };

  if (loading) return <Typography>LOADING</Typography>;

  return (
    <Box>
      <DetailHeader label={'소셜 로그인 계정 수정'} />
      <Box p={4} color="text.main" textAlign="center">
        <Box textAlign="center" sx={{ cursor: 'pointer' }}>
          <ProfileSelector
            defaultImage="human"
            image={data?.imageKey}
            onChange={handleImageChange}
          />
        </Box>

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
