let timer: NodeJS.Timeout;

export function debounce(fn: () => void, delay = 300) {
  clearTimeout(timer);
  timer = setTimeout(fn, delay);
}
