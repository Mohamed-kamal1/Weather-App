import React from 'react';
import ErrorBoundary from './Components/ErrorBoundary';
import './App.css'
import Weather from "./Components/Weather.jsx";

function App() {
    return (
        <>
            <div className="w-full flex justify-center items-center my-40">
                <ErrorBoundary>
                    <Weather />
                </ErrorBoundary>
            </div>
        </>
    )
}

export default App
