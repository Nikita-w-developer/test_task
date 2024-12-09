import React from "react";
import styles from "./Product.module.scss";
import stylus from "../../assets/img/stylus_24dp_UNDEFINED_FILL0_wght400_GRAD0_opsz24.svg";
import close from "../../assets/img/close_24dp_UNDEFINED_FILL0_wght400_GRAD0_opsz24.svg";
import heart from "../../assets/img/favourite.svg";
import fillLike from "../../assets/img/favourite_fill.svg";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavourite,
  ProductType,
  removeItem,
  setCurrentId,
} from "../../redux/Slices/productSlice";
import { setParams } from "../../redux/Slices/editProductSlice";
import { AppDispatch, RootState } from "../../redux/store";

const Product: React.FC<ProductType> = ({
  id,
  title,
  price,
  thumbnail,
  imageUrl,
  description,
}) => {
  const arrLikes = useSelector(
    (state: RootState) => state.productSlice.isLiked
  );
  const items = useSelector((state: RootState) => state.productSlice.items);
  const dispatch = useDispatch<AppDispatch>();

  const _obj = {
    id,
    title,
    price,
    thumbnail,
    imageUrl,
    description,
  };

  const onClickLike = () => {
    dispatch(
      addFavourite({ id, title, price, thumbnail, imageUrl, description })
    );
  };

  const onClickRemove = () => {
    dispatch(
      removeItem({ id, title, price, thumbnail, imageUrl, description })
    );
  };

  const navigate = useNavigate();
  const idRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickCard = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (idRef.current?.contains(target) && !target.closest("button")) {
        dispatch(setCurrentId(id));
        navigate(`/test_task/products/${id}`);
      }
    };
    document.body.addEventListener("click", handleClickCard);
    return () => document.body.removeEventListener("click", handleClickCard);
  }, [id, navigate]);

  const handleClickEdit = () => {
    const params = items.filter((obj: ProductType) => obj.id === _obj.id);
    dispatch(setParams(params[0]));
    navigate("/test_task/edit-product/");
  };

  return (
    <div ref={idRef} className={styles.wrapper}>
      <div className={styles.img}>
        <img src={thumbnail || imageUrl} alt="img" />
      </div>
      <div className={styles.buttons}>
        <button onClick={onClickLike}>
          <img
            className="like"
            src={
              arrLikes.find((obj: ProductType) => obj.id === id)
                ? fillLike
                : heart
            }
            alt="like"
          />
        </button>
        <button onClick={onClickRemove}>
          <img src={close} alt="x" />
        </button>
        <button onClick={handleClickEdit}>
          <img src={stylus} alt="edit" />
        </button>
      </div>
      <div className={styles.descr}>
        <h5>{title}</h5>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default Product;
