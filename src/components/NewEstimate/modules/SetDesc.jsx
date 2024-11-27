import InputText from '@components/Common/InputText/InputText';
import TextArea from '@components/Common/TextArea/TextArea';
import SubTitle from '@components/NewRequest/atoms/SubTitle';
import { Box, Icon, Typography } from '@mui/material';
import { useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const SetDesc = () => {
  const [desc, setDesc] = useState('');
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <div>
        <SubTitle title="총 금액" />
        <InputText value="90,000 원" disabled={true} onChange={() => ''} />
      </div>
      <div>
        <SubTitle title="견적 설명" isOption={true} />
        <Typography variant="body2" mb={1}>
          추가 적인 코멘트가 있다면 적어주세요.
        </Typography>
        <TextArea
          placeholder="설명을 작성해주세요."
          rows={5}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div>
        <SubTitle title="사진 첨부" isOption={true} />
        <Box
          sx={{
            width: '120px',
            height: '120px',
            borderRadius: '10px',
            backgroundColor: 'n4.main',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AddRoundedIcon sx={{ fontSize: '48px', color: 'n2.main' }} />
        </Box>
      </div>
    </Box>
  );
};

export default SetDesc;
