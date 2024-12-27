export const STABILITY_CONFIG = {
  VALID_DIMENSIONS: [
    { width: 1024, height: 1024 },
    { width: 1152, height: 896 },
    { width: 1216, height: 832 },
    { width: 1344, height: 768 },
    { width: 1536, height: 640 },
    { width: 640, height: 1536 },
    { width: 768, height: 1344 },
    { width: 832, height: 1216 },
    { width: 896, height: 1152 }
  ],
  DEFAULT_DIMENSION: { width: 1024, height: 1024 },
  MODEL_VERSION: 'stable-diffusion-xl-1024-v1-0',
  VIDEO: {
    MIN_DURATION: 1,
    MAX_DURATION: 10,
    DEFAULT_DURATION: 3,
    DEFAULT_FPS: 24
  }
} as const;