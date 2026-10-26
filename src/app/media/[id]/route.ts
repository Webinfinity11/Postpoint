import { getImage, hasDatabase } from "@/lib/db";

// ადმინიდან ატვირთული სურათები ინახება ბაზაში და აქედან იკითხება: /media/<id>
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!hasDatabase || !/^[a-f0-9-]{36}$/.test(id)) return new Response("Not found", { status: 404 });

  const image = await getImage(id);
  if (!image) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.mime,
      // id არასოდეს იცვლება — სურათის შეცვლა ახალ id-ს ქმნის
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
