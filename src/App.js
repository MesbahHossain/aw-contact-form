import React, { useEffect } from 'react';
import router from "./routes/Routes";
import { HashRouter, Routes, Route } from 'react-router-dom';

export const baseUrl = window.location.protocol + "//" + window.location.host;

const App = () => {
    /* Make the background dark if it's the first page */
    useEffect(() => {
        const updateBodyClass = () => {
          const promptWrapperElement = document.querySelector('.prompt-wrapper');
          if (promptWrapperElement) {
            document.body.classList.add('bgDark');
          } else {
            document.body.classList.remove('bgDark');
          }
        };
    
        updateBodyClass();
    
        // Set up a MutationObserver to watch for changes in the DOM
        const observer = new MutationObserver(updateBodyClass);
        observer.observe(document.body, { childList: true, subtree: true });
    
        // Cleanup the observer when the component unmounts
        return () => {
          observer.disconnect();
        };
    }, []);

    return (
        <HashRouter>
            <Routes>
                {router.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={<route.element />}
                    />
                ))}
            </Routes>
        </HashRouter>
    );
}

export default App;