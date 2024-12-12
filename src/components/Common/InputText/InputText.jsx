import PropTypes from 'prop-types';
import './InputText.css';

const InputText = ({
  value,
  onChange,
  onClick,
  placeholder,
  disabled,
  errorMessage,
}) => {
  return (
    <div className="input-text-wrapper">
      <input
        type="text"
        className={`input-text ${onClick ? 'clickable-input' : ''} ${
          errorMessage ? 'error' : ''
        }`}
        value={value}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder || '이름을 입력해주세요'}
        disabled={disabled}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

InputText.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default InputText;
