import InputText from '@components/Common/InputText/InputText';
import TextArea from '@components/Common/TextArea/TextArea';
import SubTitle from '@components/NewRequest/atoms/SubTitle';
import { Box, Typography } from '@mui/material';
import useEstimateStore from '@/store/useEstimateStore';
import ImageSelector from '@components/Features/ImageSelector';

const SetDesc = () => {
  const { estimateInfo, setEstimateInfo } = useEstimateStore();

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <div>
        <SubTitle title="총 금액" />
        <InputText
          value={estimateInfo.totalAmount + ' 원'}
          disabled={true}
          onChange={() => ''}
        />
      </div>
      <div>
        <SubTitle title="견적 설명" isOption={true} />
        <Typography variant="body2" mb={1}>
          추가 적인 코멘트가 있다면 적어주세요.
        </Typography>
        <TextArea
          placeholder="설명을 작성해주세요."
          rows={5}
          value={estimateInfo.description}
          onChange={(e) => setEstimateInfo({ description: e.target.value })}
        />
      </div>
      <div>
        <ImageSelector
          maxImages={1}
          images={estimateInfo.imageKey ? [estimateInfo.imageKey] : []}
          onChange={(updatedImages) =>
            setEstimateInfo({ imageKey: updatedImages[0] })
          }
        />
      </div>
    </Box>
  );
};

export default SetDesc;
