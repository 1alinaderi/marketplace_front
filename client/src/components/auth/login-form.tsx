import { useEffect, useState } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useLoginMutation, LoginInputType } from '@framework/auth/use-login';
import Logo from '@components/ui/logo';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import Switch from '@components/ui/switch';
import CloseButton from '@components/ui/close-button';
import { FaFacebook, FaTwitter, FaLinkedinIn, FaGoogle } from 'react-icons/fa';
import cn from 'classnames';
import axios from 'axios';
import { httpReauest } from 'src/api/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
  baseData?: any;
  googleLogin: any;
  profile: any;
}

const LoginForm: React.FC<LoginFormProps> = ({
  isPopup = true,
  className,
  baseData,
  googleLogin,
  profile,
}) => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();
  const { mutate: login, isLoading } = useLoginMutation();
  const [remember, setRemember] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (profile?.email) {
      googleLoginAndSign();
    }
  }, [profile]);

  async function googleLoginAndSign() {
    await httpReauest(
      'POST',
      '/user/sign/google',
      { email: profile.email, name: profile.given_name },
      {}
    )
      .then((e) => {
        toast.success(e.data.message);
        baseData.handleLogin({
          email: profile.email,
          id: e.data.data._id,
          token: e.data.data.token,
        });
        router.push(`${window.location.origin}/my-account`);
      })
      .catch((e) => {
        toast.error('Eroor');
      });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  async function onSubmit({
    email,
    password,
    remember_me = true,
  }: LoginInputType) {
    // login({
    //   email,
    //   password,
    //   remember_me,
    // });

    await httpReauest('POST', '/user/login', { email, password }, {})
      .then((e) => {
        toast.success(e.data.message);
        baseData.handleLogin({
          email: email,
          id: e.data.data._id,
          token: e.data.data.token,
        });
        router.push(`${window.location.origin}/my-account`);
      })
      .catch((e) => {
        toast.error('email or password is wrong');
      });
    closeModal();
  }

  useEffect(() => {
    if (baseData?.cookies?.user?.email) {
      router.push(`${window.location.origin}/my-account`);
    }
  }, [router.pathname]);

  function handleSignUp() {
    return openModal('SIGN_UP_VIEW');
  }
  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }
  return (
    <div
      className={cn(
        'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image
            src="/assets/images/login.jpeg"
            alt="signin Image"
            layout="fill"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col justify-center">
          <div className="mb-6 text-center">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t('common:text-welcome-back')}
            </h4>
            <div className="mt-3 mb-1 text-sm text-center sm:text-15px text-body">
              {t('common:text-don’t-have-account')}
              <Link href="/signup">
                <button
                  type="button"
                  className="text-sm font-semibold text-brand sm:text-15px ltr:ml-1 rtl:mr-1 hover:no-underline focus:outline-none"
                  // onClick={handleSignUp}
                >
                  {t('common:text-create-account')}
                </button>
              </Link>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-3.5">
              <Input
                label={t('forms:label-email')}
                type="email"
                variant="solid"
                {...register('email', {
                  required: `${t('forms:email-required')}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t('forms:email-error'),
                  },
                })}
                error={errors.email?.message}
              />
              <PasswordInput
                label={t('forms:label-password')}
                error={errors.password?.message}
                {...register('password', {
                  required: `${t('forms:password-required')}`,
                })}
              />
              <div className="flex items-center justify-center">
                <div className="flex ltr:ml-auto rtl:mr-auto mt-[3px]">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    {t('common:text-forgot-password')}
                  </button>
                </div>
              </div>
              <div className="relative">
                <Button
                  onClick={googleLogin}
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="border"
                >
                  <FaGoogle className="mr-3" size={23} /> Sign With Google
                </Button>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {t('common:text-sign-in')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
