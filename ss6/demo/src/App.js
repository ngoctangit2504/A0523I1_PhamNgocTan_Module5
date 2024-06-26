import logo from './logo.svg';
import './App.css';
import StudentList from "./components/student/StudentList";
import DemoState from "./components/DemoState";
import StudentListFunc from "./components/student/StudentListFunc";
import DemoStateFunc from "./components/DemoStateFunc";
import StudentCreate from "./components/student/StudentCreate";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function App() {
  let name ="A0523I1"

  const changeNameClass = (value) => {
    console.log(value)
  }
  return (
    <>
    {/*<StudentList nameClass = {name} changeNameClass = {changeNameClass}/>*/}
    {/*  <DemoState />*/}
     <BrowserRouter>
       <Routes>
         <Route path="/students" element={<StudentListFunc />}></Route>
         {/*<Route path="/students/:id" element={<StudentUpdate />}></Route>*/}
         <Route path="/students/create" element={<StudentCreate />}></Route>
       </Routes>
     </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
