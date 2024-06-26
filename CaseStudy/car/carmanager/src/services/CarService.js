import axios from 'axios';

const cars = [
    {
        "id": 1,
        "name": "Everest",
        "type": {
            "id": 1,
            "nameTypes": "SUV"
        },
        "oil": false
    },
    {
        "id": 2,
        "name": "Ranger Raptor",
        "type": {
            "id": 3,
            "nameTypes": "Bán Tải"
        },
        "oil": true
    }]

export const getAll = async () => {
    try {
        const response = await axios.get('http://localhost:8080/cars');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const add = async (car) => {
    try {
        await axios.post("http://localhost:8080/cars", car)
        return true;
    }catch (err) {
        return false;
    }
}