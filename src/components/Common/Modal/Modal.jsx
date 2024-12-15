import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, DialogTitle, Dialog, DialogActions } from '@mui/material';

export const Modal = ({
  openModalButton,
  buttonColor,
  title,
  secondaryButton,
  primaryButton,
  action,
  variant,
  buttonSx,
  onClose,
  onGoHome,
  isSimpleModal, // 새로 추가된 prop
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onClose?.();
    onGoHome?.();
    setOpen(false);
  };

  const handleAction = () => {
    action();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        color={buttonColor}
        sx={{ borderRadius: '10px', minWidth: '40px', ...buttonSx }}
        variant={variant}
      >
        {openModalButton}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ maxWidth: '326px', m: 'auto' }}
        PaperProps={{ sx: { borderRadius: '10px' } }}
      >
        <DialogTitle
          id="alert-dialog-title"
          fontSize={16}
          fontWeight={600}
          textAlign="center"
          color="text.main"
          mt={2}
        >
          {title}
        </DialogTitle>
        <DialogActions>
          <Box width="100%" textAlign="center" mb={2} mx={2}>
            {/* isSimpleModal이 아닐 때만 secondaryButton 표시 */}
            {secondaryButton && !isSimpleModal && (
              <Button
                onClick={handleClose}
                sx={{
                  borderRadius: '10px',
                  bgcolor: 'n3.main',
                  color: 'n2.main',
                  minWidth: '100px',
                  minHeight: '48px',
                  fontWeight: 700,
                  mr: 1,
                }}
              >
                {secondaryButton}
              </Button>
            )}
            <Button
              onClick={handleAction}
              autoFocus
              sx={{
                borderRadius: '10px',
                bgcolor: 'delete.light',
                color: 'white.main',
                minWidth: '100px',
                minHeight: '48px',
                fontWeight: 700,
                // isSimpleModal일 때는 버튼을 중앙에 위치
                ...(isSimpleModal && { mx: 'auto' }),
              }}
            >
              {primaryButton}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

Modal.propTypes = {
  openModalButton: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  buttonColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  secondaryButton: PropTypes.string,
  primaryButton: PropTypes.string,
  action: PropTypes.func,
  variant: PropTypes.string,
  buttonSx: PropTypes.object,
  onClose: PropTypes.func,
  onGoHome: PropTypes.func,
  isSimpleModal: PropTypes.bool,
};
