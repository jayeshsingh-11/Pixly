
<div align="center">
  <a href="https://github.com/jayeshsingh-11/Pixly">
    <img src="./app/icon.svg" alt="Pixly Logo" width="80" height="80">
  </a>
  
  <h1 align="center">Pixly</h1>
</div>

<p align="center">
  An open source AI app generator. Turn your idea into an app in seconds.<br>
  Powered by Llama 3 on Groq & Google Gemini.
</p>

## ✨ Features

- **Fast & Smart**: Powered by **Llama 3.1** & **Google Gemini** for instant code generation.
- **Premium UI**: Clean, modern interface with a "Lovable" aesthetic (Light Mode + shadcn/ui).
- **Interactive Sandbox**: Edit and preview your generated apps in real-time with Sandpack.
- **Image Scanning**: Upload screenshots to clone or iterate on existing designs.
- **Multi-Model Support**: Switch between Llama 3, Gemini Flash/Pro, and more.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **LLM Inference**: [Groq](https://groq.com/) & [Google AI](https://ai.google.dev/)
- **Sandbox**: [Sandpack](https://sandpack.codesandbox.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Neon)
- **Deploy**: Vercel

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/jayeshsingh-11/Pixly.git
   cd Pixly
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your API keys:

   ```env
   # Database (Neon)
   DATABASE_URL="postgresql://..."

   # AI Providers
   GROQ_API_KEY="gsk_..."
   GOOGLE_API_KEY="AIza..."
   OPENROUTER_API_KEY="sk-or-..."

   # Optional
   HELICONE_API_KEY="" # For observability
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
