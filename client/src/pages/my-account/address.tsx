import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AddressGrid from '@components/address/address-grid';
import { useAddressQuery } from '@framework/address/address';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useUserQuery } from '@framework/product/get-user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { httpReauest } from 'src/api/api';
import moment from 'moment';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import { toast } from 'react-toastify';

export default function AccountDetailsPage({ baseData }) {
  const [data, setData] = useState();
  const [editing, setediting] = useState();
  const [inputData, setinputData] = useState();

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

  async function handleSubmit() {
    try {
      const { data, status, message } = await httpReauest(
        'POST',
        '/user/addAddress',
        { userId: baseData.cookies.user.id, address: inputData },
        { 'x-access-token': baseData.cookies.user.token }
      );
  
      if (status == 200) {
        toast.success('Address Added');
        setediting(false);
        router.reload();}
    } catch (error) {
      toast.error(error.message);
      
    }
   
    
  }

  return (
    <>
      <Seo
        title="Address"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/address"
      />
      <AccountLayout baseData={baseData}>
        <Heading variant="titleLarge">Address :</Heading>
        {editing ? (
          <Input
            className="mt-5"
            name="AddAddress"
            placeholder="Add Address..."
            variant="solid"
            onChange={(e) => {
              setinputData(e.target.value);
            }}
          />
        ) : (
          <Text variant="medium" className="mt-3">
            {data?.address
              ? data?.address
              : "You Don't have Address Please Add one"}
          </Text>
        )}

        <div className="w-100 flex justify-end pt-6 pb-2">
          {editing && (
            <Button
              onClick={handleSubmit}
              variant="formButton"
              className="w-32 mr-5"
            >
              Submit
            </Button>
          )}

          <Button
            onClick={() => {
              setediting(editing ? false : true);
            }}
            variant="formButton"
            className="w-32"
          >
            {editing ? 'Cancel' : data?.address ? 'Change' : 'Add'}
          </Button>
        </div>
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
        'terms',
        'faq',
        'footer',
      ])),
    },
  };
};
