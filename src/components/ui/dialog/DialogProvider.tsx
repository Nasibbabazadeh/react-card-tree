"use client"
import React from 'react';

import { Dialog } from './Dialog';
import { useDialogStore } from '../../../lib/store/dialog';

export const DialogProvider: React.FC = () => {
  const dialogs = useDialogStore((state) => state.dialogs);

  const close = useDialogStore((state) => state.close);

  const handleDialogOpenChange = (open: boolean, id: string) => {
    if (!open) {
      close(id);
    }
  };

  return dialogs.map((dialog) => (
    <Dialog key={dialog.id} open={dialog.isOpen} onOpenChange={(open) => handleDialogOpenChange(open, dialog.id)}>
      {dialog.content?.(dialog)}
    </Dialog>
  ));
};
