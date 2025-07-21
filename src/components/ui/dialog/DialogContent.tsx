import { Content } from '@radix-ui/react-dialog';

import { DialogClose } from './DialogClose';
import { DialogOverlay } from './DialogOverlay';
import { DialogPortal } from './DialogPortal';

import styles from './styles.module.css';
import { CloseButton } from '../closeButton/CloseButton';
import { cn } from '../../../lib/utils';

interface IProps extends React.ComponentProps<typeof Content> { }

export const DialogContent: React.FC<IProps> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay>
        <Content data-slot="dialog-content" className={cn(styles.content, className)} {...rest}>
          <DialogClose asChild>
            <CloseButton className={styles.closeButton} />
          </DialogClose>
          {children}
        </Content>
      </DialogOverlay>
    </DialogPortal>
  );
};
