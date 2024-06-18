import React from 'react';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <h2>There is not so much choice:</h2>
            <ul className="app_links">
                <li><a href="http://app1.local">App1</a></li>
                <li><a href="http://app2.local">App2</a></li>
            </ul>
        </div>
    );
};

export default App;