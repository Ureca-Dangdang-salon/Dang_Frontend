import { getChatList, rejectEstimate } from '@/api/chat';
import useUserStore from '@/store/useUserStore';
import { Modal } from '@components/Common/Modal/Modal';
import { Avatar, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ListItem = ({ data, setList }) => {
  const navigate = useNavigate();
  const { role } = useUserStore();

  return (
    <Box
      p={2}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        boxShadow: '0px 1px 5px 0px rgba(51, 51, 51, 0.08)',
        marginBottom: 2,
      }}
    >
      <Box
        gap={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
        }}
        onClick={() => navigate(`${data.roomId}`)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Avatar
            src="/images/default-groomer-profile.png"
            sx={{
              width: 64,
              height: 64,
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
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontSize="14px">{data.lastMessage}</Typography>
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

      {role === 'ROLE_USER' && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderTop="1px solid"
          borderColor="n3.main"
          pt={2}
          mt={2}
        >
          <Typography fontSize="14px" fontWeight="bold">
            견적 가격 {data.totalAmount.toLocaleString()}원
          </Typography>
          {data.estimateStatus === 'SEND' && (
            <Modal
              buttonColor="delete"
              openModalButton="거절하기"
              secondaryButton="취소"
              primaryButton="거절"
              title="견적을 거절하시겠습니까?"
              action={async () => {
                if (await rejectEstimate(data.estimateId)) {
                  const res = await getChatList();
                  setList(res);
                }
              }}
            />
          )}
          {data.estimateStatus === 'ACCEPTED' && (
            <Typography
              variant="body2"
              color="secondary"
              sx={{ px: '8px', py: '6px' }}
            >
              결제완료
            </Typography>
          )}
          {data.estimateStatus === 'REJECTED' && (
            <Typography
              variant="body2"
              color="delete"
              sx={{ px: '8px', py: '6px' }}
            >
              거절됨
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ListItem;
