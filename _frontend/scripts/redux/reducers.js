const initialState = {
    adminLoginToken: '',
    customerObject: ''
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ("SET_LOGIN_TOKEN"):
            state = {
                ...state,
                adminLoginToken: action.payload
            }
            break;
        case ("CLEAR_LOGIN_TOKEN"):
            state = {
                adminLoginToken: action.payload
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