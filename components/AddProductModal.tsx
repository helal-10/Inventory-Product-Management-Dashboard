"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Plus, X } from "lucide-react";
import AddProductForm from "./AddProductForm";

interface AddProductModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerLabel?: string;
}

export default function AddProductModal({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  triggerLabel = "Add Product",
}: AddProductModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (isControlled) {
      setControlledOpen?.(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs sm:text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-ring cursor-pointer">
        <Plus className="size-4" />
        <span>{triggerLabel}</span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg rounded-2xl bg-card p-6 text-card-foreground shadow-2xl border border-border/80 outline-none transition-all duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <div className="flex items-center justify-between pb-4 border-b border-border/70 mb-5">
            <div>
              <Dialog.Title className="text-lg font-bold tracking-tight">
                Add New Product
              </Dialog.Title>
              <Dialog.Description className="text-xs text-muted-foreground mt-0.5">
                Fill in product details to add it to your catalog.
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <AddProductForm
            onSuccess={() => handleOpenChange(false)}
            asCard={false}
          />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
