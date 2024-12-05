import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { IconButton, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

export const DetailHeader = ({ label }) => {
  const navigate = useNavigate();

  return (
    <Box
      component="header"
      sx={{
        height: '80px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'white.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIosNewRoundedIcon color="n2" />
      </IconButton>
      <Typography color="text.main" fontWeight={700} fontSize={18}>
        {label}
      </Typography>
      <Box width="40px" />
    </Box>
  );
};

DetailHeader.propTypes = {
  label: PropTypes.string.isRequired,
};
