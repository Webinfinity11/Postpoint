"use client";

import { X } from "lucide-react";
import { useUi, type Modal } from "@/store/ui";
import { Dialog } from "./Dialog";
import { site } from "@/data/site";
import { FavoritesModal } from "@/components/modals/ProductModals";
import { FaqModal, OfferModal, PolicyModal, SupportModal } from "@/components/modals/InfoModals";
import { AuthModal, AuthSuccessModal, CheckoutModal, OrderSuccessModal } from "@/components/modals/FormModals";

function ModalBody({ modal }: { modal: Modal }) {
  switch (modal.type) {
    case "favorites":
      return <FavoritesModal />;
    case "auth":
      return <AuthModal mode={modal.mode} />;
    case "policy":
      return <PolicyModal />;
    case "faq":
      return <FaqModal />;
    case "support":
      return <SupportModal />;
    case "offer":
      return <OfferModal id={modal.id} />;
    case "checkout":
      return <CheckoutModal />;
    case "auth-success":
      return <AuthSuccessModal mode={modal.mode} />;
    case "order-success":
      return <OrderSuccessModal count={modal.count} total={modal.total} />;
  }
}

/** One dialog that shows every modal screen (product, login, FAQ, checkout…) */
export function ContentModal() {
  const modal = useUi((s) => s.modal);
  const closeModal = useUi((s) => s.closeModal);

  return (
    <Dialog open={modal !== null} onClose={closeModal} className="content-dialog" labelledBy="modal-title">
      <button type="button" className="icon-button dialog-close" onClick={closeModal} aria-label={site.modals.close}>
        <X className="icon" strokeWidth={1.65} aria-hidden="true" />
      </button>
      {modal && <ModalBody key={JSON.stringify(modal)} modal={modal} />}
    </Dialog>
  );
}
