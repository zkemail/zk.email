import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-static";

export async function GET() {
  const filePath = path.join(process.cwd(), "public/forward/index.html");
  const html = await readFile(filePath, "utf8");
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
