
import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  MessageSquare, 
  Search, 
  Layout, 
  Menu as MenuIcon, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Clock,
  Instagram as InstaIcon,
  MousePointer2,
  Bot,
  Zap,
  Sparkles,
  ShieldCheck,
  Timer
} from 'lucide-react';
import { DiagnosisModal } from './components/DiagnosisModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const PHONE_NUMBER = "5519986089339";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = (msg: string) => {
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Zap className="text-white w-6 h-6 fill-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">NEXO DIGITAL</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('solucao')} className="text-slate-400 hover:text-white transition-colors">Solução</button>
            <button onClick={() => scrollToSection('servicos')} className="text-slate-400 hover:text-white transition-colors">Serviços</button>
            <button onClick={() => scrollToSection('pacotes')} className="text-slate-400 hover:text-white transition-colors">Pacotes</button>
            <button 
              onClick={() => openWhatsApp('Olá! Gostaria de falar com um especialista sobre meu negócio.')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-indigo-500/20"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <header className="relative pt-40 pb-20 md:pt-60 md:pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl aspect-square bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
            Transformamos seu negócio em uma <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">máquina digital de vendas</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Landing pages, automações e presença online feitas sob medida para pequenos negócios que querem crescer de verdade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Solicitar diagnóstico gratuito</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('solucao')}
              className="text-slate-400 hover:text-white px-8 py-4 font-semibold transition-all flex items-center gap-2"
            >
              Ver como funciona
            </button>
          </div>
        </div>
      </header>

      {/* Section 2: Problema */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Sua empresa enfrenta esses problemas?</h2>
            <p className="text-slate-500">Não deixe seu faturamento escorrer pelos dedos por falta de organização digital.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Search className="text-rose-500" />, text: "Clientes não encontram sua empresa" },
              { icon: <MessageSquare className="text-rose-500" />, text: "Atendimento lento no WhatsApp" },
              { icon: <Smartphone className="text-rose-500" />, text: "Perfil confuso nas redes sociais" },
              { icon: <AlertCircle className="text-rose-500" />, text: "Falta de organização digital" }
            ].map((item, i) => (
              <div key={i} className="bg-slate-900/50 border border-rose-500/20 p-8 rounded-3xl hover:border-rose-500/40 transition-all group">
                <div className="bg-rose-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <p className="text-xl font-semibold text-slate-200 leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Solução */}
      <section id="solucao" className="py-24 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
            Na Nexo Digital, organizamos sua presença online e automatizamos seu atendimento.
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100 font-medium leading-relaxed">
            Você passa a vender mais sem complicação técnica e foca no que realmente importa: gerenciar seu negócio.
          </p>
        </div>
      </section>

      {/* Section 4: Serviços */}
      <section id="servicos" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossos Serviços</h2>
              <p className="text-slate-400">Tudo o que você precisa para dominar o ambiente digital.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Layout />, title: "Landing Pages", desc: "Páginas de alta conversão otimizadas para transformar visitantes em clientes reais." },
              { icon: <Bot />, title: "Chatbots e automações", desc: "Atendimento 24h automático no seu WhatsApp para nunca mais perder uma venda por demora." },
              { icon: <MapPin />, title: "Google Meu Negócio", desc: "Sua empresa no topo das pesquisas locais e no mapa dos seus clientes." },
              { icon: <Smartphone />, title: "Cardápio Digital", desc: "Experiência de compra fluida e profissional para restaurantes e delivery." },
              { icon: <InstaIcon />, title: "Ajuste de Redes Sociais", desc: "Perfis profissionais que transmitem confiança e autoridade para sua marca." }
            ].map((service, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] group hover:bg-slate-900 transition-colors">
                <div className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Pacotes */}
      <section id="pacotes" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Escolha o seu Pacote</h2>
            <p className="text-slate-400">Soluções específicas para cada estágio do seu negócio digital.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: "Pacote Start", 
                price: "R$ 397", 
                delivery: "Até 5 dias",
                color: "emerald",
                description: "Presença Digital Essencial",
                features: ["Google Meu Negócio", "Ajuste de perfil Instagram", "WhatsApp Business", "Cardápio digital simples"] 
              },
              { 
                name: "Pacote Vendas", 
                price: "R$ 897", 
                delivery: "Até 7 dias",
                color: "amber",
                popular: true,
                description: "Conversão Online",
                features: ["Landing page simples", "Até 10 descrições de produtos", "Botão WhatsApp básico", "Ajuste de links e CTA"] 
              },
              { 
                name: "Pacote Automatiza", 
                price: "R$ 697", 
                delivery: "Recorrente",
                color: "indigo",
                description: "Atendimento 24h",
                features: ["Chatbot WhatsApp", "Automação formulário para planilha", "Organização de contatos", "Manutenção mensal R$ 147"] 
              },
              { 
                name: "Pacote Premium", 
                price: "R$ 2.497", 
                delivery: "30 dias suporte",
                color: "rose",
                description: "Negócio Digital Completo",
                features: ["Tudo dos pacotes anteriores", "Suporte VIP por 30 dias", "Gestão de implementação", "Revisão estratégica"] 
              }
            ].map((pkg, i) => (
              <div key={i} className={`relative p-8 rounded-[2rem] border flex flex-col h-full transition-transform hover:-translate-y-2 ${
                pkg.color === 'emerald' ? 'bg-slate-900/50 border-emerald-500/30' :
                pkg.color === 'amber' ? 'bg-amber-600/10 border-amber-500/40 shadow-xl shadow-amber-500/5' :
                pkg.color === 'indigo' ? 'bg-indigo-600/10 border-indigo-500/40' :
                'bg-rose-600/10 border-rose-500/40'
              }`}>
                {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">Mais Procurado</div>}
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
                  <p className="text-slate-400 text-sm font-medium">{pkg.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">{pkg.price}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-slate-500 text-xs font-semibold">
                    <Timer size={14} />
                    {pkg.delivery}
                  </div>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feat, fi) => (
                    <div key={fi} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${
                        pkg.color === 'emerald' ? 'text-emerald-500' :
                        pkg.color === 'amber' ? 'text-amber-500' :
                        pkg.color === 'indigo' ? 'text-indigo-500' :
                        'text-rose-500'
                      }`} />
                      <span className="text-sm text-slate-300 leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => openWhatsApp(`Olá! Gostaria de saber mais sobre o ${pkg.name} de ${pkg.price}.`)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                    pkg.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' :
                    pkg.color === 'amber' ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' :
                    pkg.color === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' :
                    'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  Selecionar Plano
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Prova Social */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-900 p-12 rounded-[3rem] text-center border border-slate-800 relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center border-[8px] border-slate-950">
              <MessageSquare className="text-white w-8 h-8" />
            </div>
            <p className="text-2xl md:text-3xl italic text-slate-200 leading-relaxed mb-8">
              "Atendimento rápido e organização total do nosso WhatsApp. Antes perdíamos metade das mensagens, agora o chatbot filtra e já entrega o cliente pronto para fechar."
            </p>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg text-white">Cliente Piloto</span>
              <span className="text-slate-500 text-sm">Empresa de Consultoria</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: CTA Final */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-indigo-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8">Pronto para organizar seu negócio <br /> e vender mais?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Não perca tempo tentando aprender ferramentas complicadas. Nós fazemos tudo para você.
          </p>
          <button 
            onClick={() => openWhatsApp('Olá! Vi o site e estou pronto para organizar meu negócio e vender mais.')}
            className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-emerald-600/20 active:scale-95"
          >
            <Smartphone size={24} />
            Fale conosco no WhatsApp
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="text-indigo-600 w-5 h-5 fill-indigo-600" />
            <span className="text-xl font-black text-white">NEXO DIGITAL</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 Nexo Digital. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <button className="text-slate-400 hover:text-white transition-colors"><Instagram size={20}/></button>
            <button className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20}/></button>
            <button className="text-slate-400 hover:text-white transition-colors"><Facebook size={20}/></button>
          </div>
        </div>
      </footer>

      {/* Diagnosis Modal */}
      <DiagnosisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
