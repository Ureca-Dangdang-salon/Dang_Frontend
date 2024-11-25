import { Typography } from '@mui/material';

const SubTitle = ({ title }) => {
  return (
    <Typography
      color="text"
      fontWeight="bold"
      fontSize={16}
      width="100%"
      paddingBottom={1}
    >
      {title}
    </Typography>
  );
};

export default SubTitle;
