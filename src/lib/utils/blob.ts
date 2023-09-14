export async function getImageBlob(compact: boolean) {
  const res = await fetch(`/image/${location.search}&compact=${compact}`);
  return res.blob();
}

export function getGdocsBlob(compact: boolean) {
  return new Blob(
    [
      `<meta charset="utf-8"><b><a href="${location.href}" style="text-decoration:none;"><span><span>&hairsp;<img src="${location.origin}/image/${location.search}&compact=${compact}"></span></span></a></b>`,
    ],
    { type: "text/html" }
  );
}
