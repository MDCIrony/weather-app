let timeoutId: ReturnType<typeof setTimeout>;

export default function debounce(fn: Function, ms: number = 400) {
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}
