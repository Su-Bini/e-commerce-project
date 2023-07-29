import Header from "../Header";
import itemsData from "../../items.json";
import todaySaleData from "../../todaySale.json";
import styles from "./ProductPage.module.css";
import Badge from "../Badge";
import Button from "../Button";
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductPage() {
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
  const buttonStyle = {
    fontSize: "18px",
    defaultColor: "white",
    backgroundColor: "var(--mainColor)",
    hoverBackgroundColor: "#4cb693",
  };
  const todaySaleBadge = {
    fontSize: "15px",
    color: "white",
    backgroundColor: "#f66161",
    borderRadius: "3px",
    width: "auto",
  };

  const { docID, docName } = useParams<{ docID?: string; docName?: string }>();

  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const navigate = useNavigate();
  const [addedProduct, setAddedProduct] = useState<{
    name?: string;
    id?: number;
  }>({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("lastClickedProduct", JSON.stringify(addedProduct));
  }, [addedProduct]);

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

  if (!docID || !docName) {
    return <div>Product not found</div>;
  }

  const decodedDocName = decodeURIComponent(docName);

  const ItemProduct = itemsData.find(
    (item) => item.id === parseInt(docID) && item.name === decodedDocName
  );
  const SaleProduct = todaySaleData.find(
    (item) => item.id === parseInt(docID) && item.name === decodedDocName
  );
  const product = ItemProduct || SaleProduct;

  if (!ItemProduct && !SaleProduct && !product) {
    return <div>Product not found</div>;
  }
  interface itemProps {
    id: number;
    name: string;
    price: number;
    today?: boolean;
    free?: boolean;
    image: string;
  }
  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    if (!cartItems.some((item: itemProps) => item.id === product?.id)) {
      cartItems.push(product);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    setAddedProduct({ name: product?.name, id: product?.id });

    navigate("/cart", {
      state: {
        addedTitle: product?.name,
        addedProductId: product?.id,
        addedPrice: product?.price,
        addedToday: product?.today,
        addedFree: product?.free,
        addedImage: product?.image,
      },
    });
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={product?.image} alt={product?.name} />
        </div>
        {SaleProduct?.todaySale && (
          <div className={styles.todaySale}>
            {SaleProduct?.todaySale === 1 ? (
              <Badge style={todaySaleBadge}>{remainingTime} 남음</Badge>
            ) : (
              <Badge style={todaySaleBadge}>
                {SaleProduct?.todaySale}일 남음
              </Badge>
            )}
          </div>
        )}

        <div className={styles.rightContainer}>
          <div className={styles.title}>{product?.name}</div>
          <StarRatings
            rating={Math.floor(Number(product?.rating))}
            starRatedColor="var(--mainColor)"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
          />
          <div className={styles.flex}>
            <div className={styles.percent}>{product?.discount}%</div>
            <div className={styles.price}>{product?.price}$</div>
            {product?.specialPrice && <Badge style={specialBadge}>특가</Badge>}
            {product?.today && <Badge style={todayBadge}>오늘출발</Badge>}
          </div>
          {product?.today && (
            <span className={styles.discription}>평일 13:00까지 결제시</span>
          )}
          <div className={styles.flex}>
            {product?.free && (
              <div className={styles.flex}>
                <div className={styles.discription}>배송</div>
                <Badge style={freeBadge}>무료배송</Badge>
              </div>
            )}
          </div>
          <div className={styles.discription}>주문금액</div>
          <div className={styles.flex}>
            <Button style={buttonStyle} onClick={handleAddToCart}>
              장바구니
            </Button>

            <Button style={buttonStyle}>바로구매</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
