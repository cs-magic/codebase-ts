import { TotemGPTBanner } from '@/components/TotemGPTBanner';
import { config, ogImageUrl, url } from '@/config';
import BaseLayout from '@cs-magic/react/components/base.layout';
import { Footer } from '@cs-magic/react/components/footer';
import { Main } from '@cs-magic/react/components/main';
import { Navbar } from '@cs-magic/react/components/navbar';
import type { Metadata } from 'next';
import React from 'react';

import '@/styles/globals.css';

const title = config.title;
const description = config.description;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [ogImageUrl],
    title,
    description,
    url: url,
    siteName: config.domain,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogImageUrl],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={'en'} suppressHydrationWarning>
      <body>
        <BaseLayout>
          <Navbar productBanner={<TotemGPTBanner />} />

          <Main>{children}</Main>

          <Footer />
        </BaseLayout>
      </body>
    </html>
  );
}
