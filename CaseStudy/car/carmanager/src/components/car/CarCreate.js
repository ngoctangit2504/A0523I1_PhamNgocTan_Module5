import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as carService from "../../services/CarService"
import * as typeService from "../../services/TypeService"
import {useDispatch} from "react-redux";
import {addNewCarMiddleware} from "../../redux/middleware/CarMiddleware";
import {type} from "@testing-library/user-event/dist/type";

function StudentCreate() {
    const navigate = useNavigate();
    const [types, setTypes] = useState([]);
    const dispatch = useDispatch();
    const car = {
        id: "2",
        name: "",
        oil: "",
        type: {}
    }
    const validationCar = {
        id: Yup.number()
            .required("Id không được để trống")
            .min(0, "Id không được nhỏ hơn 0")
            .max(2000000),
        name: Yup.string()
            .required("Name không được để trống")
            .matches(/^[a-zA-Z ]{3,100}$/, "Tên không đúng định dạng")
    }

    useEffect(() => {
        getAllTypes();
    }, [])
    const getAllTypes = async () => {
        const temp = await typeService.getAll();
        setTypes(temp)
    }
    const addNewCar = async (value) => {
        // Thêm mới dữ liệu thành công
        console.log(value)
        value.type = JSON.parse(value.type)
        value.id = +value.id;
        value.oil = +value.oil;
        dispatch(addNewCarMiddleware(value))
        toast.success("Thêm mới thành công")
        navigate("/car")
    }
    return (
        <>
            <Formik initialValues={car} onSubmit={addNewCar} validationSchema={Yup.object(validationCar)}>
                <Form>
                    Id: <Field name="id"/>
                    <ErrorMessage name="id" component="span"></ErrorMessage>
                    Name: <Field name="name"/>
                    <ErrorMessage name="name" component="p"></ErrorMessage>
                    oil: <Field name="oil" required/>
                    types: <Field as="select" name="type">
                    {
                        types.map(classroom => (
                            <option value={JSON.stringify(type)} key={type.id}>{type.nameTypes}</option>
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