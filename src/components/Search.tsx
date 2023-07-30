import styles from "./Search.module.css";
import { FormEvent, useState, useEffect } from "react";
import searchSvg from "../assets/search.svg";
import itemsData from "../items.json";
import todaySaleData from "../todaySale.json";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const combinedData: Product[] = [...itemsData, ...todaySaleData];

    const filteredItems = combinedData.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );

    setSearchResults(filteredItems);
  }, [keyword]);

  const handleProductClick = (productName: string) => {
    setKeyword(productName);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchResults.length > 0) {
      const firstProduct = searchResults[0];
      setKeyword(firstProduct.name);
      navigate(
        `/product/${firstProduct.id}/${encodeURIComponent(firstProduct.name)}`
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <img src={searchSvg} alt="검색" className={styles.img} />
        <form onSubmit={handleFormSubmit} className={styles.form}>
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
              <div key={result.id}>
                <li
                  className={`${styles.list} ${styles.hoverable}`}
                  onClick={() => handleProductClick(result.name)}
                >
                  {result.name}
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
