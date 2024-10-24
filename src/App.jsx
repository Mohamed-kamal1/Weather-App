import React from 'react';
import ErrorBoundary from './Components/ErrorBoundary';
import './App.css'
import Weather from "./Components/Weather.jsx";

function App() {
    return (
        <>
            <div
                style={{
                    minHeight: '100vh',
                }}
                className="w-full flex justify-center items-center my-auto ">
                <ErrorBoundary>
                    <Weather />
                </ErrorBoundary>
            </div>
        </>
    )
}

export default App
