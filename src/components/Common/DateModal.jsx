import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, Dialog, DialogActions } from '@mui/material';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { useState } from 'react';

const DateModal = ({ setDate, open, setOpen }) => {
  const [selectDate, setSelectDate] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    setDate(dayjs(selectDate).format('YYYY-MM-DD'));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: '12px' } }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DateCalendar value={selectDate} onChange={(e) => setSelectDate(e)} />
      </LocalizationProvider>

      <DialogActions
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}
      >
        <Button
          onClick={handleAction}
          disabled={!selectDate}
          autoFocus
          sx={{
            borderRadius: '10px',
            bgcolor: 'primary.main',
            color: 'white.main',
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
