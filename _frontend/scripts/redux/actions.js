export const setLoginToken = adminLoginToken => ({type: 'SET_LOGIN_TOKEN', payload: adminLoginToken})

export const clearLoginToken = adminLoginToken => ({type: 'CLEAR_LOGIN_TOKEN', payload: adminLoginToken})

export const setCustomerObject = customerObject => ({type: 'SET_CUSTOMER_OBJECT', payload: customerObject})

export const setViewCustDetails = viewCustomer => ({ type: 'SET_VIEWCUSTDETAILS', payload: viewCustomer })