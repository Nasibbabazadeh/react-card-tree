import { XIcon } from 'lucide-react';
import React from 'react';
import type { IButtonProps } from '../button/button';
import { cn } from '../../../lib/utils';

interface IProps extends IButtonProps { }

export const CloseButton: React.FC<IProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <button className={cn(className)} {...rest}>
      <XIcon size={24} color='#333333' />
    </button>
  );
};
