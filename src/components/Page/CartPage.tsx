import { useState } from "react";
import Header from "../Header";
import styles from "./CartPage.module.css";
import Badge from "../Badge";
import Button from "../Button";
import cx from "clsx";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface itemProps {
  id: number;
  name: string;
  price: number;
  today?: boolean;
  free?: boolean;
  image: string;
}

export default function CartPage() {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = auth.currentUser;
        setUser(currentUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [auth]);

  const handlePurchase = () => {
    if (!user) {
      navigate("/users/sign_in");
      return;
    }
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    alert(
      "선택된 상품: " + selectedProducts.map((item) => item.name).join(", ")
    );
    alert("결제합니다!");
    const updatedCartItems = cartItems.filter(
      (item) => !selectedItems.includes(item.id)
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setSelectedItems([]);
  };

  const todayBadge = {
    fontSize: "15px",
    color: "#8320d4",
    backgroundColor: "transparent",
    width: "70px",
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const cartItems: itemProps[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleCheckboxChange = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeleteItem = (itemId: number) => {
    const updatedItems = cartItems.filter(
      (item: itemProps) => item.id !== itemId
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  const getTotalPrice = () => {
    const totalPrice = selectedItems.reduce((total, itemId) => {
      const selectedItem = cartItems.find((item) => item.id === itemId);
      return selectedItem ? total + selectedItem.price : total;
    }, 0);
    return totalPrice;
  };
  const payStyle = {
    fontSize: "15px",
    defaultColor: "white",
    backgroundColor: "var(--mainColor)",
    hoverBackgroundColor: "#4cb693",
  };

  return (
    <div>
      <Header />
      <div className={cx(styles.flex, styles.spaceBetween)}>
        <div>
          {!cartItems && (
            <div className={styles.none}>장바구니에 상품이 없습니다.</div>
          )}
          {cartItems.map((item: itemProps) => (
            <div key={item.id} className={styles.container}>
              <div className={cx(styles.flex, styles.spaceBetween)}>
                <div className={styles.front}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  {item.today && (
                    <div className={styles.today}>
                      <Badge key={item.id} style={todayBadge}>
                        오늘출발
                      </Badge>
                      <div>평일 12:00까지 결제시</div>
                    </div>
                  )}
                </div>
                <button onClick={() => handleDeleteItem(item.id)}>X</button>
              </div>
              <div className={cx(styles.flex, styles.flexStart)}>
                <img src={item.image} alt={item.name} />
                <div className={styles.flexColumn}>
                  <div className={styles.title}>{item.name}</div>
                  {item.free && <div>무료배송 | 일반택배</div>}
                  <div> {item.price}$</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={cx(styles.flexColumn, styles.pay)}>
          <div>결제금액 {getTotalPrice()}$</div>
          {user ? (
            <Button style={payStyle} onClick={handlePurchase}>
              구매하기
            </Button>
          ) : (
            <Button
              style={{ ...payStyle, backgroundColor: "var(--grayColor)" }}
              onClick={() => navigate("/users/sign_in")}
            >
              로그인을 해주세요
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
