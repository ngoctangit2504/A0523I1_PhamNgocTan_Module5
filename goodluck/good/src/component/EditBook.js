import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as bookService from "../service/BookService";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {getAllLoais} from "../service/BookService"; // Đảm bảo bạn đã import Yup từ thư viện yup

function BookEdit() {
    const [loais, setLoais] = useState();
    const [book, setBook] = useState({
        id: "", // Khởi tạo một object book với các trường id, name, author, price
        name: "",
        ngay: "",
        soluong: "",
        loai: {},
    });
    const navigate = useNavigate();
    const [isSubmit, setSubmit] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchBook();
        getAllLoais();
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
    const getAllLoais = async () => {
        try {
            const foundLoai = await bookService.getAllLoais();
            setLoais(foundLoai);
        } catch (error) {
            console.error("Error fetching loai:", error);
        }
    };

    const editBook = async (values) => {
        console.log("Form values:", values);
        setSubmit(true);
        try {
            values.loai = JSON.parse(values.loai);
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
            <h1 style={{textAlign: 'center'}}>Edit car</h1>
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

                            <label htmlFor="author">Ngay:</label>
                            <Field
                                className="form-control"
                                type="text"
                                id="ngay"
                                name="ngay"
                            />
                            <br />

                            <label htmlFor="price">SoLuong:</label>
                            <Field
                                className="form-control"
                                type="text"
                                id="soluong"
                                name="soluong"
                            />
                            <br />

                            <label htmlFor="loai">Loai:</label>
                            <Field
                                className="form-control"
                                as="select"
                                id="loai"
                                name="loai"
                            >
                                <option value={book.loai}>Select a loai</option>
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

export default BookEdit;