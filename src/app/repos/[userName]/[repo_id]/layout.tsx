import { ReactNode } from 'react';
import { Title } from './_components/Title';
import { RepoSide } from './_components/RepoSide';

interface LayoutProps {
  children: ReactNode;
  params: { userName: string; repo_id: string };
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <div className="relative left-[8rem] flex h-[147.1rem] w-[176.05rem] flex-col gap-[2.0rem]">
      <Title />
      <div className="flex gap-[2.8rem]">
        <RepoSide params={params} />
        {children}
      </div>
    </div>
  );
}
