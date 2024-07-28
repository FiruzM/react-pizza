import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { useEffect, useState } from "react";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(0);
  const [sort, setSort] = useState({
    name: "популярности(DESC)",
    sortProperty: "rating",
  });

  const categoryId = category ? `category=${category}` : "";
  const sortBy = sort.sortProperty.replace("-", "");
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://65f191b8034bdbecc7630e6a.mockapi.io/items?${categoryId}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, [categoryId, sortBy, order]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={category}
          onClickCategory={(id: number) => setCategory(id)}
        />
        <Sort value={sort} onSelected={(obj) => setSort(obj)} />
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
    </>
  );
};

export default Home;
