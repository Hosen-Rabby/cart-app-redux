import logo from "./logo.svg";
import "./App.css";
import ProductPage from "./components/ProductPage";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import CartPage from "./components/CartPage";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductPage />
      </div>
    </Provider>
  );
}

export default App;
