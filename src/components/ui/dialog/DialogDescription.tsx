import { Description } from '@radix-ui/react-dialog';
import { cn } from '../../../lib/utils';
import styles from './styles.module.css'

interface IProps extends React.ComponentProps<typeof Description> { }

export const DialogDescription: React.FC<IProps> = (props) => {
  const { className, ...rest } = props;

  return <Description data-slot="dialog-description" aria-describedby="dialog-description" className={cn(className, styles.description)} {...rest} />;
};
