import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as carService from "../service/CarService";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";

function CarList(props) {
    const [carList, setCarList] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [carDelete, setCarDelete] = useState({});
    const [searchName, setSearchName] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");
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
    }, [searchName, searchAuthor, searchLoai]);

    const getAll = async () => {
        const response = await carService.getAllCars();
        const result = response.filter((car) => {
            // Kiểm tra tên car
            const matchesName =
                searchName === "" ||
                car.name.toLowerCase().includes(searchName.toLowerCase());
            // Kiểm tra tác giả
            const matchesAuthor =
                searchAuthor === "" ||
                car.author.toLowerCase().includes(searchAuthor.toLowerCase());
            // Kiểm tra thể loại
            const matchesLoai =
                searchLoai === "" ||
                car.loai.name.toLowerCase().includes(searchLoai.toLowerCase());

            // Trả về true nếu tất cả các điều kiện đều đúng
            return matchesName && matchesAuthor && matchesLoai;
        });
        setCarList(result);
    };
    const getAllLoais = async () => {
        try {
            const foundLoai = await carService.getAllLoais();
            setLoais(foundLoai);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const deleteCars = async () => {
        const isSuccess = await carService.deleteCars(carDelete.id);
        if (isSuccess) {
            toast.success("Car deleted successfully");
        }
        setIsOpen(false);
        getAll();
    };

    const openModal = (car) => {
        setCarDelete(car);
        setIsOpen(true);
    };

    return (
        <>
            <h1 style={{textAlign: 'center'}}>List car</h1>
            <div style={{marginBottom:'20px',marginTop:'20px'}}>
                <input
                    style={{marginLeft:"", width:"30%"}}
                    type="text"
                    placeholder="Search by car name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value || "")}
                />
                <input
                    style={{marginLeft:"5%", width:"30%"}}
                    type="text"
                    placeholder="Search by author..."
                    value={searchAuthor}
                    onChange={(e) => setSearchAuthor(e.target.value || "")}
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
            <Link to="/cars/create"><button  className="btn btn-primary">Thêm mới Car</button></Link>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Price</th>
                    <th scope="col">Loai</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {carList.map((car,index) => (
                    <tr key={car.id}>
                        <th scope="row">{index+1}</th>
                        <td>{car.name}</td>
                        <td>{car.author}</td>
                        <td>{car.price}</td>
                        <td>{car.loai.name}</td>
                        <td>
                            <Link to={"/cars/edit/" + car.id}>
                                <button className="btn btn-primary">Edit</button>
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => openModal(car)}
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
                <h2>Xóa Car</h2>

                <p>Bạn có muốn xóa car {carDelete.name}?</p>
                <button onClick={deleteCars}>Xác nhận</button>
            </Modal>
        </>
    );
}
export default CarList;