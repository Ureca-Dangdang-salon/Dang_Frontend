import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import InputText from '@components/Common/InputText/InputText';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import Button from '@components/Common/Button/Button';
import NumberPicker from '@components/Common/NumberPicker/NumberPicker';
import { Selector } from '@components/Common/Selector/Selector';
import RadioButton from '@components/Common/RadioButton/RadioButton';
import { breeds } from '@/constants/breeds';
import ProfileSelector from '@components/Features/ProfileSelector';
import { useEffect } from 'react';
import { dogProfile, updateDogProfile } from '@/api/dogProfile';
import { characteristics } from '@/constants/features';
import { useNavigate } from 'react-router-dom';

const DogProfile = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [data, setData] = useState({});
  const [features, setFeatures] = useState([]);
  const [additionalFeature, setAdditionalFeature] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const id = currentPath.split('/').pop();
    setId(id);

    const getDogProfile = async () => {
      const res = await dogProfile(id);
      setData(res);
      setFeatures(res.features.map((item) => item.description));
      setLoading(false);
    };

    getDogProfile();
  }, []);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (image) => {
    handleChange('profileImage', image);
  };

  const handleSubmit = () => {
    const featureIds = features
      .filter((feat) => feat !== '기타' && feat !== '없음')
      .map((feat) => Object.keys(characteristics).indexOf(feat) + 1);

    updateDogProfile(data, id, featureIds, additionalFeature);
    navigate(-1);
  };

  if (loading) return <Typography>LOADING</Typography>;

  return (
    <Box>
      <DetailHeader label="반려견 프로필 수정" />
      <Box p={4} color="text.main">
        <Box textAlign="center" sx={{ cursor: 'pointer' }}>
          <ProfileSelector
            defaultImage="dog"
            image={data?.profileImage}
            onChange={handleImageChange}
          />
        </Box>

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5}>
          이름
        </Typography>
        <Box width="100%" display="flex" flexDirection="column">
          <InputText
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </Box>

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          나이
        </Typography>
        <NumberPicker
          onChange={(value) => handleChange('ageYear', value)}
          value={data.ageYear}
          placeholder={0}
          label="년"
        />
        <Box mt={2}></Box>
        <NumberPicker
          onChange={(value) => handleChange('ageMonth', value)}
          value={data.ageMonth}
          placeholder={0}
          label="개월"
        />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          견종
        </Typography>
        <Selector
          label="견종을 선택해주세요"
          value={data.species}
          choices={breeds}
          onChange={handleChange}
          field="species"
        />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          성별
        </Typography>
        <RadioButton
          label="남아"
          size="large"
          selected={data.gender === 'MALE'}
          onChange={() => handleChange('gender', 'MALE')}
        />
        <Box mt={1.5}></Box>
        <RadioButton
          label="여아"
          size="large"
          selected={data.gender === 'FEMALE'}
          onChange={() => handleChange('gender', 'FEMALE')}
        />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          중성화 여부
        </Typography>
        <RadioButton
          label="했어요"
          size="large"
          selected={data.neutering === 'Y'}
          onChange={() => handleChange('neutering', 'Y')}
        />
        <Box mt={1.5}></Box>
        <RadioButton
          label="안했어요"
          size="large"
          selected={data.neutering === 'N'}
          onChange={() => handleChange('neutering', 'N')}
        />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          몸무게
        </Typography>
        <NumberPicker
          onChange={(value) => handleChange('weight', value)}
          value={data.weight}
          placeholder={0}
          label="kg"
        />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          특징
        </Typography>
        {Object.entries(characteristics).map(([trait, checked]) => (
          <Box key={trait}>
            <RadioButton
              size="large"
              label={trait}
              selected={features.includes(trait)}
              onChange={() => {
                setFeatures((prevFeatures) => {
                  if (trait === '없음') return ['없음'];
                  if (trait === '기타') setAdditionalFeature('');
                  if (prevFeatures.includes(trait))
                    return prevFeatures.filter((item) => item !== trait);

                  return [
                    ...prevFeatures.filter((item) => item !== '없음'),
                    trait,
                  ];
                });
              }}
            />
            {trait === '기타' && features.includes(trait) && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <InputText
                  size="large"
                  placeholder="기타 특징을 적어주세요. (최대30자)"
                  value={additionalFeature}
                  onChange={(e) => setAdditionalFeature(e.target.value)}
                />
              </Box>
            )}
          </Box>
        ))}

        <Box textAlign="center" mt={3}>
          <Button
            size="large"
            backgroundColor="primary"
            label="저장하기"
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DogProfile;
