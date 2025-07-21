import { create } from 'zustand';

interface IDialogOptions {
    id?: string;
    content?: (dialog: IDialogInstance) => React.ReactNode;
}

export interface IDialogInstance extends IDialogOptions {
    id: string;
    isOpen: boolean;
}

export interface IDialogState {
    dialogs: IDialogInstance[];
    open: (options: IDialogOptions) => string;
    close: (id: string) => void;
}

const DIALOG_TIMEOUT = 200;

export const useDialogStore = create<IDialogState>((set) => ({
    dialogs: [],
    open: (options: IDialogOptions) => {
        const id = options.id ?? crypto.randomUUID();

        set((state) => ({
            dialogs: [
                ...state.dialogs,
                {
                    ...options,
                    id,
                    isOpen: true,
                },
            ],
        }));

        return id;
    },
    close: (id: string) => {
        set((state) => ({
            dialogs: state.dialogs.map((dialog) =>
                dialog.id === id ? { ...dialog, isOpen: false } : dialog
            ),
        }));

        setTimeout(() => {
            set((state) => ({
                dialogs: state.dialogs.filter((dialog) => dialog.id !== id),
            }));
        }, DIALOG_TIMEOUT);
    },
}));
