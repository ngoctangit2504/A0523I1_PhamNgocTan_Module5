import axios from "axios";

export const getAllCars = async () => {
    try {
        const res = await axios.get("http://localhost:3001/cars");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
export const getAllLoais = async () => {
    try {
        const res = await axios.get("http://localhost:3001/loais");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const addNewCars = async (car) => {
    try {
        await axios.post("http://localhost:3001/cars ", car);
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteCars = async (id) => {
    try {
        await axios.delete("http://localhost:3001/cars/" + id);
        return true;
    } catch (error) {
        return false;
    }
};

export const updateCars = async (id, car) => {
    try {
        await axios.put(`http://localhost:3001/cars/${id}`, car);
        return true;
    } catch (error) {
        return false;
    }
}

export const findById = async (id) => {
    try {
        const res = await axios.get("http://localhost:3001/cars/" + id);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const findByName = async (name) => {
    try {
        const res = await axios.get(`http://localhost:8080/3001/${name}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}