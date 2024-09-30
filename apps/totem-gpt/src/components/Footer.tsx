import CompanyBanner from '@assets/branding/neurora/neurora_banner_white.jpg';
import Image from 'next/image';

const Footer = () => (
  <footer className={'shrink-0 mt-auto'}>
    <div className="custom-screen pt-4">
      <div className="py-4 border-t items-center justify-between flex">
        <p className="inline-flex-center gap-2">
          Created by{' '}
          <a
            href="https://github.com/cs-magic/app_totem-gpt"
            className="hover:underline transition"
          >
            <Image
              src={CompanyBanner}
              alt={'company'}
              className={'h-[32px] w-auto'}
            />
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
