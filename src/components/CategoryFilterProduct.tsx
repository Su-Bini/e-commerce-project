import { useState } from "react";
import ProductList from "./ProductList";
import Pagination from "./Pagination";

interface Product {
  id: number;
  image: string;
  name: string;
  discount: number;
  price: number;
  rating: number;
  today: boolean;
  free: boolean;
  special: boolean;
  todaySale?: number;
}

interface CategoryFilterProductProps {
  products: Product[];
}

export default function CategoryFilterProduct({
  products,
}: CategoryFilterProductProps) {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <ProductList some="3" products={currentItems} />
      <Pagination
        currentPage={currentPage}
        maxPage={totalPages}
        onClickPageButton={handlePageChange}
      />
    </div>
  );
}
