import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import Gallery from './components/Gallery/Gallery';
import Contacts from './components/Contacts/Contacts';
import Services from './components/Services/Services';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Crm from './components/CRM/Crm';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login/>} />
        <Route path="/crm" element={<Crm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
