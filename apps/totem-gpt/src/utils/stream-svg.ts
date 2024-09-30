export interface SVGExtractionResult {
  svg: string;
  status: 'not-started' | 'incomplete' | 'complete';
}

export function extractSVG(input: string): SVGExtractionResult {
  const svgStart = '<svg';
  const svgEnd = '</svg>';
  let startIndex = input.indexOf(svgStart);
  let endIndex = input.indexOf(svgEnd);

  if (startIndex === -1) {
    return { svg: '', status: 'not-started' };
  }

  let svg = input.slice(startIndex);
  if (endIndex === -1) {
    // SVG is incomplete, attempt to auto-complete
    svg = autoCompleteSVG(svg);
    return { svg, status: 'incomplete' };
  }

  svg = input.slice(startIndex, endIndex + svgEnd.length);
  return { svg, status: 'complete' };
}

function autoCompleteSVG(incompleteSVG: string): string {
  const openTags: string[] = [];
  const lines = incompleteSVG.split('\n');

  for (const line of lines) {
    const matches = line.match(/<(\w+)[^>]*>/g);
    if (matches) {
      for (const match of matches) {
        if (!match.endsWith('/>')) {
          const tagName = match.match(/<(\w+)/)?.[1];
          if (tagName) openTags.push(tagName);
        }
      }
    }

    const closingMatches = line.match(/<\/(\w+)>/g);
    if (closingMatches) {
      for (const match of closingMatches) {
        const tagName = match.match(/<\/(\w+)>/)?.[1];
        if (tagName && openTags[openTags.length - 1] === tagName) {
          openTags.pop();
        }
      }
    }
  }

  let completedSVG = incompleteSVG;
  while (openTags.length > 0) {
    const tag = openTags.pop();
    completedSVG += `</${tag}>`;
  }

  return completedSVG;
}
