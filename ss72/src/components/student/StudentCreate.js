import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as studentService from "../../services/StudentService"
import * as classroomService from "../../services/ClassroomService"
import {useDispatch} from "react-redux";
import {addNewStudentMiddleware} from "../../redux/middleware/StudentMiddleware";

function StudentCreate() {
    const navigate = useNavigate();
    const [classrooms, setClassrooms] = useState([]);
    const dispatch = useDispatch();
    const student = {
        id: "2",
        name: "",
        gender: "",
        classroom: {}
    }
    const validationStudent = {
        id: Yup.number()
            .required("Id không được để trống")
            .min(0, "Id không được nhỏ hơn 0")
            .max(2000000),
        name: Yup.string()
            .required("Name không được để trống")
            .matches(/^[a-zA-Z ]{3,100}$/, "Tên không đúng định dạng")
    }

    useEffect(() => {
        getAllClassrooms();
    }, [])
    const getAllClassrooms = async () => {
        const temp = await classroomService.getAll();
        setClassrooms(temp)
    }
    const addNewStudent = async (value) => {
        // Thêm mới dữ liệu thành công
        console.log(value)
        value.classroom = JSON.parse(value.classroom)
        value.id = +value.id;
        value.gender = +value.gender;
        dispatch(addNewStudentMiddleware(value))
        // await studentService.add(value);
        toast.success("Thêm mới thành công")
        navigate("/student")
    }
    return (
        <>
            <Formik initialValues={student} onSubmit={addNewStudent} validationSchema={Yup.object(validationStudent)}>
                <Form>
                    Id: <Field name="id"/>
                    <ErrorMessage name="id" component="span"></ErrorMessage>
                    Name: <Field name="name"/>
                    <ErrorMessage name="name" component="p"></ErrorMessage>
                    gender: <Field name="gender" required/>
                    classrooms: <Field as="select" name="classroom">
                    {
                        classrooms.map(classroom => (
                            <option value={JSON.stringify(classroom)} key={classroom.id}>{classroom.nameClass}</option>
                        ))
                    }
                </Field>
                    <button type="submit">Thêm mới</button>
                </Form>
            </Formik>

        </>
    )

}

export default StudentCreate;