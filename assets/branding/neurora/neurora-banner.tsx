import React from "react";
import NeuroraTechSVG from "./neurora_logo_1280_white.svg";

export const NeuroraBanner = () => {
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
            <rect width="100%" height={4} y={0} fill="white" />
            <rect width="100%" height={4} y={7} fill="white" />
            <rect width="100%" height={8} y={14} fill="white" />
            <rect width="100%" height={12} y={25} fill="white" />
            <rect width="100%" height={20} y={40} fill="white" />
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
