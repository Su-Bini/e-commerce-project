import { useRef, useEffect, useState } from "react";
import styles from "./CategoryWidth.module.css";
import CategoryItem from "./CategoryItem";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import { useNavigate } from "react-router-dom";

export default function CategoryWidth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(true);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollLeft;
      const maxScrollPosition =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;

      setIsLeftArrowVisible(scrollPosition > 0);
      setIsRightArrowVisible(scrollPosition < maxScrollPosition - 1);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -10000,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const maxScrollPosition =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
      const currentScrollPosition = containerRef.current.scrollLeft;

      containerRef.current.scrollBy({
        left: maxScrollPosition - currentScrollPosition,
        behavior: "smooth",
      });
    }
  };
  const navigate = useNavigate();
  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.arrow} ${styles.leftArrow}`}
        onClick={scrollLeft}
        style={{ display: isLeftArrowVisible ? "block" : "none" }}
      >
        <img src={leftArrow} alt="왼쪽으로 이동" />
      </div>
      <div className={styles.scrollContainer} ref={containerRef}>
        <CategoryItem onClick={() => handleCategoryClick("Furniture")}>
          가구
        </CategoryItem>
        <CategoryItem onClick={() => handleCategoryClick("Fabric")}>
          패브릭
        </CategoryItem>
        <CategoryItem onClick={() => handleCategoryClick("Digital")}>
          디지털
        </CategoryItem>
        <CategoryItem onClick={() => handleCategoryClick("Kitchenware")}>
          주방용품
        </CategoryItem>
        <CategoryItem onClick={() => handleCategoryClick("Plant")}>
          식물
        </CategoryItem>
        <CategoryItem onClick={() => handleCategoryClick("Lighting")}>
          조명
        </CategoryItem>
        <CategoryItem onClick={() => handleCategoryClick("Storage")}>
          수납정리
        </CategoryItem>
        <CategoryItem onClick={() => handleCategoryClick("Household")}>
          생활용품
        </CategoryItem>
        <CategoryItem onClick={() => handleCategoryClick("Essentials")}>
          생필품
        </CategoryItem>
      </div>
      <div
        className={`${styles.arrow} ${styles.rightArrow}`}
        onClick={scrollRight}
        style={{ display: isRightArrowVisible ? "block" : "none" }}
      >
        <img src={rightArrow} alt="오른쪽으로 이동" />
      </div>
    </div>
  );
}
