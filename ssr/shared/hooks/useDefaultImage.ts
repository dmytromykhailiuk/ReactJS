import { useState, useCallback, useMemo } from "react";

const DEFAULT_IMG_PATH = "/no-picture.png";

export function useDefaultImage(imageUrl: string) {
  const [defaultImage, setDefaultImage] = useState(null);

  useMemo(() => {
    setDefaultImage(null);
  }, [imageUrl]);

  const setError = useCallback(() => {
    setDefaultImage(DEFAULT_IMG_PATH);
  }, []);

  return [defaultImage, setError];
}
