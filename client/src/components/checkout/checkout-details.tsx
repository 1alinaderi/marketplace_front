import { useEffect, useState } from 'react';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import Contact from '@components/contact/contact';
import Address from './address';
import DeliveryNotes from './delivery-instruction';
import DeliverySchedule from './schedule';
import DeliveryTips from './delivery-tips';
import StripeCheckoutInlineForm from './stripe-checkout-inline-form';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FaBitcoin, FaPaypal } from 'react-icons/fa';
import PaypalCheckouButton from '@components/paypal/paypalButton';
import { useProductQuery } from '@framework/product/get-product';
import ConnectButton from '@components/web3/connectButton';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal, Web3Button } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { bsc } from 'wagmi/chains';
import Web3 from 'web3';
import { abi_usdt_contract } from 'src/abi/abi';
import { toast } from 'react-toastify';
import { httpReauest } from 'src/api/api';
import { useRouter } from 'next/router';

const CheckoutDetails: React.FC<{ slug: any; baseData: any; amount: any }> = ({
  slug,
  baseData,
  amount,
}) => {
  const { t } = useTranslation('common');
  const [bindIndex, setBindIndex] = useState(0);
  const [payment, setpayment] = useState(false);
  const [ispayed, setispayed] = useState(false);
  const [crypto, setcrypto] = useState();
  const [address, setaddress] = useState();
  const [loading, setloading] = useState();

  const changeItem = (itemIndex: any) => {
    if (itemIndex !== bindIndex) {
      setBindIndex(itemIndex);
    }
  };
  const { data } = useProductQuery(slug as string);

  const product = {
    description: `Pay For ${data?.name}`,
    price: data?.price * amount,
    buyed: false,
    amount: amount,
  };

  //web3

  const projectId = '0ce476f503ba45f6af7b76d2ceb3bb7d';
  const chains = [bsc];

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  useEffect(() => {
    setaddress(ethereumClient.getAccount()?.address);
  }, [ethereumClient.getAccount()]);

  //web3 js

  const owner = '0x146AE4dCAc10DC0CB7a5e0733ade520CD07054f9';

  const router = useRouter();

  const web3 = new Web3(Web3.givenProvider);

  const USDTCoontract = new web3.eth.Contract(
    abi_usdt_contract,
    '0x55d398326f99059ff775485246999027b3197955'
  );

  async function handlePayBnb() {
    try {
      const gas = await USDTCoontract.methods
        .transfer(
          owner,
          (product.price * 10 ** 18).toLocaleString(undefined, {
            useGrouping: false,
          })
        )
        .estimateGas({ from: address });
      setloading(true);
      await USDTCoontract.methods
        .transfer(
          owner,
          (product.price * 10 ** 18).toLocaleString(undefined, {
            useGrouping: false,
          })
        )
        .send({ from: address, gas: gas });

      await httpReauest(
        'POST',
        '/order/create',
        {
          prouductId: data?._id,
          userId: baseData?.cookies?.user?.id,
          amount: Number(product.amount),
        },
        { 'x-access-token': baseData?.cookies?.user?.token }
      )
        .then((e) => {
          setloading(false);
          setispayed(true);
          toast.success('successfully');
          router.push('/my-account');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      const str = String(error);
      const regex = /\{(.*?)\}/s;
      const match = str.match(regex);
      const objStr = match[0];
      const newError = JSON.parse(objStr);
      toast.error(newError.message);
    }
  }

  return (
    <div className="border rounded-md border-border-base text-brand-light">
      {baseData?.cookies?.user?.id ? (
        <>
          {payment === 'BTC' && (
            <>
              <div className=" py-24 flex justify-center text-black">
                <div className="px-8 w-full flex gap-4 justify-center flex-wrap">
                  {crypto === 'BNB' && (
                    <div>
                      <WagmiConfig config={wagmiConfig}>
                        <div className="flex justify-center items-center flex-col gap-3 ">
                          <p className="text-17px md:text-base 2xl:text-[22px] text-brand-dark leading-7 md:leading-8 pb-5 font-medium">
                            First Connect Your Wallet
                          </p>
                          <Web3Button />
                          {address && (
                            <Button onClick={handlePayBnb} variant="formButton">
                              {loading ? 'Loadnig...' : 'Click Me!'}
                            </Button>
                          )}
                        </div>
                      </WagmiConfig>
                      <Web3Modal
                        projectId={projectId}
                        ethereumClient={ethereumClient}
                      />
                    </div>
                  )}
                  {crypto === 'SOL' && <h1>Hello</h1>}
                  {!crypto && (
                    <>
                      <span
                        onClick={() => {
                          setcrypto('BNB');
                        }}
                        className="border p-3 cursor-pointer rounded"
                      >
                        <span className="w-14 h-14 relative">
                          <img
                            src="/assets/images/crypto/usdt.svg"
                            className="w-14 h-14 m-auto"
                          />
                          <img
                            src="/assets/images/crypto/bnb.svg"
                            className="w-6 h-6 absolute top-8 right-1"
                          />
                        </span>
                        <p className="pt-2">USDT-BEP20</p>
                      </span>
                      {/* <span
                        onClick={() => {
                          setcrypto('SOL');
                        }}
                        className="border p-3 cursor-pointer rounded"
                      >
                        <span className="w-14 h-14 relative">
                          <img
                            src="/assets/images/crypto/usdt.svg"
                            className="w-14 h-14 m-auto"
                          />
                          <img
                            src="/assets/images/crypto/sol.svg"
                            className="w-6 h-6 absolute top-8 right-0"
                          />
                        </span>
                        <p className="pt-2">USDT-SOL</p>
                      </span> */}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
          {payment === 'PAYPAL' && (
            <>
              <div className="paypal-button-container py-24 flex justify-center">
                <div className="px-8 w-full md:w-1/2">
                  <PaypalCheckouButton
                    setispayed={setispayed}
                    product={product}
                    productId={data?._id}
                    userId={baseData?.cookies?.user?.id}
                    token={baseData?.cookies?.user?.token}
                  />
                </div>
              </div>
            </>
          )}
          {!payment && (
            <div className="text-center px-12 py-16 sm:py-20 lg:py-24 xl:py-32 flex items-center justify-center bg-cover bg-no-repeat bg-center">
              <div className="max-w-md xl:max-w-lg">
                <p className="text-17px md:text-base 2xl:text-[22px] text-brand-dark leading-7 md:leading-8 pb-12 font-medium">
                  Chose Your payment method
                </p>
                <span>
                  <Button
                    onClick={() => setpayment('PAYPAL')}
                    variant="border"
                    className=" rounded font-semibold text-[22px] px-4 py-3 my-2 sm:my-0 sm:mr-5"
                  >
                    <FaPaypal size={29} className="mr-2" />
                    PayPal
                  </Button>
                </span>
                <span>
                  <Button
                    onClick={() => setpayment('BTC')}
                    variant="border"
                    className=" rounded font-semibold font-[14px] px-4 py-3 my-2 sm:my-0 sm:ml-5"
                  >
                    <FaBitcoin size={29} className="mr-2" />
                    Crypto
                  </Button>
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="text-center px-12 py-16 sm:py-20 lg:py-24 xl:py-32 flex items-center justify-center bg-cover bg-no-repeat bg-center">
            <div className="max-w-md xl:max-w-lg">
              <p className="text-15px md:text-base 2xl:text-[18px] text-brand-dark leading-7 md:leading-8 py-4 font-medium">
                For Buy a product you must create an account
              </p>
              <Link href={'/signin'}>
                <Button
                  variant="formButton"
                  className="bg-brand text-brand-light rounded font-semibold font-[14px] px-4 py-3"
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`accordion__panel ${
              !(data?.length - 1 === index) ? 'border-b border-border-base' : ''
            } ${bindIndex !== index ? 'collapsed' : 'expanded'}
            `}
            onClick={() => changeItem(index)}
          >
            <div
              id={`index_${index}`}
              className="flex items-center p-4 pb-6 cursor-pointer sm:p-8 accordion__button"
            >
              <span className="flex items-center justify-center font-semibold border-2 border-current rounded-full h-9 w-9 text-brand ltr:mr-3 rtl:ml-3">
                {index + 1}
              </span>
              <Heading>{t(item?.title)}</Heading>
            </div>

            <div
              data-aria-label={`index_${index}`}
              className="pb-6 ltr:pl-5 rtl:pr-5 sm:ltr:pl-9 sm:rtl:pr-9 lg:ltr:pl-20 lg:rtl:pr-20 sm:ltr:pr-9 sm:rtl:pl-9 ltr:pr-5 rtl:pl-5 accordion__content"
            >
              <div className="mb-6">{item?.component}</div>
              {!(data?.length - 1 === index) ? (
                <div className="ltr:text-right rtl:text-left">
                  <Button
                    onClick={() => changeItem(index + 1)}
                    variant="formButton"
                    className="bg-brand text-brand-light rounded font-semibold font-[14px] px-4 py-3"
                  >
                    {t('button-next-steps')}
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default CheckoutDetails;
