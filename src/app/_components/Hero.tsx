'use client';

import Button from '@/components/Button/Button';
import { Ellipse } from '@/components/Ellipse';
import { LandingDownIcon } from '@/public/index';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Hero() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = false; // 인증 상태를 여기서 처리
      setIsAuthenticated(auth);
    };
    checkAuth();
  }, []);

  const handleButtonClick = () => {
    if (isAuthenticated) {
      router.push('/my-library');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Ellipse />

      <section id="hero" className="min-h-screen content-center">
        <div className="flex flex-col items-center gap-[6.5rem] text-primary-500">
          <div className="flex flex-col items-center justify-center gap-[4rem]">
            <div className="flex flex-col items-center justify-center gap-[2rem] text-[6rem] leading-[7.261rem] tracking-[0.015em]">
              <h2>Find your Flaw,</h2>
              <div className="content-center rounded-full border-[0.4rem] border-primary-500 px-[4rem] py-[1.85rem]">
                <span>FlawDetector</span>
              </div>
            </div>
            <p className="text-[2rem]">
              인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게 해결하세요.
            </p>
          </div>
          <Button onClick={handleButtonClick}>
            {isAuthenticated ? '파일 분석하러 가기' : 'Login'}
          </Button>
          <LandingDownIcon />
        </div>
      </section>
    </div>
  );
}
