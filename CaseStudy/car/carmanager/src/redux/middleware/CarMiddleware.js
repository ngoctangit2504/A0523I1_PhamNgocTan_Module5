import * as carService from "../../services/CarService"

export const getAllCar = () => async (dispatch) => {
    const res = await carService.getAll();
    dispatch({
        type: "LIST_CAR",
        payload: res
    })
}

export const addNewCarMiddleware = (car) => async (dispatch) => {
    await carService.add(car);
    dispatch({
        type: "ADD_CAR",
        payload: car
    })
}