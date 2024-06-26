import axios from "axios";

export const getAllStudent = async () => {
    try {
        const res = await axios.get("http://localhost:8080/students");
        console.log(res)
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const addNewStudent = async (student) => {
    try {
        await axios.post("http://localhost:8080/students", student)
        return true;
    } catch (e) {
        return false;
    }
}

export const removeStudent = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/students/${id}`)
        return true;
    }catch (e) {

    }
}