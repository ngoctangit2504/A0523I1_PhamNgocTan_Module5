const studentReducer = (students = [], action) => {
    switch (action.type) {
        case "ADD_STUDENT":
            return [...students, action.payload];
        case "LIST_STUDENT":
        //     call DB
            return action.payload;
        default:
            return students;
    }
}


export default studentReducer;