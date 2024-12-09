import React from "react";
import Product from "../components/Product";
import ProductForm from "../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { setForm } from "../redux/Slices/newProductSlice";
import { AppDispatch, RootState } from "../redux/store";
import { ProductType } from "../redux/Slices/productSlice";

const ProductCreation: React.FC = () => {
  const formData = useSelector((state: RootState) => state.newProductSlice);
  const dispatch = useDispatch<AppDispatch>();

  const handleFormSubmit = (formData: ProductType) => {
    dispatch(setForm(formData));
  };

  return (
    <div className="creation-page">
      <div className="new-product">
        <Product {...formData} />
      </div>
      <ProductForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ProductCreation;
