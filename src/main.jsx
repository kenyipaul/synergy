import { Provider } from "react-redux";
import ReactDOM from "react-dom/client"
import store from "./store/store";
import "./styles/main.scss"
import App from "./app";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);