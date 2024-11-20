import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const DetailHeader = ({ label }) => (
  <header>
    <div className="storybook-header" style={{ height: '80px' }}>
      <div>
        <ArrowBackIosNewRoundedIcon color="n2" />
      </div>
      <Typography color="text" fontWeight={700} fontSize={18}>
        {label}
      </Typography>
      <div></div>
    </div>
  </header>
);

DetailHeader.PropTypes = {
  label: PropTypes.string.isRequired,
};
