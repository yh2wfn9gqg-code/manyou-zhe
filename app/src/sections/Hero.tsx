import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      const rotateX = mousePos.y * -10;
      const rotateY = mousePos.x * 10;
      imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    }
  }, [mousePos]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-dark flex items-center"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-1/2 -right-1/2 w-full h-full opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(126, 67, 255, 0.4) 0%, transparent 60%)',
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="absolute -bottom-1/2 -left-1/2 w-full h-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(109, 66, 255, 0.3) 0%, transparent 60%)',
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Content container */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-[1600px] mx-auto">
          {/* Left content */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm text-purple-400 font-medium">AI Agent Hub 2025</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-white">AI智能体与</span>
              <br />
              <span className="text-gradient">工具前沿</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
              探索人工智能的未来。发现最新的AI智能体、自动化工具和智能系统，它们正在重塑各行各业。
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-glow-lg group"
              >
                开始探索
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-700 text-white hover:bg-white/5 px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 group"
              >
                <Play className="mr-2 w-5 h-5 text-purple-400" />
                观看演示
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-800">
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-500">AI工具收录</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-500">月活跃用户</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-gray-500">行业案例</div>
              </div>
            </div>
          </div>

          {/* Right content - Dashboard image */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{ perspective: '1000px' }}
          >
            <div
              ref={imageRef}
              className="relative transition-transform duration-300 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-3xl blur-2xl opacity-60" />
              
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                <img
                  src="/hero-dashboard.jpg"
                  alt="AI Dashboard"
                  className="w-full h-auto"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 px-4 py-3 rounded-xl bg-dark-200/90 backdrop-blur-sm border border-gray-700 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 text-lg">🤖</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">AI Agent</div>
                    <div className="text-gray-500 text-xs">运行中</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl bg-dark-200/90 backdrop-blur-sm border border-gray-700 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-lg">⚡</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">效率提升</div>
                    <div className="text-gray-500 text-xs">+300%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
