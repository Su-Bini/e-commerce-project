import styles from "./ProductList.module.css";
import ProductCard from "./ProductCard";

interface ProductListProps {
  some: string;
  products: {
    id: number;
    image: string;
    name: string;
    discount: number;
    price: number;
    rating: number;
    today: boolean;
    free: boolean;
    special: boolean;
    todaySale?: number;
  }[];
  max?: string;
}

export default function ProductList({ some, products, max }: ProductListProps) {
  const groupedItemCards = [];
  const groupSize = Number(some);
  const maxCards = max ? Number(max) : Infinity;

  for (let i = 0; i < products.length && i < maxCards; i += groupSize) {
    const group = products.slice(i, i + groupSize);

    groupedItemCards.push(
      <div key={i} className={styles.sort}>
        {group.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            discount={product.discount}
            price={product.price}
            rating={product.rating}
            today={product.today}
            free={product.free}
            special={product.special}
            todaySale={product.todaySale}
          />
        ))}
      </div>
    );
  }

  const cardListContainerStyle = {
    width: some === "3" ? "855px" : "1115px",
  };

  return (
    <div className={styles.cardListcontainer} style={cardListContainerStyle}>
      {groupedItemCards}
    </div>
  );
}
