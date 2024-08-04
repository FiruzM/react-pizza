import axios from "axios";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pagination } from "../components/Pagination";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setFilters } from "../redux/slice/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { popupList } from "../components/Sort";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId, sort, searchValue, currentPage } = useSelector(
    (state: RootState) => state.filter
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMountedRef = useRef(false);

  console.log(isMountedRef.current)
  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    axios
      .get(
        `https://65f191b8034bdbecc7630e6a.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}&${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = popupList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMountedRef.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMountedRef.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
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

      <Pagination />
    </>
  );
};

export default Home;
