import Header from "../Header";
import styles from "./NotFoundBlock.module.scss";
import { Link } from "react-router-dom";

export const NotFoundBlock = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className={styles.root}>
            <h1>
              <span>😕</span>
              <br />
              Ничего не найдено
            </h1>
            <p className={styles.description}>
              К сожалени данная страница отсутствует в нашем интернет-магазине
            </p>
            <Link to="/">back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
