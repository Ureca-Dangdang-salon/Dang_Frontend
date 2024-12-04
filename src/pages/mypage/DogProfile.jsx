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
import { dogProfile } from '@/api/dogProfile';

const DogProfile = () => {
  const features = [
    '물을 무서워해요',
    '사람을 좋아해요',
    '발을 만지는 걸 싫어해요',
    '없음',
  ];
  const [profileImage, setProfileImage] = useState(null);
  const [etc, setEtc] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const id = currentPath.split('/').pop();

    const getDogProfile = async () => {
      const res = await dogProfile(id);
      setData(res);
      setLoading(false);
    };

    getDogProfile();
  }, []);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (feature) => {
    if (data.additionalFeature.includes(feature)) {
      handleChange(
        'additionalFeature',
        data.additionalFeature.filter((f) => f !== feature)
      );
    } else if (feature === '없음') {
      handleChange('additionalFeature', ['없음']);
      setEtc(false);
    } else {
      setData((prev) => {
        const updatedFeatures = prev.additionalFeature.includes('없음')
          ? prev.additionalFeature.filter((f) => f !== '없음')
          : [...prev.additionalFeature];

        if (!updatedFeatures.includes(feature)) {
          updatedFeatures.push(feature);
        }

        return { ...prev, additionalFeature: updatedFeatures };
      });
    }
  };

  const handleImageChange = (image) => {
    setProfileImage(image);
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', data);
  };

  if (loading) return <Typography>LOADING</Typography>;

  return (
    <Box>
      <DetailHeader label="반려견 프로필 수정" />
      <Box p={4} color="text.main">
        <Box textAlign="center" sx={{ cursor: 'pointer' }}>
          <ProfileSelector
            defaultImage="dog"
            image={data.profileImage}
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
          onChange={(value) => handleChange('ageYears', value)}
          value={data.ageYear}
          placeholder={0}
          label="년"
        />
        <Box mt={2}></Box>
        <NumberPicker
          onChange={(value) => handleChange('ageMonths', value)}
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
          selected={data.gender === 'male'}
          onChange={() => handleChange('gender', 'male')}
        />
        <Box mt={1.5}></Box>
        <RadioButton
          label="여아"
          size="large"
          selected={data.gender === 'female'}
          onChange={() => handleChange('gender', 'female')}
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
        {features.map((feat) => (
          <RadioButton
            key={feat}
            label={feat}
            size="large"
            selected={data.features.includes(feat)}
            onChange={() => handleFeatureChange(feat)}
          />
        ))}
        <RadioButton
          label="기타"
          size="large"
          selected={etc}
          onChange={() => {
            setEtc(!etc);
            handleChange(
              'additionalFeature',
              data.additionalFeature.filter((f) => f !== '없음')
            );
            if (etc) handleChange('customFeature', '');
          }}
        />
        {etc && (
          <InputText
            value={data.customFeature}
            placeholder="특징을 작성해주세요"
            onChange={(e) => handleChange('customFeature', e.target.value)}
          />
        )}

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
