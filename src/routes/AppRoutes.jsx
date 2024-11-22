import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import paths from './paths';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Notification from '@/pages/Notification';
import Contest from '@/pages/Contest';
import Chat from '@/pages/Chat';
import Mypage from '@/pages/Mypage';
import NewRequest from '@/pages/NewRequest';
import { Navbar } from '@components/Common/Navbar/Navbar';
import { Box } from '@mui/material';
import EditSocialProfile from '@/pages/EditSocialProfile';
import DogProfile from '@/pages/DogProfile';
import EditSalonProfile from '@/pages/EditSalonProfile';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <Box
      width="500px"
      m="auto"
      minHeight="100vh"
      borderLeft={1}
      borderRight={1}
      borderColor="n4.main"
    >
      <Box paddingBottom="80px">
        <Routes>
          <Route path={paths.login} element={<Login />} />

          <Route path={paths.home} element={<Home />} />
          <Route path={paths.contest} element={<Contest />} />
          <Route path={paths.notification} element={<Notification />} />
          <Route path={paths.chat} element={<Chat />} />
          <Route path={paths.mypage} element={<Mypage role="salon" />} />
          <Route path={paths.newRequest} element={<NewRequest />} />

          <Route
            path={paths.editSocialProfile}
            element={<EditSocialProfile />}
          />
          <Route path={paths.editSalonProfile} element={<EditSalonProfile />} />
          <Route path={paths.dogProfile} element={<DogProfile />} />
        </Routes>
      </Box>

      {!location.pathname.endsWith(paths.login) && (
        <Navbar page={location.pathname} />
      )}
    </Box>
  );
};

export default AppRoutes;
