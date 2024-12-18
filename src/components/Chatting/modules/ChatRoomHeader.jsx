import { useLocation, useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Modal } from '@components/Common/Modal/Modal';
import Button from '@components/Common/Button/Button';
import paths from '@/routes/paths';
import useChatStore from '@/store/useChatStore';
import useUserStore from '@/store/useUserStore';
import { beautyComplete, exitChatRoom } from '@/api/chat';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { getEditEstimate } from '@/api/estimate';

const ChatRoomHeader = ({ userName }) => {
  const navigate = useNavigate();
  const { otherProfile, roomInfo } = useChatStore();
  const { role } = useUserStore();
  const location = useLocation();
  const { estimateStatus } = location.state || {};
  const isUser = role === 'ROLE_USER';
  const [isComplate, setIsComplate] = useState(null);

  useEffect(() => {
    const fetchDate = async () => {
      const res = await getEditEstimate(roomInfo?.estimateId);
      if (res.date) {
        const now = new Date();
        const reserveDate = new Date(res.date);
        setIsComplate(now > reserveDate);
      }
    };
    if (!isUser) fetchDate();
  }, [roomInfo]);

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
            color="text.main"
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
            if (await exitChatRoom(roomInfo.roomId)) navigate(paths.chat);
          }}
        />
      </Box>
      <Box
        display="flex"
        width="100%"
        gap={2}
        sx={{
          '@media (max-width: 410px)': {
            '& .MuiButton-root': {
              fontSize: '12px',
              padding: '4px 8px',
            },
          },
        }}
      >
        {isUser ? (
          <>
            <Button
              label="결제하기"
              size="medium"
              style={{ width: '100%' }}
              backgroundColor="primary"
              disabled={estimateStatus !== 'SEND'}
              onClick={() => {
                navigate(
                  paths.pay +
                    `?estimateId=${roomInfo.estimateId}&requestId=${roomInfo.estimateRequestId}`
                );
              }}
            />
            <Button
              label="견적서 보기"
              size="medium"
              style={{ width: '100%' }}
              backgroundColor="primary"
              onClick={() => {
                navigate(paths.viewEstimate, {
                  state: {
                    estimateId: roomInfo.estimateId,
                    requestId: roomInfo.estimateRequestId,
                    roomId: roomInfo.roomId,
                  },
                });
              }}
            />
            <Button
              label="리뷰 작성"
              size="medium"
              style={{ width: '100%' }}
              backgroundColor="primary"
              disabled={estimateStatus !== 'ACCEPTED'}
              onClick={() => {
                navigate(paths.newReview, {
                  state: {
                    groomerProfile: otherProfile,
                  },
                });
              }}
            />
          </>
        ) : (
          <>
            <Button
              label="견적서 수정"
              size="medium"
              style={{ width: '100%' }}
              backgroundColor="primary"
              disabled={
                estimateStatus === 'PAID' || estimateStatus === 'ACCEPTED'
              }
              onClick={() => {
                navigate(paths.editEstimate, {
                  replace: true,
                  state: {
                    estimateId: roomInfo.estimateId,
                    requestId: roomInfo.estimateRequestId,
                    roomId: roomInfo.roomId,
                  },
                });
                window.location.href = paths.editEstimate;
              }}
            />
            <Button
              label="견적서 보기"
              size="medium"
              style={{ width: '100%' }}
              backgroundColor="primary"
              onClick={() => {
                navigate(paths.viewEstimate, {
                  state: {
                    estimateId: roomInfo.estimateId,
                    requestId: roomInfo.estimateRequestId,
                    roomId: roomInfo.roomId,
                  },
                });
              }}
            />
            <Button
              label={
                estimateStatus === 'ACCEPTED' ? '미용 완료' : '미용완료하기'
              }
              size="medium"
              style={{
                width: '100%',
                padding: window.innerWidth <= 440 && '0 4px',
              }}
              backgroundColor="primary"
              disabled={estimateStatus !== 'PAID' || !isComplate}
              onClick={async () => {
                const res = await beautyComplete(roomInfo.estimateId);
                if (res) toast.success('미용이 완료 되었습니다.');
              }}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ChatRoomHeader;
