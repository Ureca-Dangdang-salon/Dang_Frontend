import PropTypes from 'prop-types';
import RemoveIcon from '@mui/icons-material/Remove';
import './DeleteButton.css';

const DeleteButton = ({ size, label, onClick }) => {
  return (
    <button
      className={`delete-button ${size === 'large' ? 'delete-button-large' : 'delete-button-medium'}`}
      onClick={onClick}
    >
      <RemoveIcon className="delete-icon" />
      {label}
    </button>
  );
};

DeleteButton.propTypes = {
  size: PropTypes.oneOf(['large', 'medium']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DeleteButton;
