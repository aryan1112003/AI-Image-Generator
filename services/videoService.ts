import { AxiosError } from 'axios';
import type { GenerateVideoParams, VideoResponse } from '../types/api';
import { STABILITY_CONFIG } from '../config/stability';
import { validatePrompt, sanitizePrompt } from '../utils/validation';
import { apiClient, retryRequest } from '../utils/api';

export async function generateVideo({
  prompt,
  negativePrompt = '',
  durationSeconds = STABILITY_CONFIG.VIDEO.DEFAULT_DURATION,
  fps = STABILITY_CONFIG.VIDEO.DEFAULT_FPS,
}: GenerateVideoParams): Promise<VideoResponse> {
  const promptValidation = validatePrompt(prompt);
  if (!promptValidation.isValid) {
    return { url: '', error: promptValidation.error };
  }

  try {
    const response = await retryRequest(() =>
      apiClient.post('/v2/generation/stable-video-diffusion/text-to-video', {
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
        height: 576,
        width: 1024,
        output_format: 'mp4',
        cfg_scale: 7,
        motion_bucket_id: 127,
        seed: Math.floor(Math.random() * 2147483647),
        frames_per_second: fps,
        clip_length: durationSeconds,
      }, {
        headers: {
          Accept: 'video/*',
        },
      })
    );

    const video = response.data.artifacts[0];
    return {
      url: `data:video/mp4;base64,${video.base64}`,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      return {
        url: '',
        error: `API Error: ${message}. Please try again.`,
      };
    }
    return {
      url: '',
      error: 'A network error occurred. Please check your connection and try again.',
    };
  }
}