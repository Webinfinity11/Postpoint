import type { ReactNode } from "react";

export function SectionHeading({ id, title, children, action, eyebrow }: { id: string; title: string; children?: ReactNode; action?: ReactNode; eyebrow?: string }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        <h2 id={id}>{title}</h2>
        {children}
      </div>
      {action}
    </div>
  );
}
