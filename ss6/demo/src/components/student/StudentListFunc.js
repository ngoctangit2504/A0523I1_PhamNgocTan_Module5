import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as studentService from "../../services/StudentService"
import Modal from 'react-modal';
import {toast} from "react-toastify";

function StudentListFunc(props) {
    const [students, setStudents] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [studentDelete, setStudentDelete] = useState({})

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

        if (students.length === 0) {
            getAll();
        }

    }, [nameSearch]);

    const getAll = async () => {
        const temp = await studentService.getAllStudent();
        const result = temp.filter(student => student.name.includes(nameSearch));
        setStudents(result);
    }

    const removeStudent = async () => {
        const isSuccess = await studentService.removeStudent(studentDelete.id);
        if(isSuccess) {
            toast.success("Xóa thành công")
        }
        setIsOpen(false);
        getAll();
    }

    const openModal = (student) => {
        setStudentDelete(student);
        setIsOpen(true);
    }

    return (
        <>
            <Link to="/students/create">Thêm mới</Link>
            <input onChange={(evt) => setNameSearch(evt.target.value)}/>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Remove</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.address}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => openModal(student)}>Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>Xóa học viên</h2>

                <p>Bạn có muốn xóa học viên {studentDelete.name}?</p>
                <button onClick={removeStudent}>Xác nhận</button>
            </Modal>
        </>
    );
}

export default StudentListFunc;