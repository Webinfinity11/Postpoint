"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { FormState } from "../actions";

/** Two-step delete: first click asks, second click deletes */
export function DeleteButton({ action, redirectTo }: { action: () => Promise<FormState>; redirectTo?: string }) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const router = useRouter();

  const run = () =>
    start(async () => {
      const result = await action();
      if (result.error) {
        setError(result.error);
        setConfirming(false);
      } else if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
    });

  return (
    <span className="adm-delete">
      {confirming ? (
        <>
          <button type="button" className="adm-btn adm-btn-sm adm-btn-danger" onClick={run} disabled={pending}>
            {pending ? "იშლება…" : "დიახ, წაშალე"}
          </button>
          <button type="button" className="adm-btn adm-btn-sm" onClick={() => setConfirming(false)} disabled={pending}>
            გაუქმება
          </button>
        </>
      ) : (
        <button type="button" className="adm-btn adm-btn-sm adm-btn-ghost-danger" onClick={() => { setError(""); setConfirming(true); }}>
          წაშლა
        </button>
      )}
      {error && <span className="adm-inline-error" role="alert">{error}</span>}
    </span>
  );
}
