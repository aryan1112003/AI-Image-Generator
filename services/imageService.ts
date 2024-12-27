import axios, { AxiosError } from 'axios';
import type { GenerateImageParams, ImageResponse } from '../types/api';
import { config } from '../config/env';
import { STABILITY_CONFIG } from '../config/stability';
import { validatePrompt, sanitizePrompt, validateDimensions } from '../utils/validation';
import { addWatermark } from '../utils/image';

export async function generateImage({
  prompt,
  negativePrompt = '',
  width = STABILITY_CONFIG.DEFAULT_DIMENSION.width,
  height = STABILITY_CONFIG.DEFAULT_DIMENSION.height,
}: GenerateImageParams): Promise<ImageResponse> {
  const promptValidation = validatePrompt(prompt);
  if (!promptValidation.isValid) {
    return { url: '', error: promptValidation.error };
  }

  const dimensionValidation = validateDimensions({ width, height });
  if (!dimensionValidation.isValid) {
    return { url: '', error: dimensionValidation.error };
  }

  try {
    const response = await axios.post(
      `${config.apiHost}/v1/generation/${STABILITY_CONFIG.MODEL_VERSION}/text-to-image`,
      {
        text_prompts: [
          {
            text: sanitizePrompt(prompt),
            weight: 1,
          },
          ...(negativePrompt ? [{
            text: sanitizePrompt(negativePrompt),
            weight: -1,
          }] : []),
        ],
        cfg_scale: 7,
        height,
        width,
        steps: 30,
        samples: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${config.stabilityApiKey}`,
        },
      }
    );

    const image = response.data.artifacts[0];
    const imageUrl = `data:image/png;base64,${image.base64}`;
    
    // Add watermark
    const watermarkedImage = await addWatermark(imageUrl, '© Aryan Acharya');
    
    return {
      url: watermarkedImage,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      return {
        url: '',
        error: `API Error: ${message}`,
      };
    }
    return {
      url: '',
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}