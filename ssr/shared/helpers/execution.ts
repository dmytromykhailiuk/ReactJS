export const execution = {
  get isClient(): boolean {
    return typeof window === 'object';
  },
  get isServer(): boolean {
    return typeof window === 'undefined';
  },
};
