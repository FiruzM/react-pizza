import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slice/cartSlice";
import { RootState } from "../../redux/store";
interface PizzaProps {
  id: number;
  title: string;
  types: number[];
  sizes: number[];
  imageUrl: string;
  price: number;
}

const typesName = ["тонкое", "традиционное"];

const PizzaBlock = ({
  id,
  title,
  types,
  sizes,
  imageUrl,
  price,
}: PizzaProps) => {
  const [size, setSize] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const dispatch = useDispatch();

  const { items } = useSelector((state: RootState) => state.cart);

  const countItem = items.find((obj) => obj.id === id);

  const onSizeClick = (index: number) => {
    setSize(index);
  };

  const item = {
    id,
    imageUrl,
    title,
    price,
    size: sizes[size],
    type: typesName[activeType],
  };

  const onClickAdd = () => {
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type: number) => (
            <li
              key={type}
              onClick={() => setActiveType(type)}
              className={activeType === type ? "active" : ""}
            >
              {typesName[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((sizeNumber: number, index: number) => (
            <li
              key={index}
              onClick={() => onSizeClick(index)}
              className={size === index ? "active" : ""}
            >
              {sizeNumber} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {countItem && <i>{countItem.count}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
