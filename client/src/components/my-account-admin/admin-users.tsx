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

const AccountUsersAdmin: React.FC<AccountDetailsProps> = ({ baseData }) => {
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
    const { data } = await httpReauest('GET', '/user/', {}, {});

    setorders(data.data);
  }

  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  }
  return (
    <div className="flex flex-col w-full">
      <div id="orders">
        <Heading variant="titleLarge" className=" pb-5 ">
          Users
        </Heading>
        <div className="border-b border-border-base pb-7 md:pb-9 lg:pb-10">
          {/* {orders && <OrderTable admin orders={orders} />} */}

          <div className="order-list-table-wraper">
            <div className="table w-full ">
              <div className="table-header-group font-bold bg-slate-200 p-3">
                <div className="table-cell whitespace-nowrap p-3">Email</div>
                <div className="table-cell whitespace-nowrap p-3">Id</div>
                <div className="table-cell whitespace-nowrap p-3">
                  Sign Date
                </div>
              </div>
              <div className="table-row-group">
                {orders?.map((order) => {
                  return (
                    <div className="table-row border-t border-black">
                      <div className="table-cell whitespace-nowrap p-2">
                      {order?.VIP && (<span className='bg-red-700 mr-2 text-[10px] text-white p-1'>VIP</span>)}{order?.email}
                      </div>
                      <div className="table-cell whitespace-nowrap p-2">
                        {order._id}
                      </div>
                      <div className="table-cell whitespace-nowrap p-2">
                        {moment(order.createdAt).format('DD/MM/YYYY hh:mm')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountUsersAdmin;
