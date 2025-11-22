"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  name?: string;            // form field name to submit HTML
  placeholder?: string;
  defaultHTML?: string;
};

export default function RichEditor({ name="body", placeholder="Write your post...", defaultHTML="" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hidden = useRef<HTMLTextAreaElement>(null);
  const [busy, setBusy] = useState(false);

  // sync hidden field
  const sync = () => { if (hidden.current && ref.current) hidden.current.value = ref.current.innerHTML; };
  useEffect(() => { if (ref.current) ref.current.innerHTML = defaultHTML; sync(); }, []);

  const cmd = (c: string, v?: string) => { document.execCommand(c, false, v); sync(); };

  const insertImageFromFile = async (file: File) => {
    try {
      setBusy(true);
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.url) document.execCommand("insertImage", false, json.url);
    } finally {
      setBusy(false);
      sync();
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) insertImageFromFile(f);
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const item = e.clipboardData.items && Array.from(e.clipboardData.items).find(i => i.type.startsWith("image/"));
    if (item) {
      e.preventDefault();
      insertImageFromFile(item.getAsFile()!);
    }
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Btn onClick={() => cmd("formatBlock", "h2")}>H2</Btn>
        <Btn onClick={() => cmd("bold")}>B</Btn>
        <Btn onClick={() => cmd("italic")}><i>I</i></Btn>
        <Btn onClick={() => cmd("underline")}><u>U</u></Btn>
        <Btn onClick={() => cmd("insertUnorderedList")}>• List</Btn>
        <Btn onClick={() => cmd("formatBlock", "blockquote")}>“ Quote</Btn>
        <Btn onClick={() => {
          const url = prompt("Link URL");
          if (url) cmd("createLink", url);
        }}>Link</Btn>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded border px-2 py-1 text-sm">
          {busy ? "Uploading…" : "Image"}
          <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) insertImageFromFile(f); }} />
        </label>
      </div>

      {/* Editor */}
      <div
        ref={ref}
        className="min-h-[280px] w-full rounded-lg border p-3 leading-7 focus:outline-none"
        contentEditable
        onInput={sync}
        onBlur={sync}
        onDrop={onDrop}
        onPaste={onPaste}
        suppressContentEditableWarning
        data-placeholder={placeholder}
        style={{ whiteSpace: "pre-wrap" }}
      />
      <textarea ref={hidden} name={name} className="hidden" />
      <style>{`
        [contenteditable][data-placeholder]:empty:before{
          content: attr(data-placeholder);
          color: #8c8c8c;
        }
        [contenteditable] img{ max-width:100%; border-radius: 8px; }
      `}</style>
    </div>
  );
}

function Btn({ onClick, children }: { onClick: () => void; children: any }) {
  return (
    <button type="button" onClick={onClick}
      className="rounded border px-2 py-1 text-sm hover:bg-neutral-50">
      {children}
    </button>
  );
}
