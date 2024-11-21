import PropTypes from 'prop-types';
import './InputText.css';

const InputText = ({ value, onChange, placeholder, disabled }) => {
  return (
    <input
      type="text"
      className="input-text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || '이름을 입력해주세요'}
      disabled={disabled}
      style={{ color: value ? '#000000' : '#B8B8B8' }}
    />
  );
};

InputText.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputText.defaultProps = {
  placeholder: '이름을 입력해주세요',
  disabled: false,
};

export default InputText;
