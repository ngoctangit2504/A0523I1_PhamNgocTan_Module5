import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as customerService from "../../services/CustomerService"
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS từ Bootstrap


function CustomerCreate() {
    const [isSubmit, setSubmit] = useState(false)
    const navigate = useNavigate();
    const [customer, setCustomer] =useState()

    const validateCustomer = {
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
        setCustomer({
            id: "",
            name: "",
            dateOfBirth: "",
            gender:"",
            CMND:"",
            phone:"",
            email:"",
            address: ""
        })
    }, [])

    const createCustomer = async (values) => {
        setSubmit(true);
        console.log(values);
        // Call DB để thêm mới
        setSubmit(false);
        const isSuccess = await customerService.addNewCustomer(values)
        toast.success("Thêm mới thành công")
        navigate("/customers")
    }
    if(!customer) {
        return null;
    }

    return(
        <>
            <Formik initialValues={customer} onSubmit={createCustomer}
                    validationSchema={Yup.object(validateCustomer)}>
                <Form>
                    <table className="table table-hover">
                        <tr>
                            <th scope="row">Id</th>
                            <td><Field name="id"/></td>
                            <td><ErrorMessage name="id" component="p"></ErrorMessage></td>
                        </tr>
                        <tr>
                            <th scope="row">Name</th>
                            <td><Field name="name"/></td>
                            <td><ErrorMessage name="name" component="p"></ErrorMessage></td>
                        </tr>
                        <tr>
                            <th scope="row">Ngay Sinh</th>
                            <td><Field name="dateOfBirth"/></td>
                            <td><ErrorMessage name="dateOfBirth" component="p"></ErrorMessage></td>
                        </tr>
                        <tr>
                            <th scope="row">Gioi Tinh</th>
                            <td><Field name="gender"/></td>
                            <td><ErrorMessage name="gender" component="p"></ErrorMessage></td>
                        </tr>
                        <tr>
                            <th scope="row">CMND</th>
                            <td><Field name="CMND"/></td>
                            <td><ErrorMessage name="CMND" component="p"></ErrorMessage></td>
                        </tr>
                        <tr>
                            <th scope="row">Phone</th>
                            <td><Field name="phone"/></td>
                            <td><ErrorMessage name="phone" component="p"></ErrorMessage></td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td><Field name="email"/></td>
                            <td><ErrorMessage name="email" component="p"></ErrorMessage></td>
                        </tr>
                        <tr>
                            <th scope="row">Dia Chi</th>
                            <td><Field name="address"/></td>
                            <td><ErrorMessage name="address" component="p"></ErrorMessage></td>
                        </tr>
                        <button disabled={isSubmit} type="submit">Thêm mới</button>
                    </table>

                </Form>
            </Formik>
        </>
    )
}

export default CustomerCreate;