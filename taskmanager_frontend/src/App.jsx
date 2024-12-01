import React from 'react';
import TodoApp from "./components/TodoApp.jsx";
import AuthProvider from './context/AuthProvider';
import './index.css';


function App() {
    return (
        <AuthProvider> {/* Wrap TodoApp with AuthProvider.jsx */}
            <div className="App">
                <TodoApp />
            </div>
        </AuthProvider>
    );
}

export default App;
