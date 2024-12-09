import React from "react";
import Product from "../components/Product";
import EditFrom from "../components/EditForm";
import { useDispatch, useSelector } from "react-redux";
import {
  replaceSlice,
  setFormField,
} from "../redux/Slices/replaceProductSlice";
import { AppDispatch, RootState } from "../redux/store";
import { ProductType } from "../redux/Slices/productSlice";

const ProductEditing: React.FC = () => {
  const editingData = useSelector((state: RootState) => state.editProductSlice);
  const newData = useSelector((state: RootState) => state.replaceProductSlice);
  const dispatch = useDispatch<AppDispatch>();

  const handleFormSubmit = (editingData: ProductType) => {
    Object.keys(editingData).forEach((key) => {
      const field = key as keyof typeof editingData;
      const value = editingData[field];

      dispatch(setFormField({ field, value }));
    });
  };

  return (
    <div className="creation-page">
      <div className="new-product">
        <Product {...editingData} />
      </div>
      <EditFrom id={editingData.id} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ProductEditing;
