import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      message || 'سلام، در خصوص استعلام خدمات حمل و نقل و لجستیک آسانا لجستیک سوال داشتم.'
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#0A2540] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold">پشتیبانی آسانا لجستیک</div>
                <div className="text-[11px] text-neutral-300">پاسخگویی سریع در واتساپ</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1"
              aria-label="بستن"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-neutral-50 text-xs text-neutral-600 leading-relaxed border-b border-neutral-100">
            سلام! برای استعلام سریع نرخ کرایه، مشاوره امور گمرکی یا پیگیری بار، پیام خود را بنویسید
            تا مستقیماً به مشاور آسانا لجستیک در واتساپ متصل شوید.
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white space-y-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="پیام شما (مثلاً: استعلام کانتینر از چین)..."
              className="w-full text-xs p-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:border-[#FF6B35] transition-colors"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <span>شروع گفتگو در واتساپ</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all duration-200 hover:shadow-emerald-500/25 cursor-pointer"
        aria-label="گفتگو در واتساپ با آسانا لجستیک"
        title="پشتیبانی آنلاین آسانا لجستیک در واتساپ"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};
