'use client';

import {
  element2image,
  svgElement2svgString,
} from '@cs-magic/common-frontend/element2image';
import {
  svgBlob2pngBlob,
  svgString2svgBlob,
} from '@cs-magic/common-frontend/svgString2pngBlob';
import { blob2clipboard } from '@cs-magic/common-frontend/blob2clipboard';
import { AspectRatio } from '@cs-magic/shadcn/ui/aspect-ratio';
import React from 'react';
import { extractSVG } from '@/utils/stream-svg';
import { SVGRenderer } from '@/components/SVGRenderer';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

const RealtimeSVGRender = ({ text }: { text: string }) => {
  const result = extractSVG(text);

  return (
    <div className={'w-full overflow-hidden flex flex-col'}>
      {result.status === 'not-started' ? (
        <div className={'animate-pulse w-full  bg-gray-400'}>
          <AspectRatio ratio={3 / 4} />
        </div>
      ) : (
        <SVGRenderer svg={result.svg} />
      )}

      {result.status === 'complete' && (
        <div className="flex justify-center gap-4 p-2">
          <Button
            disabled={result.status !== 'complete'}
            onClick={() => {
              console.log('-- download image');
              const svg = document.querySelector('#svg-renderer svg');
              if (!svg) return;
              void element2image(svg as HTMLElement, {
                approach: 'modern-screenshot',
                format: 'jpeg',
                filename: 'totem.jpeg',
              });
            }}
          >
            Download
          </Button>

          <Button
            disabled={result.status !== 'complete'}
            variant="outline"
            onClick={async () => {
              const svg = document.querySelector('#svg-renderer svg');
              if (!svg) return;

              void blob2clipboard(
                await svgBlob2pngBlob(
                  svgString2svgBlob(svgElement2svgString(svg as SVGSVGElement)),
                  320,
                ),
              );
              toast.success('copied to clipboard');
            }}
          >
            ✂️ Share
          </Button>
        </div>
      )}
    </div>
  );
};

export default RealtimeSVGRender;
