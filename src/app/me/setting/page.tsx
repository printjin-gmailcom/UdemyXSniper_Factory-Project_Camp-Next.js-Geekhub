import MyPageTitle from '@/app/me/_components/MyPageTitle';
import UserCard from '@/app/repos/_components/UserCard';
import UserSetting from '@/app/me/_components/UserSetting';

export default function Page() {
  const avatarUrl = '/images/AvatarDummyImg.png';
  const email = 'marry@gmail.com';

  return (
    <div className="mx-auto flex min-h-screen w-[131.4rem] flex-col items-center gap-[12.4rem]">
      <MyPageTitle title="Setting" />
      <div className="flex w-full flex-col gap-[7.1rem]">
        <UserCard avatar={avatarUrl} email={email} hasLogoutButton />
        <UserSetting />
      </div>
    </div>
  );
}
