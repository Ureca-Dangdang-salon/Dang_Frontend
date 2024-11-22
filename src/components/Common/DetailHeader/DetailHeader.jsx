import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

export const DetailHeader = ({ label }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div
        className="storybook-header"
        style={{ height: '80px', position: 'sticky', top: 0 }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosNewRoundedIcon color="n2" />
        </IconButton>
        <Typography color="text" fontWeight={700} fontSize={18}>
          {label}
        </Typography>
        <div></div>
      </div>
    </header>
  );
};

DetailHeader.propTypes = {
  label: PropTypes.string.isRequired,
};
