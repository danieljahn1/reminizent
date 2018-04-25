const initialState = {
    loggedInAdmin: '',
    customerObject: ''
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ("SET_LOGIN_SESSION"):
            state = {
                ...state,
                loggedInUser: action.payload
            }
            break;
        case ("CLEAR_LOGIN_SESSION"):
            state = {
                loggedInUser: action.payload
            }
            break;
        case ("SET_CUSTOMER_OBJECT"):
            state = {
                ...state,
                customerObject: action.payload
            }
            break;
    }

    return state;
}

export default rootReducer;