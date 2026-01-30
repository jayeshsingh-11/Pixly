import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-8 drop-shadow-lg"
            >
                {/* Outer 4-point star shape */}
                <path
                    d="M12 2C12 2 14 6.5 17 8C20 9.5 22 12 22 12C22 12 20 14.5 17 16C14 17.5 12 22 12 22C12 22 10 17.5 7 16C4 14.5 2 12 2 12C2 12 4 9.5 7 8C10 6.5 12 2 12 2Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Stylized "P" in the center */}
                <path
                    d="M10 8V16M10 8H13.5C14.88 8 16 9.12 16 10.5V10.5C16 11.88 14.88 13 13.5 13H10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}
