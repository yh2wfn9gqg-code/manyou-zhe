import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: 'AI Agent Hub 帮助我们快速了解了市场上的主流AI工具，节省了大量的调研时间。平台的行业报告非常专业，为我们的技术选型提供了重要参考。',
    author: '张明',
    role: 'CTO',
    company: '某金融科技公司',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    id: 2,
    content: '作为一个AI开发者，我在这里找到了很多有价值的技术文章和案例研究。特别是多智能体协作相关的深度解析，对我的项目帮助很大。',
    author: '李华',
    role: 'AI工程师',
    company: '某互联网公司',
    rating: 5,
    avatar: '👩‍💻',
  },
  {
    id: 3,
    content: '我们团队通过这个平台了解了Coze和Dify等智能体开发平台，成功将AI客服的响应时间缩短了70%，客户满意度显著提升。',
    author: '王芳',
    role: '产品总监',
    company: '某电商平台',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    id: 4,
    content: '平台的工具推荐非常精准，每一篇评测都很客观详实。我已经向团队里的每个人都推荐了这个网站。',
    author: '陈伟',
    role: '技术负责人',
    company: '某制造企业',
    rating: 5,
    avatar: '👨‍🔧',
  },
  {
    id: 5,
    content: '从LangChain到AutoGen，这里的教程和案例帮助我快速上手了多智能体开发。强烈推荐给所有对AI感兴趣的朋友！',
    author: '刘洋',
    role: '全栈开发者',
    company: '自由职业',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    id: 6,
    content: 'AI Agent Hub 的行业洞察非常前瞻，让我们提前布局了AI智能体技术，在市场竞争中抢占了先机。',
    author: '赵静',
    role: '战略总监',
    company: '某咨询公司',
    rating: 5,
    avatar: '👩‍💼',
  },
];

export default function Testimonials() {
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

  return (
    <section ref={sectionRef} className="relative py-24 bg-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
              客户心声
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              受到万千开发者信赖
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              听听来自各行各业的用户如何评价AI Agent Hub
            </p>
          </div>

          {/* Testimonials grid - Masonry style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`group relative p-6 rounded-2xl bg-dark-200/50 border border-gray-800/50 backdrop-blur-sm transition-all duration-700 hover:border-purple-500/30 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  animation: isVisible ? `float ${3 + index * 0.5}s ease-in-out infinite` : 'none',
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-10 h-10 text-purple-400" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {testimonial.role} · {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-glow pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
