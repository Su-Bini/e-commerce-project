import styles from "./MainPage.module.css";
import Header from "../Header";
import Banner from "../Banner";
import ProductList from "../ProductList";
import CategoryWidth from "../CategoryWidth";
import itemsData from "../../items.json";
import todaySaleData from "../../todaySale.json";
import Button from "../Button";

export default function MainPage() {
  const popularProducts = itemsData
    .filter((item) => item.Popular === true)
    .map((item) => ({
      id: item.id,
      image: item.image,
      name: item.name,
      discount: item.discount,
      price: item.price,
      rating: item.rating,
      today: item.today,
      free: item.free,
      special: item.specialPrice,
    }));

  const todaySaleProducts = todaySaleData.map((item) => ({
    id: item.id,
    image: item.image,
    name: item.name,
    discount: item.discount,
    price: item.price,
    rating: item.rating,
    today: item.today,
    free: item.free,
    special: item.specialPrice,
    todaySale: item.todaySale,
  }));

  const moreStyle = {
    fontSize: "20px",
    defaultColor: "var(--mainColor)",
    backgroundColor: "transparent",
    hoverColor: "#4cb693",
  };
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Banner />
        <div className={styles.flex}>
          <div className={styles.title}>오늘의 딜</div>
          <Button style={moreStyle}>더보기</Button>
        </div>
        <ProductList some="4" max="4" products={todaySaleProducts} />
        <div className={styles.flex}>
          <div className={styles.title}>카테고리별 상품 찾기</div>
        </div>
        <CategoryWidth />
        <div className={styles.flex}>
          <div className={styles.title}>인기 상품</div>
        </div>
        <ProductList some="4" products={popularProducts} />
      </div>
    </div>
  );
}
