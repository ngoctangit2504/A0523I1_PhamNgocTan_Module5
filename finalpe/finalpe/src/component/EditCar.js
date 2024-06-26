import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as carService from "../service/CarService";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {getAllLoais} from "../service/CarService"; // Đảm bảo bạn đã import Yup từ thư viện yup

function CarEdit() {
    const [loais, setLoais] = useState();
    const [car, setCar] = useState({
        id: "", // Khởi tạo một object book với các trường id, name, author, price
        name: "",
        author: "",
        price: "",
        loai: {},
    });
    const navigate = useNavigate();
    const [isSubmit, setSubmit] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchCar();
        getAllLoais();
    }, [id]);

    const fetchCar = async () => {
        if (id) {
            try {
                const foundCar = await carService.findById(id);
                setCar(foundCar);
            } catch (error) {
                console.error("Error fetching car:", error);
            }
        }
    };
    const getAllLoais = async () => {
        try {
            const foundLoai = await carService.getAllLoais();
            setLoais(foundLoai);
        } catch (error) {
            console.error("Error fetching loai:", error);
        }
    };

    const editCar = async (values) => {
        console.log("Form values:", values);
        setSubmit(true);
        try {
            values.loai = JSON.parse(values.loai);
            await carService.updateCars(id, values);
            toast.success("Car updated successfully");
            navigate("/cars");
        } catch (error) {
            console.error("Error updating car:", error);
            setSubmit(false);
        }
    };

    return (
        <>
            <h1 style={{textAlign: 'center'}}>Edit car</h1>
            <div style={{ maxWidth: "60%", margin: "0 auto" }}>
                <Formik initialValues={car} onSubmit={editCar} key={car.id}>
                    <Form>
                        <div className="col-sm">
                            {/* Các trường input */}
                            <Field className="form-control" type="hidden" name="id" />
                            <label htmlFor="name">Name:</label>
                            <Field
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                            />
                            <br />
                            <label htmlFor="author">Author:</label>
                            <Field
                                className="form-control"
                                type="text"
                                id="author"
                                name="author"
                            />
                            <br />
                            <label htmlFor="price">Price:</label>
                            <Field
                                className="form-control"
                                type="text"
                                id="price"
                                name="price"
                            />
                            <br />

                            <label htmlFor="loai">Loai:</label>
                            <Field
                                className="form-control"
                                as="select"
                                id="loai"
                                name="loai"
                            >
                                <option value={car.loai}>Select a loai</option>
                                {loais?.map((loai) => (
                                    <option key={loai.id} value={JSON.stringify(loai)}>
                                        {loai.name}
                                    </option>
                                ))}
                            </Field>
                            <br />

                            <button type="submit">Save Changes</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

export default CarEdit;