import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const benefits = [
  '实时AI行业动态追踪',
  '深度技术解析文章',
  '精选AI工具推荐',
  '企业级应用案例',
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-dark overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <div 
              className={`relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="relative">
                {/* Background glow */}
                <div className="absolute -inset-8 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl" />
                
                {/* Image container with clip path */}
                <div 
                  className="relative overflow-hidden rounded-2xl border border-gray-800"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
                  }}
                >
                  <img
                    src="/about-dashboard.jpg"
                    alt="AI Analytics Dashboard"
                    className="w-full h-auto"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-dark/40 via-transparent to-transparent" />
                </div>

                {/* Floating stats card */}
                <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-dark-200/95 backdrop-blur-xl border border-gray-800 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">+127%</div>
                      <div className="text-sm text-gray-500">用户增长率</div>
                    </div>
                  </div>
                </div>

                {/* Decorative corner */}
                <div 
                  className="absolute -bottom-2 -right-2 w-24 h-24 border-r-2 border-b-2 border-purple-500/30 rounded-br-3xl"
                />
              </div>
            </div>

            {/* Content side */}
            <div 
              className={`space-y-8 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
                  关于我们
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  用智能自动化
                  <br />
                  <span className="text-gradient">转变您的工作流程</span>
                </h2>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed">
                AI Agent Hub 是领先的AI智能体资讯平台，我们专注于为开发者和企业提供最新、最全面的AI工具和行业洞察。从ChatGPT到自主AI智能体，我们追踪每一个重要的技术突破。
              </p>

              <p className="text-gray-400 leading-relaxed">
                2024年全球AI智能体市场规模达52.9亿美元，预计2030年将增长至471亿美元。我们致力于帮助您把握这一历史性机遇，在AI浪潮中抢占先机。
              </p>

              {/* Benefits list */}
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-glow-lg group"
              >
                了解更多
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
