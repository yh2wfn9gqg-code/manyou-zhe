import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const faqs = [
  {
    question: '什么是AI智能体（AI Agent）？',
    answer: 'AI智能体是一种能够自主感知环境、做出决策并执行任务的智能系统。与传统AI不同，智能体具有持续学习和适应的能力，可以在复杂环境中自主完成多步骤任务。例如，一个AI客服智能体可以理解用户问题、查询知识库、执行操作并给出回复，整个过程无需人工干预。',
  },
  {
    question: '目前主流的AI智能体开发平台有哪些？',
    answer: '主流平台包括：字节跳动的Coze（扣子）、腾讯元器、百度文心智能体、智谱清言、Dify、LangChain、AutoGPT等。每个平台都有其特色：Coze适合快速构建对话式应用，LangChain适合深度定制的企业应用，Dify支持私有化部署，适合对数据安全要求高的场景。',
  },
  {
    question: 'AI智能体在哪些行业应用最广泛？',
    answer: 'AI智能体在多个行业都有广泛应用：金融（智能风控、投研助手）、电商（智能客服、推荐系统）、制造（预测性维护、质量检测）、医疗（诊断辅助、药物研发）、教育（个性化学习、智能辅导）、政务（智能审批、公共服务）等。据统计，金融行业的AI智能体应用成熟度最高。',
  },
  {
    question: '企业如何选择合适的AI智能体平台？',
    answer: '选择平台需要考虑以下因素：1）技术门槛 - 零代码平台适合非技术人员，开源框架适合技术团队；2）部署方式 - 云端部署成本低，私有化部署数据更安全；3）生态集成 - 是否支持与现有系统对接；4）成本预算 - 包括开发、部署和运维成本；5）技术支持 - 文档完善度和社区活跃度。',
  },
  {
    question: 'AI智能体的发展趋势是什么？',
    answer: '未来发展趋势包括：1）从Task Agent向Job Agent演进，处理更复杂的长期任务；2）多智能体协作（Multi-Agent）成为主流，多个专业智能体协同工作；3）垂直领域智能体深度定制，针对特定行业优化；4）与物理世界结合，机器人智能体快速发展；5）AI智能体与区块链结合，形成去中心化智能生态。',
  },
  {
    question: '如何开始学习AI智能体开发？',
    answer: '建议学习路径：1）先掌握Python编程和基础AI知识；2）学习大语言模型（LLM）原理和API使用；3）了解Prompt Engineering技巧；4）学习LangChain或LlamaIndex等框架；5）实践构建简单的智能体应用；6）深入研究多智能体系统和高级话题。我们的平台提供了丰富的教程和案例供参考。',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[900px] mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
              常见问题
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              您可能想了解的问题
            </h2>
            <p className="text-gray-400 text-lg">
              我们整理了用户最关心的问题，帮助您快速了解AI智能体
            </p>
          </div>

          {/* FAQ list */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-500 ${
                    isOpen 
                      ? 'bg-dark-200/80 border-purple-500/30' 
                      : 'bg-dark-200/30 border-gray-800/50 hover:border-gray-700'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className={`text-lg font-semibold pr-8 transition-colors ${
                      isOpen ? 'text-purple-400' : 'text-white'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isOpen 
                        ? 'bg-purple-500/20 rotate-0' 
                        : 'bg-gray-800 rotate-0'
                    }`}>
                      {isOpen ? (
                        <X className={`w-5 h-5 transition-all duration-500 ${
                          isOpen ? 'text-purple-400 rotate-0' : 'text-gray-400'
                        }`} />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12 p-8 rounded-2xl bg-dark-200/50 border border-gray-800/50">
            <p className="text-gray-400 mb-4">
              还有其他问题？
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              联系我们的团队
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
