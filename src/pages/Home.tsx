import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { useCallback, useEffect, useRef } from "react";
import { Pagination } from "../components/Pagination";
import { useAppDispatch, type RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { setCategoryId, setFilters } from "../redux/slice/filterSlice";
import { fetchPizza } from "../redux/slice/pizzaSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { popupList } from "../components/Sort";

const Home = () => {
  const { categoryId, sort, searchValue, currentPage } = useSelector(
    (state: RootState) => state.filter
  );
  const { items, status } = useSelector((state: RootState) => state.pizza);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMountedRef = useRef(false);

  const getPizza = () => {
    const category = categoryId ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchPizza({
        currentPage,
        category,
        sortBy,
        order,
        search,
      }) 
    );
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
    getPizza();
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
  }, [categoryId, sort.sortProperty, searchValue, currentPage, navigate]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map(
                (item) => <PizzaBlock {...item} key={item.id} />
              )}
        </div>
      )}

      <Pagination />
    </>
  );
};

export default Home;
