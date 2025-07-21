import { Overlay } from '@radix-ui/react-dialog';

import styles from './styles.module.css';
import { cn } from '../../../lib/utils';

interface IProps extends React.ComponentProps<typeof Overlay> { }

export const DialogOverlay: React.FC<IProps> = (props) => {
  const { className, ...rest } = props;

  return <Overlay data-slot="dialog-overlay" className={cn(styles.overlay, className)} {...rest} />;
};
