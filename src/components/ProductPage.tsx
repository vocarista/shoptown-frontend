import { useState } from 'react';
import useGeneral from '../store/general';
import ProductCard from './ProductCard';
import useProducts from '../store/products';
import { Card, Pagination } from 'react-bootstrap';
import { Text } from '@radix-ui/themes';

const ProductPage = () => {
  const displayProducts = useProducts((state) => state.displayProducts);
  const isMobile = useGeneral((state) => state.isMobile);
  const productsPerPage = isMobile ? 6 : 9; // Number of products to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <Card className={`mr-4 p-3 ${isMobile ? `h-[100vh]` : ``}`}>
        {displayProducts.length > 0 ?<><div className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>

      {displayProducts.length > productsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {Array.from({ length: Math.ceil(displayProducts.length / productsPerPage) }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
                className={`${
                    index + 1 === currentPage ? `active-page-bg` : ``
                  }`}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}</> : <Text>Hmmm... We couldn't find any products matching those search terms</Text>}
    </Card>
  );
};

export default ProductPage;
