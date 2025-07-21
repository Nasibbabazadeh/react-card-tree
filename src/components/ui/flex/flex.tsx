import React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import styles from './flex.module.css';
import type { TPolymorphicComponentProps } from '../../../types/util';

export const flexVariants = cva(styles.root, {
  variants: {
    direction: {
      row: styles.row,
      column: styles.column,
    },
    bg: {
      black: styles.black
    },
    radius: {
      standart: styles.standart
    },
    position: {
      relative: styles.relative,
      absolute: styles.absolute
    },
    justify: {
      start: styles.justifyStart,
      center: styles.justifyCenter,
      end: styles.justifyEnd,
      between: styles.justifyBetween,
    },
    align: {
      start: styles.alignStart,
      center: styles.alignCenter,
      end: styles.alignEnd,
      stretch: styles.alignStretch
    },
    gap: {
      none: styles.gapNone,
      xxs: styles.gapXxs,
      xs: styles.gapXs,
      sm: styles.gapSm,
      md: styles.gapMd,
      lg: styles.gapLg,
      lg2: styles.gap2Lg,
      xl: styles.gapXl,
      xl2: styles.gap2xl,
      xl3: styles.gap3xl,
      xl4: styles.gap4xl,
      xl5: styles.gap5xl,
      xl6: styles.gap6xl
    },
    wrap: {
      wrapReverse: styles.wrapReverse,
      wrap: styles.wrap,
      noWrap: styles.noWrap
    },
  },
});

type TProps<C extends React.ElementType> = TPolymorphicComponentProps<C, VariantProps<typeof flexVariants>>;

export const Flex = <C extends React.ElementType = 'div'>(props: TProps<C>) => {
  const {
    as: Component = 'div',
    direction = null,
    justify = null,
    align = "start",
    gap = null,
    wrap = null,
    radius = null,
    bg = null,
    position = null,
    className,
    ...rest
  } = props;

  return <Component className={flexVariants({ direction, justify, align, gap, wrap, position, bg, radius, className })} {...rest} />;
};



export default Flex;