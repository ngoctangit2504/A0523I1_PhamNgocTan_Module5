import axios from 'axios';

const students = [
    {
        id: 1,
        name: "HaiTT",
        classroom: {
            id: 1,
            nameClass: "A03"
        },
        gender: true
    },
    {
        id: 2,
        name: "HaiTT",
        classroom: {
            id: 1,
            nameClass: "A03"
        },
        gender: false
    }]

export const getAll = async () => {
    try {
        const response = await axios.get('http://localhost:8080/students');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const add = async (student) => {
    try {
        await axios.post("http://localhost:8080/students", student)
        return true;
    }catch (err) {
        return false;
    }
}