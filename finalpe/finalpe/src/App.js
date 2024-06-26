import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CarList from './component/CarList';
import Header from './component/header';
import 'bootstrap/dist/css/bootstrap.css';
import CarCreate from './component/CarCreate';
import CarEdit from "./component/EditCar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from "react-paginate";



function App() {
  return (
      <>
        <Header></Header>
        <BrowserRouter>
          <Routes>
            <Route path="/cars" element={<CarList />}></Route>
            <Route path="/cars/create" element={<CarCreate />}></Route>
            <Route path='/cars/edit/:id'  element={<CarEdit />}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </>
  );
}

export default App;
