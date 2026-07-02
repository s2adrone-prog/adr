import React from 'react';
import { Sparkles, Palette, Award, Code, Smartphone, ChevronRight, ArrowRight } from 'lucide-react';
import { CreativeService } from '../types';

interface ServicesSectionProps {
  services: CreativeService[];
  onSelectService: (service: CreativeService) => void;
}

export default function ServicesSection({ services, onSelectService }: ServicesSectionProps) {
  
  // Icon mapper helper
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-indigo-600" />;
      case 'Palette': return <Palette className="w-6 h-6 text-indigo-600" />;
      case 'Award': return <Award className="w-6 h-6 text-indigo-600" />;
      case 'Code': return <Code className="w-6 h-6 text-indigo-600" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-indigo-600" />;
      default: return <Sparkles className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <div id="services-grid-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full inline-block">ADR Creative & Tech</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Pristine Branding & Dynamic Engineering Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Unlock maximum corporate engagement. We deliver state-of-the-art vector logos, exhaustive style guides, and ultra-high-definition web/mobile architectures custom-tailored for scaling brands.
        </p>
      </div>

      {/* Services Bento-like Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((serv) => (
          <div
            key={serv.id}
            id={`service-card-${serv.id}`}
            onClick={() => onSelectService(serv)}
            className="group relative bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-3xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
          >
            {/* Top Info */}
            <div className="space-y-4">
              <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {getIconComponent(serv.icon)}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {serv.name}
                </h3>
                <p className="text-2xs text-slate-400 font-medium font-mono uppercase mt-0.5">Ready in {serv.turnaroundTime}</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {serv.shortDescription}
              </p>
            </div>

            {/* Bottom info tier */}
            <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400">Starting from <strong className="text-slate-900 font-mono font-black">₹{serv.packages.basic.price.toLocaleString()}</strong></span>
              <span className="text-indigo-600 inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                <span>View Packages & Enquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Signal bar */}
      <div className="mt-16 bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase">Need a highly bespoke enterprise arrangement?</h4>
          <p className="text-2xs text-slate-400 mt-0.5">Let's craft custom specifications, security guidelines, and scaling SLAs together.</p>
        </div>
        <button
          onClick={() => onSelectService(services[2] || services[0])} // Go to corporate branding or first
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg cursor-pointer transition-all"
        >
          Book Expert Consultation
        </button>
      </div>

    </div>
  );
}
