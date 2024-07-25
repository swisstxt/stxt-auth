import React from 'react';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <h2>There is not so much choice:</h2>
            <ul className="app_links">
                <li><a href="//app1.stxt-auth.localhost">App1</a></li>
                <li><a href="//app2.stxt-auth.localhost">App2</a></li>
            </ul>
        </div>
    );
};

export default App;