import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock, Eye } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: '2025年AI Agent行业洞察：市场规模将突破113亿美元',
    excerpt: '深入分析全球AI智能体市场发展趋势，解读Coze、Manus等主流平台的竞争格局，以及垂直领域智能体的应用前景。',
    image: '/article-thumb-1.jpg',
    category: '行业报告',
    readTime: '8分钟',
    views: '12.5K',
    featured: true,
  },
  {
    id: 2,
    title: '多智能体协作：MetaGPT与AutoGen深度对比',
    excerpt: '探索多Agent系统的架构设计，比较主流框架的优劣势，帮助开发者选择最适合的技术方案。',
    image: '/article-thumb-2.jpg',
    category: '技术解析',
    readTime: '12分钟',
    views: '8.3K',
    featured: false,
  },
  {
    id: 3,
    title: '企业级AI智能体落地指南：从试点到规模化',
    excerpt: '基于100+企业案例，总结AI智能体在企业落地的最佳实践，包括选型、集成、治理等关键环节。',
    image: '/article-thumb-3.jpg',
    category: '实践案例',
    readTime: '15分钟',
    views: '15.2K',
    featured: false,
  },
];

export default function Articles() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  const featuredArticle = articles.find((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);

  return (
    <section ref={sectionRef} className="relative py-24 bg-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
                最新洞察
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                精选文章
              </h2>
            </div>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
            >
              查看全部文章
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Articles grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Featured article */}
            {featuredArticle && (
              <div 
                className={`group relative rounded-3xl overflow-hidden transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="relative h-full min-h-[500px]">
                  {/* Background image */}
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="space-y-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">
                        {featuredArticle.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-gray-300 line-clamp-2">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {featuredArticle.readTime}
                        </span>
                        <span className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          {featuredArticle.views}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/30 rounded-3xl transition-colors duration-300" />
                </div>
              </div>
            )}

            {/* Regular articles */}
            <div className="space-y-6">
              {regularArticles.map((article, index) => (
                <div
                  key={article.id}
                  className={`group relative flex gap-6 p-6 rounded-2xl bg-dark-200/50 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium mb-2">
                        {article.category}
                      </span>
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mt-2">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
