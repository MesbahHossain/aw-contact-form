import router from "./routes/Routes";
import { HashRouter, Routes, Route } from 'react-router-dom';

export const baseUrl = window.location.protocol + "//" + window.location.host;

const App = () => {
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