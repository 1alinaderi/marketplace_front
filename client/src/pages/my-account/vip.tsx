import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import AccountDetails from '@components/my-account/account-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { httpReauest } from 'src/api/api';
import Heading from '@components/ui/heading';
import PaypalCheckouButton from '@components/paypal/paypalButton';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

export default function AccountDetailsPage({ baseData }) {
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!baseData.cookies.user?.id) {
      router.push(`${window.location.origin}/signin`);
    } else {
      getuserData(baseData.cookies.user.id);
    }
  }, [router.pathname]);

  async function getuserData(id: any) {
    const { data } = await httpReauest('GET', '/user/' + id, {}, {});
    setData(data.data);
  }

  async function handleApprove(id: any) {
    await httpReauest(
      'POST',
      '/user/VIP',
      { userId: baseData.cookies.user.id },
      { 'x-access-token': baseData.cookies.user.token }
    ).then((dataaaa)=>{
        toast.success(dataaaa.data.message)
    }).catch((error)=>{
        toast.success(error.message)
    });;
  }
  return (
    <>
      <Seo
        title="Account Settings"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/account-settings"
      />
      <AccountLayout baseData={baseData}>
        {!data?.VIP ? (
          <div className="py-12 flex justify-center flex-col items-center">
            <Heading variant="title" className="pb-8">
              Buy The Vip Account For $1
            </Heading>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: 'Buy Vip Account',
                      amount: {
                        value: 1,
                      },
                    },
                  ],
                });
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
          </div>
        ) : (
          <h1>Vip Account</h1>
        )}
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
