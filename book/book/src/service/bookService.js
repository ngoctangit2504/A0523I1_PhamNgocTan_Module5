import axios from "axios";
import ReactPaginate from 'react-paginate';


export const getAllBooks = async (page,limit) => {
    try {
        const res = await axios.get(`http://localhost:3002/books?_page=${page}&_per_page=${limit}`);
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
    }
};
export const getAllCategories = async () => {
    try {
        const res = await axios.get("http://localhost:3002/categories");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const addNewBooks = async (book) => {
    try {
        await axios.post("http://localhost:3002/books ", book);
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteBooks = async (id) => {
    try {
        await axios.delete("http://localhost:3002/books/" + id);
        return true;
    } catch (error) {
        return false;
    }
};

export const updateBooks = async (id, book) => {
    try {
        await axios.put(`http://localhost:3002/books/${id}`, book);
        return true;
    } catch (error) {
        return false;
    }
}

export const findById = async (id) => {
    try {
        const res = await axios.get("http://localhost:3002/books/" + id);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const findByName = async (name) => {
    try {
        const res = await axios.get(`http://localhost:3002/books/${name}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}