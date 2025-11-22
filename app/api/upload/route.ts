import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const orig = file.name || "upload.bin";
    const ext = (orig.split(".").pop() || "jpg").toLowerCase();
    const name = `${Date.now()}-${Math.random().toString(36).slice(2,7)}.${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, name), buf);
    return NextResponse.json({ url: `/uploads/${name}` });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
