import { useState } from 'react';
import SubTitle from '../atoms/SubTitle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Selector2 } from '../atoms/Selector2';
import { RegionModal } from '../atoms/RegionModal';

const SelectRegion = () => {
  const [location, setLocation] = useState(null);
  const [open, setOpen] = useState(false);

  const handleAction = (city, region) => {
    setLocation(city + ' ' + region);
  };

  return (
    <div>
      <SubTitle title="지역" />
      <Selector2
        label="지역 선택"
        content={location}
        icon={LocationOnIcon}
        setOpen={setOpen}
      />
      <RegionModal setLocation={handleAction} open={open} setOpen={setOpen} />
    </div>
  );
};

export default SelectRegion;
