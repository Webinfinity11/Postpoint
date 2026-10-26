import { currentAdmin } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import { SavedNotice } from "../../_components/SavedNotice";
import { SettingsForm } from "../../_components/SettingsForm";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function SettingsPage({ searchParams }: Props) {
  const { saved } = await searchParams;
  const admin = await currentAdmin();

  return (
    <>
      <header className="adm-head">
        <h1>პარამეტრები</h1>
      </header>
      {saved && <SavedNotice />}
      <SettingsForm email={admin?.email ?? ""} readOnly={!hasDatabase} />
    </>
  );
}
