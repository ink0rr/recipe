let timer: NodeJS.Timeout;

export function debounce(fn: () => void, delay = 150) {
  clearTimeout(timer);
  timer = setTimeout(fn, delay);
}
