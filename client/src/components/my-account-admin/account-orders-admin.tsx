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

const AccountOrdersAdmin: React.FC<AccountDetailsProps> = ({ baseData }) => {
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
    const { data } = await httpReauest('GET', '/order/', {}, {});

    setorders(data.data);
  }

  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  }
  return (
    <div className="flex flex-col w-full">
      <div id="orders">
        <Heading variant="titleLarge" className=" pb-5 ">
          Orders
        </Heading>
        <div className="border-b border-border-base pb-7 md:pb-9 lg:pb-10">
          {orders && <OrderTable admin orders={orders} />}
        </div>
      </div>
    </div>
  );
};

export default AccountOrdersAdmin;
