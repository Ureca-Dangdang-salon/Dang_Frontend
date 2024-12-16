import PropTypes from 'prop-types';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(({ size }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  border: '1px solid #ff9b9b',
  backgroundColor: '#fff5f5',
  fontWeight: 'bold',
  color: '#3b3b3b',
  transition: 'all 0.3s ease-in-out',
  padding: '0',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: '#fff5f5',
  },

  ...(size === 'medium' && {
    width: '60px',
    height: '60px',
    fontSize: '14px',
    minWidth: '60px',
  }),

  '& .MuiSvgIcon-root': {
    color: '#ff6b6b',
    marginRight: size === 'medium' ? '8px' : 0,
    margin: '0',
  },
}));

const DeleteButton = ({ size, label, onClick }) => {
  return (
    <StyledButton variant="contained" size={size} onClick={onClick}>
      <RemoveIcon />
      {label}
    </StyledButton>
  );
};

DeleteButton.propTypes = {
  size: PropTypes.oneOf(['medium']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DeleteButton;
