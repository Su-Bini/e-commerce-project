import { useEffect, useState } from "react";
import Badge from "./Badge";
import styles from "./ProductCard.module.css";
import starSvg from "../assets/star.svg";
import heartSvg from "../assets/heart.svg";
import heartRedSvg from "../assets/heartRed.svg";
import { Link } from "react-router-dom";

interface ProductProps {
  id: number;
  image: string;
  name: string;
  discount: number;
  price: number;
  rating: number;
  today?: boolean;
  free?: boolean;
  special?: boolean;
  todaySale?: number;
}

export default function ProductCard({
  id,
  image,
  name,
  discount,
  price,
  rating,
  today,
  free,
  special,
  todaySale,
}: ProductProps) {
  const todayBadge = {
    fontSize: "15px",
    color: "#8320d4",
    backgroundColor: "transparent",
    width: "70px",
  };
  const freeBadge = {
    fontSize: "12px",
    color: "#646f7c",
    backgroundColor: "#d9dadb",
    borderRadius: "3px",
    width: "60px",
  };
  const specialBadge = {
    fontSize: "11px",
    color: "white",
    backgroundColor: "#f66161",
    borderRadius: "3px",
    width: "35px",
  };
  const todaySaleBadge = {
    fontSize: "15px",
    color: "white",
    backgroundColor: "#f66161",
    borderRadius: "3px",
    width: "auto",
  };

  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  const [isWishListed, setIsWishListed] = useState(false);

  useEffect(() => {
    const wishListItems = JSON.parse(
      localStorage.getItem("wishListItems") || "[]"
    );
    setIsWishListed(wishListItems.some((item: itemProps) => item.id === id));
  }, [id]);

  const handleAddToWish = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const wishListItems = JSON.parse(
      localStorage.getItem("wishListItems") || "[]"
    );

    if (!wishListItems.some((item: itemProps) => item.id === id)) {
      wishListItems.push({ id, name, image });
      localStorage.setItem("wishListItems", JSON.stringify(wishListItems));
      setIsWishListed(true);
    } else {
      const updatedList = wishListItems.filter(
        (item: itemProps) => item.id !== id
      );
      localStorage.setItem("wishListItems", JSON.stringify(updatedList));
      setIsWishListed(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  interface itemProps {
    id: number;
    name: string;
    image: string;
  }

  function getRemainingTime(): string {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const remainingTime = Math.floor(
      (midnight.getTime() - now.getTime()) / 1000
    );
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={image} alt={name} className={styles.productImg} />
      </div>
      {todaySale ? (
        <div className={styles.todaySale}>
          {todaySale === 1 ? (
            <Badge style={todaySaleBadge}>{remainingTime} 남음</Badge>
          ) : (
            <Badge style={todaySaleBadge}>{todaySale}일 남음</Badge>
          )}
        </div>
      ) : null}
      <div className={styles.wish} onClick={handleAddToWish}>
        {isWishListed ? (
          <img src={heartRedSvg} alt={name} />
        ) : (
          <img src={heartSvg} alt={name} />
        )}
      </div>
      <Link
        to={`/product/${id}/${name}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={styles.mLContainer}>
          <div className={`${styles.title} ${styles.marginBottom}`}>{name}</div>
          <div className={`${styles.flex} ${styles.marginBottom}`}>
            <div className={styles.percent}>{discount}%</div>
            <div className={styles.price}>{price}$</div>
          </div>
          <div className={`${styles.flex} ${styles.marginBottom}`}>
            <img src={starSvg} alt="별점" className={styles.star}></img>
            <div className={styles.rating}>{rating}</div>
          </div>

          {today && (
            <div className={styles.marginBottom}>
              <Badge style={todayBadge}>오늘출발</Badge>
              <span className={styles.today}>평일 13:00까지 결제시</span>
            </div>
          )}
          <div className={`${styles.flex} ${styles.marginBottom}`}>
            {free && <Badge style={freeBadge}>무료배송</Badge>}
            {special && <Badge style={specialBadge}>특가</Badge>}
          </div>
        </div>
      </Link>
    </div>
  );
}
