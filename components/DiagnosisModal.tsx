
import React, { useState } from 'react';
import { getBusinessDiagnosis } from '../services/geminiService';
import { DiagnosisResult } from '../types';
import { Loader2, Sparkles, X, Send } from 'lucide-react';

interface DiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiagnosisModal: React.FC<DiagnosisModalProps> = ({ isOpen, onClose }) => {
  const [businessType, setBusinessType] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const PHONE_NUMBER = "5519986089339";

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType.trim()) return;
    
    setLoading(true);
    try {
      const data = await getBusinessDiagnosis(businessType);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setResult(null);
    setBusinessType('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-400 w-5 h-5" />
            <h3 className="text-xl font-bold">Diagnóstico Digital AI</h3>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-slate-400 text-sm">
                Descreva seu negócio (ex: "Tenho uma oficina mecânica em SP e o WhatsApp está bagunçado")
              </p>
              <textarea
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="Ex: Sou dono de uma hamburgueria..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none h-32 resize-none"
              />
              <button
                type="submit"
                disabled={loading || !businessType.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                {loading ? 'Analisando seu negócio...' : 'Gerar Diagnóstico Grátis'}
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div>
                <h4 className="text-indigo-400 font-semibold mb-2">Análise de IA:</h4>
                <p className="text-slate-300 leading-relaxed">{result.analysis}</p>
              </div>
              <div>
                <h4 className="text-indigo-400 font-semibold mb-2">Próximos Passos Sugeridos:</h4>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <span className="bg-indigo-600/20 text-indigo-400 text-xs px-2 py-1 rounded mt-1">{idx + 1}</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}?text=Olá! Acabei de fazer meu diagnóstico AI e gostaria de implementar as soluções sugeridas.`, '_blank')}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
                >
                  Implementar agora via WhatsApp
                </button>
                <button 
                  onClick={handleClose}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98]"
                >
                  Fechar diagnóstico
                </button>
              </div>
              <button onClick={() => setResult(null)} className="w-full text-slate-500 hover:text-slate-300 text-xs uppercase tracking-widest font-bold transition-colors">
                Fazer nova consulta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
