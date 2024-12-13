import { useState, useEffect } from 'react';
import ChatHeader from '../modules/ChatHeader';
import ListItem from '../modules/ListItem';
import { getChatList } from '@/api/chat';

const Chatmain = () => {
  const [list, setList] = useState([]);
  const [order, setOrder] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      const res = await getChatList();
      setList(res);
    };
    fetchList();
  }, []);

  const sortedList = [...list].sort((a, b) =>
    order ? a.totalAmount - b.totalAmount : b.totalAmount - a.totalAmount
  );

  return (
    <>
      <ChatHeader order={order} setOrder={setOrder} />
      {sortedList.map((e, idx) => (
        <ListItem key={idx} data={e} setList={setList} />
      ))}
    </>
  );
};

export default Chatmain;
