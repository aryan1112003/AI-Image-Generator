import React, { useState } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { generateImage } from '../services/imageService';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setGeneratedImage('');

    const result = await generateImage({ prompt, negativePrompt });

    if (result.error) {
      setError(result.error);
    } else {
      setGeneratedImage(result.url);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Describe your image
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base min-h-[100px] p-3"
            placeholder="A serene landscape with mountains at sunset..."
          />
        </div>

        <div>
          <label htmlFor="negativePrompt" className="block text-sm font-medium text-gray-700 mb-1">
            Negative prompt (optional)
          </label>
          <input
            type="text"
            id="negativePrompt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base p-2"
            placeholder="Elements you don't want in the image..."
          />
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full flex items-center justify-center px-4 py-2 sm:py-3 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Generating...
            </>
          ) : (
            <>
              <ImageIcon className="-ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Generate Image
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

      {generatedImage && (
        <div className="rounded-lg overflow-hidden shadow-lg bg-white p-3 sm:p-4">
          <img
            src={generatedImage}
            alt="Generated artwork"
            className="w-full h-auto rounded"
          />
        </div>
      )}
    </div>
  );
}