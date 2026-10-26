import { redirect } from "next/navigation";
import { isAdmin, isAuthConfigured } from "@/lib/auth";
import { LoginForm } from "../_components/LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="adm-login">
      <div className="adm-card adm-login-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo.svg" alt="Pospoint" width={176} height={32} />
        <h1>ადმინ პანელი</h1>
        {(await isAuthConfigured()) ? (
          <LoginForm />
        ) : (
          <p className="adm-alert">
            შესასვლელად სერვერზე მიუთითე ცვლადები <code>ADMIN_EMAIL</code> და <code>ADMIN_PASSWORD</code> (ლოკალურად — <code>.env.local</code> ფაილში).
          </p>
        )}
      </div>
    </div>
  );
}
