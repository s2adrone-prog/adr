import React, { useState } from 'react';
import { Sparkles, Check, ChevronLeft, ArrowRight, ShieldCheck, Mail, Phone, Clock, FileText } from 'lucide-react';
import { CreativeService, ServicePackage, ServiceInquiry } from '../types';

interface ServiceDetailProps {
  service: CreativeService;
  onBack: () => void;
  onSubmitInquiry: (inquiry: Omit<ServiceInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export default function ServiceDetail({ service, onBack, onSubmitInquiry }: ServiceDetailProps) {
  const [selectedTier, setSelectedTier] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [budget, setBudget] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  const activePackage: ServicePackage = service.packages[selectedTier];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName.trim() && customerEmail.trim() && projectBrief.trim()) {
      onSubmitInquiry({
        serviceId: service.id,
        serviceName: service.name,
        packageName: activePackage.name,
        packagePrice: activePackage.price,
        customerName,
        customerEmail,
        customerPhone,
        projectBrief,
        budget: budget || activePackage.price.toString(),
        attachmentName,
        attachmentData: null // In demo we don't save binary, just mock name
      });
      setInquirySubmitted(true);
    }
  };

  return (
    <div id={`service-detail-${service.id}`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Back Button */}
      <button
        id="back-to-services-btn"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-6 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Services Catalog</span>
      </button>

      {/* Confirmation View */}
      {inquirySubmitted ? (
        <div className="max-w-xl mx-auto bg-white border border-slate-100 p-8 rounded-2xl shadow-md text-center space-y-5 animate-fade-in">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Consultation Brief Logged Successfully!</h2>
            <p className="text-xs text-slate-400 mt-1">A specialized creative lead will examine your materials and schedule a digital sync.</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg text-left text-xs text-slate-600 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Receipt Summary</span>
            <div><strong className="text-slate-800">Target Service:</strong> {service.name} ({activePackage.name})</div>
            <div><strong className="text-slate-800">Lead Prospect:</strong> {customerName}</div>
            <div><strong className="text-slate-800">Contact Email:</strong> {customerEmail}</div>
            <div><strong className="text-slate-800">Budget Bracket:</strong> ₹{budget || activePackage.price}</div>
          </div>

          <button
            onClick={onBack}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-lg cursor-pointer transition-colors"
          >
            Return to Service Listing
          </button>
        </div>
      ) : (
        /* Single Service detailed layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scope, Portfolio & Features (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Banner info */}
            <div>
              <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider font-mono">Turnaround: {service.turnaroundTime}</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">{service.name}</h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-3">
                {service.longDescription}
              </p>
            </div>

            {/* Portfolio Past Work Showcase */}
            {service.portfolio.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>Past Project Showcase</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.portfolio.map((port) => (
                    <div key={port.id} className="group overflow-hidden rounded-xl border border-slate-100 bg-white">
                      <div className="relative h-44 overflow-hidden bg-slate-50">
                        <img
                          src={port.image}
                          alt={port.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="text-xs font-bold text-slate-900">{port.title}</h4>
                        <p className="text-2xs text-slate-400 leading-relaxed">{port.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Standard Badging */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-indigo-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-850">Certified Design Standards</h4>
                <p className="text-2xs text-slate-450 leading-relaxed mt-0.5">
                  All digital deliveries feature standard vectorized templates, responsive styling constraints, full trademark clearances, and complete source asset handovers.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Packages & Request Quote (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Packages Tiers Selection */}
            <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-xs space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Select Package Tier</span>
              
              {/* Tabs buttons */}
              <div className="grid grid-cols-3 bg-slate-100 p-1 rounded-lg">
                {(['basic', 'standard', 'premium'] as const).map((tier) => (
                  <button
                    key={tier}
                    id={`package-tier-btn-${tier}`}
                    onClick={() => setSelectedTier(tier)}
                    className={`py-1.5 text-2xs font-bold uppercase rounded-md transition-all cursor-pointer ${
                      selectedTier === tier
                        ? 'bg-white text-indigo-600 shadow-3xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              {/* Package detailed info */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">{activePackage.name}</span>
                  <span className="text-xl font-black text-slate-900 font-mono">₹{activePackage.price.toLocaleString()}</span>
                </div>

                <div className="flex gap-4 text-2xs text-slate-500 font-mono pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{activePackage.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{activePackage.revisions}</span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-2 text-xs pb-3">
                  {activePackage.features.map((feat, index) => (
                    <li key={index} className="flex gap-2 items-start text-slate-650">
                      <Check className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* WhatsApp Enquiry Button inside Package Tier */}
                <button
                  type="button"
                  onClick={() => {
                    const businessPhone = "919152255225";
                    const message = `Hi ADR E-Store! I am interested in your Creative Services:\n\n*Service:* ${service.name}\n*Package Tier:* ${activePackage.name}\n*Package Price:* ₹${activePackage.price.toLocaleString()}\n*Delivery Time:* ${activePackage.deliveryTime}\n\nCan you please share more details on how we can collaborate?`;
                    window.open(`https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  <span>Enquire on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Request Quote Consultation Form */}
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>Book / Request Quote</span>
              </h3>

              <form id="consultation-request-form" onSubmit={handleFormSubmit} className="space-y-3">
                <div>
                  <label htmlFor="quote-name-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Your Full Name</label>
                  <input
                    id="quote-name-input"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="E.g. Alexander Pierce"
                    className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-800"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="quote-email-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email</label>
                    <input
                      id="quote-email-input"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="alex@domain.com"
                      className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-phone-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phone / WhatsApp</label>
                    <input
                      id="quote-phone-input"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 98765 XXXXX"
                      className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="quote-brief-textarea" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Project Brief & Details</label>
                  <textarea
                    id="quote-brief-textarea"
                    rows={3}
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Describe your design inspirations, feature specifications, timeline constraints..."
                    className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-800"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="quote-budget-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Target Budget (INR)</label>
                    <input
                      id="quote-budget-input"
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder={`Min ₹${activePackage.price}`}
                      className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Brand Assets / PDF</label>
                    <div className="relative">
                      <input
                        id="quote-file-input"
                        type="file"
                        accept=".pdf,.png,.jpg,.zip"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('quote-file-input')?.click()}
                        className="w-full text-left truncate text-2xs border border-slate-200 bg-white rounded-md p-2 text-slate-500 flex items-center justify-between cursor-pointer hover:bg-slate-100"
                      >
                        <span>{attachmentName || 'Attach guidelines'}</span>
                        <span className="text-[10px] bg-slate-100 px-1 py-0.5 rounded text-slate-600">Browse</span>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  id="submit-consultation-btn"
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors mt-3 cursor-pointer shadow-xs"
                >
                  <span>Submit Project Briefing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
