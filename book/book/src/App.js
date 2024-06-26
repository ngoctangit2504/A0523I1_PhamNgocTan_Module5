import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BookList from './component/bookList';
import Header from './component/header';
import 'bootstrap/dist/css/bootstrap.css';
import BookCreate from './component/bookCreate';
import BookEdit from './component/editBook';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from "react-paginate";


function App() {
  return (
      <>
        <Header></Header>
        <BrowserRouter>
          <Routes>
            <Route path="/books" element={<BookList />}></Route>
            <Route path="/books/create" element={<BookCreate />}></Route>
            <Route path='/books/edit/:id'  element={<BookEdit />}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </>
  );
}

export default App;
