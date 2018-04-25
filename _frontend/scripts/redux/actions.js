export const setLoginSession = loggedInAdmin => ({type: 'SET_LOGIN_SESSION', payload: loggedInAdmin})

export const clearLoginSession = logOutAdmin => ({type: 'CLEAR_LOGIN_SESSION', payload: logOutAdmin})

export const setCustomerObject = customerObject => ({type: 'SET_CUSTOMER_OBJECT', payload: customerObject})