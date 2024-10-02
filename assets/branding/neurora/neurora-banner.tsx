import NeuroraTechSVG from "./neurora_logo_1280_white.svg";
import { range } from "lodash";
import React from "react";

export const NeuroraBanner = () => {
  const rects: JSX.Element[] = [];

  let y = 0,
    h0 = 0,
    h1 = 4;
  for (const i of range(5)) {
    rects.push(<rect key={i} y={y} width="100%" height={h1} fill="white" />);
    y += h1 + 3;
    const h1_last = h1;
    h1 += h0;
    h0 = h1_last;
  }

  return (
    <div className={"flex justify-center items-center gap-1"}>
      <NeuroraTechSVG width={64} height={64} />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 100" height={64}>
        <defs>
          <mask id="text-mask">
            <text
              x="0"
              y="80"
              // font-family="Times New Roman, sans-serif"
              fontFamily="Helvetica, sans-serif"
              fontSize="80"
              fontWeight="bold"
              fill="white"
            >
              NEURORA
            </text>
          </mask>

          <pattern
            id="stripes"
            patternUnits="userSpaceOnUse"
            x={0}
            y={86}
            width="100%"
            height={64}
          >
            {rects}
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#stripes)"
          mask="url(#text-mask)"
        />
      </svg>
    </div>
  );
};
