import { useState } from 'react';
import { toast } from 'sonner';
import { convertAndOptimizeImage, isImageFile } from '@/lib/imageUtils';

interface UseImageUploadOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  onSuccess?: (file: File) => void;
  onError?: (error: Error) => void;
}

export const useImageUpload = (options: UseImageUploadOptions = {}) => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.9,
    onSuccess,
    onError,
  } = options;

  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState<File | null>(null);

  const handleImageUpload = async (file: File) => {
    if (!isImageFile(file)) {
      const error = new Error('Please select a valid image file');
      toast.error(error.message);
      onError?.(error);
      return null;
    }

    setIsConverting(true);
    
    try {
      toast.loading('Converting image to WebP...', { id: 'converting' });
      
      const webpFile = await convertAndOptimizeImage(
        file,
        maxWidth,
        maxHeight,
        quality
      );
      
      setConvertedFile(webpFile);
      toast.success('Image converted to WebP successfully', { id: 'converting' });
      onSuccess?.(webpFile);
      
      return webpFile;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to convert image');
      toast.error(err.message, { id: 'converting' });
      onError?.(err);
      return null;
    } finally {
      setIsConverting(false);
    }
  };

  const reset = () => {
    setConvertedFile(null);
  };

  return {
    handleImageUpload,
    isConverting,
    convertedFile,
    reset,
  };
};
