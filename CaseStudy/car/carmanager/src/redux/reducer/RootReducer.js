import {combineReducers} from "redux";
import carReducer from "./CarReducer";

export const rootReducer = combineReducers({
    cars: carReducer,
    // classrooms: classroomReducer
})