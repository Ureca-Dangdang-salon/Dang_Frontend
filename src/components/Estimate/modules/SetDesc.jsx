import TextArea from '@components/Common/TextArea/TextArea';
import SubTitle from '@components/Request/atoms/SubTitle';
import { Box, Typography } from '@mui/material';
import ImageSelector from '@components/Features/ImageSelector';

const SetDesc = ({ info, set }) => {
  return (
    <Box display="flex" flexDirection="column">
      <SubTitle title="총 금액:" />
      <Box display="flex" alignItems="center">
        <Typography fontSize={30} fontWeight={600} color="secondary" mr={1}>
          {info?.totalAmount.toLocaleString()}
        </Typography>
        <span>원</span>
      </Box>
      <Box mt={3}>
        <SubTitle title="견적 설명" isOption={true} />
        <Typography variant="body2" mb={1}>
          추가 적인 코멘트가 있다면 적어주세요.
        </Typography>
        <TextArea
          placeholder="설명을 작성해주세요."
          rows={5}
          value={info?.description || ''}
          onChange={(e) => {
            const field = 'description';
            set(field, e.target.value);
          }}
        />
      </Box>
      <Box mt={3}>
        <ImageSelector
          maxImages={1}
          images={info?.imageKey ? [info.imageKey] : []}
          onChange={(updatedImages) => set('imageKey', updatedImages[0])}
          isOption={true}
        />
      </Box>
    </Box>
  );
};

export default SetDesc;
