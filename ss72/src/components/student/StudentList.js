// import {Component} from "react";
//
// class StudentList extends Component {
//     students;
//     id = " a03"
//     constructor(props) {
//         super(props);
//         this.students = [
//             {
//                 id: 1,
//                 name: "HaiTT",
//                 classroom: {
//                     id: 1,
//                     nameClass: "A03"
//                 },
//                 gender: true
//             },
//             {
//                 id: 2,
//                 name: "HaiTT",
//                 classroom: {
//                     id: 1,
//                     nameClass: "A03"
//                 },
//                 gender: false
//             }
//         ]
//     }
//     render() {
//         return (
//             <>
//                 <h1>Danh sách học sinh lớp {this.props.nameClass}</h1>
//                 <h1 id={this.id}>A03</h1>
//                 <table>
//                     <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Classname</th>
//                         <th>Gender</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {
//                         this.students.map((item, index) => (
//                             <tr key={item.id}>
//                                 <td>{item.id}</td>
//                                 <td>{item.name}</td>
//                                 <td>{item.classroom.nameClass}</td>
//                                 <td>{item.gender ? "Nam" : "Nữ"}</td>
//                             </tr>
//                         ))
//                     }
//                     </tbody>
//                 </table>
//             </>
//         )
//     }
// }
//
// export default StudentList;

import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as studentService from "../../services/StudentService"
import {useSelector} from "react-redux";

function StudentList(props) {
    const id = " a03"

    const students =useSelector(store => store.students);
    // const [students, setStudents] = useState([]);

    // useEffect(() => {
    //     // Suwr dụng để xử lý side effect (call API, bất đồng bộ, random,... )
    //     // Call API giả lập
    //     // Kieemr tra dữ liệu có tồn tại hay chưa. Nếu không useEffect sẽ chạy liên tục
    //     getAll();
    //     return (
    //     //     Clean up <=> willUnMount
    //         console.log("C09")
    //     )
    // })
    // const getAll = async () => {
    //     if(students.length === 0 ) {
    //         const temp = await studentService.getAll();
    //         setStudents(temp)
    //     }
    // }

    // useEffect(() => {
    // //     Search
    // }, [name, age, address])


    return (
        <>
            <button>
                <Link to="/student/create">Thêm mới</Link>
            </button>
            <h1>Danh sách học sinh lớp {props.nameClass}</h1>
            <h1 id={id}>A03</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Classname</th>
                    <th>Gender</th>
                </tr>
                </thead>
                <tbody>
                {
                    students.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.classroom.nameClass}</td>
                            <td>{item.gender ? "Nam" : "Nữ"}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>


        </>
    )
}

export default StudentList;