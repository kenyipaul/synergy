import { Provider } from "react-redux";
import ReactDOM from "react-dom/client"
import store from "./store/store";
import "./styles/main.scss"
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import SocketProvider from "./providers/socketProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
    <SocketProvider>
        <Provider store={store}>
                <RouterProvider router={router} />
        </Provider>
    </SocketProvider>
);