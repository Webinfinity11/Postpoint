import { hasDatabase } from "@/lib/db";
import { CategoryForm } from "../../../_components/CategoryForm";

export default function NewCategoryPage() {
  return (
    <>
      <header className="adm-head">
        <h1>ახალი კატეგორია</h1>
      </header>
      <CategoryForm productCount={0} readOnly={!hasDatabase} />
    </>
  );
}
