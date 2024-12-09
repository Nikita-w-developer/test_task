import React from "react";
import { useSelector } from "react-redux";
import ProductInfo from "./pages/productInfo";
import Products from "./pages/products";
import ProductCreation from "./pages/productCreation";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import ProductEditing from "./pages/productEditing";
import { RootState } from "./redux/store";
import NotFoundPage from "./pages/notFoundPage";

const App: React.FC = () => {
  const i = useSelector((state: RootState) => state.productSlice.currentId);

  return (
    <div className="app">
      <Routes>
        <Route path={"test_task/products"} element={<Products />}></Route>
        <Route
          path={`test_task/products/${i}`}
          element={<ProductInfo i={i} />}
        ></Route>
        <Route
          path={"test_task/create-product"}
          element={<ProductCreation />}
        ></Route>
        <Route
          path={"test_task/edit-product"}
          element={<ProductEditing />}
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
