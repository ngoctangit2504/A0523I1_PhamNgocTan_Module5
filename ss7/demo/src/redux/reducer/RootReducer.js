import {combineReducers} from "redux";
import studentReducer from "./StudentReducer";

const rootReducer = combineReducers({
    students: studentReducer
    // classrooms: classroomReducer,
    // username: usernameReducer
})

export default rootReducer;