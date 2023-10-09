import VendorCard from '@components/cards/vendor-card';
import { useShopsQuery } from '@framework/shop/get-shops';
import Alert from '@components/ui/alert';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import SupplierCard from '@components/product/product-cards/supllaier-card';

const ShopsPageContent: React.FC = ({admin}) => {
  const { t } = useTranslation('common');
  const { data, error } = useShopsQuery({
    limit: 9,
  });

  console.log(data);

  if (error) return <Alert message={error?.message} />;

  return (
    <div className={`${admin ? "" : "pt-10  lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 px-4 md:px-8"}`}>
      <div className="w-full xl:max-w-[1490px] mx-auto">
        <Heading variant="titleLarge" className="mb-4 lg:mb-6">
          {t('text-all-shops')}
        </Heading>
        <div className={`grid ${admin ? "md:grid-cols-2 lg:grid-cols-2" : "md:grid-cols-3 lg:grid-cols-4" }  gap-3 md:gap-4 lg:gap-5 xl:gap-6`}>
          {data?.shop?.data?.data?.map((item: any) => (
            <SupplierCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopsPageContent;
