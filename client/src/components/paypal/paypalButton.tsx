import Text from '@components/ui/text';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { httpReauest } from 'src/api/api';

const PaypalCheckouButton = (props: any) => {
  const { product, productId, userId, token } = props;

  const router = useRouter();

  async function handleApprove(id: any) {
    await httpReauest(
      'POST',
      '/order/create',
      { prouductId: productId, userId: userId, amount: Number(product.amount) },
      { 'x-access-token': token }
    )
      .then((e) => {
        console.log(e);
        toast.success('successfully');
        router.push('/my-account');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  return (
    <>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product?.description,
                amount: {
                  value: product?.price,
                },
              },
            ],
          });
        }}
        onClick={(data, actions) => {
          if (product.buyed) {
            toast.error('you alreday buy this product');
            actions.reject();
          } else {
            actions.resolve();
          }
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture();
          console.log('order', order);

          handleApprove(data.orderID);
        }}
        onError={(err) => {
          toast.error(err);
        }}
        style={{ layout: 'horizontal', shape: 'pill' }}
      />
      <Text className="text-center">Powered By Paypal</Text>
    </>
  );
};

export default PaypalCheckouButton;
