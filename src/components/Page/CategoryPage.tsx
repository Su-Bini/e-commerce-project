import { useState } from "react";
import styles from "./CategoryPage.module.css";
import Header from "../Header";
import Button from "../Button";
import itemsData from "../../items.json";
import CategoryFilterProduct from "../CategoryFilterProduct";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Product {
  id: number;
  image: string;
  name: string;
  discount: number;
  price: number;
  rating: number;
  today: boolean;
  free: boolean;
  specialPrice: boolean;
}

interface Filter {
  free: boolean;
  today: boolean;
  special: boolean;
}

export default function CategoryPage() {
  const categories = [
    "Furniture",
    "Fabric",
    "Digital",
    "Kitchenware",
    "Plant",
    "Lighting",
    "Storage",
    "Household",
    "Essentials",
  ];
  const navigate = useNavigate();
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setFilters({ free: false, today: false, special: false });
    navigate(`/category/${category}`);
  };

  const [selectedCategory, setSelectedCategory] = useState("Fabric");
  const [filters, setFilters] = useState<Filter>({
    free: false,
    today: false,
    special: false,
  });

  const handleFilterToggle = (filterKey: keyof Filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: !prevFilters[filterKey],
    }));
  };

  const categoryButtonStyle = {
    fontSize: "20px",
    defaultColor: "var(--blackColor)",
    backgroundColor: "transparent",
    width: "auto",
  };

  const filterProducts = (items: Product[]): Product[] => {
    return items.filter((item) => {
      if (filters.free && !item.free) return false;
      if (filters.today && !item.today) return false;
      if (filters.special && !item.specialPrice) return false;
      return true;
    });
  };

  const filteredCategory = filterProducts(
    itemsData.filter((item) => item.category === selectedCategory)
  ).map(transformItem);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.categoryContainer}>
          {categories.map((category) => (
            <div
              className={styles.item}
              key={category}
              onClick={() => handleCategorySelect(category)}
            >
              <Button
                style={categoryButtonStyle}
                active={selectedCategory === category}
              >
                {category === "Furniture" && "가구"}
                {category === "Fabric" && "패브릭"}
                {category === "Digital" && "디지털"}
                {category === "Kitchenware" && "주방용품"}
                {category === "Plant" && "식물"}
                {category === "Lighting" && "조명"}
                {category === "Storage" && "수납정리"}
                {category === "Household" && "생활용품"}
                {category === "Essentials" && "생필품"}
              </Button>
            </div>
          ))}
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.filterLists}>
            <ListFilterItem onClick={() => handleFilterToggle("free")}>
              무료배송
            </ListFilterItem>
            <ListFilterItem onClick={() => handleFilterToggle("today")}>
              오늘출발
            </ListFilterItem>
            <ListFilterItem onClick={() => handleFilterToggle("special")}>
              특가상품보기
            </ListFilterItem>
          </div>
          <CategoryFilterProduct products={filteredCategory} />
        </div>
      </div>
    </div>
  );
}

interface ListFilterItemProps {
  onClick?: () => void;
  children: string;
}

function ListFilterItem({ onClick, children }: ListFilterItemProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onClick && onClick();
  };

  return (
    <div className={styles.item}>
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        {children}
      </label>
    </div>
  );
}

interface Item {
  id: number;
  image: string;
  name: string;
  discount: number;
  price: number;
  rating: number;
  today: boolean;
  free: boolean;
  specialPrice: boolean;
}

function transformItem(item: Item) {
  return {
    id: item.id,
    image: item.image,
    name: item.name,
    discount: item.discount,
    price: item.price,
    rating: item.rating,
    today: item.today,
    free: item.free,
    special: item.specialPrice,
  };
}
