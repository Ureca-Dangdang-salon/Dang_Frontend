import { rejectEstimate } from '@/api/chat';
import useUserStore from '@/store/useUserStore';
import { Modal } from '@components/Common/Modal/Modal';
import { Avatar, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ListItem = ({ data, fetchList }) => {
  const navigate = useNavigate();
  const { role } = useUserStore();
  const isUser = role === 'ROLE_USER';

  return (
    <Box
      p={2}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        boxShadow: '0px 1px 5px 0px rgba(51, 51, 51, 0.08)',
        marginBottom: 4,
      }}
    >
      <Box
        gap={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
        }}
        onClick={() =>
          navigate(`${data.roomId}`, {
            state: {
              estimateStatus: data.estimateStatus,
            },
          })
        }
      >
        {isUser ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <Avatar
              src={
                data.groomerProfile.profileImageUrl ||
                '/images/default-groomer-profile.png'
              }
              sx={{
                width: 50,
                height: 50,
              }}
            />
            <Box>
              <Typography fontSize="14px" fontWeight="bold">
                {data.groomerProfile.serviceName}
              </Typography>
              <Typography fontSize="14px">
                {data.groomerProfile.address}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <Avatar
              src={
                data.customer.profileImageUrl ||
                '/images/default-groomer-profile.png'
              }
              sx={{
                width: 50,
                height: 50,
              }}
            />
            <Box>
              <Typography fontSize="14px" fontWeight="bold">
                {data.customer.customerName}
              </Typography>
            </Box>
          </Box>
        )}

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontSize="14px" mb={1}>
            {data.lastMessage}
          </Typography>
          {!!data.unreadCount && (
            <Box
              width="20px"
              height="20px"
              borderRadius="50%"
              sx={{
                backgroundColor: 'delete.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography fontSize="12px" color="white" fontWeight="bold">
                {data.unreadCount}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {isUser && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderTop="1px solid"
          borderColor="n3.main"
          pt={1}
          mt={1}
        >
          <Typography fontSize="14px" fontWeight="bold">
            견적 가격 {data.totalAmount.toLocaleString()}원
          </Typography>
          {data.estimateStatus === 'SEND' ? (
            <Modal
              buttonColor="delete"
              openModalButton="거절하기"
              secondaryButton="취소"
              primaryButton="거절"
              title="견적을 거절하시겠습니까?"
              action={async () => {
                if (await rejectEstimate(data.estimateId)) await fetchList();
              }}
            />
          ) : (
            <Box
              sx={{
                px: '8px',
                py: '6px',
                fontSize: '14px',
                color: 'secondary.main',
              }}
            >
              {data.estimateStatus === 'PAID' && '결제 완료'}
              {data.estimateStatus === 'ACCEPTED' && '미용 완료'}
              <Box color="text.main">
                {data.estimateStatus === 'REJECTED' && '거절 완료'}
                {data.estimateStatus === 'REFUND' && '결제 취소 완료'}
              </Box>
            </Box>
          )}
        </Box>
      )}
      {!isUser && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderTop="1px solid"
          borderColor="n3.main"
          pt={1}
          mt={1}
        >
          <Box />
          <Box
            sx={{
              px: '8px',
              py: '6px',
              fontSize: '14px',
              color: 'secondary.main',
            }}
          >
            {data.estimateStatus === 'SEND' && '대기중'}
            {data.estimateStatus === 'PAID' && '결제됨'}
            {data.estimateStatus === 'ACCEPTED' && '미용 완료'}
            <Box color="text.main">
              {data.estimateStatus === 'REJECTED' && '거절됨'}
              {data.estimateStatus === 'REFUND' && '결제 취소됨'}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ListItem;
