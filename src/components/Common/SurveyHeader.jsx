import PropTypes from 'prop-types';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Typography, Box } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#FFFBED',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'primary',
  },
}));

export const SurveyHeader = ({ totalPage, currPage }) => (
  <header>
    <div
      className="storybook-header"
      style={{
        height: '80px',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <ArrowBackIosNewRoundedIcon color="n2" />
      <Typography color="text" fontWeight={700} fontSize={18}>
        회원가입
      </Typography>
      <div></div>
    </div>

    <Box display="flex" gap={1} mx={3}>
      {Array.from({ length: totalPage }).map((_, index) => (
        <BorderLinearProgress
          key={index}
          variant="determinate"
          value={index < currPage ? 100 : 0}
          style={{ flex: 1 }}
        />
      ))}
    </Box>
  </header>
);

SurveyHeader.propTypes = {
  label: PropTypes.string.isRequired,
  totalPage: PropTypes.number,
  currPage: PropTypes.number,
};
