import { Root } from '@radix-ui/react-dialog';

interface IProps extends React.ComponentProps<typeof Root> { }

export const Dialog: React.FC<IProps> = (props) => {
  return <Root data-slot="dialog" {...props} />;
};
