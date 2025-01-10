import React, { useEffect } from 'react';

const SVGDebugger = () => {
  useEffect(() => {
    const debugSVGs = () => {
      const svgs = document.querySelectorAll('svg');
      svgs.forEach((svg, index) => {
        const width = svg.getAttribute('width');
        const height = svg.getAttribute('height');
        // if (width === 'auto' || height === 'auto') {
        //   console.error(`Problematic SVG found (index ${index}):`, svg);
        //   console.error(`Parent element:`, svg.parentElement);
        //   console.error(`Component:`, svg.closest('[data-component-name]'));
        //   console.error(`Path:`, svg.closest('[data-component-path]'));
        // }
      });
    };

    // Run immediately and after a short delay to catch dynamically rendered SVGs
    debugSVGs();
    setTimeout(debugSVGs, 1000);
  }, []);

  return null;
};

export default SVGDebugger;

