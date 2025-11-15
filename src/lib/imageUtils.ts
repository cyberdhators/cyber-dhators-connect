/**
 * Convert an image file to WebP format
 * @param file - The image file to convert
 * @param quality - WebP quality (0-1), default 0.9
 * @returns Promise<Blob> - The converted WebP image as a Blob
 */
export const convertToWebP = async (
  file: File | Blob,
  quality: number = 0.9
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Draw image on canvas
      ctx.drawImage(img, 0, 0);

      // Convert to WebP
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image to WebP'));
          }
        },
        'image/webp',
        quality
      );

      // Clean up
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
      URL.revokeObjectURL(img.src);
    };

    // Create object URL from file
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Convert an image file to WebP and return as File object
 * @param file - The image file to convert
 * @param quality - WebP quality (0-1), default 0.9
 * @returns Promise<File> - The converted WebP image as a File
 */
export const convertImageFileToWebP = async (
  file: File,
  quality: number = 0.9
): Promise<File> => {
  const webpBlob = await convertToWebP(file, quality);
  const originalName = file.name.replace(/\.[^/.]+$/, '');
  return new File([webpBlob], `${originalName}.webp`, {
    type: 'image/webp',
    lastModified: Date.now(),
  });
};

/**
 * Check if a file is an image
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Get optimized image dimensions while maintaining aspect ratio
 * @param originalWidth - Original image width
 * @param originalHeight - Original image height
 * @param maxWidth - Maximum width constraint
 * @param maxHeight - Maximum height constraint
 * @returns Object with optimized width and height
 */
export const getOptimizedDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number = 1920,
  maxHeight: number = 1080
): { width: number; height: number } => {
  let width = originalWidth;
  let height = originalHeight;

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  return { width, height };
};

/**
 * Convert and optimize image to WebP with size constraints
 * @param file - The image file to convert
 * @param maxWidth - Maximum width (default: 1920)
 * @param maxHeight - Maximum height (default: 1080)
 * @param quality - WebP quality (0-1), default 0.9
 * @returns Promise<File> - The optimized WebP image
 */
export const convertAndOptimizeImage = async (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.9
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      const { width, height } = getOptimizedDimensions(
        img.naturalWidth,
        img.naturalHeight,
        maxWidth,
        maxHeight
      );

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const originalName = file.name.replace(/\.[^/.]+$/, '');
            const webpFile = new File([blob], `${originalName}.webp`, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(webpFile);
          } else {
            reject(new Error('Failed to convert image to WebP'));
          }
        },
        'image/webp',
        quality
      );

      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(file);
  });
};
