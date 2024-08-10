import { ShoppingCart } from "lucide-react";
import logo from "../../public/img/pizza-logo.png";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const totalAmount = items.reduce(
    (sum: number, obj: { count: number }) => obj.count + sum,
    0
  );
  const location = useLocation();

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        {location.pathname !== "/cart" && (
          <div className="header__cart">
            <Link to="cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <ShoppingCart />
              <span>{totalAmount}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
