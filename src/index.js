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
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './usefulLibrary/theme';
import MaterialMode from './usefulLibrary/MaterialMode';
import FormMui from './usefulLibrary/FormMui';
import QueryPre from './usefulLibrary/QueryPre';
import { Query, QueryClient, QueryClientProvider } from 'react-query';
import QueryBasic from './usefulLibrary/QueryBasic';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import QuerySuspense from './usefulLibrary/QuerySuspense';
import StateEffect from './utilizeHooks/StateEffect';
import HookTimer from './utilizeHooks/HookTimer';
import HookEffect from './utilizeHooks/HookEffect';
import HookRefNg from './utilizeHooks/HookRefNg';
import HookRef from './utilizeHooks/HookRef';
import HookRefForward from './utilizeHooks/HookRefForward';

// const cli = new QueryClient();

// const cli = new QueryClient({
//   defaultOptions: {
//     queries: {
//       suspense: true
//     },
//   },
// });

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
    {/* <MaterialGrid /> */}
    {/* <ThemeProvider theme={theme}>
      <CssBaseline />
      <MaterialBasic />
    </ThemeProvider> */}
    {/* <MaterialMode /> */}
    {/* <FormMui /> */}
    {/* <QueryPre /> */}
    {/* <QueryClientProvider client={cli}>
      <QueryBasic />
    </QueryClientProvider> */}
    {/* <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<div>エラーが発生しました。</div>}>
        <QueryClientProvider client={cli}>
          <QuerySuspense />
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense> */}
    {/* <StateEffect init={0} /> */}
    {/* <HookTimer init={10} /> */}
    {/* <HookEffect init={10} /> */}
    {/* <HookRefNg /> */}
    {/* <HookRef /> */}
    <HookRefForward />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
