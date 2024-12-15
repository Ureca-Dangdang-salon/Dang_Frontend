import { Box, Typography } from '@mui/material';
import SubTitle from '../atoms/SubTitle';
import RadioButton from '@components/Common/RadioButton/RadioButton';
import TextArea from '@components/Common/TextArea/TextArea';
import useRequestStore from '@/store/useRequestStore';

const SelectForm = ({ text, handleChange, field, value }) => {
  return (
    <Box>
      <Typography variant="body2" mb={1}>
        {text}
      </Typography>
      <Box display="flex" gap={2} mb={3}>
        <RadioButton
          label="예"
          size="large"
          onChange={() => handleChange(field, true)}
          selected={value}
        />
        <RadioButton
          label="아니요"
          size="large"
          onChange={() => handleChange(field, false)}
          selected={value === null ? null : !value}
        />
      </Box>
    </Box>
  );
};

const SelectSignificant = () => {
  const { requestInfo, setRequestInfo, dogIndex } = useRequestStore();
  const dogInfo = requestInfo.dogEstimateRequestList[dogIndex];

  const handleChange = (field, value) => {
    const updatedList = [...requestInfo.dogEstimateRequestList];
    updatedList[dogIndex] = {
      ...updatedList[dogIndex],
      [field]: value,
    };

    setRequestInfo({
      dogEstimateRequestList: updatedList,
    });
  };
  if (dogIndex === null || dogIndex === undefined) {
    return <Typography>반려견을 선택해주세요.</Typography>;
  }
  return (
    <div>
      <SubTitle title="반려견 특이사항" />
      <SelectForm
        text="질병이 있나요? *"
        handleChange={handleChange}
        value={dogInfo.healthIssue}
        field="healthIssue"
      />
      <SelectForm
        text="공격성이 있나요? *"
        handleChange={handleChange}
        value={dogInfo.aggression}
        field="aggression"
      />
      <TextArea
        placeholder="추가적인 특이사항을 입력해 주세요. (선택)"
        rows={2}
        value={dogInfo.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
    </div>
  );
};

export default SelectSignificant;
