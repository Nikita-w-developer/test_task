import React from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/Slices/productSlice";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";

type ProductInfoProps = {
  i: number;
};
const ProductInfo: React.FC<ProductInfoProps> = ({ i }) => {
  const items = useSelector((state: RootState) => state.productSlice.items);
  const dispatch = useDispatch<AppDispatch>();

  const getItems = async () => {
    dispatch(fetchProduct());
  };

  React.useEffect(() => {
    if (!items || items.length === 0) {
      getItems();
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("productItems", JSON.stringify(items));
  }, [items]);

  const item = items.find((obj: { id: number }) => obj.id === i);
  if (item) {
    return (
      <div>
        <div className="info_wrapper">
          <Product {...item} id={i} />
          <div className="description">
            <h3>{item.description}</h3>
          </div>
        </div>
        <div className="go-to-back">
          <Link to={"/test_task/products"}>
            <button>Вернуться назад</button>
          </Link>
        </div>
      </div>
    );
  }
};

export default ProductInfo;
