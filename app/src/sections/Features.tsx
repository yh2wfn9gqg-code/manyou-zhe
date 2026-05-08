import { useEffect, useRef, useState } from 'react';
import { Brain, Plug, Sliders, Shield, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: '前沿AI',
    description: '汇集全球最先进的AI大模型和智能体技术，让您第一时间了解行业动态。',
    color: 'purple',
  },
  {
    icon: Plug,
    title: '无缝集成',
    description: '提供详细的API文档和集成指南，帮助您快速将AI能力融入现有系统。',
    color: 'blue',
  },
  {
    icon: Sliders,
    title: '可定制智能体',
    description: '支持自定义AI智能体行为，根据业务需求灵活调整参数和功能。',
    color: 'pink',
  },
  {
    icon: Shield,
    title: '安全可靠',
    description: '企业级数据安全保障，支持私有化部署，确保敏感信息不泄露。',
    color: 'green',
  },
  {
    icon: Zap,
    title: '极速响应',
    description: '优化的推理引擎和缓存机制，毫秒级响应速度，流畅用户体验。',
    color: 'yellow',
  },
  {
    icon: Globe,
    title: '全球覆盖',
    description: '多区域部署，全球CDN加速，无论身在何处都能享受稳定服务。',
    color: 'cyan',
  },
];

const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', glow: 'group-hover:shadow-purple-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'group-hover:shadow-blue-500/20' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', glow: 'group-hover:shadow-pink-500/20' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', glow: 'group-hover:shadow-green-500/20' },
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', glow: 'group-hover:shadow-yellow-500/20' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', glow: 'group-hover:shadow-cyan-500/20' },
};

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-dark overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              为什么选择我们的平台
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              我们致力于为您提供最全面、最专业的AI智能体资讯和工具资源
            </p>
          </div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const colors = colorMap[feature.color];
              const Icon = feature.icon;
              const isVisible = visibleCards.has(index);

              return (
                <div
                  key={index}
                  data-index={index}
                  className={`feature-card group relative p-8 rounded-2xl bg-dark-200/50 border border-gray-800/50 backdrop-blur-sm transition-all duration-700 hover:-translate-y-2 hover:border-purple-500/30 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.glow} shadow-xl`} />

                  {/* Icon */}
                  <div className={`relative w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="relative text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
