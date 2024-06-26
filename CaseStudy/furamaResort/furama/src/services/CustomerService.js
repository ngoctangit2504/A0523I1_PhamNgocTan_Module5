import axios from "axios";

export const getAllCustomer = async () => {
    try {
        const res = await axios.get("http://localhost:8081/customers");
        console.log(res)
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const addNewCustomer = async (customer) => {
    try {
        await axios.post("http://localhost:8081/customers", customer)
        return true;
    } catch (e) {
        return false;
    }
}

export const removeCustomer = async (id) => {
    try {
        await axios.delete(`http://localhost:8081/customers/${id}`)
        return true;
    }catch (e) {

    }
}
