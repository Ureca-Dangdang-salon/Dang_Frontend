import SubTitle from '../atoms/SubTitle';
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Selector2 } from '../atoms/Selector2';
import DateModal from '@components/Common/DateModal';
import dayjs from 'dayjs';

const SelectDate = ({ value, set }) => {
  const [open, setOpen] = useState(false);

  const setDateTime = (date) => {
    const displayDate = dayjs(date).format('YYYY-MM-DD HH:mm');
    set(displayDate);
  };

  return (
    <div>
      <SubTitle title="원하는 날짜와 시간 *" />

      <Selector2
        label="날짜 선택"
        content={value}
        icon={CalendarMonthIcon}
        setOpen={setOpen}
      />

      <DateModal setDateTime={setDateTime} open={open} setOpen={setOpen} />
    </div>
  );
};

export default SelectDate;
