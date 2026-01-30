
import { motion } from "framer-motion";
import {
    Zap,
    Code,
    Image as ImageIcon,
    Cpu,
    Layers,
    Sparkles
} from "lucide-react";

const features = [
    {
        icon: <Cpu className="size-6 text-cyan-300" />,
        title: "AI-Powered Generation",
        description: "Powered by Llama 3.1 & Google Gemini for instant, high-quality code generation."
    },
    {
        icon: <Zap className="size-6 text-yellow-300" />,
        title: "Instant Preview",
        description: "Watch your app come to life in real-time with our interactive Sandpack environment."
    },
    {
        icon: <ImageIcon className="size-6 text-pink-300" />,
        title: "Image to App",
        description: "Upload any screenshot or mockup, and Pixon will clone the design instantly."
    },
    {
        icon: <Code className="size-6 text-blue-300" />,
        title: "Clean Code",
        description: "Generates production-ready React & Tailwind code that you can copy and deploy."
    },
    {
        icon: <Layers className="size-6 text-amber-300" />,
        title: "Modern Stack",
        description: "Built on Next.js, standard Shadcn UI components, and Lucide icons."
    },
    {
        icon: <Sparkles className="size-6 text-rose-300" />,
        title: "Unique Aesthetics",
        description: "Crafted with a premium twilight glassmorphism design system."
    }
];

export function Features() {
    return (
        <section className="relative z-10 w-full px-4 py-24 md:py-32">
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl drop-shadow-lg">
                        Built for <span className="bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">Speed</span> & <span className="bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">Beauty</span>
                    </h2>
                    <p className="mt-4 text-lg text-white/80 drop-shadow-md">
                        Everything you need to turn ideas into reality.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10"
                        >
                            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-white/10 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                {feature.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white drop-shadow-md">
                                {feature.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-white/70">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
