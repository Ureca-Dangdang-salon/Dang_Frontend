import { Box } from '@mui/material';
import ChatRoomHeader from '@components/Chatting/modules/ChatRoomHeader';
import ChatNavbar from '@components/Chatting/modules/ChatNavbar';
import ChatRoomMain from '@components/Chatting/templates/ChatRoomMain';
import { useEffect, useState, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import useUserStore from '@/store/useUserStore';
import { enterChatRoom, fetchChatMessages } from '@/api/chat';
import useChatStore from '@/store/useChatStore';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  const Url = import.meta.env.VITE_SOCKET_URL;
  const { role, userId } = useUserStore();
  const { otherProfile, setOtherProfile, setRoomInfo } = useChatStore();
  const { id } = useParams();
  const [roomId, setRoomId] = useState(null);
  const stompClient = useRef(null);
  const [messageData, setMessageData] = useState([]);
  const scrollRef = useRef();
  const [hasMorePrevious, setHasMorePrevious] = useState(true);
  const [shouldScrollBottom, setShouldScrollBottom] = useState(true);

  useEffect(() => {
    if (id) setRoomId(id);
    connect();
    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
        console.log('Disconnected');
      }
    };
  }, [roomId]);

  const connect = async () => {
    const socket = new SockJS(Url, null, {
      withCredentials: true,
    });
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      {},
      async () => {
        stompClient.current.subscribe(`/sub/chat/${roomId}`, (message) => {
          const chatMessage = JSON.parse(message.body);
          setMessageData((prev) => [...prev, chatMessage]);
        });
        await enter();
      },
      (error) => {
        console.error('STOMP connection failed:', error);
      }
    );
  };

  const sendMessage = (content, image) => {
    if (stompClient.current && stompClient.current.connected) {
      const message = {
        roomId: roomId,
        senderId: userId,
        senderRole: role,
        messageText: content,
        sendAt: new Date().toISOString(),
        imageUrl: image,
      };
      stompClient.current.send(
        `/pub/chat/send/${roomId}`,
        {},
        JSON.stringify(message)
      );
    } else {
      console.error('STOMP client is not connected');
    }
  };

  const enter = async () => {
    const res = await enterChatRoom(roomId);
    if (role === 'ROLE_USER') setOtherProfile(res.groomerProfile);
    if (role === 'ROLE_SALON') setOtherProfile(res.customer);

    setRoomInfo({
      roomId: res.roomId,
      estimateId: res.estimateId,
      estimateRequestId: res.estimateRequestId,
    });
    setMessageData(res.recentMessages);
    await chatFetch();
  };

  const chatFetch = async () => {
    const res = await fetchChatMessages(roomId);
    setMessageData((prev) => [...res, ...prev]);
    if (res?.length < 5) setHasMorePrevious(false);
    return res;
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop < 10 && hasMorePrevious) {
      chatFetch().then((e) => {
        if (hasMorePrevious && e.length > 4)
          document.documentElement.scrollTop = 502;
      });
      setShouldScrollBottom(false);
    } else if (scrollTop + clientHeight >= scrollHeight - 10) {
      setShouldScrollBottom(true);
    }
  }, [chatFetch, hasMorePrevious]);

  useEffect(() => {
    let timer;
    const debouncedScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => handleScroll(), 10);
    };

    window.addEventListener('scroll', debouncedScroll);
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      if (timer) clearTimeout(timer);
    };
  }, [handleScroll]);

  const scrollBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (shouldScrollBottom) {
      scrollBottom();
    }
  }, [messageData, shouldScrollBottom]);

  return (
    <Box>
      <ChatRoomHeader
        userName={otherProfile?.customerName || otherProfile?.serviceName}
      />
      <Box
        p={4}
        py={3}
        sx={{
          backgroundColor: '#F8F9FB',
          minHeight: 'calc(100vh - 224px)',
          overflowY: 'auto',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <ChatRoomMain messageData={messageData} role={role} />
        </Box>
        <div ref={scrollRef} />
      </Box>
      <ChatNavbar onSend={sendMessage} />
    </Box>
  );
};

export default ChatRoom;
