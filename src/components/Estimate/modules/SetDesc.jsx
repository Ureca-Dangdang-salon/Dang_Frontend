import InputText from '@components/Common/InputText/InputText';
import TextArea from '@components/Common/TextArea/TextArea';
import SubTitle from '@components/Request/atoms/SubTitle';
import { Box, Typography } from '@mui/material';
import ImageSelector from '@components/Features/ImageSelector';

const SetDesc = ({ info, set }) => {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <div>
        <SubTitle title="총 금액" />
        <InputText
          value={info?.totalAmount + ' 원'}
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
          value={info?.description || info?.comment}
          onChange={(e) => {
            const field =
              info?.description.length >= 0 ? 'description' : 'comment';
            set(field, e.target.value);
          }}
        />
      </div>
      <div>
        <ImageSelector
          maxImages={1}
          images={info?.imageKey ? [info.imageKey] : []}
          onChange={(updatedImages) => set('imageKey', updatedImages[0])}
        />
      </div>
    </Box>
  );
};

export default SetDesc;
