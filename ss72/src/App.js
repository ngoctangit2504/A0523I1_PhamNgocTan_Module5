import logo from './logo.svg';
import './App.css';

import StudentList from "./components/student/StudentList";
import DemoState from "./components/DemoState";
import {useEffect, useState} from "react";
import StudentCreate from "./components/student/StudentCreate";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "./redux/Store";
import {getAllStudent} from "./redux/middleware/StudentMiddleware";

function App() {
    const [className, setClassName] = useState("")
    const dispatch = useDispatch();
    const students = useSelector(store => store.students);

    useEffect(() => {
        dispatch(getAllStudent());
    })
    const changeNameClass = (event) => {
        console.log(1)
        setClassName(event.target.value);
        console.log(className)
    }
    return (
        <>
            Tổng số học sinh hiện tại: {students.length}
            <BrowserRouter>
                <Routes>
                    <Route path="/student" element={<StudentList/>}></Route>
                    <Route path="/student/create" element={<StudentCreate/>}></Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
}

export default App;
