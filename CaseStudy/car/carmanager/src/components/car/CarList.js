import React from "react";
import { useSelector } from "react-redux"; // Importing useSelector
import { Link } from "react-router-dom"; // Importing Link for routing


function CarList(props) {
    const id = " SUV"

    const cars = useSelector(store => store.cars);



    return (
        <>
        <button>
        <Link to="/car/create">Thêm mới</Link>
    </button>
    <h1>Danh sách Car {props.carTypes}</h1>
    <h1 id={id}>SUV</h1>
        <table>
        <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Type</th>
        <th>Oil</th>
        </tr>
        </thead>
        <tbody>
        {
            cars.map((item, index) => (
                <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.type.typeName}</td>
            <td>{item.oil ? "Dầu" : "Xăng"}</td>
            </tr>
))
}
</tbody>
    </table>


    </>
)
}

export default CarList;