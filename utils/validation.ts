import { ImageDimension } from '../types/api';
import { STABILITY_CONFIG } from '../config/stability';

const MAX_PROMPT_LENGTH = 2000;

export function sanitizePrompt(text: string): string {
  return text.trim();
}

export function validatePrompt(text: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizePrompt(text);
  
  if (!sanitized) {
    return { isValid: false, error: 'Prompt is required' };
  }
  
  if (sanitized.length > MAX_PROMPT_LENGTH) {
    return { 
      isValid: false, 
      error: `Prompt must be less than ${MAX_PROMPT_LENGTH} characters` 
    };
  }
  
  return { isValid: true };
}

export function validateDimensions(dimensions: ImageDimension): { isValid: boolean; error?: string } {
  const isValidDimension = STABILITY_CONFIG.VALID_DIMENSIONS.some(
    dim => dim.width === dimensions.width && dim.height === dimensions.height
  );

  if (!isValidDimension) {
    const validDimensionsText = STABILITY_CONFIG.VALID_DIMENSIONS
      .map(dim => `${dim.width}x${dim.height}`)
      .join(', ');
    return {
      isValid: false,
      error: `Invalid dimensions. Allowed dimensions are: ${validDimensionsText}`
    };
  }

  return { isValid: true };
}