import { Bot, Github, Twitter, Linkedin, Mail, Youtube } from 'lucide-react';

const footerLinks = {
  product: {
    title: '产品',
    links: [
      { name: 'AI工具库', href: '#' },
      { name: '行业报告', href: '#' },
      { name: '技术文档', href: '#' },
      { name: 'API接口', href: '#' },
      { name: '定价方案', href: '#' },
    ],
  },
  resources: {
    title: '资源',
    links: [
      { name: '入门指南', href: '#' },
      { name: '开发教程', href: '#' },
      { name: '最佳实践', href: '#' },
      { name: '案例研究', href: '#' },
      { name: '博客文章', href: '#' },
    ],
  },
  company: {
    title: '公司',
    links: [
      { name: '关于我们', href: '#' },
      { name: '加入我们', href: '#' },
      { name: '联系我们', href: '#' },
      { name: '合作伙伴', href: '#' },
      { name: '媒体报道', href: '#' },
    ],
  },
  legal: {
    title: '法律',
    links: [
      { name: '隐私政策', href: '#' },
      { name: '服务条款', href: '#' },
      { name: 'Cookie政策', href: '#' },
      { name: '免责声明', href: '#' },
    ],
  },
};

const socialLinks = [
  { name: 'Github', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Youtube', icon: Youtube, href: '#' },
  { name: 'Email', icon: Mail, href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-dark-100 border-t border-gray-800">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24 py-16">
        <div className="max-w-[1600px] mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-xl font-bold text-white">AI Agent Hub</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
                领先的AI智能体资讯平台，为开发者和企业提供最新、最全面的AI工具和行业洞察。
              </p>
              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 rounded-lg bg-dark-200 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Link columns */}
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <span className="w-0 h-1 rounded-full bg-purple-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-16 p-8 rounded-2xl bg-dark-200/50 border border-gray-800/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  订阅我们的周报
                </h3>
                <p className="text-gray-400">
                  获取最新的AI智能体资讯、工具推荐和行业洞察
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="输入您的邮箱"
                  className="px-4 py-3 rounded-xl bg-dark-300 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors w-full md:w-64"
                />
                <button className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors whitespace-nowrap">
                  订阅
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 AI Agent Hub. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">
                隐私政策
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                服务条款
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Cookie设置
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
