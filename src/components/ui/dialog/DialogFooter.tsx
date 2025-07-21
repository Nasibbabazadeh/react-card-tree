
import { cn } from '../../../lib/utils';
import styles from './styles.module.css';

interface IProps extends React.ComponentProps<'div'> { }

export const DialogFooter: React.FC<IProps> = (props) => {
  const { className, ...rest } = props;

  return <div data-slot="dialog-footer" className={cn(styles.footer, className)} {...rest} />;
};
