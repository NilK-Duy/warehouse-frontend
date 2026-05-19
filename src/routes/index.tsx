import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import CreateReceiptPage from '../pages/receipts/CreateReceiptPage';
import ReceiptDetailPage from '../pages/receipts/ReceiptDetailPage';
import ReceiptListPage from '../pages/receipts/ReceiptListPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path='/'
            element={<ReceiptListPage />}
          />

          <Route
            path='/create'
            element={<CreateReceiptPage />}
          />

          <Route
            path='/receipts/:id'
            element={<ReceiptDetailPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
