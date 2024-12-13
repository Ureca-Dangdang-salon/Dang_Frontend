import { useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Modal } from '@components/Common/Modal/Modal';
import Button from '@components/Common/Button/Button';
import paths from '@/routes/paths';
import useChatStore from '@/store/useChatStore';
import useUserStore from '@/store/useUserStore';
import { exitChatRoom } from '@/api/chat';

const ChatRoomHeader = ({ userName, roomId }) => {
  const navigate = useNavigate();
  const { otherProfile, roomInfo } = useChatStore();
  const { role } = useUserStore();
  const isUser = role === 'ROLE_USER';

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'white.main',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        pb: 2,
        boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={() => navigate(paths.chat)}>
            <ArrowBackRoundedIcon color="n2" />
          </IconButton>
          <Box
            color="text"
            display="flex"
            alignItems="center"
            sx={{
              cursor: role === 'ROLE_USER' && 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
            onClick={() => {
              if (role === 'ROLE_USER') {
                navigate(
                  paths.salonProfile.replace(
                    ':id',
                    otherProfile.groomerProfileId
                  )
                );
              }
            }}
          >
            {userName}
            {isUser && (
              <ArrowForwardIosRoundedIcon
                color="n2"
                sx={{ fontSize: '20px' }}
              />
            )}
          </Box>
        </Box>
        <Modal
          buttonColor="delete"
          openModalButton="채팅방 나가기"
          secondaryButton="취소"
          primaryButton="나가기"
          title="채팅방을 나가시겠습니까?"
          action={async () => {
            if (await exitChatRoom(roomId)) navigate(paths.chat);
          }}
        />
      </Box>
      <Box display="flex" width="100%" justifyContent="space-between" gap={2}>
        {isUser ? (
          <>
            <Button
              label="결제하기"
              size="medium"
              style={{ width: '100%' }}
              backgroundColor="primary"
            />
            <Button
              label="견적 요청서 보기"
              size="medium"
              style={{ width: '100%', padding: '0 12px' }}
              backgroundColor="primary"
            />
            <Button
              label="리뷰 작성"
              size="medium"
              style={{ width: '100%' }}
              backgroundColor="n3"
            />
          </>
        ) : (
          <>
            <Button
              label="견적서 수정"
              size="medium"
              style={{ width: '100%' }}
              backgroundColor="primary"
              onClick={() => {
                navigate(paths.editEstimate, {
                  replace: true,
                  state: {
                    estimateId: roomInfo.estimateId,
                    requestId: roomInfo.estimateRequestId,
                  },
                });
                window.location.href = paths.editEstimate;
              }}
            />
            <Button
              label="견적 요청서 보기"
              size="medium"
              style={{ width: '100%', padding: '0 12px' }}
              backgroundColor="primary"
            />
            <Button
              label="미용 완료"
              size="medium"
              style={{ width: '100%' }}
              backgroundColor="n3"
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ChatRoomHeader;
