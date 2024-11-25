import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, Dialog, DialogActions } from '@mui/material';
import 'dayjs/locale/ko';

const DateModal = ({ date, setDate, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    setDate(date);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: '12px' } }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DateCalendar value={date} onChange={(e) => setDate(e)} />
      </LocalizationProvider>

      <DialogActions
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}
      >
        <Button
          onClick={handleAction}
          disabled={!date}
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
