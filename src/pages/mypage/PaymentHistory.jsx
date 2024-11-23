import {
  Accordion,
  Box,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { ExpandMoreRounded } from '@mui/icons-material';

const PaymentHistory = () => {
  return (
    <Box>
      <DetailHeader label="결제내역" />
      <Box p={4}>
        <Accordion
          square={true}
          sx={{
            borderRadius: '10px',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 7px 1px;',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreRounded />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ paddingX: 3, paddingY: 2 }}
          >
            <Box>
              <Box display="flex" alignItems="center">
                <img src="/images/default-groomer-profile.png" width="100px" />
                <Box mx={3}>
                  <Typography fontWeight={700}>동길이네</Typography>
                  <Typography fontSize={14} mt={1}>
                    결제일: 2024-11-14
                  </Typography>
                  <Typography fontSize={14}>서비스: 목욕, 털미용 </Typography>
                  <Typography
                    fontWeight={600}
                    color="secondary.main"
                    fontSize={18}
                    mt={1}
                  >
                    33,000 원
                  </Typography>
                </Box>
                <Button
                  color="delete"
                  sx={{
                    display: 'relative',
                    top: -50,
                    right: -60,
                    borderRadius: '10px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  예약취소
                </Button>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingX: 3 }}>
            <Typography fontWeight={700} fontSize={14}>
              요청 서비스
            </Typography>
            <Box display="flex" justifyContent="space-between" ml={3} mt={1}>
              <Typography>목욕</Typography>
              <Typography>10,000 원</Typography>
            </Box>
            <Typography fontWeight={700} fontSize={14} mt={1}>
              추가비용
            </Typography>
            <Box display="flex" justifyContent="space-between" ml={3} mt={1}>
              <Typography>공격성</Typography>
              <Typography>3,000 원</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight={700} fontSize={14}>
                총 비용
              </Typography>
              <Typography fontWeight={600} color="secondary.main" fontSize={18}>
                13,000 원
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default PaymentHistory;
