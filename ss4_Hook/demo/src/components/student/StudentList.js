import {Component} from "react";

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
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
            ],
            classroom: {

            }
        }

    }
    //
    componentDidMount() {

    }

    render() {
        return (
            <>
                <h1>Danh sách học sinh của lớp {this.props.nameClass}</h1>
                {/*.bind*/}
                <button onClick={() => this.props.changeNameClass("A0723I1")}>Click me</button>
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
                    { this.state.students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.address}</td>
                            <td><button className="btn btn-danger">Xóa</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </>
        )
    }
}

export default StudentList;