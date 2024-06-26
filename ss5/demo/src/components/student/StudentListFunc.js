import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function StudentListFunc(props) {
    const [students, setStudents] = useState([]);
    const [nameSearch, setNameSearch] = useState("");

    useEffect(() => {
        // call DB
        return () => {
            //clean up
            alert("Tạm biệt")
        }
    }, [])

    useEffect(() => {
        // Call DB lấy danh sách search
        const temp = [
            {
                id: 1,
                name: "haiTT",
                address: "QN"
            },
            {
                id: 2,
                name: "A0523I1",
                address: "QN"
            },
            {
                id: 3,
                name: "A0723I1",
                address: "QN"
            }
        ]
        const result = temp.filter(student => student.name.includes(nameSearch));
        setStudents(result);
    }, [nameSearch]);

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
                            <button className="btn btn-danger">Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default StudentListFunc;