import PropTypes from 'prop-types';
import './ExpandableInputText.css';

const ExpandableInputText = ({
  value,
  placeholder,
  onChange,
  rows = 4,
  disabled,
}) => {
  return (
    <textarea
      className="ExpandableInputText"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      rows={rows}
      disabled={disabled}
    />
  );
};

ExpandableInputText.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
};

export default ExpandableInputText;
