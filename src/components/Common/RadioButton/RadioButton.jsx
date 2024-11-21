import PropTypes from 'prop-types';
import './RadioButton.css';
import CheckIcon from '@mui/icons-material/Check';

const RadioButton = ({ size, selected, label, onChange }) => {
  return (
    <div
      className={`radio-button ${size} ${selected ? 'selected' : ''}`}
      onClick={onChange}
    >
      <div className={`radio-circle ${selected ? 'checked' : ''}`}>
        {selected && (
          <CheckIcon
            style={{
              color: '#FFFFFF',
              fontSize: '16px',
            }}
          />
        )}
      </div>
      <span className="radio-label">{label}</span>
    </div>
  );
};

RadioButton.propTypes = {
  size: PropTypes.oneOf(['large', 'small']),
  selected: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

RadioButton.defaultProps = {
  size: 'large',
  selected: false,
};

export default RadioButton;
