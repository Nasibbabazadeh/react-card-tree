import React from 'react';

import { type TPolymorphicComponentProps } from '../../../lib/types/util';
import { type VariantProps, cva } from 'class-variance-authority';

import styles from './text.module.css';

export const textVariants = cva(
  {},
  {
    variants: {
      size: {
        x2s: styles.x2s,
        xs: styles.xs,
        sm: styles.sm,
        base: styles.base,
        md: styles.md,
        lg: styles.lg,
        xl: styles.xl,
        xxl: styles.xxl,
        x2l: styles.x2l,
        x3l: styles.x3l,
        x4l: styles.x4l,
        x5l: styles.x5l
      },
      textAlign: {
        center: styles.alignCenter
      },
      weight: {
        regular: styles.regular,
        medium: styles.medium,
        semibold: styles.semibold,
        bold: styles.bold,
      },
      color: {
        primary: styles.primary,
        secondary: styles.secondary,
      },
      wrap: {
        noWrap: styles.noWrap,
        balance: styles.balance,
        wrap: styles.wrap
      },
      hover: {
        primary: styles.hoverPrimary,
        secondary: styles.hoverSecondary,
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'regular',
      color: 'primary',
      wrap: 'wrap',
    },
  }
);

type TProps<C extends React.ElementType> = TPolymorphicComponentProps<C, VariantProps<typeof textVariants>>;

export const Text = <C extends React.ElementType = 'span'>(props: TProps<C>) => {
  const {
    as: Component = 'span',
    size = null,
    weight = 'regular',
    color = 'primary',
    wrap = null,
    hover = null,
    textAlign = null,
    className,
    ...rest
  } = props;

  return <Component className={textVariants({ size, weight, color, wrap, hover, textAlign, className })} {...rest} />;
};


export default Text;