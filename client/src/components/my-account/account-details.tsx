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

const AccountDetails: React.FC<AccountDetailsProps> = ({ baseData }) => {
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
    if (!baseData.cookies.user?.id) {
      router.push(`${window.location.origin}/signin`);
    } else {
      getuserData(baseData.cookies.user.id);
    }
  }, [router.pathname]);

  async function getuserData(id: any) {
    const { data } = await httpReauest('GET', '/user/' + id, {}, {});
    const newData = [
      data.data.name,
      data.data.email,
      moment(data.data.createdAt).format('MM/DD/YYYY hh:mm'),
      data.data.VIP,
      data.data.address,
    ];

    const data2 = await httpReauest('GET', '/order/' + id, {}, {});

    setorders(data2.data.data);
    setData(newData);
  }

  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  }
  return (
    <div className="flex flex-col w-full">
      <Heading variant="titleLarge" className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
        {t('common:text-account-details-personal')}
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
                  Name :
                </Heading>
                <span>{data[0]}</span>
              </span>
              <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                <Heading className="mr-2 whitespace-nowrap" variant="base">
                  Email :
                </Heading>
                <span>{data[1]}</span>
              </span>
              <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                <Heading className="mr-2 whitespace-nowrap" variant="base">
                  Signing Date :
                </Heading>

                <span>{data[2]}</span>
              </span>
              <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                <Heading className="mr-2 whitespace-nowrap" variant="base">
                  Membership :
                </Heading>

                <span>{data[3] ? 'VIP' : 'Normal'}</span>
              </span>
              <span className="col-span-12 sm:col-span-12 flex my-1 sm:my-3">
                <Heading className="mr-2 whitespace-nowrap" variant="base">
                  Address :
                </Heading>

                <span>{data[4]}</span>
              </span>
            </div>
          </div>
        </div>
        <div id="orders">
          <Heading variant="titleLarge" className="pt-6 mb-5  md:pt-7 lg:pt-8">
            Orders
          </Heading>
          <div className="border-b border-border-base pb-7 md:pb-9 lg:pb-10">
            {orders && <OrderTable orders={orders} />}
          </div>
        </div>

        {/* <div className="relative flex pt-6 md:pt-8 lg:pt-10">
          <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">
              {t('common:text-share-profile-data')}
            </Heading>
            <Text variant="small">
              {t('common:text-share-profile-data-description')}
            </Text>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <Controller
              name="shareProfileData"
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div>
        </div> */}
        {/* <div className="relative flex mt-5 mb-1 md:mt-6 lg:mt-7 sm:mb-4 lg:mb-6">
          <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">
              {t('common:text-ads-performance')}
            </Heading>
            <Text variant="small">
              {t('common:text-ads-performance-description')}
            </Text>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <Controller
              name="setAdsPerformance"
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div>
        </div> */}
        {/* <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            variant="formButton"
            className="w-full sm:w-auto"
          >
            {t('common:button-save-changes')}
          </Button>
        </div> */}
      </form>
    </div>
  );
};

export default AccountDetails;
