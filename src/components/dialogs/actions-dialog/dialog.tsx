import { useDialogStore, type IDialogInstance } from '../../../lib/store/dialog';
import type { IEditingNode } from '../../../lib/types';
import styles from './styles.module.css';
import Button from '../../ui/button/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import Text, { textVariants } from '../../ui/text/text';
import { useState } from 'react';
import { useTreeStore } from '../../../lib/store/use-tree-store';

interface IProps {
  dialog: IDialogInstance;
  type: 'add' | 'edit';
  node: IEditingNode
}

export default function ActionsDialog({
  dialog,
  type,
  node
}: IProps) {
  const close = useDialogStore((state) => state.close);
  const {
    addChild,
    updateNode,
  } = useTreeStore();
  const [name, setName] = useState(node?.name || '');
  const [description, setDescription] = useState(node?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      if (type === "add") {
        addChild(type === "add" ? node.id ?? null : node.id, name, description);
      }
      else {
        updateNode(node.id!, name, description)
      }
      close(dialog.id);
    }
  };


  return (
    <DialogContent className={styles.content}>
      <DialogHeader>
        <DialogTitle
          className={textVariants({
            size: 'x3l',
            textAlign: 'center',
            weight: 'semibold',
          })}
        >
          {type === 'add' ? 'Əlavə et' : 'Düzəliş et'}
        </DialogTitle>
      </DialogHeader>

      <form className={styles.form}>
        <div className={styles.group}>
          <Text as="label" htmlFor="name" className={styles.label}>
            Name:
          </Text>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter card name"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.group}>
          <Text as="label" htmlFor="description" className={styles.label}>
            Description:
          </Text>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter card description"
            className={styles.textarea}
            required
          />
        </div>

      </form>

      <DialogFooter>
        <Button type="submit" onClick={handleSubmit}>Təsdiqlə</Button>
        <DialogClose asChild>
          <Button variant="outline">Bağla</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
