import styles from "./Banner.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "./ProductCard";
import collectionData from "../collection.json";
import Badge from "./Badge";
import Button from "./Button";

export default function Banner() {
  const collection = [
    {
      img: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
      name: "내 공간에 어울리는 가구 찾을 땐?",
      description: "종합 가구 브랜드",
      category: "Furniture",
    },
    {
      img: "https://cdn.pixabay.com/photo/2016/12/08/03/53/pillow-1890940_1280.jpg",
      name: "여름에 쓰기 좋은 트렌디한 패브릭",
      description: "종합 패브릭 브랜드",
      category: "Fabric",
    },
    {
      img: "https://cdn.pixabay.com/photo/2016/11/23/15/40/teddy-bear-1853609_1280.jpg",
      name: "자취 생활 필수템 모음",
      description: "혼자서도 예쁘게 살 수 있어!",
      category: "Lighting",
    },
  ];
  const categoryProducts = collection.map((item) =>
    collectionData
      .filter((product) => product.category === item.category)
      .slice(0, 3)
      .map((product) => ({
        image: product.image,
        name: product.name,
        discount: product.discount,
        price: product.price,
        rating: product.rating,
        today: product.today,
        free: product.free,
        special: product.specialPrice,
      }))
  );
  const exhibitionBadge = {
    fontSize: "15px",
    color: "white",
    backgroundColor: "var(--blackColor)",
    width: "70px",
  };
  const exhibitionCollectionButton = {
    fontSize: "15px",
    defaultColor: "white",
    backgroundColor: "var(--grayColor)",
  };

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        interval={3000}
        infiniteLoop
      >
        {collection.map((item, index) => (
          <div className={styles.slide} key={index}>
            <img src={item.img} alt={item.name} className={styles.image} />
            <div className={styles.container}>
              <div className={styles.title}>
                <Badge style={exhibitionBadge}>기획전</Badge>
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <Button style={exhibitionCollectionButton}>
                  기획전 상품 전체보기
                </Button>
              </div>
              <div className={styles.sort}>
                {categoryProducts[index].map((product, idx) => (
                  <ProductCard
                    id={idx}
                    key={idx}
                    image={product.image}
                    name={product.name}
                    discount={product.discount}
                    price={product.price}
                    rating={product.rating}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
