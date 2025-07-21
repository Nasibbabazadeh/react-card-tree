import { Close } from '@radix-ui/react-dialog';

interface IProps extends React.ComponentProps<typeof Close> { }

export const DialogClose: React.FC<IProps> = (props) => {
  return <Close data-slot="dialog-close" {...props} />;
};
