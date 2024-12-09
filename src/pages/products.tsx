import React from "react";
import Product from "../components/Product";
import Sort from "../components/Sort";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  ProductType,
  setSearchValue,
} from "../redux/Slices/productSlice";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AppDispatch, RootState } from "../redux/store";

const Products: React.FC = () => {
  const { items, isLiked, sort, searchValue } = useSelector(
    (state: RootState) => state.productSlice
  );
  const formData = useSelector((state: RootState) => state.newProductSlice);
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [itemsPerPage] = React.useState(12);

  const getItems = async () => {
    dispatch(fetchProduct());
  };

  React.useEffect(() => {
    localStorage.setItem("productItems", JSON.stringify(items));
  }, [items]);

  React.useEffect(() => {
    if (!items || items.length === 0) {
      getItems();
    }
  }, []);

  const filteredItems = items.filter((obj: ProductType) =>
    obj.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: ProductType[] = filteredItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const cards: React.ReactNode[] = currentItems.map((item: ProductType) => (
    <Product
      key={item.description}
      id={item.id}
      title={item.title}
      price={item.price}
      thumbnail={item.thumbnail}
      imageUrl={item.imageUrl}
      description={item.description}
    />
  ));

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div>
      <div className="header">
        <Sort />
        <div className="search-product">
          <input
            value={searchValue}
            onChange={(event) => dispatch(setSearchValue(event.target.value))}
            className="search-product__input"
            placeholder="Поиск товара..."
            type="text"
          />
        </div>
        <Link to={"/test_task/create-product/"}>
          <button>Создать карточку</button>
        </Link>
      </div>
      {sort.property === "all" && (
        <div className="product_wrapper">
          {items.length > 0 ? cards : <span>Loading data</span>}
        </div>
      )}
      {sort.property === "liked" && (
        <div className="product_wrapper">
          {isLiked.length > 0 ? (
            isLiked.map((obj: ProductType) => {
              const product = items.find(
                (item: ProductType) => item.id === obj.id
              );

              if (product) {
                return (
                  <Product
                    key={obj.id}
                    {...product}
                    imageUrl={formData.imageUrl}
                  />
                );
              }

              return null;
            })
          ) : (
            <span>Вы еще ничего не добавили</span>
          )}
        </div>
      )}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        breakLabel={"..."}
        pageRangeDisplayed={pageCount > 5 ? 5 : pageCount}
      />
    </div>
  );
};

export default Products;
