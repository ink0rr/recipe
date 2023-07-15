import { base, assets } from "$app/paths";
import { getRecipeParams } from "$lib/core/params";
import { customItems as customItemStore } from "$lib/stores/customItems";
import { vanillaItems } from "$lib/vanillaItems";
import type { RequestHandler } from "@sveltejs/kit";
import { readFile } from "fs/promises";
import { Image } from "imagescript";
import { toUint8Array } from "js-base64";
import { join } from "path";
import {} from "svelte";
import { get } from "svelte/store";

export const GET: RequestHandler = async ({ url, setHeaders }) => {
  const { input, output } = getRecipeParams(url.searchParams);
  const image = await createRecipeImage(input, output);
  setHeaders({
    "Content-Type": "image/png",
  });
  return new Response(await image.encode());
};

async function loadImage(path: string) {
  const buffer = await readFile(path);
  // @ts-expect-error
  return Image.decode(buffer);
}

function decodeImage(base64: string) {
  const bytes = toUint8Array(base64.split(",")[1]);
  // @ts-expect-error
  return Image.decode(bytes);
}

async function createRecipeImage(inputs: string[], output: string) {
  const result = await loadImage(join(process.cwd(), "static", "base.png"));
  const missing = await loadImage(join(process.cwd(), "static", "missing.png"));

  const customItems = get(customItemStore);
  const textures = new Map<string, Image>();

  const getItemTexture = async (id: string) => {
    if (textures.has(id)) {
      return textures.get(id)!;
    }
    if (vanillaItems[id]) {
      textures.set(id, await decodeImage(vanillaItems[id].texture));
    }
    if (customItems[id]) {
      textures.set(id, await decodeImage(customItems[id].texture));
    }
    return textures.get(id) ?? missing;
  };

  let x = 0;
  let y = 0;
  for (const input of inputs) {
    if (input) {
      const image = await getItemTexture(input);
      image.fit(48, 48);
      result.composite(image, 6 + x * 54, 6 + y * 54);
    }
    if (++x % 3 === 0) {
      x = 0;
      y++;
    }
  }

  if (output) {
    const image = await getItemTexture(output);
    image.fit(48, 48);
    result.composite(image, 300, 60);
  }

  return result;
}
