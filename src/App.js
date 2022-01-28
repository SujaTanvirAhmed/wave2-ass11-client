import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllContextProvider from './context/AllContextProvider';
import Header from './pages/commons/header/Header';
import Footer from './pages/commons/footer/Footer';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ManageAllOrders from './pages/manage-all-orders/ManageAllOrders';
import AddNewService from './pages/add-new-service/AddNewService';
import MyOrders from './pages/my-orders/MyOrders';
import BookService from './pages/book-service/BookService';
import NotFound from './pages/notfound/NotFound';
import ProtectedRoute from './manage-routes/ProtectedRoute';
import ReAuthPreventRoute from './manage-routes/ReAuthPreventRoute';
import './App.css';

export default function App() {

  return (
    <div className="App">
      <AllContextProvider>
        <BrowserRouter>

          <Header />

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/manage-all-orders" element={
              <ManageAllOrders />
            } />

            <Route path="/add-new-service" element={
              <AddNewService />
            } />

            <Route path="/my-orders" element={
              <ProtectedRoute path="/my-orders">
                <MyOrders />
              </ProtectedRoute>
            } />

            <Route path="/login" element={
              <ReAuthPreventRoute>
                <Login />
              </ReAuthPreventRoute>
            } />

            <Route path="/register" element={
              <ReAuthPreventRoute>
                <Register />
              </ReAuthPreventRoute>
            } />

            {/* <Route path="/book-service" element={
              <ProtectedRoute path="/book-service">
                <BookService />
              </ProtectedRoute>}
            /> */}

            <Route path="/book-service" element={<BookService />} />

            <Route path="*" element={
              <NotFound />
            } />

          </Routes>

          <Footer />

        </BrowserRouter>
      </AllContextProvider>
    </div>
  );
}