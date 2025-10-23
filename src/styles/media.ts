
import { css } from 'styled-components';

const breakpoints = {
  tablet: '768px',
  desktop: '1024px',
};

type Breakpoint = keyof typeof breakpoints;

export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label as Breakpoint] = (...args: Parameters<typeof css>) => css`
    @media (min-width: ${breakpoints[label as Breakpoint]}) {
      ${css(...args)};
    }
  `;
  return acc;
}, {} as Record<Breakpoint, (...args: Parameters<typeof css>) => ReturnType<typeof css>>);
