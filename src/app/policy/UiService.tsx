export default function MyComponent() {
  return (
    <div className="relative min-h-screen bg-white">
      <div
        className="relative flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url('/icons/policyBackground.svg')`,
          backgroundSize: 'cover',
          width: '192rem',
          height: '70.8rem',
          gap: '1rem',
          padding: '9.7rem 0',
        }}
      >
        <h1 className="text-center text-[3.2rem] font-semibold leading-[4.48rem] tracking-[0.015em] text-white">
          우리는 당신의 개인정보 보호와 신뢰를 중요하게 생각합니다.
        </h1>
        <p className="text-center text-[2rem] font-medium leading-[2.8rem] text-white">
          개인정보 보호 센터는 고객의 정보를
          <br />
          수집해서 사용하는 방법에 대한 고객의 선택 사항을 비롯하여
          <br />
          개인정보 보호 항목에 대한 정보를 쉽게 찾을 수 있도록 해 줍니다.
        </p>
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <div
          className="relative bg-white p-8"
          style={{
            width: '176.089rem',
            height: '54.4rem',
          }}
        >
          <p className="text-left text-[2.4rem] font-normal leading-[3.36rem] text-black">
            국회에 제출된 법률안 기타의 의안은 회기중에 의결되지 못한 이유로 폐기되지 아니한다.
            다만, 국회의원의 임기가 만료된 때에는 그러하지 아니하다. 비상계엄하의 군사재판은
            군인·군무원의 범죄나 군사에 관한 간첩죄의 경우와 초병·초소·유독음식물공급·포로에 관한
            죄중 법률이 정한 경우에 한하여 단심으로 할 수 있다. 다만, 사형을 선고한 경우에는
            그러하지 아니하다.
          </p>
        </div>
      </div>
    </div>
  );
}
