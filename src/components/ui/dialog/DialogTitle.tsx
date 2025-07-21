import { Title } from '@radix-ui/react-dialog';

import styles from './styles.module.css';
import { cn } from '../../../lib/utils';

interface IProps extends React.ComponentProps<typeof Title> { }

export const DialogTitle: React.FC<IProps> = (props) => {
  const { className, ...rest } = props;

  return <Title data-slot="dialog-title" aria-describedby="dialog-title" className={cn(styles.title, className)} {...rest} />;
};
