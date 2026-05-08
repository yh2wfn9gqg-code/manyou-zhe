import { useRef, useState } from 'react';

const brands = [
  { name: 'OpenAI', icon: '⚡' },
  { name: 'Anthropic', icon: '🔮' },
  { name: 'Google AI', icon: '🔍' },
  { name: 'Microsoft', icon: '⊞' },
  { name: 'Meta AI', icon: '◈' },
  { name: 'Amazon', icon: '⧉' },
  { name: 'NVIDIA', icon: '◆' },
  { name: 'Hugging Face', icon: '🤗' },
  { name: 'Stability AI', icon: '◉' },
  { name: 'Cohere', icon: '◎' },
];

export default function Brands() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-16 bg-dark overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <p className="text-center text-gray-500 text-sm mb-10 tracking-wide uppercase">
          值得信赖的行业领袖
        </p>
      </div>

      {/* Marquee container */}
      <div 
        ref={scrollRef}
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />

        {/* Scrolling content */}
        <div 
          className={`flex gap-12 ${isPaused ? '' : 'animate-marquee'}`}
          style={{ width: 'fit-content' }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-4 rounded-xl bg-dark-200/50 border border-gray-800/50 hover:border-purple-500/30 hover:bg-dark-200 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                {brand.icon}
              </span>
              <span className="text-gray-400 font-medium whitespace-nowrap group-hover:text-white transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </section>
  );
}
