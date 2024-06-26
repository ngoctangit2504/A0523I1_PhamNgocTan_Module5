import axios from "axios";

export const getAllBooks = async () => {
    try {
        const res = await axios.get("http://localhost:3001/books");
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

export const addNewBooks = async (book) => {
    try {
        await axios.post("http://localhost:3001/books ", book);
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteBooks = async (id) => {
    try {
        await axios.delete("http://localhost:3001/books/" + id);
        return true;
    } catch (error) {
        return false;
    }
};

export const updateBooks = async (id, car) => {
    try {
        await axios.put(`http://localhost:3001/books/${id}`, car);
        return true;
    } catch (error) {
        return false;
    }
}

export const findById = async (id) => {
    try {
        const res = await axios.get("http://localhost:3001/books/" + id);
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