import React from 'react';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 border-t pt-6">
      <div className="flex flex-col items-center justify-center space-y-3">
        <a
          href="https://github.com/aryan1112003"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
        >
          <Github className="h-5 w-5" />
          <span>GitHub: @aryan1112003</span>
        </a>
        <p className="text-xs sm:text-sm text-gray-500 text-center px-4">
          © {new Date().getFullYear()} Aryan Acharya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}