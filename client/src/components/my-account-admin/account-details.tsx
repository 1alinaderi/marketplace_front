import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm, Controller } from 'react-hook-form';
import {
  useUpdateUserMutation,
  UpdateUserType,
} from '@framework/customer/use-update-customer';
import { useTranslation } from 'next-i18next';
import Switch from '@components/ui/switch';
import Text from '@components/ui/text';
import { useUserQuery } from '@framework/product/get-user';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { httpReauest } from 'src/api/api';
import OrderTable from '@components/order/order-table';

const defaultValues = {};

interface AccountDetailsProps {
  baseData: any;
}

const AccountDetailsAdmin: React.FC<AccountDetailsProps> = ({ baseData }) => {
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [orders, setorders] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateUserType>({
    defaultValues,
  });

  const router = useRouter();

  useEffect(() => {
    if (!baseData.cookies?.admin?.id) {
      router.push(`${window.location.origin}`);
    } else {
      getuserData(baseData.cookies?.admin?.id);
    }
  }, [router.pathname]);

  async function getuserData(id: any) {
    const { data } = await httpReauest('GET', '/admin/' + id, {}, {});

    // const data2 = await httpReauest('GET', '/order/' + id, {}, {});

    // setorders(data2.data.data);
    setData(data.data);
  }

  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  }
  return (
    <div className="flex flex-col w-full">
      <Heading variant="titleLarge" className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
        Site Information
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto"
        noValidate
      >
        <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="grid px-1 grid-cols-12   ">
              <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                <Heading className="mr-2 whitespace-nowrap" variant="base">
                  Product Count :
                </Heading>
                <span>{data?.productCount}</span>
              </span>
              <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                <Heading className="mr-2 whitespace-nowrap" variant="base">
                  Supplier Count :
                </Heading>
                <span>{data?.suppllierCount}</span>
              </span>
              <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                <Heading className="mr-2 whitespace-nowrap" variant="base">
                  User Count :
                </Heading>
                <span>{data?.userCount}</span>
              </span>
              <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                <Heading className="mr-2 whitespace-nowrap" variant="base">
                  Order Count :
                </Heading>

                <span>{data?.orderCount}</span>
              </span>
              <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                <Heading className="mr-2 whitespace-nowrap" variant="base">
                  Sold Value :
                </Heading>

                <span>${data?.soldValue}</span>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsAdmin;
