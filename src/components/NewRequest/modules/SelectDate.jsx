import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs from 'dayjs';
import { Selector2 } from '../atoms/Selector2';
import SubTitle from '../atoms/SubTitle';
import DateModal from '../atoms/DateModal';

const SelectDate = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);

  return (
    <div>
      <SubTitle title="원하는 날짜" />
      <Selector2
        label="날자 선택"
        content={date ? dayjs(date).format('YYYY-MM-DD') : date}
        icon={CalendarMonthIcon}
        setOpen={setOpen}
      />
      <DateModal date={date} setDate={setDate} open={open} setOpen={setOpen} />
    </div>
  );
};

export default SelectDate;
