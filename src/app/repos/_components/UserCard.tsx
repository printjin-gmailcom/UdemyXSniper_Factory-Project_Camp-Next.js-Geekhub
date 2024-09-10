'use client';

import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/Button/Button';
import { Modal } from '@/components/Modals';
import { useModal } from '@/hooks/useModal';
import { RightArrowIcon, SignOutIcon } from '@/public/index';
import { signOut, useSession } from 'next-auth/react';

type UserCardProps = {
  hasLogoutButton?: boolean;
};

export default function UserCard({ hasLogoutButton }: UserCardProps) {
  const [isModalOpen, handleClickTrigger] = useModal();
  const { data: session } = useSession();

  const avatar = session?.user?.image || '';
  const email = session?.user?.email || '';
  const userId = session?.user.id.toString() || '';

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/repositories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        throw new Error('사용자의 데이터를 삭제하는 중 오류가 발생했습니다.');
      }
      await signOut({ callbackUrl: '/' });

      if (typeof window !== 'undefined') {
        localStorage.removeItem('recentRepos');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const baseStyles = 'flex w-full min-w-[131.4rem] items-center justify-between ';
  const logoutStyles = 'border-b border-b-[#e6e6e6]] pb-[8rem]';
  const defaultStyles = 'bg-neutral-5 rounded-[4.2rem] p-[3.2rem]';

  return (
    <section className={twMerge(baseStyles, hasLogoutButton ? logoutStyles : defaultStyles)}>
      <div className="flex items-center gap-[4.4rem]">
        <div className="relative h-[10.7rem] w-[10.7rem] overflow-hidden rounded-full">
          {avatar ? (
            <Image
              src={avatar}
              alt="User Avatar"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div>No Image</div>
          )}
        </div>
        <div className="text-[4rem] font-medium text-gray-black">
          <p>Hello,</p>
          <p>{email}</p>
        </div>
      </div>
      {hasLogoutButton ? (
        <Button shape="rectangle" variant="tonal" size="large" onClick={handleClickTrigger}>
          로그아웃
        </Button>
      ) : (
        <Link href="/me">
          <RightArrowIcon />
        </Link>
      )}
      <Modal
        gap={24}
        padding={32}
        hasShadow
        setIsModalOpen={handleClickTrigger}
        isOpen={isModalOpen}
      >
        <SignOutIcon />
        <Modal.Title size="sm">정말 로그아웃 할까요?</Modal.Title>
        <Modal.Text
          subtitle={[
            '소스코드 보안을 위하여 모든 히스토리와 코드 저장 내역이 삭제됩니다.',
            '아래 버튼을 누르면 모든 데이터를 삭제하게 되고 로그아웃 처리가 됩니다.',
          ]}
        />
        <Modal.Button
          buttonText={{ left: '닫기', right: '확인' }}
          variant="doubleButton"
          onClick={{
            left: handleClickTrigger,
            right: handleLogout,
          }}
        />
      </Modal>
    </section>
  );
}
