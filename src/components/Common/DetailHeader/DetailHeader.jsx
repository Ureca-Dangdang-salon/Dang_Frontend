import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const DetailHeader = ({ label }) => (
  <header>
    <div className="storybook-header" style={{ height: '80px' }}>
      <IconButton onClick={() => window.history.back()}>
        <ArrowBackIosNewRoundedIcon color="n2" />
      </IconButton>
      <Typography color="text" fontWeight={700} fontSize={18}>
        {label}
      </Typography>
      <div></div>
    </div>
  </header>
);

DetailHeader.propTypes = {
  label: PropTypes.string.isRequired,
};
