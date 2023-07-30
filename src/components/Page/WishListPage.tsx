import { useEffect, useState } from "react";
import styles from "./WishList.module.css";
import Header from "../Header";
import heartRedSvg from "../../assets/heartRed.svg";

export default function WishListPage() {
  const [wishListItems, setWishListItems] = useState<itemProps[]>([]);

  useEffect(() => {
    const storedWishListItems = JSON.parse(
      localStorage.getItem("wishListItems") || "[]"
    );
    setWishListItems(storedWishListItems);
  }, []);

  const handleRemoveFromWishList = (id: number) => {
    const updatedWishListItems = wishListItems.filter((item) => item.id !== id);
    setWishListItems(updatedWishListItems);
    localStorage.setItem("wishListItems", JSON.stringify(updatedWishListItems));
  };
  const itemsPerGroup = 5;
  const groupedWishListItems = [];
  for (let i = 0; i < wishListItems.length; i += itemsPerGroup) {
    groupedWishListItems.push(wishListItems.slice(i, i + itemsPerGroup));
  }

  interface itemProps {
    id: number;
    name: string;
    image: string;
  }

  return (
    <div>
      <Header />
      <div>
        {groupedWishListItems.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.container}>
            {group.map((item) => (
              <div key={item.id} className={styles.item}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.productImg}
                />
                <div className={styles.name}>{item.name}</div>
                <div
                  className={styles.wish}
                  onClick={() => handleRemoveFromWishList(item.id)}
                >
                  <img src={heartRedSvg} alt={item.name} />
                </div>
              </div>
            ))}
          </div>
        ))}
        {!groupedWishListItems && (
          <div className={styles.none}>찜한 상품이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
