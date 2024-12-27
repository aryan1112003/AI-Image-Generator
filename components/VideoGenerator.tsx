import React, { useState } from 'react';
import { Video, Loader2 } from 'lucide-react';
import { generateVideo } from '../services/videoService';
import { STABILITY_CONFIG } from '../config/stability';

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [duration, setDuration] = useState(STABILITY_CONFIG.VIDEO.DEFAULT_DURATION);
  const [generatedVideo, setGeneratedVideo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setGeneratedVideo('');

    const result = await generateVideo({ 
      prompt, 
      negativePrompt,
      durationSeconds: duration 
    });

    if (result.error) {
      setError(result.error);
    } else {
      setGeneratedVideo(result.url);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="videoPrompt" className="block text-sm font-medium text-gray-700">
            Describe your video
          </label>
          <textarea
            id="videoPrompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm min-h-[100px]"
            placeholder="A serene mountain landscape with clouds moving across the sky..."
          />
        </div>

        <div>
          <label htmlFor="videoNegativePrompt" className="block text-sm font-medium text-gray-700">
            Negative prompt (optional)
          </label>
          <input
            type="text"
            id="videoNegativePrompt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Elements you don't want in the video..."
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (seconds)
          </label>
          <input
            type="number"
            id="duration"
            min={STABILITY_CONFIG.VIDEO.MIN_DURATION}
            max={STABILITY_CONFIG.VIDEO.MAX_DURATION}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Generating...
            </>
          ) : (
            <>
              <Video className="-ml-1 mr-2 h-4 w-4" />
              Generate Video
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {generatedVideo && (
        <div className="rounded-lg overflow-hidden shadow-lg">
          <video
            src={generatedVideo}
            controls
            className="w-full h-auto"
            autoPlay
            loop
          />
        </div>
      )}
    </div>
  );
}