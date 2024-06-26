const carReducer = (cars = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case "LIST_CAR":
            return payload;
        case "ADD_CAR":
            return [...cars, payload]
        default:
            return cars;
    }
}

export default carReducer;