'use client';

import NavLink from './NavLink';
import { range } from 'lodash-es';
import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';

const heroImages = range(1, 10).map((seq) => `/totems/0914-${seq}.jpg`);
console.log({ heroImages });

const images = heroImages.map((item) => (
  <ImageListItem key={item}>
    <img
      srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
      src={`${item}?w=248&fit=crop&auto=format`}
      alt={item}
      loading="lazy"
    />
  </ImageListItem>
));

export default function Hero() {
  return (
    <section>
      <div className="custom-screen pt-28 text-primary/90">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-primary/90 font-extrabold mx-auto sm:text-6xl !leading-tight">
            Generate your <br className={'block md:hidden'} /> LIFE TOTEM <br />{' '}
            in seconds
          </h1>
          <p className="max-w-xl mx-auto">
            TotemGPT makes it simple for you to generate cool-looking LIFE TOTEM
            in seconds, completely for free.
          </p>
          <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
            <NavLink
              href="/start"
              className="text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900 "
            >
              Generate your LIFE TOTEM
            </NavLink>
            <NavLink
              target="_blank"
              href="https://github.com/Nutlope/qrGPT"
              className="text-secondary-foreground border hover:bg-secondary"
              scroll={false}
            >
              Learn more
            </NavLink>
          </div>

          <div className="sm:hidden">
            <ImageList variant="masonry" cols={2} gap={8} children={images} />
          </div>

          <div className="hidden sm:block lg:hidden">
            <ImageList variant="masonry" cols={3} gap={8} children={images} />
          </div>

          <div className={'hidden lg:block'}>
            <ImageList variant="masonry" cols={4} gap={8} children={images} />
          </div>
        </div>
      </div>
    </section>
  );
}
