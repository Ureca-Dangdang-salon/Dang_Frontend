import PropTypes from 'prop-types';
import * as S from './style';

const PetItem = ({ isSelected, onSelect }) => {
  return (
    <S.Layer onClick={onSelect} isSelected={isSelected}>
      <S.Img />
      <span>{'댕댕이'}</span>
    </S.Layer>
  );
};

PetItem.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PetItem;
