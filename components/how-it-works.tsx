
import { motion } from "framer-motion";
import {
    MessageSquare,
    Wand2,
    Rocket
} from "lucide-react";

const steps = [
    {
        icon: <MessageSquare className="size-8 text-cyan-300" />,
        title: "1. Describe",
        description: "Simply type your idea or upload a screenshot. Describe what you want to build in plain English."
    },
    {
        icon: <Wand2 className="size-8 text-pink-300" />,
        title: "2. Generate",
        description: "Our advanced AI models (Llama 3.1 & Gemini) instantly generate production-ready code for you."
    },
    {
        icon: <Rocket className="size-8 text-amber-300" />,
        title: "3. Launch",
        description: "Preview your app in real-time, iterate with follow-up prompts, and deploy with one click."
    }
];

export function HowItWorks() {
    return (
        <section className="relative w-full px-4 py-24 md:py-32 bg-neutral-900/50">
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl drop-shadow-lg">
                        How <span className="text-white">Pixon</span> Works
                    </h2>
                    <p className="mt-4 text-lg text-white/70">
                        From idea to deployment in three simple steps.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {steps.map((step, i) => (
                        <div key={i} className="relative flex flex-col items-center text-center">
                            <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-white/5 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:bg-white/10">
                                {step.icon}
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-white">
                                {step.title}
                            </h3>
                            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 opacity-50" />
                            <p className="max-w-xs text-white/60 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
