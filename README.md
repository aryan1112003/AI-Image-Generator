# AI Image Generator

A powerful and intuitive AI-powered image generation application that transforms text descriptions into stunning visual artwork using Stability AI's advanced image generation capabilities.

- DEMO: [LINK](https://zingy-zuccutto-0a3aa6.netlify.app/)

## ✨ Features

- **Text-to-Image Generation**: Convert your text descriptions into high-quality images
- **Negative Prompts**: Specify elements you don't want in the generated image
- **Watermarking**: Automatic watermarking of generated images
- **Responsive Design**: Beautiful UI that works seamlessly across all devices
- **Real-time Generation**: Instant image generation with live preview
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🚀 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Icons**: Lucide React for beautiful, scalable icons
- **API**: Stability AI for powerful image generation
- **HTTP Client**: Axios for reliable API communication
- **Build Tool**: Vite for lightning-fast development

## 🛠️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/aryan1112003/ai-image-generator.git
   cd ai-image-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_STABILITY_API_KEY=your-api-key
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Application header
│   ├── Footer.tsx      # Application footer
│   └── ImageGenerator  # Main image generation component
├── services/           # API services
│   └── imageService.ts # Image generation service
├── utils/              # Utility functions
│   ├── validation.ts   # Input validation
│   └── image.ts        # Image processing
├── types/              # TypeScript types
└── config/             # Configuration files
```

## 🎯 Usage

1. Enter a detailed prompt describing your desired image
2. (Optional) Add negative prompts to exclude unwanted elements
3. Click "Generate Image" and watch your creation come to life
4. Generated images include a watermark for copyright protection

## 🔒 Security Features

- Secure API key handling through environment variables
- Input validation and sanitization
- Error boundary implementation
- Cross-origin resource handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

© 2024 Aryan Acharya. All rights reserved.

## 👨‍💻 Author

**Aryan Acharya**
- GitHub: [@aryan1112003](https://github.com/aryan1112003)

## 🙏 Acknowledgments

- Stability AI for their powerful image generation API
- The React and TypeScript communities
- All contributors who help improve this project
