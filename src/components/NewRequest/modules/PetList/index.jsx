import { useState } from 'react';
import PetItem from '@components/NewRequest/atoms/PetItem';
import * as S from './style';

const PetList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const list = new Array(59).fill(0);

  const handleSelect = (idx) => {
    setSelectedItems((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  return (
    <S.Layer>
      {list.map((_, idx) => (
        <PetItem
          key={idx}
          isSelected={selectedItems.includes(idx)}
          onSelect={() => handleSelect(idx)}
        />
      ))}
    </S.Layer>
  );
};

export default PetList;
