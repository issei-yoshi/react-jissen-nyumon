import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StateForm from './basicForm/StateForm';
import StateFormUC from './basicForm/StateFormUC';
import StateNest from './basicForm/StateNest';
import StateNestImmer from './basicForm/StateNestImmer';
import StateTodo from './basicForm/StateTodo';
import FormBasic from './basicForm/FromBasic';
import LazyBasic from './basicComponent/LazyBasic';
import ProfilerBasic from './basicComponent/ProfilerBasic';
import ErrorRoot from './basicComponent/ErrorRoot';
import ErrorRetryRoot from './basicComponent/ErrorRetryRoot';
import MaterialBasic from './usefulLibrary/MaterialBasic';
import MaterialDrawer from './usefulLibrary/MaterialDrawer';
import MaterialGrid from './usefulLibrary/MaterialGrid';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <StateForm /> */}
    {/* <StateFormUC /> */}
    {/* <StateNest /> */}
    {/* <StateNestImmer /> */}
    {/* <StateTodo /> */}
    {/* <FormBasic /> */}
    {/* <LazyBasic /> */}
    {/* <ProfilerBasic /> */}
    {/* <ErrorRoot /> */}
    {/* <ErrorRetryRoot /> */}
    {/* <MaterialBasic /> */}
    {/* <MaterialDrawer /> */}
    <MaterialGrid />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
