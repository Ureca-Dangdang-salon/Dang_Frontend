import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import AddButton from '@components/Common/AddButton/AddButton';
import DeleteButton from '@components/Common/DeleteButton/DeleteButton';
import InputText from '@components/Common/InputText/InputText';
import { RegionModal } from '@components/Common/RegionModal/RegionModal';
import { Box } from '@mui/material';
import { useState } from 'react';

const Step5 = () => {
  const { setGroomerInfo, serviceAreas, setServiceAreas } =
    useSurveyGroomerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSetLocation = (city, region, regionId) => {
    setServiceAreas((prev) => {
      const newArea = city + ' ' + region;
      if (!prev.includes(newArea)) {
        return [...prev, newArea];
      }
      return prev;
    });

    setGroomerInfo((currentInfo) => {
      const currentIds = currentInfo.servicesDistrictIds;
      if (!currentIds.includes(regionId)) {
        return {
          ...currentInfo,
          servicesDistrictIds: [...currentIds, regionId],
        };
      }
      return currentInfo;
    });
  };

  const handleRemove = (index) => {
    setServiceAreas((prev) => prev.filter((_, idx) => idx !== index));
    setGroomerInfo((prev) => ({
      ...prev,
      servicesDistrictIds: prev.servicesDistrictIds.filter(
        (_, idx) => idx !== index
      ),
    }));
  };

  return (
    <SurveySection title="서비스 지역을 알려주세요.">
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 1 }}>
          {serviceAreas.map((area, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}
            >
              <InputText
                size="large"
                placeholder="서비스 지역을 선택해주세요"
                value={area}
                readOnly
                onClick={() => setIsModalOpen(true)}
                onChange={() => ''}
              />
              <DeleteButton
                size="medium"
                label=""
                onClick={() => handleRemove(index)}
              />
            </Box>
          ))}
        </Box>
        <AddButton
          size="large"
          label="서비스 지역 추가하기"
          onClick={() => setIsModalOpen(true)}
        />
      </Box>
      <RegionModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        setLocation={handleSetLocation}
      />
    </SurveySection>
  );
};

export default Step5;
