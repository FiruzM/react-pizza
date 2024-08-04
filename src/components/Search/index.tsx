import styles from "./Search.module.scss";
import { RootState } from "../../redux/store";
import { setSearchValue } from "../../redux/slice/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { useCallback, useRef, useState } from "react";

const Search = () => {
  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );

  const [value, setValue] = useState(searchValue);

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const test = useCallback(
    debounce((eventValue) => {
      dispatch(setSearchValue(eventValue));
    }, 1000),
    []
  );

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const onSearchValue = (e) => {
    setValue(e.target.value);
    test(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>

      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Поиск..."
        value={value}
        onChange={onSearchValue}
      />

      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
