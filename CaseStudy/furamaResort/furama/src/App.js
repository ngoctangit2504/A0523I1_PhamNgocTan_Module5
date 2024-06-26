import './App.css';
import CustomerList from "./components/customer/CustomerList";
import CustomerCreate from "./components/customer/CustomerCreate";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import MyHeader from "./components/header/Header";
import Footer from "./components/footer/Footer";


function App() {

  return (
    <>
        <div>
            <MyHeader></MyHeader>
            <BrowserRouter>
                <Routes>
                    <Route path="/customers" element={<CustomerList/>}></Route>
                    <Route path="/customers/create" element={<CustomerCreate />}></Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </div>
        </>
  );
}

export default App;
