import { Portal } from '@radix-ui/react-dialog';

interface IProps extends React.ComponentProps<typeof Portal> { }

export const DialogPortal: React.FC<IProps> = (props) => {
  return <Portal data-slot="dialog-portal" {...props} />;
};
