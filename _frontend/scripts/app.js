import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
// COMPONENTS
import Container from './components/container'
import store from './redux/store'

//CSS
// import './style/style.css'

ReactDOM.render(<Provider store={store}>
<BrowserRouter>
    <Container />
</BrowserRouter>
</Provider>, document.getElementById('app'))
