import { useState, useEffect } from 'react';
import ChatHeader from '../modules/ChatHeader';
import ListItem from '../modules/ListItem';
import { getChatList } from '@/api/chat';
import EmptyContent from '@components/Layout/EmptyContent';
import Loading from '@components/Layout/Loading';

const Chatmain = () => {
  const [list, setList] = useState([]);
  const [sortState, setSortState] = useState('default');
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    const res = await getChatList();
    setList(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();

    const intervalId = setInterval(() => {
      fetchList();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const sortedList = [...list].sort((a, b) => {
    if (sortState === 'asc') return a.totalAmount - b.totalAmount;
    if (sortState === 'desc') return b.totalAmount - a.totalAmount;
    return 0;
  });

  if (loading) return <Loading />;

  return (
    <>
      <ChatHeader sortState={sortState} setSortState={setSortState} />
      {sortedList.length > 0 ? (
        sortedList.map((e, idx) => (
          <ListItem key={idx} data={e} fetchList={fetchList} />
        ))
      ) : (
        <EmptyContent title="채팅 내역이 없습니다." />
      )}
    </>
  );
};

export default Chatmain;
