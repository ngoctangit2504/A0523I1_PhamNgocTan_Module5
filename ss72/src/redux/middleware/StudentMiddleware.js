import * as studentService from "../../services/StudentService"
export const getAllStudent = () => async (dispatch) => {
    const res = await studentService.getAll();
    dispatch({
        type: "LIST_STUDENT",
        payload: res
    })
}

export const addNewStudentMiddleware = (student) => async (dispatch) => {
    await studentService.add(student);
    dispatch({
        type: "ADD_STUDENT",
        payload: student
    })
}