const studentReducer = (students = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case "LIST_STUDENT":
            return payload;
        case "ADD_STUDENT":
            return [...students, payload]
        default:
            return students;
    }
}

export default studentReducer;
