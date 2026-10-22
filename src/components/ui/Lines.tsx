import { Fragment } from "react";

/** Renders text lines joined with <br> */
export function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <>
          {" "}
          <br />
        </>
      )}
      {line}
    </Fragment>
  ));
}
