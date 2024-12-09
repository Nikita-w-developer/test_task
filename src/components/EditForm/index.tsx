import React from "react";
import styles from "./EditForm.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  replaceSlice,
  setFormField,
  setFormImage,
} from "../../redux/Slices/replaceProductSlice";
import { ProductType, replacedItem } from "../../redux/Slices/productSlice";
import { setParams } from "../../redux/Slices/editProductSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

type EditFormProps = {
  onSubmit: (_editDara: ProductType) => void;
  id: number;
};

const EditFrom: React.FC<EditFormProps> = ({ onSubmit, id }) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.editProductSlice);
  const editData = useSelector((state: RootState) => state.replaceProductSlice);
  const navigate = useNavigate();

  React.useEffect(() => {
    let products: ProductType[] = [];
    try {
      const storedItems = localStorage.getItem("productItems");
      if (storedItems) {
        products = JSON.parse(storedItems);
      } else {
        products = [];
      }
    } catch (error) {
      console.error("Error parsing products from localStorage:", error);
      products = [];
    }
    const product = products.find((item: { id: number }) => item.id === id);
    if (product) {
      dispatch(setFormField({ field: "title", value: product.title }));
      dispatch(setFormField({ field: "price", value: product.price }));
      dispatch(
        setFormField({ field: "description", value: product.description })
      );
      dispatch(setFormField({ field: "imageUrl", value: product.imageUrl }));
    }
  }, [id, dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof replaceSlice;
    const value: string | number = event.target.value;
    // const { name, value } = event.target;
    dispatch(setFormField({ field: name, value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const _result = reader.result as string;
        dispatch(setFormImage({ ...editData, imageUrl: _result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSaveCard();
    if (onSubmit) onSubmit(editData);
  };

  const handleSaveCard = () => {
    let products: ProductType[] = [];
    try {
      const storedItems = localStorage.getItem("productItems");
      if (storedItems) {
        products = JSON.parse(storedItems);
      } else {
        products = [];
      }
    } catch (error) {
      console.error("Error parsing products from localStorage:", error);
      products = [];
    }
    const currentId = data.id;
    const updatedFormData = { ...editData, id: currentId };
    const productsUpdate = products.map((obj: ProductType) =>
      obj.id === data.id ? { ...obj, ...updatedFormData } : obj
    );
    localStorage.setItem("productItems", JSON.stringify(productsUpdate));
    dispatch(replacedItem(productsUpdate));
    dispatch(setParams(updatedFormData));
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              placeholder="Название товара:"
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Цена:"
              type="number"
              name="price"
              value={editData.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Описание:"
              name="description"
              value={editData.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Картинка:
            <input
              className={styles.lastInput}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>
        </div>
        <button type="submit">Сохранить</button>
      </form>
      <button onClick={() => navigate("/test_task/products")}>🔙</button>
    </div>
  );
};

export default EditFrom;
