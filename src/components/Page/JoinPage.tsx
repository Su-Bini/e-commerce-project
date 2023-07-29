import styles from "./JoinPage.module.css";
import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { getAuth } from "firebase/auth";
import google from "../../assets/google.jpg";

export default function JoinPage() {
  const [values, setValues] = useState({
    userEmail: "",
    password: "",
    passwordCheck: "",
    name: "",
  });
  const navigate = useNavigate();

  const valueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.password !== values.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (
      values.password.length < 8 ||
      !/\d/.test(values.password) ||
      !/[a-zA-Z]/.test(values.password)
    ) {
      alert("비밀번호는 영문과 숫자를 포함한 8자 이상이어야 합니다.");
      return;
    }

    try {
      const auth = getAuth();

      const signInMethods = await fetchSignInMethodsForEmail(
        auth,
        values.userEmail
      );

      if (signInMethods.length > 0) {
        alert("이미 가입된 이메일입니다. 로그인해주세요.");
        return;
      }

      await createUserWithEmailAndPassword(
        auth,
        values.userEmail,
        values.password
      );

      alert("회원가입이 성공적으로 완료되었습니다!");
      navigate("/users/sign_in");
    } catch (error) {
      console.error("사용자 생성 오류:", error);
    }
  };

  const handleLoginClick = () => {
    navigate("/users/sign_in");
  };
  return (
    <div className={styles.container}>
      <h3>회원가입</h3>
      <span>SNS계정으로 간편하게 회원가입</span>
      <a>
        <img src={google} alt="구글" className={styles.img} />
      </a>
      <hr />
      <form
        method="post"
        action="서버의url"
        id="login-form"
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div className={styles.cssMgb30}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="userEmail"
            value={values.userEmail}
            onChange={valueHandler}
            placeholder="이메일"
            required
          />
        </div>
        <div className={styles.cssMgb30}>
          <label htmlFor="password">비밀번호</label>
          <div className={styles.discription}>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={valueHandler}
            placeholder="비밀번호"
            required
          />
        </div>
        <div className={styles.cssMgb30}>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="passwordCheck"
            value={values.passwordCheck}
            onChange={valueHandler}
            placeholder="비밀번호 확인"
            required
          />
        </div>
        <button type="submit">회원가입하기</button>
      </form>
      <div>
        이미 아이디가 있으신가요? <a onClick={handleLoginClick}>로그인</a>
      </div>
    </div>
  );
}
