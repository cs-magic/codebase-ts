import TotemGPTLogo from '@assets/branding/totem-gpt/totem-gpt-logo.svg';

export const TotemGPTBanner = () => {
  return (
    <div className={'flex items-center gap-2 h-full'}>
      <TotemGPTLogo className={'w-8 h-8'} />
      <p className={'text-xl font-semibold '}>TotemGPT</p>
    </div>
  );
};
