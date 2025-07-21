interface IProps extends React.ComponentProps<'div'> { }

export const DialogHeader: React.FC<IProps> = (props) => {
  return <div data-slot="dialog-header" {...props} />;
};
