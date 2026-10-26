"use client";

import { useActionState } from "react";
import { login } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className="adm-form">
      <label className="adm-field">
        <span>ელფოსტა</span>
        <input type="email" name="email" required autoFocus autoComplete="username" />
      </label>
      <label className="adm-field">
        <span>პაროლი</span>
        <input type="password" name="password" required autoComplete="current-password" />
      </label>
      {state.error && <p className="adm-alert" role="alert">{state.error}</p>}
      <button className="adm-btn adm-btn-primary" disabled={pending}>
        {pending ? "მოწმდება…" : "შესვლა"}
      </button>
    </form>
  );
}
