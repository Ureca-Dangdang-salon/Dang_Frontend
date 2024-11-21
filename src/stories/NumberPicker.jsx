// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import AddIcon from '@mui/icons-material/Add'; // 플러스 아이콘
// import RemoveIcon from '@mui/icons-material/Remove'; // 마이너스 아이콘
// import './NumberPicker.css';

// const NumberPicker = ({
//   value: initialValue,
//   onChange,
//   min = 0,
//   max = 100,
//   label = '', // 동적 단위 (년, 개월, kg 등)
// }) => {
//   const [value, setValue] = useState(initialValue);
//   const [isInitial, setIsInitial] = useState(true); // 초기 상태 여부를 관리

//   useEffect(() => {
//     setValue(initialValue);
//     setIsInitial(true); // 초기 상태로 리셋
//   }, [initialValue]);

//   // 상태 변경 핸들러: 증가
//   const handleIncrease = () => {
//     if (value < max) {
//       const newValue = value + 1;
//       setValue(newValue);
//       setIsInitial(false); // 값이 변경되면 초기 상태가 아님
//       onChange(newValue); // 부모에게 값 전달
//     }
//   };

//   // 상태 변경 핸들러: 감소
//   const handleDecrease = () => {
//     if (value > min) {
//       const newValue = value - 1;
//       setValue(newValue);
//       setIsInitial(false); // 값이 변경되면 초기 상태가 아님
//       onChange(newValue); // 부모에게 값 전달
//     }
//   };

//   return (
//     <div className="number-picker">
//       {/* 값 표시 */}
//       <span
//         className={`number-picker-display ${
//           isInitial ? 'initial-value' : 'modified-value'
//         }`}
//       >
//         {value}
//       </span>

//       {/* 단위 레이블 표시 */}
//       <span className="number-picker-label">{label}</span>

//       {/* 증가/감소 버튼 */}
//       <div className="number-picker-controls">
//         <div className="button-container" onClick={handleIncrease}>
//           <AddIcon className="number-picker-icon" />
//         </div>
//         <div className="button-container" onClick={handleDecrease}>
//           <RemoveIcon className="number-picker-icon" />
//         </div>
//       </div>
//     </div>
//   );
// };

// NumberPicker.propTypes = {
//   value: PropTypes.number.isRequired,
//   onChange: PropTypes.func.isRequired,
//   min: PropTypes.number,
//   max: PropTypes.number,
//   label: PropTypes.string, // 단위 레이블 (년, 개월 등)
// };

// NumberPicker.defaultProps = {
//   min: 0,
//   max: 100,
//   label: '', // 기본값: 빈 문자열
// };

// export default NumberPicker;
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
  size = 'default', // 기본값은 default
}) => {
  const [value, setValue] = useState(initialValue);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    setValue(initialValue);
    setIsInitial(true); // 초기 상태로 리셋
  }, [initialValue]);

  const handleIncrease = () => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      setIsInitial(false); // 값 변경
      onChange(newValue);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      setIsInitial(false); // 값 변경
      onChange(newValue);
    }
  };

  return (
    <div className={`number-picker number-picker--${size}`}>
      <span
        className={`number-picker-display ${
          isInitial ? 'initial-value' : 'modified-value'
        }`}
      >
        {value}
      </span>
      <span className="number-picker-label">{label}</span>
      <div className="number-picker-controls">
        <div className="button-container" onClick={handleIncrease}>
          <AddIcon className="number-picker-icon" />
        </div>
        <div className="button-container" onClick={handleDecrease}>
          <RemoveIcon className="number-picker-icon" />
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
  size: PropTypes.oneOf(['default', 'small']), // 크기 옵션 추가
};

NumberPicker.defaultProps = {
  min: 0,
  max: 100,
  label: '',
  size: 'default', // 기본값은 default
};

export default NumberPicker;
