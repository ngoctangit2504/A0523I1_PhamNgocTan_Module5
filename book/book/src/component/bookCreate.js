import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import * as bookService from "../service/bookService";
import { toast } from "react-toastify";

function BookCreate() {
    const [book, setBook] = useState();
    const newId = Math.floor(Math.random() * 1000);
    const [categories, setCategories] = useState();
    const navigate = useNavigate();
    const [isSubmit, setSubmit] = useState([]);

    useEffect(() => {
        getAllCategories();
        //     Call DB để lấy duex liệu ban đầu cho chức năng update
        //     useParam để lấy id
        //   const student = await studentService.findById(id);
        setBook({
            id: newId.toString(),
            name: "",
            author: "",
            price: "",
            category: {},
        });
    }, []);

    const getAllCategories = async () => {
        try {
            const foundCategory = await bookService.getAllCategories();
            setCategories(foundCategory);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const validateBook = {
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

    const createBook = async (values) => {
        setSubmit(true);
        values.category = JSON.parse(values.category);
        values.price = Number.parseInt(values.price);
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
                            Author: <Field className="form-control" name="author" />
                            <br></br>
                            <ErrorMessage name="author" component="p"></ErrorMessage>
                            Price: <Field className="form-control" name="price" />
                            <br></br>
                            <ErrorMessage name="price" component="p"></ErrorMessage>
                            Category:
                            <Field className="form-control" as="select" name="category">
                                {categories?.map((category) => (
                                    <option key={category.id} value={JSON.stringify(category)}>
                                        {category.name}
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