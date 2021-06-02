export const checkIsValidImagePath = (path: string, onError: () => void) => {
  const img = document.createElement('img');
  img.onerror = onError;
  img.setAttribute('src', path);
};
