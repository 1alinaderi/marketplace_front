import Layout from '@components/layout/layout';
import LoginForm from '@components/auth/login-form';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SignInPage({ baseData }) {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });


  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      <Seo
        title="Sign In"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="signin"
      />
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-12 sm:py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
          <LoginForm
            profile={profile}
            googleLogin={googleLogin}
            baseData={baseData}
            isPopup={false}
            className="border rounded-lg border-border-base"
          />
        </div>
      </div>
      <Divider />
    </>
  );
}

SignInPage.Layout = Layout;

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
