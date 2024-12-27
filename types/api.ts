export interface ImageResponse {
  url: string;
  error?: string;
}

export interface VideoResponse {
  url: string;
  error?: string;
}

export interface GenerateImageParams {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
}

export interface GenerateVideoParams {
  prompt: string;
  negativePrompt?: string;
  durationSeconds?: number;
  fps?: number;
}

export interface ImageDimension {
  width: number;
  height: number;
}