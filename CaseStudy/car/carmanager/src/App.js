import React from 'react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './path/to/your/store'; // Import your Redux store
import './App.css';
import CarList from "./components/car/CarList";
import DemoState from "./components/DemoState";
import { useEffect, useState } from "react";
import CarCreate from "./components/car/CarCreate";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {getAllCar} from "./redux/middleware/CarMiddleware";

function App() {
    const [typeName, setTypeName] = useState("");
    const dispatch = useDispatch();
    const cars = useSelector(store => store.cars);

    useEffect(() => {
        dispatch(getAllCar());
    }, []); // Add an empty dependency array to useEffect to ensure it runs only once

    const changeNameType = (event) => {
        console.log(1);
        setTypeName(event.target.value);
        console.log(typeName);
    }

    return (
        <Provider store={store}> {/* Wrap your App component in Provider and provide your Redux store */}
            <>
                Tổng số car hiện tại: {cars.length}
                <BrowserRouter>
                    <Routes>
                        <Route path="/car" element={<CarList/>}></Route>
                        <Route path="/car/create" element={<CarCreate/>}></Route>
                    </Routes>
                </BrowserRouter>
                <ToastContainer/>
            </>
        </Provider>
    );
}

export default App;