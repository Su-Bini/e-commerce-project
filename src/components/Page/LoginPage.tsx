import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import google from "../../assets/google.jpg";
import logoSvg from "../../assets/logo.svg";
import { User } from "firebase/auth";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleEmailPasswordLogin() {
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (!email || !password) {
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      console.log(user);
      setUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("회원가입된 이메일과 비밀번호가 아닙니다.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logoSvg} alt="Logo" />
      </div>
      <form
        method="post"
        action="서버의url"
        id="login-form"
        className={styles.form}
      >
        <input
          type="email"
          name="userName"
          placeholder="이메일"
          ref={emailInputRef}
        />
        <input
          type="password"
          name="userPassword"
          placeholder="비밀번호"
          ref={passwordInputRef}
        />

        <button type="button" onClick={handleEmailPasswordLogin}>
          로그인
        </button>
      </form>
      <Link to={"/users/join"}>
        <div className={styles.title}>회원가입하러 가기</div>
      </Link>
      <div className={styles.discription}>SNS계정으로 간편 로그인</div>
      <a onClick={handleGoogleLogin}>
        <img src={google} alt="구글" className={styles.img} />
      </a>
      {user && <Link to={"/"}>홈으로 이동</Link>}
    </div>
  );
}
