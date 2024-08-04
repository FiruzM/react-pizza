import ReactPaginate from "react-paginate";
import { setCurrentPage } from "../../redux/slice/filterSlice";
import styles from "./Pagination.module.scss";
import { useDispatch } from "react-redux";

export const Pagination = () => {
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event: { selected: number }) =>
        dispatch(setCurrentPage(event.selected + 1))
      }
      pageRangeDisplayed={4}
      pageCount={3}
    />
  );
};
