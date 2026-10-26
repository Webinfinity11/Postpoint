"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { MAX_IMAGE_MB } from "../constants";

/**
 * Sends `image` (current path), `imageFile` (new upload) and `removeImage`.
 * The upload itself happens in the save action.
 */
export function ImageField({ current, label = "სურათი" }: { current: string; label?: string }) {
  const [preview, setPreview] = useState(current);
  const [removed, setRemoved] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (preview.startsWith("blob:")) URL.revokeObjectURL(preview); }, [preview]);

  function pick(file: File | undefined) {
    setError("");
    if (!file) return;
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setError(`ფაილი ძალიან დიდია (მაქს. ${MAX_IMAGE_MB} MB).`);
      if (input.current) input.current.value = "";
      return;
    }
    setPreview(URL.createObjectURL(file));
    setRemoved(false);
  }

  function clear() {
    if (input.current) input.current.value = "";
    setPreview("");
    setRemoved(true);
  }

  return (
    <div className="adm-field">
      <span>{label}</span>
      <input type="hidden" name="image" value={current} />
      {removed && <input type="hidden" name="removeImage" value="on" />}
      <div className="adm-image">
        <button type="button" className="adm-image-drop" onClick={() => input.current?.click()} aria-label="სურათის არჩევა">
          {preview ? <img src={preview} alt="" /> : <ImagePlus className="icon" aria-hidden="true" />}
        </button>
        <div className="adm-image-side">
          <button type="button" className="adm-btn adm-btn-sm" onClick={() => input.current?.click()}>
            {preview ? "შეცვლა" : "ატვირთვა"}
          </button>
          {preview && (
            <button type="button" className="adm-btn adm-btn-sm adm-btn-ghost-danger" onClick={clear}>
              მოშორება
            </button>
          )}
          <small className="adm-muted">JPG, PNG, WEBP ან AVIF, მაქს. {MAX_IMAGE_MB} MB</small>
          {error && <small className="adm-inline-error">{error}</small>}
        </div>
        <input
          ref={input}
          type="file"
          name="imageFile"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          hidden
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
