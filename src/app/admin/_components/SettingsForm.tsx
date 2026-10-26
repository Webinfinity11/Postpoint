"use client";

import { saveCredentials } from "../actions";
import { SubmitButton, useSaveForm } from "./FormBits";

export function SettingsForm({ email, readOnly }: { email: string; readOnly: boolean }) {
  const { state, pending, onSubmit } = useSaveForm(saveCredentials);

  return (
    <form onSubmit={onSubmit} className="adm-form adm-form-grid">
      <section className="adm-card">
        <h2>შესვლის მონაცემები</h2>
        <label className="adm-field">
          <span>ელფოსტა *</span>
          <input type="email" name="email" required defaultValue={email} autoComplete="username" />
        </label>
        <label className="adm-field">
          <span>ახალი პაროლი</span>
          <input type="password" name="newPassword" minLength={8} autoComplete="new-password" />
          <small className="adm-muted">მინიმუმ 8 სიმბოლო. ცარიელი = პაროლი არ იცვლება</small>
        </label>
        <label className="adm-field">
          <span>გაიმეორე ახალი პაროლი</span>
          <input type="password" name="repeatPassword" autoComplete="new-password" />
        </label>
      </section>

      <section className="adm-card">
        <h2>დადასტურება</h2>
        <label className="adm-field">
          <span>მიმდინარე პაროლი *</span>
          <input type="password" name="currentPassword" required autoComplete="current-password" />
          <small className="adm-muted">ცვლილების შესანახად შეიყვანე ახლანდელი პაროლი</small>
        </label>
        <p className="adm-muted">შენახვის შემდეგ სხვა მოწყობილობებზე ღია სესიები დაიხურება.</p>
      </section>

      <footer className="adm-form-foot">
        {state.error && <p className="adm-alert" role="alert">{state.error}</p>}
        <div className="adm-form-actions">
          <span className="adm-spacer" />
          <SubmitButton pending={pending} disabled={readOnly} />
        </div>
      </footer>
    </form>
  );
}
