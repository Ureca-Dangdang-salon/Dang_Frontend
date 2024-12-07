import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Selector2 } from '../atoms/Selector2';
import SubTitle from '../atoms/SubTitle';
import DateModal from '@components/Common/DateModal';
import useRequestStore from '@/store/useRequestStore';

const SelectDate = () => {
  const { requestInfo, setRequestInfo } = useRequestStore();
  const [open, setOpen] = useState(false);

  const setDate = (date) => {
    const formattedDate = `${date}T00:00:00`;
    setRequestInfo({ date: formattedDate });
  };

  const displayDate = requestInfo.date?.split('T')[0] || '';

  return (
    <div>
      <SubTitle title="원하는 날짜" />
      <Selector2
        label="날짜 선택"
        content={displayDate}
        icon={CalendarMonthIcon}
        setOpen={setOpen}
      />
      <DateModal setDate={setDate} open={open} setOpen={setOpen} />
    </div>
  );
};

export default SelectDate;
