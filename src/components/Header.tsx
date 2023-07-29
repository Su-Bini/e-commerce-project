import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import { useEffect } from "react";

import logoSvg from "../assets/logo.svg";
import heartSvg from "../assets/heart.svg";
import cartSvg from "../assets/cart.svg";

import Button from "./Button";
import Search from "./Search";

export default function Header() {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { title: cartTitle } = state || {};
  const buttonStyle = {
    fontSize: "18px",
    defaultColor: "var(--blackColor)",
    backgroundColor: "transparent",
    hoverColor: "var(--mainColor)",
  };

  const loginStyle = {
    fontSize: "15px",
    defaultColor: "white",
    backgroundColor: "var(--mainColor)",
    hoverBackgroundColor: "#4cb693",
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className={styles.container}>
      <div className={styles.stickyHeader}>
        <Link to={"/"}>
          <div className={styles.logo}>
            <img src={logoSvg} alt="Logo" />
            <div className={styles.text}>집꾸미기</div>
          </div>
        </Link>
        <Search />
        <div className={styles.right}>
          <div
            className={styles.icon}
            onClick={() => navigate("/wishList", { state: cartTitle })}
          >
            <img src={heartSvg} alt="찜하기" />
          </div>
          <div
            className={styles.icon}
            onClick={() => navigate("/cart", { state: cartTitle })}
          >
            <img src={cartSvg} alt="장바구니" />
          </div>
        </div>
      </div>
      <div className={styles.menuContainer}>
        <div className={styles.menu}>
          <Button style={buttonStyle}>쇼핑홈</Button>
          <Link to={"/category/Furniture"}>
            <Button style={buttonStyle}>카테고리</Button>
          </Link>
          <Button style={buttonStyle}>베스트</Button>
          <Button style={buttonStyle}>오늘의딜</Button>
        </div>
        <div className={styles.loginJoin}>
          {user ? (
            <Button style={loginStyle} onClick={handleLogout}>
              로그아웃
            </Button>
          ) : (
            <>
              <Link to={"/users/sign_in"}>
                <Button style={loginStyle}>로그인</Button>
              </Link>
              <Link to={"/users/join"}>
                <Button style={loginStyle}>회원가입</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <hr />
    </div>
  );
}
