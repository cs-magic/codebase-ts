import React, { useEffect } from 'react';

export const SVGRenderer = ({ svg }: { svg: string }) => {
  function scaleSVG() {
    const container = document.getElementById('svg-container');
    if (!container) return;

    const svg = container.querySelector('svg');

    if (svg) {
      // Get the computed width of the container
      const containerWidth = container.clientWidth;

      // Get the original SVG dimensions
      const viewBox = svg.getAttribute('viewBox');
      const [, , width, height] = viewBox
        ? viewBox.split(' ').map(Number)
        : [0, 0, svg.width.baseVal.value, svg.height.baseVal.value];

      // Calculate the scaling factor
      const scale = containerWidth / width;

      // Set the new dimensions
      svg.style.width = `${containerWidth}px`;
      svg.style.height = `${height * scale}px`;

      // Set or update the viewBox
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

      // Ensure the SVG scales correctly
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
  }

  useEffect(() => {
    window.addEventListener('resize', scaleSVG);
    return () => {
      window.removeEventListener('resize', scaleSVG);
    };
  }, [svg]);

  return (
    <div
      id={'svg-renderer'}
      className={'w-full p-2 xs:p-4'}
      style={{
        // transform: `scale(1)`,
        // transformOrigin: 'center',
        transition: 'transform 0.3s ease',
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
      suppressHydrationWarning
    />
  );
};
