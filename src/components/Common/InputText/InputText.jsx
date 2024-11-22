import PropTypes from 'prop-types';
import './InputText.css';

const InputText = ({ value, onChange, placeholder, disabled }) => {
  return (
    <input
      type="text"
      className="input-text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || '이름을 입력해주세요'}
      disabled={disabled}
    />
  );
};

InputText.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputText;
