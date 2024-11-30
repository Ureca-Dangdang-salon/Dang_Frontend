import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Selector2 } from '../atoms/Selector2';
import { RegionModal } from '@components/Common/RegionModal/RegionModal';

const SelectRegion = ({ setLocation }) => {
  const [thisLocation, setThisLocation] = useState(null);
  const [open, setOpen] = useState(false);

  const handleAction = (city, region) => {
    const newLocation = city + ' ' + region;
    setThisLocation(newLocation);
    if (setLocation) setLocation(newLocation);
  };

  return (
    <div>
      <Selector2
        label="지역 선택"
        content={thisLocation}
        icon={LocationOnIcon}
        setOpen={setOpen}
      />
      <RegionModal setLocation={handleAction} open={open} setOpen={setOpen} />
    </div>
  );
};

export default SelectRegion;
