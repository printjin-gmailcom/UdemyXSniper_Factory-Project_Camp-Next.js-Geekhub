import { authOptions } from '@/authOptions';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import LogoLoading from '@/components/common/Loading/LogoLoading';
import '@/styles/globals.css';
import ClientSessionProvider from '@/utils/clientSessionProvider';
import Providers from '@/utils/provider';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import { ReactNode, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOSWrapper from './_components/AOSwrapper';

export const metadata: Metadata = {
  title: '플로디텍터 | FlawDetector',
  description: '쉽고 편하게 취약점을 발견하다',
  icons: {
    icon: '/icon',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;
  const userId = session?.user.id;

  return (
    <html lang="ko">
      <head>
        <link
          rel="preload"
          href="/PretendardVariableSubset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="font-sans">
        <ClientSessionProvider>
          <Providers>
            <div id="modal" />
            <div className="flex min-h-screen flex-col">
              <NextTopLoader color="#6100ff" showSpinner={false} shadow={false} />
              <Suspense fallback={<LogoLoading />}>
                <Header isLoggedIn={isLoggedIn} userId={userId} />
                <AOSWrapper>
                  <div className="flex-1">{children}</div>
                </AOSWrapper>
                <Footer />
              </Suspense>
            </div>
            <ToastContainer autoClose={2000} />
          </Providers>
        </ClientSessionProvider>
      </body>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />
    </html>
  );
}
