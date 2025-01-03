import { Provider } from "react-redux";
import ReactDOM from "react-dom/client"
import store from "./store/store";
import "./styles/main.scss"
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);