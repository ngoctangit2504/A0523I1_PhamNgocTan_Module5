import {combineReducers} from "redux";
import studentReducer from "./StudentReducer";

export const rootReducer = combineReducers({
    students: studentReducer,
    // classrooms: classroomReducer
})
