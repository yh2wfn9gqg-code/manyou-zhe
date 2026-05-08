import { useEffect, useRef, useState } from 'react';
import { 
  Bot, 
  MessageSquare, 
  Code, 
  Database, 
  Cloud, 
  Workflow,
  Layers,
  Cpu,
  Globe,
  Lock
} from 'lucide-react';

const integrations = [
  { name: 'ChatGPT', icon: MessageSquare, category: 'LLM' },
  { name: 'Claude', icon: Bot, category: 'LLM' },
  { name: 'LangChain', icon: Code, category: 'Framework' },
  { name: 'Pinecone', icon: Database, category: 'Vector DB' },
  { name: 'AWS', icon: Cloud, category: 'Cloud' },
  { name: 'Dify', icon: Workflow, category: 'Platform' },
  { name: 'Coze', icon: Layers, category: 'Platform' },
  { name: 'NVIDIA', icon: Cpu, category: 'Hardware' },
  { name: 'Zapier', icon: Globe, category: 'Automation' },
  { name: 'OAuth', icon: Lock, category: 'Security' },
];

export default function Integrations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 bg-dark overflow-hidden">
      {/* Grid background with animation */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 grid-bg opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(126, 67, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(126, 67, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Pulsing grid lines */}
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(126, 67, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(126, 67, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            opacity: 0.3,
          }}
        />
      </div>

      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(126, 67, 255, 0.08), transparent 40%)`,
        }}
      />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
              生态集成
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              强大集成能力
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              与主流AI平台、框架和工具无缝对接，构建完整的智能体生态系统
            </p>
          </div>

          {/* Integrations grid */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
            onMouseMove={handleMouseMove}
          >
            {integrations.map((integration, index) => {
              const Icon = integration.icon;
              return (
                <div
                  key={index}
                  className={`group relative p-6 rounded-2xl bg-dark-200/50 border border-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/30 hover:-translate-y-1 spotlight-card ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                    '--mouse-x': `${mousePos.x}px`,
                    '--mouse-y': `${mousePos.y}px`,
                  } as React.CSSProperties}
                >
                  {/* Icon */}
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">
                        {integration.name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {integration.category}
                      </div>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-glow pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">
              支持 50+ 主流平台和工具
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              查看完整集成列表
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
