import { BrowserRouter, Routes, Route } from 'react-router-dom';
import paths from './paths';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Notification from '@/pages/Notification';
import Contest from '@/pages/Contest';
import Chat from '@/pages/Chat';
import Mypage from '@/pages/Mypage';
import NewRequest from '@/pages/NewRequest';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.contest} element={<Contest />} />
        <Route path={paths.notification} element={<Notification />} />
        <Route path={paths.chat} element={<Chat />} />
        <Route path={paths.mypage} element={<Mypage />} />
        <Route path={paths.newRequest} element={<NewRequest />} />

        {/* Private Routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
