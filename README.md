# AI Ebook Generator

A modern Next.js application that generates professional ebooks using AI. Deploy easily on Vercel.

## Features

- 🤖 AI-powered content generation using OpenAI GPT-4
- 📚 Customizable ebook structure (topic, chapters, style, audience)
- 👀 Real-time preview of generated content
- 📄 Export ebooks as PDF
- 🎨 Beautiful, modern UI with dark mode support
- ⚡ Fast and optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Abooks
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project" and import your repository
4. Add environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variable:
```bash
vercel env add OPENAI_API_KEY
```

## Usage

1. Enter your ebook topic (e.g., "Introduction to Machine Learning")
2. Specify the number of chapters (1-20)
3. Optionally select a writing style and target audience
4. Click "Generate Ebook"
5. Preview the generated content
6. Export as PDF when satisfied

## Project Structure

```
├── app/
│   ├── api/
│   │   └── generate/      # API route for ebook generation
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── EbookForm.tsx      # Form for ebook generation
│   ├── EbookGenerator.tsx # Main generator component
│   └── EbookPreview.tsx   # Preview component
├── types/
│   └── ebook.ts           # TypeScript types
└── utils/
    └── pdfExport.ts       # PDF export utility
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **OpenAI API** - AI content generation
- **jsPDF** - PDF generation
- **React Markdown** - Markdown rendering

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

