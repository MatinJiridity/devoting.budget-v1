import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import { fetchPolls } from './features/polls/pollsSlice';
import { getContract } from './features/contract/contractSlice';

store.dispatch(fetchPolls())
store.dispatch(getContract())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
)
