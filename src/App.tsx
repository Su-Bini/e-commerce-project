import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginPage from "./components/Page/LoginPage";
import JoinPage from "./components/Page/JoinPage";
import MainPage from "./components/Page/MainPage";
import CategoryPage from "./components/Page/CategoryPage";
import ProductPage from "./components/Page/ProductPage";
import CartPage from "./components/Page/CartPage";
import WishListPage from "./components/Page/WishListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainPage />}></Route>
        <Route path={"/users/sign_in"} element={<LoginPage />} />
        <Route path={"/users/join"} element={<JoinPage />} />
        <Route path={"/category/:category"} element={<CategoryPage />} />
        <Route path={"/product"}>
          <Route path=":docID">
            <Route path=":docName" element={<ProductPage />} />
          </Route>
        </Route>
        <Route path={"/cart"} element={<CartPage />} />
        <Route path={"/wishList"} element={<WishListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
