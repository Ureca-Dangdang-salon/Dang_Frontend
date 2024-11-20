import { BrowserRouter, Routes, Route } from 'react-router-dom';
import paths from './paths';

import Home from '../pages/Home';
import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.login} element={<Login />} />

        {/* Private Routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
