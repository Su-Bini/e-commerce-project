import styles from "./Search.module.css";
import { FormEvent, useState, useEffect } from "react";
import searchSvg from "../assets/search.svg";
import itemsData from "../items.json";
import todaySaleData from "../todaySale.json";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  discount: number;
  specialPrice: boolean;
  today: boolean;
  free: boolean;
  Popular: boolean;
}

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(keyword);
  };

  useEffect(() => {
    const combinedData: Product[] = [...itemsData, ...todaySaleData];

    const filteredItems = combinedData.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );

    setSearchResults(filteredItems);
  }, [keyword]);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <img src={searchSvg} alt="검색" className={styles.img} />
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="상품검색"
            className={styles.input}
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </form>
      </div>
      <div className={styles.keyWord}>
        {keyword && (
          <ul className={styles.ul}>
            {searchResults.map((result: Product) => (
              <Link to={`/product/${result.id}/${result.name}`}>
                <div>
                  <li
                    key={result.id}
                    className={`${styles.list} ${styles.hoverable}`}
                  >
                    {result.name}
                  </li>
                </div>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
