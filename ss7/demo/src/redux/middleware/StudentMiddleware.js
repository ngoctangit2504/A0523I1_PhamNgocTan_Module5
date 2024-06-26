import * as studentService from "../../services/StudentService"
export const getAllByMiddleware = () =>  async (dispatch)=> {
    const students = await studentService.getAllStudent();
    dispatch({
        type: "LIST_STUDENT",
        payload: students
    })
}

export const addNewStudentByMiddleware = (student) => async (dispatch) => {
    await studentService.addNewStudent(student);
    dispatch({
        type : "ADD_STUDENT",
        payload: student
    })
}