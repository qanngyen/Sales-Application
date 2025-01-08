// import './App.css';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import LoginPage from './Pages/LoginPage';
// import SideBar from './Component/SideBar';
// import PaymentPage from './Pages/PaymentPage';
// import PurchasePage from './Pages/PurchasePage';



// function App() {
//   const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại
//   return (
//     <Router>
//       <div className="App">
//         {location.pathname !== '/login' && <SideBar className="sideBarComponent" />}
//         <SideBar className='sideBarComponent'></SideBar>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} /> {/* Định tuyến cho trang login */}
//           <Route path="/" element={<LoginPage />} />  {/* Định tuyến cho trang chủ (/) */}
//           <Route path='/dashboard' element={<PaymentPage/>}/>
//           <Route path="/sales" element={<PaymentPage />} />
//           <Route path="/import" element={<PurchasePage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SideBar from './Component/SideBar';
import PaymentPage from './Pages/PaymentPage';
import PurchasePage from './Pages/PurchasePage';
import SalesInvoices from './Pages/SalesInvoicesPage';
import PurchaseInvoices from './Pages/PurchaseInvoicesPage';

const AppContent = () => {
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

  return (
    <div className="App">
      {/* Ẩn Sidebar nếu đường dẫn là '/login' */}
      {location.pathname !== '/login' && location.pathname !== '/' &&  <SideBar className="sideBarComponent" />}

      <Routes>
        <Route path="/login"  element={<LoginPage />} /> {/* Định tuyến cho trang login */}
        <Route path="/" element={<LoginPage />} />  {/* Định tuyến cho trang chủ (/) */}
        <Route path="/dashboard" element={<PaymentPage />} />
        <Route path="/sales" element={<PaymentPage />} />
        <Route path="/import" element={<PurchasePage />} />
        <Route path="/sales-invoice" element={<SalesInvoices />} />
        <Route path="/import-invoice" element={<PurchaseInvoices />} />

      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
