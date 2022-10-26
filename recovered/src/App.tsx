import { BrowserRouter } from "react-router-dom";

import { LoggedProvider } from "context/logged";

import RouteHandler from "routes/RouteHandler";

function App() {
    return (
        <BrowserRouter basename="alurageek">
            <LoggedProvider>
                <RouteHandler />
            </LoggedProvider>
        </BrowserRouter>
    );
}

export default App;