'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { DetectFileCardArrowIcon, DetectFileCardBugIcon, DetectFileCardStar } from '@/public/index';
import type { DetectFileCardProps, ElementByLabel } from '@/types/detectedFileCard';

async function updateBookmarkStatus(userId: string, repoId: string, isBookmarked: boolean) {
  const response = await fetch('/api/repositories', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      repoId,
      isBookmarked,
    }),
  });
  if (!response.ok) {
    throw new Error('북마크 상태 업데이트 실패');
  }
}

export default function DetectFileCard({
  userId,
  userName,
  repoId,
  title,
  label,
  date,
  isBookmarked,
  setRepositories,
  addRecentViewed,
}: DetectFileCardProps) {
  const [isBookmark, setIsBookmark] = useState<boolean>(isBookmarked);
  const router = useRouter();
  const elementByLabel: ElementByLabel = {
    before: {
      labelStyle: '',
      labelText: '',
      buttonStyle: 'bg-primary-500',
      buttonText: '검사하기',
    },
    under: {
      labelStyle: 'bg-gray-light text-gray-default',
      labelText: '검사중',
      buttonStyle: 'bg-primary-500',
      buttonText: '검사하기',
    },
    done: {
      labelStyle: 'bg-primary-50 text-primary-500',
      labelText: '검사완료',
      buttonStyle: 'bg-neutral-100',
      buttonText: '결과보기',
    },
  };

  const { labelStyle, labelText, buttonStyle, buttonText } = elementByLabel[label];

  const onClickBookmark = async () => {
    try {
      setIsBookmark(prev => !prev);

      await updateBookmarkStatus(userId, repoId, !isBookmark);

      const res = await fetch(`/api/repositories?userId=${userId}`);
      const updatedData = await res.json();
      setRepositories(updatedData.repositories);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickCheckStatus = () => {
    addRecentViewed();
    router.push(`/repos/${userName}/${repoId}`);
  };

  return (
    <div className="group relative flex h-[22.5rem] w-[31rem] cursor-pointer flex-col justify-between rounded-[1.2rem] border-[0.1rem] border-primary-100 bg-white p-[2rem]">
      <div className="absolute right-[2rem] flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-[1.2rem] group-hover:border-[0.2rem] group-hover:border-primary-200">
        <DetectFileCardStar
          className={twMerge(
            'ml-[0.15rem] mt-[0.15rem] h-[2.8rem] w-[2.8rem] group-hover:stroke-primary-200 group-hover:stroke-1',
            isBookmark ? 'fill-primary-200 stroke-primary-200 stroke-1' : '',
          )}
          onClick={onClickBookmark}
        />
      </div>
      <div className="flex flex-col gap-[0.4rem]">
        <label
          className={twMerge(
            'w-fit rounded-full px-[1.2rem] py-[0.8rem] text-[1.6rem] font-medium leading-[2.24rem]',
            labelStyle,
          )}
        >
          {labelText}
        </label>
        <div className="flex h-[3.9rem] items-center gap-[0.8rem]">
          <span className="text-[2.8rem] font-medium leading-[3.9rem] text-gray-black">
            {title}
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <button
          type="button"
          className={twMerge(
            'flex items-center gap-[0.7rem] rounded-[1.4rem] p-[1rem]',
            buttonStyle,
          )}
          onClick={onClickCheckStatus}
        >
          <DetectFileCardBugIcon />
          <span className="text-[2rem] font-regular leading-[2.8rem] text-white">{buttonText}</span>
          <DetectFileCardArrowIcon />
        </button>
        <span className="text-[1.6rem] font-medium leading-[2.24rem] text-gray-default">
          {format(date, 'yy.MM.dd')}
        </span>
      </div>
    </div>
  );
}
