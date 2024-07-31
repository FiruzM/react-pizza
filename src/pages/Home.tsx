import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "../components/Pagination";
import { searchContext } from "../App";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slice/filterSlice";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { categoryID, sort } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const categoryId = categoryID ? `category=${categoryID}` : "";
  const sortBy = sort.sortProperty.replace("-", "");
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";

  const { searchValue } = useContext(searchContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://65f191b8034bdbecc7630e6a.mockapi.io/items?limit=4&page=${currentPage}&${categoryId}&sortBy=${sortBy}&order=${order}&search=${searchValue}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, [categoryId, sortBy, order, currentPage, searchValue]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryID}
          onClickCategory={(id: number) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map(
              (item: {
                id: number;
                title: string;
                price: number;
                imageUrl: string;
                sizes: number[];
                types: number[];
              }) => <PizzaBlock {...item} key={item.id} />
            )}
      </div>

      <Pagination onChangePage={(page: number) => setCurrentPage(page)} />
    </>
  );
};

export default Home;
