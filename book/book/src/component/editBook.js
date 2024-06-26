import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as bookService from "../service/bookService";
import { toast } from "react-toastify";
import * as Yup from "yup"; // Đảm bảo bạn đã import Yup từ thư viện yup

function BookEdit() {
    const [categories, setCategories] = useState();
    const [book, setBook] = useState({
        id: "", // Khởi tạo một object book với các trường id, name, author, price
        name: "",
        author: "",
        price: "",
        category: {},
    });
    const navigate = useNavigate();
    const [isSubmit, setSubmit] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchBook();
        getAllCategories();
    }, [id]);

    const fetchBook = async () => {
        if (id) {
            try {
                const foundBook = await bookService.findById(id);
                setBook(foundBook);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        }
    };
    const getAllCategories = async () => {
        try {
            const foundCategory = await bookService.getAllCategories();
            setCategories(foundCategory);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const editBook = async (values) => {
        console.log("Form values:", values);
        setSubmit(true);
        try {
            values.category = JSON.parse(values.category);
            await bookService.updateBooks(id, values);
            toast.success("Book updated successfully");
            navigate("/books");
        } catch (error) {
            console.error("Error updating book:", error);
            setSubmit(false);
        }
    };

    return (
        <>
            <h1 style={{textAlign: 'center'}}>Edit book</h1>
            <div style={{ maxWidth: "60%", margin: "0 auto" }}>
                <Formik initialValues={book} onSubmit={editBook} key={book.id}>
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

                            <label htmlFor="category">category:</label>
                            <Field
                                className="form-control"
                                as="select"
                                id="category"
                                name="category"
                            >
                                <option value={book.category}>Select a category</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={JSON.stringify(category)}>
                                        {category.name}
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

export default BookEdit;