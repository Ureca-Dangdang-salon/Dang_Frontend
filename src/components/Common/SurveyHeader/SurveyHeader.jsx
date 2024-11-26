import PropTypes from 'prop-types';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Typography, Box, IconButton } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const BorderLinearProgress = styled(LinearProgress)(() => ({
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

export const SurveyHeader = ({
  label,
  totalPage,
  currPage,
  delBack,
  backHandler,
}) => {
  const navigate = useNavigate();
  return (
    <Box
      className="storybook-header"
      sx={{
        zIndex: 100,
        flexDirection: 'column',
        px: 2,
        pb: 0,
        boxShadow: '0',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {delBack ? (
          ''
        ) : (
          <IconButton
            onClick={() => {
              backHandler ? backHandler() : navigate(-1);
            }}
            sx={{ position: 'absolute', left: '0' }}
          >
            <ArrowBackIosNewRoundedIcon color="n2" />
          </IconButton>
        )}
        <Typography color="text" fontWeight={700} fontSize={18}>
          {label}
        </Typography>
      </Box>

      <Box display="flex" gap={1} mx={3} width="100%">
        {Array.from({ length: totalPage }).map((_, index) => (
          <BorderLinearProgress
            key={index}
            variant="determinate"
            value={index < currPage ? 100 : 0}
            style={{ flex: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

SurveyHeader.propTypes = {
  label: PropTypes.string.isRequired,
  totalPage: PropTypes.number,
  currPage: PropTypes.number,
};
