import { useDialogStore, type IDialogInstance } from '../../../lib/store/dialog';
import { useTreeStore } from '../../../lib/store/use-tree-store';
import Button from '../../ui/button/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { textVariants } from '../../ui/text/text';

export default function DeleteDialog({ dialog, nodeId }: { dialog: IDialogInstance, nodeId: number }) {
  const { deleteNode } = useTreeStore();

  const handleDelete = () => {
    deleteNode(nodeId);
    close(dialog.id)
  }

  const close = useDialogStore(state => state.close)

  return (
    <DialogContent>
      <DialogHeader >
        <DialogTitle className={textVariants({
          size: "x3l",
          textAlign: "center", weight: "semibold"
        })}>Kartı silmək istədiyinizdən əminsiniz ?</DialogTitle>
      </DialogHeader>



      <DialogDescription className={textVariants({
        textAlign: "center",
        color: "secondary"
      })}>
        Kartı siləcəyiniz təqdirdə datanı geri qaytarmaq mümkün olmayacaq!
      </DialogDescription>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Bağla</Button>
        </DialogClose>
        <Button onClick={handleDelete} variant="destructive">
          Doğrula
        </Button>
      </DialogFooter>
    </DialogContent >
  );
}
