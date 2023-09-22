import { customItems } from "$lib/stores/customItems";
import { getItem } from "$lib/utils/getItem";
import { toUint8Array } from "js-base64";
import sharp, { type ResizeOptions, type Sharp } from "sharp";
import { get } from "svelte/store";

export const resizeOptions: ResizeOptions = {
  background: "#00000000",
  fit: "contain",
  kernel: "nearest",
};

export function decodeImage(base64: string) {
  const bytes = toUint8Array(base64.split(",")[1]);
  return sharp(bytes);
}

const missingTexture = decodeImage(
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEX/AP//AP//AP/9AP0fAB8AAAABAAEAAAD/AP/9AP0fAB8BAAH/AP/+AP4YABgBAAH/AP/+AP4WABYBAAH+AP4XABcBAAH+AP4XABf/AP//AP/+AP4YABgBAAEAAAD/AP/+AP4ZABkDAAP+AP4SABL+AP4UABT+AP7+AP7+AP7+AP7+AP70APRXAFcUABQYABgXABcXABcXABceAB4VABUXABcSABJYAFj0APT+AP7+AP7+AP79AP2J1Tm8AAAAAWJLR0QF+G/pxwAAAAd0SU1FB+EJDhcOFGEzO8MAAAAJdnBBZwAAACIAAAAiAPgEXxQAAADzSURBVDjL1dDZkoIwEAXQy3IBBQVFUVHcd8d9G5f//64pCy0yqQrv3n5LnaTTDWTRdMAwSctmFojAAQpF0lUCDyiVSV8JAqBSJcM8UKuTUR5oNL8SaFlaMdDukEnXzgLd8YJ34h7QH5DDJEoT+q4FKaMx/0cGk6kMjMKsMm8sXtVejlY/681429k1X7WvHoomzGP5VE8PzoPL9Po7ufXv6YXao/Q0IL24WclNJXC5ycBy/fA9VTIkt0ugF38G9xwdwk66CXm+A3FL2J7Ywo7I3QIINMUfvgbs53kgJE+PPOCThxngKYFLHp+AowQWaRqALoI/Q50gLzlZBxIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDktMTVUMDE6MTQ6MjArMDI6MDDBw4POAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA5LTE1VDAxOjE0OjIwKzAyOjAwsJ47cgAAAABJRU5ErkJggg==",
);

export class TextureList {
  #textures;
  #customItems;

  constructor() {
    this.#textures = new Map<string, Sharp>();
    this.#customItems = get(customItems);
  }

  get(id: string) {
    const cache = this.#textures.get(id);
    if (cache) {
      return cache;
    }
    const texture = getItem(id)?.texture ?? this.#customItems[id]?.texture;
    if (texture) {
      const decoded = decodeImage(texture);
      this.#textures.set(id, decoded);
      return decoded;
    }
    return missingTexture;
  }
}
