import { useBestSellerProductsQuery } from '@framework/product/get-all-best-seller-products';
import { LIMITS } from '@framework/utils/limits';
import { ROUTES } from '@utils/routes';
import SuppliersCarousel from '../suppliers-carousel';

export default function BestSellerProductFeed() {
  const { data, isLoading, error } = useBestSellerProductsQuery({
    limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
  });
  return (
    <SuppliersCarousel
      sectionHeading="text-best-sellers"
      categorySlug={ROUTES.SUPPLIERS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
    />
  );
}
