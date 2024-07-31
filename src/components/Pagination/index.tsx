import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

export const Pagination = ({ onChangePage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event: { selected: number }) =>
      onChangePage(event.selected + 1)
    }
    pageRangeDisplayed={4}
    pageCount={3}
  />
);
