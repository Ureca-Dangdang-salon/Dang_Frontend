import './Checkbox.css';
import CheckIcon from '@mui/icons-material/Check';

const Checkbox = ({ size, selected, label, onChange }) => {
  return (
    <div
      className={`checkbox ${size} ${selected ? 'selected' : ''}`}
      onClick={onChange}
      style={{ marginBottom: '12px' }}
    >
      <div className={`check ${selected ? 'checked' : ''}`}>
        {selected && (
          <CheckIcon
            style={{
              color: '#FFFFFF',
              fontSize: '16px',
            }}
          />
        )}
      </div>
      <span className="label">{label}</span>
    </div>
  );
};

export default Checkbox;
