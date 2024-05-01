import React, { useState, useEffect, useContext, useReducer, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Counter context
const CounterContext = React.createContext();

// Reducer function for managing counter state
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { ...state, count: action.count };
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_MY_COUNT':
      return { ...state, myCount: action.myCount };
    case 'INCREMENT_MY_COUNT':
      return { ...state, myCount: state.myCount + 1 };
    case 'DECREMENT_MY_COUNT':
      return { ...state, myCount: state.myCount - 1 };
    default:
      return state;
  }
};

const ShowCount = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const incrementMyCount = () => {
    dispatch({ type: 'INCREMENT_MY_COUNT' });
  };

  const decrementMyCount = () => {
    dispatch({ type: 'DECREMENT_MY_COUNT' });
  };

  return (
    <div>
      <h2>Show Count</h2>
      <p>My Count: {state.myCount}</p>
      <p>Count: {state.count}</p>
      <button onClick={incrementMyCount}>Increment My Count</button>
      <button onClick={decrementMyCount}>Decrement My Count</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

const Home = () => {
  const { state } = useContext(CounterContext);

  return (
    <div>
      <h1>Counter Value: {state.count}</h1>
      <Link to="/counter">Counter</Link>
    </div>
  );
};



const Counter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const { count } = state; // Destructure count from state
  const navigate = useNavigate();

  // const fetchCounter = useCallback(async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/counter');
  //     dispatch({ type: 'SET', count: response.data.count }); // Dispatch SET action with count from response
  //   } catch (err) {
  //     console.error(err);
  //     // Handle error appropriately
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   fetchCounter();
  // }, [fetchCounter]);

  const incrementCounter = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrementCounter = () => {
    dispatch({ type: 'DECREMENT' });
  };


  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};


const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, myCount: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/showCount">Show Count</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/showCount" element={<ShowCount />} />
          </Routes>
        </div>
      </Router>
    </CounterContext.Provider>
  );
};

export default App;