import { DateCalendar, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, Dialog, DialogActions, Box } from '@mui/material';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { useState } from 'react';
import toast from 'react-hot-toast';

const DateModal = ({ setDateTime, open, setOpen }) => {
  const [selectDate, setSelectDate] = useState(dayjs());
  const [selectTime, setSelectTime] = useState(dayjs().startOf('hour'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (selectDate && selectTime) {
      const combinedDateTime = selectDate
        .set('hour', selectTime.hour())
        .set('minute', selectTime.minute())
        .set('second', 0)
        .set('millisecond', 0);

      const formattedDateTime = combinedDateTime.format('YYYY-MM-DDTHH:mm:ss');
      setDateTime(formattedDateTime);
    }
    handleClose();
  };

  const isToday = selectDate.isSame(dayjs(), 'day');

  const validateTime = (newValue) => {
    const now = dayjs();

    if (isToday && newValue.isBefore(now, 'minute')) {
      toast.error('유효하지 않은 시간입니다. \n 1시간 후로 설정됩니다.');
      return now.add(1, 'hour').startOf('minute');
    }

    return newValue;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: '12px' } }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DateCalendar
            value={selectDate}
            onChange={(newValue) => setSelectDate(newValue)}
            shouldDisableDate={(date) => dayjs(date).isBefore(dayjs(), 'day')}
          />
          <TimePicker
            value={selectTime}
            onChange={(newValue) => {
              if (dayjs(newValue).isValid())
                setSelectTime(validateTime(dayjs(newValue)));
            }}
            onBlur={() => setSelectTime(validateTime(selectTime))}
            disablePast={isToday}
            slotProps={{
              textField: {
                sx: {
                  mt: -1,
                  width: '50%',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                },
                onBlur: () => setSelectTime(validateTime(selectTime)),
              },
            }}
          />
        </LocalizationProvider>
      </Box>

      <DialogActions
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}
      >
        <Button
          onClick={handleConfirm}
          disabled={!selectDate || !selectTime}
          sx={{
            borderRadius: '10px',
            bgcolor: selectDate && selectTime ? 'primary.main' : 'n3.main',
            color: 'text.main',
            minWidth: '100px',
            minHeight: '40px',
            fontWeight: 700,
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateModal;
