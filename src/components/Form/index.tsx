import React from "react";
import styles from "./Form.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setForm, incrementId } from "../../redux/Slices/newProductSlice";
import { ProductType, setNewItem } from "../../redux/Slices/productSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";

type ProductFormProps = {
  onSubmit: (_editDara: ProductType) => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const formData = useSelector((state: RootState) => state.newProductSlice);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  React.useEffect(() => {
    let savedFormData: ProductType[] = [];
    try {
      const storedItems = localStorage.getItem("productItems");
      if (storedItems) {
        savedFormData = JSON.parse(storedItems);
      } else {
        savedFormData = [];
      }
    } catch (error) {
      console.error("Error parsing products from localStorage:", error);
      savedFormData = [];
    }
    if (savedFormData.length > 0) {
      dispatch(setForm(savedFormData[savedFormData.length - 1]));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(setForm({ ...formData, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const _result = reader.result as string;
        dispatch(setForm({ ...formData, thumbnail: _result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSaveCard();
    if (onSubmit) onSubmit(formData);
  };

  const handleSaveCard = () => {
    dispatch(incrementId());
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
    const updatedFormData = { ...formData, id: formData.id };
    products.push(updatedFormData);
    localStorage.setItem("productItems", JSON.stringify(products));
    dispatch(setNewItem(formData));
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
              value={formData.title}
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
              value={formData.price}
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
              value={formData.description}
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
              onChange={handleFileChange}
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

export default ProductForm;
