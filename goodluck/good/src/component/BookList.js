import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as bookService from "../service/BookService";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";

function BookList(props) {
    const [bookList, setBookList] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [bookDelete, setBookDelete] = useState({});
    const [searchName, setSearchName] = useState("");
    const [searchLoai, setSearchLoai] = useState("");
    const customStyles = {
        content: {
            top: "30%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    const [loais, setLoais] = useState();

    useEffect(() => {
        getAll();
        getAllLoais();
    }, [searchName, searchLoai]);

    const getAll = async () => {
        const response = await bookService.getAllBooks();
        const result = response.filter((book) => {
            // Kiểm tra tên car
            const matchesName =
                searchName === "" ||
                book.name.toLowerCase().includes(searchName.toLowerCase());
            // Kiểm tra thể loại
            const matchesLoai =
                searchLoai === "" ||
                book.loai.name.toLowerCase().includes(searchLoai.toLowerCase());

            // Trả về true nếu tất cả các điều kiện đều đúng
            return matchesName && matchesLoai;
        });
        setBookList(result);
    };
    const getAllLoais = async () => {
        try {
            const foundLoai = await bookService.getAllLoais();
            setLoais(foundLoai);
        } catch (error) {
            console.error("Error fetching loai:", error);
        }
    };

    const deleteBooks = async () => {
        const isSuccess = await bookService.deleteBooks(bookDelete.id);
        if (isSuccess) {
            toast.success("Book deleted successfully");
        }
        setIsOpen(false);
        getAll();
    };

    const openModal = (book) => {
        setBookDelete(book);
        setIsOpen(true);
    };

    return (
        <>
        <h1 style={{textAlign: 'center'}}>List book</h1>
    <div style={{marginBottom:'20px',marginTop:'20px'}}>
<input
    style={{marginLeft:"", width:"30%"}}
    type="text"
    placeholder="Search by book name..."
    value={searchName}
    onChange={(e) => setSearchName(e.target.value || "")}
    />

    <select
    style={{marginLeft:"5%", width:"30%"}}
    type="text"
    placeholder="Search by loai..."
    value={searchLoai}
    onChange={(e) => setSearchLoai(e.target.value || "")}
>
<option value="">All</option>
    {loais?.map((loai) => (
        <option key={loai.id} value={loai.name}>
        {loai.name}
        </option>
    ))}
</select>
    </div>
    <Link to="/books/create"><button  className="btn btn-primary">Thêm mới Book</button></Link>
    <table className="table table-hover">
        <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Ngay Nhap</th>
        <th scope="col">So luong</th>
        <th scope="col">Loai</th>
        <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        {bookList.map((book,index) => (
                <tr key={book.id}>
            <th scope="row">{index+1}</th>
            <td>{book.name}</td>
            <td>{book.ngay}</td>
            <td>{book.soluong}</td>
            <td>{book.loai.name}</td>
            <td>
            <Link to={"/books/edit/" + book.id}>
            <button className="btn btn-primary">Edit</button>
            </Link>
            <button
            className="btn btn-danger"
            onClick={() => openModal(book)}
>
    Delete
    </button>
    </td>
    </tr>
))}
</tbody>
    </table>
    <Modal
    isOpen={modalIsOpen}
    // onAfterOpen={afterOpenModal}
    onRequestClose={() => setIsOpen(false)}
    contentLabel="Example Modal"
    style={customStyles}
        >
        <h2>Xóa Book</h2>

    <p>Bạn có muốn xóa book {bookDelete.name}?</p>
    <button onClick={deleteBooks}>Xác nhận</button>
    </Modal>
    </>
);
}
export default BookList;