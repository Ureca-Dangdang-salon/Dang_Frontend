import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Selector2 } from '../atoms/Selector2';
import { RegionModal } from '@components/Common/RegionModal/RegionModal';

const SelectRegion = ({ setLocation, setDistrictId, origLocation }) => {
  const [thisLocation, setThisLocation] = useState(origLocation || null);
  const [open, setOpen] = useState(false);

  const handleAction = (city, region, id) => {
    const newLocation = city + ' ' + region;
    setThisLocation(newLocation);
    if (setLocation) setLocation(newLocation);
    if (setDistrictId) setDistrictId(id);
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
