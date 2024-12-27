import React from 'react';
import { Image as ImageIcon, Github } from 'lucide-react';

export default function Header() {
  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      <div className="text-center sm:text-left w-full sm:w-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-3">
          <ImageIcon className="h-7 sm:h-8 w-7 sm:w-8" />
          AI Image Generator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">Transform your ideas into stunning images with AI</p>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/aryan1112003"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
        >
          <Github className="h-5 w-5" />
          <span>@aryan1112003</span>
        </a>
      </div>
    </div>
  );
}