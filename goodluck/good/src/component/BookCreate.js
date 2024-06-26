import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import * as bookService from "../service/BookService";
import { toast } from "react-toastify";
import {getAllLoais} from "../service/BookService";

function BookCreate() {
    const [book, setBook] = useState();
    const newId = Math.floor(Math.random() * 1000);
    const [loais, setLoais] = useState();
    const navigate = useNavigate();
    const [isSubmit, setSubmit] = useState([]);

    useEffect(() => {
        getAllLoais();
        //     Call DB để lấy duex liệu ban đầu cho chức năng update
        //     useParam để lấy id
        //   const student = await studentService.findById(id);
        setBook({
            id: newId.toString(),
            name: "",
            ngay: "",
            soluong: "",
            loai: {},
        });
    }, []);

    const getAllLoais = async () => {
        try {
            const foundLoai = await bookService.getAllLoais();
            setLoais(foundLoai);
        } catch (error) {
            console.error("Error fetching loai:", error);
        }
    };

    const validateBook = {
        id: Yup.number()
            .min(0, "Id không được nh hơn 0")
            .max(10000000000, "Id không được lớn hơn 10000000000"),
        name: Yup.string()
            .min(4, "Tên không được nhỏ hơn 4 ký tự")
            .max(100, "Tên không đươc lớn hơn 100 ký tự"),
        ngay: Yup.string()
            .min(4, "ngay không được nhỏ hơn 4 ký tự")
            .max(100, "ngay không đươc lớn hơn 100 ký tự"),
        soluong: Yup.number().min(0, "soluong không được nhỏ hơn 0"),
    };

    const createBook = async (values) => {
        setSubmit(true);
        values.loai = JSON.parse(values.loai);
        console.log(values);
        setSubmit(false);
        await bookService.addNewBooks(values);
        toast.success("Book added successfully");
        navigate("/books");
    };
    if (!book) {
        return null;
    }
    return (
        <>
            <h1 style={{textAlign: 'center'}}>Create book</h1>
            <div style={{maxWidth: '60%', margin: '0 auto' }}>
                <Formik
                    initialValues={book}
                    onSubmit={createBook}
                    validationSchema={Yup.object(validateBook)}
                >
                    <Form className="form-group">
                        <div className="col-sm">
                            <ErrorMessage name="id" component="p"></ErrorMessage>
                            Name: <Field className="form-control" name="name" />
                            <br></br>
                            <ErrorMessage name="name" component="p"></ErrorMessage>
                            Ngay: <Field className="form-control" name="ngay" />
                            <br></br>
                            <ErrorMessage name="ngay" component="p"></ErrorMessage>
                            SoLuong: <Field className="form-control" name="soluong" />
                            <br></br>
                            <ErrorMessage name="soluong" component="p"></ErrorMessage>
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

export default BookCreate;