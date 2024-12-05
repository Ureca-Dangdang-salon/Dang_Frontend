import ChatHeader from '../modules/ChatHeader';
import ListItem from '../modules/ListItem';

const Chatmain = () => {
  const list = [
    {
      roomId: 8,
      groomerProfile: {
        groomerProfileId: 1,
        address: '서울특별시 성동구',
        serviceName: '댕댕미용',
        profileImageUrl: 'image.url',
      },
      lastMessage: '안녕하세요 얼마든지 문의주세요',
      unreadCount: 3,
      totalAmount: 80000,
    },
    {
      roomId: 18,
      groomerProfile: {
        groomerProfileId: 2,
        address: '서울특별시 성동구',
        serviceName: '댕댕미용2',
        profileImageUrl: 'image.url',
      },
      lastMessage: '안녕하세요 얼마든지 문의주세요2',
      unreadCount: 10,
      totalAmount: 50000,
    },
  ];
  return (
    <>
      <ChatHeader />
      {list.map((e, idx) => (
        <ListItem key={idx} content={e} />
      ))}
    </>
  );
};

export default Chatmain;
