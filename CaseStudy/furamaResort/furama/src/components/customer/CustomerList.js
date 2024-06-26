import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as customerService from "../../services/CustomerService"
import Modal from 'react-modal';
import {toast} from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS từ Bootstrap
import ReactPaginate from "react-paginate";




function CustomerList(props) {
    const [customers, setCustomers] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [customerDelete, setCustomerDelete] = useState({})

    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
    const [perPage] = useState(3); // Số mục trên mỗi trang

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const customStyles = {
        content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    useEffect(() => {
        // call DB
        return () => {
            //clean up
            // alert("Tạm biệt")
        }
    }, [])

    useEffect(() => {
        // Call DB lấy danh sách search

        if (customers.length === 0) {
            getAll();
        }

    }, [nameSearch]);

    const getAll = async () => {
        const temp = await customerService.getAllCustomer();
        console.log(temp)
        const result = temp.filter(customers => customers.name.includes(nameSearch));
        setCustomers(result);
    }


    const removeCustomer = async () => {
        const isSuccess = await customerService.removeCustomer(customerDelete.id);
        if (isSuccess) {
            toast.success("Xóa thành công")
        }
        setIsOpen(false);
        getAll();
    }

    const openModal = (customer) => {
        setCustomerDelete(customer);
        setIsOpen(true);
    }

    const indexOfLastCustomer = (currentPage + 1) * perPage;
    const indexOfFirstCustomer = indexOfLastCustomer - perPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    return (
        <>
            <Link to="/customers/create">Thêm mới</Link>
            <input onChange={(evt) => setNameSearch(evt.target.value)}/>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Ngày Sinh</th>
                    <th scope="col">Gioi Tinh</th>
                    <th scope="col">CMND</th>
                    <th scope="col">Diện Thoai</th>
                    <th scope="col">Email</th>
                    <th scope="col">Địa chỉ</th>
                </tr>
                </thead>
                <tbody>
                {currentCustomers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.dateOfBirth}</td>
                        <td>{customer.gender}</td>
                        <td>{customer.CMND}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.email}</td>
                        <td>{customer.address}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => openModal(customer)}>Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <ReactPaginate
                pageCount={Math.ceil(customers.length / perPage)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />


            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>Xóa Customer</h2>

                <p>Bạn có muốn xóa customer {customerDelete.name}?</p>
                <button onClick={removeCustomer}>Xác nhận</button>
            </Modal>
        </>
    );
}

export default CustomerList;