import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './NumberPicker.css';

const NumberPicker = ({
  value: initialValue,
  onChange,
  min = 0,
  max = 100,
  label = '',
  size = 'default',
}) => {
  const [value, setValue] = useState(initialValue);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    setValue(initialValue);
    setIsInitial(true);
  }, [initialValue]);

  const handleIncrease = () => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      setIsInitial(false);
      onChange(newValue);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      setIsInitial(false);
      onChange(newValue);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    if (newValue === '') {
      setValue('');
      setIsInitial(false);
      onChange('');
      return;
    }

    const numericValue = parseInt(newValue, 10);
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      setValue(numericValue);
      setIsInitial(false);
      onChange(numericValue);
    }
  };

  return (
    <div className={`number-picker number-picker--${size}`}>
      <input
        type="number"
        className={`number-picker-input ${
          isInitial ? 'initial-value' : 'modified-value'
        }`}
        value={value}
        onChange={handleInputChange}
      />
      <span className="number-picker-label">{label}</span>
      <div className="number-picker-controls">
        <div className="button-container" onClick={handleIncrease}>
          <AddIcon fontSize="10px" className="number-picker-icon" />
        </div>
        <div className="button-container" onClick={handleDecrease}>
          <RemoveIcon fontSize="10px" className="number-picker-icon" />
        </div>
      </div>
    </div>
  );
};

NumberPicker.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
  size: PropTypes.oneOf(['default', 'small']),
};

export default NumberPicker;
