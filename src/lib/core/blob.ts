export async function imageBlob(params: URLSearchParams) {
  const res = await fetch(`/image?${params}`);
  return res.blob();
}

export function gdocsBlob(params: URLSearchParams) {
  return new Blob(
    [
      `<meta charset="utf-8"><b><a href="${location.href}" style="text-decoration:none;"><span><span>&hairsp;<img src="${location.origin}/image?${params}"></span></span></a></b>`,
    ],
    { type: "text/html" },
  );
}
