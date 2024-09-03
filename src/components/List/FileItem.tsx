'use client';

import { useState } from 'react';
import { ListDocumentIcon, ListCheckIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { ListStatusType } from '@/types/list';
import { ScanStatus } from './ScanStatus';

type FileItemProps = {
  fileName: string;
  type: ListStatusType;
  isSelected?: boolean;
  isMarked?: boolean;
  onFileClick: () => void;
};

export function FileItem({
  fileName,
  type = 'enabled',
  isSelected = false,
  isMarked: initialIsMarked = false,
  onFileClick,
}: FileItemProps) {
  const containerStyles = twMerge(
    'group flex h-[5.2rem] w-[24.7rem] flex-col justify-center gap-[0.4rem] border-b border-gray-300 p-[1rem] align-middle hover:bg-purple-light',
    isSelected ? 'bg-purple-dark' : 'bg-white',
  );

  const itemStyles = 'flex h-fit w-full justify-between items-center';

  const infoStyles = 'flex gap-[0.7rem] items-center text-[1.6rem] text-gray-black';

  const [isMarked, setIsMarked] = useState(initialIsMarked);

  function handleBookmark() {
    setIsMarked(prevIsMarked => !prevIsMarked);
    // api 생성후 들어갈 예정입니다.
  }

  const handleClick = () => {
    if (type === 'enabled') {
      handleBookmark();
    }
  };

  return (
    <div className={containerStyles} onClick={onFileClick}>
      <div className={itemStyles}>
        <div className={infoStyles}>
          {isSelected && <ListCheckIcon />}
          <ListDocumentIcon />
          {fileName}
        </div>
        <ScanStatus type={type} onBookMarkClick={handleClick} isMarked={isMarked} />
      </div>
      {type === 'enabled' ? '' : <ProgressBar type={type} />}
    </div>
  );
}
