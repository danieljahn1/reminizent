const initialState = {
    adminLoginToken: '',
    customerObject: '',
    viewCustomer: '',
    adminObject: '',
    editNote: ''
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
        // case ("SET_VIEWCUSTDETAILS"):
        //     state = {
        //         ...state,
        //         viewCustomer: action.payload
        //     }
        //     break;
        case ("SET_ADMIN_OBJECT"):
            state = {
                ...state,
                adminObject: action.payload
            }
            break;
        case ("SET_EDIT_NOTE"):
            state = {
                ...state,
                editNote: action.payload
            }
            break;
    }

    return state;
}

export default rootReducer;
