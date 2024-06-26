import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import * as carService from "../service/CarService";
import { toast } from "react-toastify";
import {getAllLoais} from "../service/CarService";

function CarCreate() {
    const [car, setCar] = useState();
    const newId = Math.floor(Math.random() * 1000);
    const [loais, setLoais] = useState();
    const navigate = useNavigate();
    const [isSubmit, setSubmit] = useState([]);

    useEffect(() => {
        getAllLoais();
        //     Call DB để lấy duex liệu ban đầu cho chức năng update
        //     useParam để lấy id
        //   const student = await studentService.findById(id);
        setCar({
            id: newId.toString(),
            name: "",
            author: "",
            price: "",
            category: {},
        });
    }, []);

    const getAllLoais = async () => {
        try {
            const foundLoai = await carService.getAllLoais();
            setLoais(foundLoai);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const validateCar = {
        id: Yup.number()
            .min(0, "Id không được nh hơn 0")
            .max(10000000000, "Id không được lớn hơn 10000000000"),
        name: Yup.string()
            .min(4, "Tên không được nhỏ hơn 4 ký tự")
            .max(100, "Tên không đươc lớn hơn 100 ký tự"),
        author: Yup.string()
            .min(4, "Tên không được nhỏ hơn 4 ký tự")
            .max(100, "Tên không đươc lớn hơn 100 ký tự"),
        price: Yup.number().min(0, "Giá không được nhỏ hơn 0"),
    };

    const createCar = async (values) => {
        setSubmit(true);
        values.loai = JSON.parse(values.loai);
        console.log(values);
        setSubmit(false);
        await carService.addNewCars(values);
        toast.success("Car added successfully");
        navigate("/cars");
    };
    if (!car) {
        return null;
    }
    return (
        <>
            <h1 style={{textAlign: 'center'}}>Create car</h1>
            <div style={{maxWidth: '60%', margin: '0 auto' }}>
                <Formik
                    initialValues={car}
                    onSubmit={createCar}
                    validationSchema={Yup.object(validateCar)}
                >
                    <Form className="form-group">
                        <div className="col-sm">
                            <ErrorMessage name="id" component="p"></ErrorMessage>
                            Name: <Field className="form-control" name="name" />
                            <br></br>
                            <ErrorMessage name="name" component="p"></ErrorMessage>
                            Author: <Field className="form-control" name="author" />
                            <br></br>
                            <ErrorMessage name="author" component="p"></ErrorMessage>
                            Price: <Field className="form-control" name="price" />
                            <br></br>
                            <ErrorMessage name="price" component="p"></ErrorMessage>
                            Loai:
                            <Field className="form-control" as="select" name="loai">
                                {loais?.map((loai) => (
                                    <option key={loai.id} value={JSON.stringify(loai)}>
                                        {loai.name}
                                    </option>
                                ))}
                            </Field>
                            <br></br>
                            <button type="submit">Thêm mới</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

export default CarCreate;