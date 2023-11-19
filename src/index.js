import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StateForm from './basicForm/StateForm';
import StateFormUC from './basicForm/StateFormUC';
import StateNest from './basicForm/StateNest';
import StateNestImmer from './basicForm/StateNestImmer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <StateForm /> */}
    {/* <StateFormUC /> */}
    {/* <StateNest /> */}
    <StateNestImmer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
