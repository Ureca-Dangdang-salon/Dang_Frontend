import {
  Accordion,
  Box,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
} from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { ExpandMoreRounded } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { cancelPay, getPayments } from '@/api/payment';
import { Modal } from '@components/Common/Modal/Modal';
import EmptyContent from '@components/Layout/EmptyContent';
import InputText from '@components/Common/InputText/InputText';
import toast from 'react-hot-toast';
import Loading from '@components/Layout/Loading';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelReason, setCancelReason] = useState('');

  const getPaymentHistory = async () => {
    const res = await getPayments();
    setPayments(res);
    setServiceList([
      ...new Set(
        res.flatMap((payment) =>
          payment.dogProfileList.flatMap((dogProfile) =>
            dogProfile.servicePriceList.map((service) => service.description)
          )
        )
      ),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    getPaymentHistory();
  }, []);

  const handelCancel = async (paymentKey, reason, couponId) => {
    if (cancelReason.trim() === '')
      return toast.error(`취소 사유를 입력해주세요.`);
    const res = await cancelPay(paymentKey, reason, couponId);
    if (res) {
      setCancelReason('');
      getPaymentHistory();
      toast.success('취소되었습니다.');
    }
  };

  if (loading) return <Loading />;

  return (
    <Box>
      <DetailHeader label="결제 내역" />
      {!payments.length ? (
        <EmptyContent title="결제한 내역이 없습니다" />
      ) : (
        <Box p={4}>
          {payments.map((payment, index) => (
            <Accordion
              key={index}
              square={true}
              disableGutters
              elevation={0}
              sx={{
                borderRadius: '10px',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 7px 1px;',
                mb: 4,
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreRounded />}
                aria-controls="panel1-content"
                sx={{ paddingX: 3, paddingY: 2 }}
              >
                <Box>
                  <Box display="flex" alignItems="center">
                    <img
                      src={
                        payment?.groomerImage ||
                        '/images/default-groomer-profile.png'
                      }
                      width="100px"
                      style={{ borderRadius: '50%' }}
                    />
                    <Box mx={3}>
                      <Typography fontWeight={700}>
                        {payment?.groomerName}
                      </Typography>
                      <Typography fontSize={14} mt={1}>
                        결제일: {payment?.paymentDate?.substring(0, 10)}
                      </Typography>
                      <Typography fontSize={14}>
                        예약일: {payment?.reservationDate?.substring(0, 10)}
                      </Typography>
                      <Typography fontSize={14}>
                        서비스:{' '}
                        {serviceList?.map((service, index) => (
                          <React.Fragment key={index}>
                            {service}
                            {index < serviceList?.length - 1 && ', '}
                          </React.Fragment>
                        ))}
                      </Typography>
                      <Typography
                        fontWeight={600}
                        color="secondary.main"
                        fontSize={18}
                        mt={1}
                      >
                        {payment?.totalAmount.toLocaleString()} 원
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        display: 'flex',
                        zIndex: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {payment.estimateStatus === 'PAID' ? (
                        <Modal
                          title="예약을 정말 취소하시겠습니까?"
                          secondaryButton="뒤로"
                          primaryButton="예약 취소"
                          openModalButton="예약 취소"
                          buttonColor="delete"
                          action={() =>
                            handelCancel(
                              payment.paymentKey,
                              cancelReason,
                              payment.couponId
                            )
                          }
                          onClose={() => setCancelReason('')}
                        >
                          <Box sx={{ px: 3, pb: 1, textAlign: 'center' }}>
                            <InputText
                              placeholder="취소 사유를 입력해주세요."
                              value={cancelReason}
                              onChange={(e) => setCancelReason(e.target.value)}
                            />
                          </Box>
                        </Modal>
                      ) : (
                        <Box fontSize={14} py="6px" px="8px">
                          {payment.status === 'CANCELED' && '결제 취소'}
                          {payment.estimateStatus === 'ACCEPTED' && '미용 완료'}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ paddingX: 4 }}>
                {payment?.dogProfileList.map((dog, index) => (
                  <Box key={dog.dogName}>
                    <Typography fontWeight={700} fontSize={14}>
                      {index + 1}. {dog.dogName}
                    </Typography>
                    <Typography fontWeight={700} fontSize={14} mt={1}>
                      요청 서비스
                    </Typography>

                    {dog?.servicePriceList.map((service) => (
                      <Box
                        key={service.serviceId}
                        display="flex"
                        justifyContent="space-between"
                        ml={3}
                        mt={1}
                      >
                        <Typography>{service?.description}</Typography>
                        <Typography>
                          {service?.price.toLocaleString()} 원
                        </Typography>
                      </Box>
                    ))}

                    <Typography fontWeight={700} fontSize={14} mt={1}>
                      추가비용
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      ml={3}
                      mt={1}
                    >
                      <Typography>공격성</Typography>
                      <Typography>
                        {dog?.aggressionCharge.toLocaleString()} 원
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      ml={3}
                      mt={1}
                    >
                      <Typography>질병</Typography>
                      <Typography>
                        {dog?.healthIssueCharge.toLocaleString()} 원
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight={700} fontSize={14}>
                    총 비용
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="secondary.main"
                    fontSize={18}
                  >
                    {payment?.totalAmount.toLocaleString()} 원
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PaymentHistory;
