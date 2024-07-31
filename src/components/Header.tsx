import { ShoppingCart } from "lucide-react";
import logo from "../../public/img/pizza-logo.png";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
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
        <div className="header__cart">
          <a href="/cart.html" className="button button--cart">
            <span>520 ₽</span>
            <div className="button__delimiter"></div>
            <ShoppingCart />
            <span>3</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
