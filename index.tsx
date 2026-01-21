
import { GoogleGenAI } from "@google/genai";

const PHONE_NUMBER = "5519986089339";

// Navigation scroll logic
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar?.classList.add('bg-slate-950/90', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'py-3');
    navbar?.classList.remove('bg-transparent', 'py-6');
  } else {
    navbar?.classList.remove('bg-slate-950/90', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'py-3');
    navbar?.classList.add('bg-transparent', 'py-6');
  }
});

// Helper for WhatsApp
(window as any).openWhatsApp = (msg: string) => {
  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
};

// Modal Logic
(window as any).toggleModal = (show: boolean) => {
  const modal = document.getElementById('diagnosis-modal');
  if (modal) modal.hidden = !show;
  if (!show) {
    // Reset modal state
    document.getElementById('form-view')!.hidden = false;
    document.getElementById('result-view')!.hidden = true;
    (document.getElementById('business-info') as HTMLTextAreaElement).value = '';
  }
};

// Gemini API Integration
(window as any).handleDiagnosis = async () => {
  const info = (document.getElementById('business-info') as HTMLTextAreaElement).value;
  if (!info.trim()) return;

  const btn = document.getElementById('generate-btn') as HTMLButtonElement;
  btn.disabled = true;
  btn.innerText = 'Analisando seu negócio...';

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise o seguinte negócio e forneça um diagnóstico digital rápido em português: "${info}". Foco em landing pages, automação de WhatsApp e Google Meu Negócio.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            analysis: { type: "STRING" },
            recommendations: { type: "ARRAY", items: { type: "STRING" } },
          },
          required: ["analysis", "recommendations"],
        } as any,
      },
    });

    const data = JSON.parse(response.text || "{}");
    
    // Update DOM
    document.getElementById('analysis-text')!.innerText = data.analysis;
    const list = document.getElementById('recommendations-list')!;
    list.innerHTML = '';
    data.recommendations.forEach((rec: string, i: number) => {
      const li = document.createElement('li');
      li.className = "flex items-start gap-2 text-slate-300";
      li.innerHTML = `<span class="bg-indigo-600/20 text-indigo-400 text-xs px-2 py-1 rounded mt-1">${i + 1}</span> ${rec}`;
      list.appendChild(li);
    });

    document.getElementById('form-view')!.hidden = true;
    document.getElementById('result-view')!.hidden = false;

  } catch (error) {
    console.error("Diagnosis error:", error);
    alert("Ocorreu um erro ao gerar o diagnóstico. Tente novamente.");
  } finally {
    btn.disabled = false;
    btn.innerText = 'Gerar Diagnóstico Grátis';
  }
};
