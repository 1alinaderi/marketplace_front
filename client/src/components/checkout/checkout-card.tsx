import Link from 'next/link';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useTranslation } from 'next-i18next';
import Router, { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import { useEffect } from 'react';
import { useProductQuery } from '@framework/product/get-product';

const CheckoutCard: React.FC<{ slug: any }> = ({ slug }) => {
  const { t } = useTranslation('common');
  const { items, total, isEmpty } = useCart();

  const router = useRouter();

  const amountProduct = router.query.amount;

  const data = useProductQuery(slug as string);
  const { price: subtotal } = usePrice({
    amount: data.data?.price * amountProduct,
    currencyCode: 'USD',
  });
  function orderHeader() {
    !isEmpty && Router.push(ROUTES.ORDER);
  }
  const checkoutFooter = [
    {
      id: 2,
      name: 'Amount',
      price: amountProduct,
    },
    {
      id: 2,
      name: t('text-shipping'),
      price: '$0',
    },
    {
      id: 3,
      name: t('text-total'),
      price: subtotal,
    },
  ];
  return (
    <>
      <div className="px-4 py-1 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7">
        <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
          <span className="font-medium text-15px text-brand-dark">
            {t('text-product')}
          </span>
          <span className="font-medium ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
            {t('text-sub-total')}
          </span>
        </div>
        <CheckoutItem item={data.data} />
        {/* {!isEmpty ? (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        ) : (
          <p className="py-4 text-brand-danger text-opacity-70">
            {t('text-empty-cart')}
          </p>
        )} */}
        {checkoutFooter.map((item: any) => (
          <CheckoutCardFooterItem item={item} key={item.id} />
        ))}
        {/* <Button
          variant="formButton"
          className={`w-full mt-8 mb-5 bg-brand text-brand-light rounded font-semibold px-4 py-3 transition-all ${
            isEmpty && 'opacity-40 cursor-not-allowed'
          }`}
          onClick={orderHeader}
        >
          {t('button-order-now')} 
        </Button> */}
      </div>
      <Text className="mt-8">
        {t('text-by-placing-your-order')}{' '}
        <Link href={ROUTES.TERMS}>
          <a className="font-medium underline text-brand">
            {t('text-terms-of-service')}{' '}
          </a>
        </Link>
        {t('text-and')}{' '}
        <Link href={ROUTES.PRIVACY}>
          <a className="font-medium underline text-brand">
            {t('text-privacy')}
          </a>
        </Link>
        . {t('text-credit-debit')}
      </Text>
      <Text className="mt-4">{t('text-bag-fee')}</Text>
    </>
  );
};

export default CheckoutCard;
