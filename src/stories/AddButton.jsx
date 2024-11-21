import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import './AddButton.css';

const AddButton = ({ size, label, onClick }) => {
  return (
    <button
      className={`add-button ${size === 'large' ? 'add-button-large' : 'add-button-medium'}`}
      onClick={onClick}
    >
      <AddIcon className="add-icon" />
      {label}
    </button>
  );
};

AddButton.propTypes = {
  size: PropTypes.oneOf(['large', 'medium']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

AddButton.defaultProps = {
  size: 'large',
  onClick: () => {}, // 아직은 아무 동작 안 하게 만듦
};

export default AddButton;
