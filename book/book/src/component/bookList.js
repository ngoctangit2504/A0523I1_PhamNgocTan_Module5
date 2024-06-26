import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as bookService from "../service/bookService";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

function BookList(props) {
    const [bookList, setBookList] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [bookDelete, setBookDelete] = useState({});
    const [searchName, setSearchName] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [limitItemsPerPage, setLimitItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
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
    const [categories, setCategories] = useState();

    useEffect(() => {
        getAll();
        getAllCategories();
        console.log(totalPages);
    }, [searchName, searchAuthor, searchCategory, currentPage]);

    const getAll = async () => {
        const response = await bookService.getAllBooks(currentPage,limitItemsPerPage);
        if (response && response.data) {
            setTotalPages(response.data.pages); //set so trang
            const result = response.data.data.filter((book) => {
                // Kiểm tra tên sách
                const matchesName =
                    searchName === "" ||
                    book.name.toLowerCase().includes(searchName.toLowerCase());
                // Kiểm tra tác giả
                const matchesAuthor =
                    searchAuthor === "" ||
                    book.author.toLowerCase().includes(searchAuthor.toLowerCase());
                // Kiểm tra thể loại sách
                const matchesCategory =
                    searchCategory === "" ||
                    book.category.name
                        .toLowerCase()
                        .includes(searchCategory.toLowerCase());

                // Trả về true nếu tất cả các điều kiện đều đúng
                return matchesName && matchesAuthor && matchesCategory;
            });
            setBookList(result);
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
    const handlePageClick = (selectedPage) => {
        // Xử lý sự kiện khi người dùng chuyển trang
        console.log(`Selected page: ${selectedPage.selected +1}`);
        setCurrentPage(selectedPage.selected +1);
    };
    return (
        <>
            <h1 style={{ textAlign: "center" }}>List book</h1>
            <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                <input
                    style={{ marginLeft: "", width: "30%" }}
                    type="text"
                    placeholder="Search by book name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value || "")}
                />
                <input
                    style={{ marginLeft: "5%", width: "30%" }}
                    type="text"
                    placeholder="Search by author..."
                    value={searchAuthor}
                    onChange={(e) => setSearchAuthor(e.target.value || "")}
                />
                <select
                    style={{ marginLeft: "5%", width: "30%" }}
                    type="text"
                    placeholder="Search by category..."
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value || "")}
                >
                    <option value="">All</option>
                    {categories?.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <Link to="/books/create">
                <button className="btn btn-primary">Thêm mới</button>
            </Link>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {bookList.map((book, index) => (
                    <tr key={book.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.price}</td>
                        <td>{book.category.name}</td>
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
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setIsOpen(false)}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <h2>Xóa Sách</h2>

                <p>Bạn có muốn xóa sách {bookDelete.name}?</p>
                <button onClick={deleteBooks}>Xác nhận</button>
            </Modal>
        </>
    );
}
export default BookList;