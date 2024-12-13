import { useState, useEffect } from 'react';
import ChatHeader from '../modules/ChatHeader';
import ListItem from '../modules/ListItem';
import { getChatList } from '@/api/chat';

const Chatmain = () => {
  const [list, setList] = useState();

  useEffect(() => {
    const fetchList = async () => {
      const res = await getChatList();
      setList(res);
    };
    fetchList();
  }, []);

  return (
    <>
      <ChatHeader />
      {list?.map((e, idx) => (
        <ListItem key={idx} data={e} setList={setList} />
      ))}
    </>
  );
};

export default Chatmain;
