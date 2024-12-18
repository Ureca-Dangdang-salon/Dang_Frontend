import { DateCalendar, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, Dialog, DialogActions, Box } from '@mui/material';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { useState } from 'react';

const DateModal = ({ setDateTime, open, setOpen }) => {
  const [selectDate, setSelectDate] = useState(dayjs());
  const [selectTime, setSelectTime] = useState(dayjs().startOf('day'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (selectDate && selectTime) {
      const combinedDateTime = selectDate
        .set('hour', selectTime.hour())
        .set('minute', selectTime.minute())
        .set('second', selectTime.second())
        .set('millisecond', 0);

      const formattedDateTime = combinedDateTime.format('YYYY-MM-DDTHH:mm:ss');
      setDateTime(formattedDateTime);
    }
    handleClose();
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
            onChange={(newValue) => setSelectTime(newValue)}
            disablePast
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
