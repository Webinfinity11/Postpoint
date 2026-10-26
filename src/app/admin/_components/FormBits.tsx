"use client";

import { useState, useTransition, type FormEvent } from "react";
import { slugify } from "@/lib/slug";
import type { FormState } from "../actions";

/**
 * Submits through onSubmit instead of <form action>, so React does not reset
 * the fields when the server returns a validation error.
 */
export function useSaveForm(save: (prev: FormState, form: FormData) => Promise<FormState>) {
  const [state, setState] = useState<FormState>({});
  const [pending, start] = useTransition();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    start(async () => setState((await save({}, form)) ?? {}));
  };
  return { state, pending, onSubmit };
}

export function SubmitButton({ pending, disabled }: { pending: boolean; disabled?: boolean }) {
  return (
    <button className="adm-btn adm-btn-primary" disabled={pending || disabled}>
      {pending ? "ინახება…" : "შენახვა"}
    </button>
  );
}

/** Name + URL id. For new items the id follows the name until edited by hand; existing ids are fixed. */
export function NameAndId({ name, id, isNew, prefix }: { name: string; id: string; isNew: boolean; prefix: string }) {
  const [nameValue, setName] = useState(name);
  const [idValue, setId] = useState(id);
  const [touched, setTouched] = useState(!isNew);

  return (
    <>
      <label className="adm-field">
        <span>სახელი *</span>
        <input
          name="name"
          required
          value={nameValue}
          onChange={(e) => {
            setName(e.target.value);
            if (!touched) setId(slugify(e.target.value));
          }}
        />
      </label>
      <label className="adm-field">
        <span>ID (მისამართი) *</span>
        <input
          name="id"
          required
          className="adm-mono"
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          title="ლათინური პატარა ასოები, ციფრები და ტირე"
          value={idValue}
          readOnly={!isNew}
          onChange={(e) => {
            setTouched(true);
            setId(e.target.value.toLowerCase());
          }}
        />
        <small className="adm-muted">
          {prefix}
          {idValue || "…"}
          {!isNew && " — შექმნის შემდეგ არ იცვლება"}
        </small>
      </label>
    </>
  );
}
