import { Typography } from '@mui/material';

const SubTitle = ({ title, isOption }) => {
  return (
    <Typography
      fontWeight="bold"
      fontSize={16}
      width="100%"
      paddingBottom={1}
      display="flex"
      alignItems="center"
      component="div"
    >
      {title}
      {isOption && <Typography variant="body2">&nbsp;(선택)</Typography>}
    </Typography>
  );
};

export default SubTitle;
