import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import PaymentPage from './Pages/PaymentPage';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} /> {/* Định tuyến cho trang login */}
          <Route path="/" element={<LoginPage />} />  {/* Định tuyến cho trang chủ (/) */}
          <Route path='/dashboard' element={<PaymentPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
