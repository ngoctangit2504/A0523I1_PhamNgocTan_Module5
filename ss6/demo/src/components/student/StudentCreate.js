import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as studentService from "../../services/StudentService"

function StudentCreate() {
    const [isSubmit, setSubmit] = useState(false)
    const navigate = useNavigate();
    const [student, setStudent] =useState()

    const validateStudent = {
        id: Yup.number().min(0, "Id không được nh hơn 0")
            .max(10000000000, "Id không được lớn hơn 10000000000")
            .required("Id không ược để trống"),
        name: Yup.string().min(5, "Tên không được nhỏ hơn 5 ký tự")
            .max(100, "Tên không đươc lớn hơn 100 ký tự")
            .matches(/^[a-zA-Z ]{5,100}$/, "Tên không đúng định dạng")
    }

    useEffect(() => {
    //     Call DB để lấy duex liệu ban đầu cho chức năng update
    //     useParam để lấy id
    //   const student = await studentService.findById(id);
        setStudent({
            id: "",
            name: "",
            address: ""
        })
    }, [])

    const createStudent = async (values) => {
        setSubmit(true);
        console.log(values);
        // Call DB để thêm mới
        setSubmit(false);
        const isSuccess = await studentService.addNewStudent(values)
        toast.success("Thêm mới thành công")
        navigate("/students")
    }
    if(!student) {
        return null;
    }

    return(
        <>
            <Formik initialValues={student} onSubmit={createStudent}
            validationSchema={Yup.object(validateStudent)}>
                <Form>
                    Id: <Field name="id"/><br></br>
                    <ErrorMessage name="id" component="p"></ErrorMessage>
                    Name: <Field name="name"/><br></br>
                    <ErrorMessage name="name" component="p"></ErrorMessage>
                    Address: <Field name="address"/><br></br>
                    <button disabled={isSubmit} type="submit">Thêm mới</button>
                </Form>
            </Formik>
        </>
    )
}

export default StudentCreate;