import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const fruits = [
    "Apple",
  "Banana",
  "Orange",
  "Apricot",
  "Black rowan",
  "Cranberry"
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <div>
    <h1>List of fruits</h1>
    <ul>
     {fruits.map(item => (
      <li>{item}</li>
    ))}
  </ul>
</div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
