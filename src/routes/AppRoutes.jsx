import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { Navbar } from '@components/Common/Navbar/Navbar';
import paths from '@/routes/paths';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Survey from '../pages/Survey/Survey';
import Coupon from '@/pages/Coupon';
import SurveyGroomer from '@/pages/Survey/SurveyGroomer';
import SurveyUser from '@/pages/Survey/SurveyUser';
import Notification from '@/pages/Notification';
import Contest from '@/pages/Contest/Contest';
import Entry from '@/pages/Contest/ContestEntry';
import Chat from '@/pages/chat/Chat';
import ChatRoom from '@/pages/chat/ChatRoom';
import MyRequest from '@/pages/chat/MyRequest';
import Mypage from '@/pages/mypage/Mypage';
import NewRequest from '@/pages/NewRequest';
import EditSocialProfile from '@/pages/mypage/EditSocialProfile';
import DogProfile from '@/pages/mypage/DogProfile';
import EditSalonProfile from '@/pages/mypage/EditSalonProfile';
import PaymentHistory from '@/pages/mypage/PaymentHistory';
import SalonProfile from '@/pages/SalonProfile';
import NewReview from '@/pages/NewReview';
import MyCoupons from '@/pages/mypage/MyCoupons';
import MyReviews from '@/pages/mypage/MyReviews';
import EditEstimate from '@/pages/estimate/EditEstimate';
import NewEstimate from '@/pages/estimate/NewEstimate';
import RequestHistory from '@/pages/mypage/RequestHistory';
import RequestHistoryDetail from '@/pages/mypage/RequestHistoryDetail';
import ContestResult from '@/pages/Contest/ContestResult';
import MyRequestDetail from '@/pages/chat/MyRequestDetail';
import NotFound from '@components/Layout/NotFound';
import PrivateRoute from './PrivateRoute';
import AddDogProfile from '@/pages/Survey/AddDogProfile';
import AddSalonProfile from '@/pages/Survey/AddSalonProfile';
import EditReview from '@/pages/mypage/EditReview';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const location = useLocation();
  const role = 'salon'; //TODO: remove

  return (
    <Box
      width="500px"
      minHeight="100vh"
      m="auto"
      borderColor="n4.main"
      sx={{
        boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box paddingBottom="80px" height="100%">
        <Routes>
          <Route path={paths.login} element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="*" element={<NotFound />} />
            <Route path={paths.survey.root} element={<Survey />} />
            <Route path={paths.survey.groomer} element={<SurveyGroomer />} />
            <Route path={paths.survey.user} element={<SurveyUser />} />
            <Route path={paths.home} element={<Home />} />
            <Route path={paths.contest} element={<Contest />} />
            <Route path={paths.entry} element={<Entry />} />
            <Route path={paths.coupon} element={<Coupon />} />
            <Route path={paths.notification} element={<Notification />} />
            <Route path={paths.chat} element={<Chat role={role} />} />
            <Route path={paths.chatRoom} element={<ChatRoom role={role} />} />
            <Route path={paths.myRequest} element={<MyRequest />} />
            <Route path={paths.myRequestDetail} element={<MyRequestDetail />} />
            <Route path={paths.mypage} element={<Mypage />} />
            <Route path={paths.newRequest} element={<NewRequest />} />
            <Route path={paths.newReview} element={<NewReview />} />
            <Route path={paths.editReview} element={<EditReview />} />
            <Route path={paths.estimate} element={<NewEstimate />} />
            <Route path={paths.editEstimate} element={<EditEstimate />} />
            <Route path={paths.contestResult} element={<ContestResult />} />

            <Route
              path={paths.editSocialProfile}
              element={<EditSocialProfile />}
            />
            <Route
              path={paths.editSalonProfile}
              element={<EditSalonProfile />}
            />
            <Route path={paths.editDogProfile} element={<DogProfile />} />
            <Route path={paths.survey.dogProfile} element={<AddDogProfile />} />
            <Route path={paths.salonProfile} element={<SalonProfile />} />
            <Route
              path={paths.survey.groomerProfile}
              element={<AddSalonProfile />}
            />
            <Route path={paths.paymentHistory} element={<PaymentHistory />} />
            <Route path={paths.myCoupons} element={<MyCoupons />} />
            <Route path={paths.myReviews} element={<MyReviews />} />
            <Route path={paths.requestHistory} element={<RequestHistory />} />
            <Route
              path={paths.requestHistoryDetail}
              element={<RequestHistoryDetail />}
            />
          </Route>
        </Routes>
      </Box>

      {location.pathname !== paths.login &&
        location.pathname !== paths.survey.root &&
        location.pathname !== paths.survey.groomer &&
        location.pathname !== paths.survey.user &&
        !/^\/chat\/\d+$/.test(location.pathname) && (
          <Navbar page={location.pathname} />
        )}
    </Box>
  );
};

export default AppRoutes;
