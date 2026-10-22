import type { ReactNode } from "react";

export function SectionHeading({ id, title, children, action }: { id: string; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <h2 id={id}>{title}</h2>
        {children}
      </div>
      {action}
    </div>
  );
}
