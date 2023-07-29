import styles from "./TodaySale.module.css";
import todaySaleData from "../todaySale.json";
import ProductList from "./ProductList";

export default function TodaySale() {
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

  return (
    <div className={styles.container}>
      <ProductList some="4" max="4" products={todaySaleProducts} />
    </div>
  );
}
