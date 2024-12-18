import SubTitle from '../atoms/SubTitle';
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Selector2 } from '../atoms/Selector2';
import DateModal from '@components/Common/DateModal';

const SelectDate = ({ value, set }) => {
  const [open, setOpen] = useState(false);

  const setDateTime = (date) => {
    set(date);
  };

  return (
    <div>
      <SubTitle title="원하는 날짜와 시간 *" />

      <Selector2
        label="날짜 & 시간 선택"
        content={value}
        icon={CalendarMonthIcon}
        setOpen={setOpen}
      />

      <DateModal setDateTime={setDateTime} open={open} setOpen={setOpen} />
    </div>
  );
};

export default SelectDate;
