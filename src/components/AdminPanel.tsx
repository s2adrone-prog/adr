import React, { useState } from 'react';
import { 
  Mail, Trash2, TrendingUp, Clock, MessageSquare, FileText, CheckCircle, Users
} from 'lucide-react';
import { ServiceInquiry, ContactMessage } from '../types';

interface AdminPanelProps {
  inquiries: ServiceInquiry[];
  onUpdateInquiryStatus: (inquiryId: string, status: ServiceInquiry['status']) => void;
  onRemoveInquiry?: (inqId: string) => void;

  contactMessages: ContactMessage[];
  onUpdateContactMessageStatus: (msgId: string, status: ContactMessage['status']) => void;
  onRemoveContactMessage?: (msgId: string) => void;
}

export default function AdminPanel({
  inquiries,
  onUpdateInquiryStatus,
  onRemoveInquiry,
  contactMessages,
  onUpdateContactMessageStatus,
  onRemoveContactMessage
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'service_inquiries' | 'contact_leads'>('analytics');

  const pendingServInqs = inquiries.filter(i => i.status === 'New').length;
  const pendingContactMsgs = contactMessages.filter(i => i.status === 'New').length;

  // Calculate estimated total pipeline value
  const totalPipelineValue = inquiries.reduce((sum, inq) => sum + (inq.packagePrice || 0), 0);
  const bookedValue = inquiries
    .filter(inq => inq.status === 'Booked')
    .reduce((sum, inq) => sum + (inq.packagePrice || 0), 0);

  return (
    <div id="admin-panel-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Tabs navigation */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-1 bg-white p-4 rounded-xl border border-slate-100 shadow-3xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">Studio CMS Panel</span>
          
          <button
            id="admin-tab-analytics"
            onClick={() => setActiveTab('analytics')}
            className={`w-full text-left py-2 px-3 text-xs font-semibold rounded-md flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Showcase Analytics</span>
          </button>

          <button
            id="admin-tab-inquiries"
            onClick={() => setActiveTab('service_inquiries')}
            className={`w-full text-left py-2 px-3 text-xs font-semibold rounded-md flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'service_inquiries' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Service Inquiries</span>
            {pendingServInqs > 0 && (
              <span className="ml-auto bg-indigo-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                {pendingServInqs}
              </span>
            )}
          </button>

          <button
            id="admin-tab-contact-leads"
            onClick={() => setActiveTab('contact_leads')}
            className={`w-full text-left py-2 px-3 text-xs font-semibold rounded-md flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'contact_leads' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>General Contact Leads</span>
            {pendingContactMsgs > 0 && (
              <span className="ml-auto bg-indigo-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                {pendingContactMsgs}
              </span>
            )}
          </button>
        </div>

        {/* Tab content area */}
        <div className="flex-1 bg-white p-6 rounded-xl border border-slate-100 shadow-3xs min-h-[500px]">
          
          {/* TAB: Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest pb-3 border-b border-slate-100 font-mono font-bold">ADR Creative Analytics Dashboard</h2>
              
              {/* Analytics metrics grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">Service Inquiries</span>
                    <FileText className="w-4.5 h-4.5 text-indigo-600" />
                  </div>
                  <span className="text-lg font-black text-slate-900 font-mono block mt-2">{inquiries.length}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{pendingServInqs} new project briefs</span>
                </div>

                <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">Contact Inquiries</span>
                    <Mail className="w-4.5 h-4.5 text-indigo-600" />
                  </div>
                  <span className="text-lg font-black text-slate-900 font-mono block mt-2">{contactMessages.length}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{pendingContactMsgs} new leads</span>
                </div>

                <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">Pipeline Value</span>
                    <TrendingUp className="w-4.5 h-4.5 text-indigo-600" />
                  </div>
                  <span className="text-lg font-black text-slate-900 font-mono block mt-2">₹{totalPipelineValue.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Estimated gross lead value</span>
                </div>

                <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">Booked Revenue</span>
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                  </div>
                  <span className="text-lg font-black text-emerald-700 font-mono block mt-2">₹{bookedValue.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Commenced projects value</span>
                </div>
              </div>

              {/* Funnel chart and metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                <div className="space-y-3">
                  <span className="text-2xs font-bold text-slate-500 uppercase block">Project Pipeline Funnel</span>
                  <div className="space-y-3">
                    {['New', 'Contacted', 'Proposal Sent', 'Booked'].map((status) => {
                      const count = inquiries.filter(i => i.status === status).length;
                      const percent = inquiries.length > 0 ? (count / inquiries.length) * 100 : 0;
                      return (
                        <div key={status} className="flex items-center gap-3 text-xs">
                          <span className="w-24 font-semibold text-slate-700">{status}</span>
                          <div className="flex-1 h-3 bg-slate-100 rounded-sm overflow-hidden flex">
                            <div style={{ width: `${percent}%` }} className="bg-indigo-600 h-full" />
                          </div>
                          <span className="w-10 font-mono text-slate-500 text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 bg-indigo-50/30 p-4 border border-indigo-100/50 rounded-xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider font-mono">Creative Service Strategy</h3>
                    <p className="text-xs text-indigo-750 mt-2 leading-relaxed">
                      With physical merchandise removed, ADR Creative Studio focuses entirely on premium graphics, branding consultation, custom web engineering, and native applications.
                    </p>
                  </div>
                  <div className="pt-2 text-2xs text-slate-400 font-mono">
                    System active • Real-time database synchronizations enabled.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Service Inquiries */}
          {activeTab === 'service_inquiries' && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">Creative Digital Consultations</h2>
                <p className="text-2xs text-slate-400 mt-1 font-sans">Review creative digital specifications (logos, brochures, branding style manuals, native web apps).</p>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="border border-slate-200 rounded-xl p-4 space-y-3 hover:shadow-2xs transition-shadow bg-white">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2.5 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold text-indigo-900 bg-indigo-50/70 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{inq.serviceName}</span>
                        <span className="text-[10px] text-slate-400 font-mono ml-2">Tier: {inq.packageName} (₹{inq.packagePrice})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xs font-bold text-slate-500 uppercase">Status:</span>
                        <select
                          value={inq.status}
                          onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as ServiceInquiry['status'])}
                          className={`text-2xs font-bold px-2.5 py-1 rounded-full cursor-pointer focus:outline-hidden ${
                            inq.status === 'Booked' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            inq.status === 'Proposal Sent' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                            inq.status === 'Contacted' ? 'bg-slate-100 text-slate-800 border border-slate-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          <option value="New">New Lead</option>
                          <option value="Contacted">Contacted Client</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Booked">Booked / Project Commenced</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Brief */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-medium block">Prospect Details</span>
                        <span className="font-semibold text-slate-800 block">{inq.customerName}</span>
                        <span className="text-slate-500 block font-mono">{inq.customerEmail}</span>
                        <span className="text-slate-500 block font-mono">{inq.customerPhone}</span>
                      </div>
                      <div className="sm:col-span-2 space-y-1 bg-slate-50 p-3 rounded-md border border-slate-100">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Creative Brief</span>
                        <p className="text-slate-600 leading-relaxed text-xs italic">"{inq.projectBrief}"</p>
                      </div>
                    </div>

                    {/* Attachments */}
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs text-slate-400">
                      <div>
                        <span>Client Budget Bracket: <strong className="text-slate-700 font-mono">₹{inq.budget}</strong></span>
                        {inq.attachmentName && (
                          <span className="ml-3 font-medium text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded inline-flex items-center gap-1 border border-indigo-150">
                            📎 {inq.attachmentName}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-2xs font-mono">{inq.createdAt}</span>
                        {onRemoveInquiry && (
                          <button
                            onClick={() => onRemoveInquiry(inq.id)}
                            className="text-slate-400 hover:text-red-500 p-1 rounded-sm cursor-pointer transition-colors"
                            title="Remove Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {inquiries.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-12 font-mono">No digital creative consultations captured yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB: General Contact Leads */}
          {activeTab === 'contact_leads' && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">General Contact Form Messages</h2>
                <p className="text-2xs text-slate-400 mt-1 font-sans">Review contact inquiries captured from the main contact page.</p>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {contactMessages.map((msg) => (
                  <div key={msg.id} className="border border-slate-200 rounded-xl p-4 space-y-3 hover:shadow-2xs transition-shadow bg-white">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2.5 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-black text-slate-700 font-mono bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded">Topic: {msg.topic || "General Inquiry"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xs font-bold text-slate-500 uppercase">Message status:</span>
                        <select
                           value={msg.status}
                           onChange={(e) => onUpdateContactMessageStatus(msg.id, e.target.value as ContactMessage['status'])}
                           className={`text-2xs font-bold px-2.5 py-1 rounded-full cursor-pointer focus:outline-hidden ${
                             msg.status === 'Archived' ? 'bg-slate-150 text-slate-600 border border-slate-250' :
                             msg.status === 'Replied' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                           }`}
                        >
                          <option value="New">New Message</option>
                          <option value="Replied">Replied</option>
                          <option value="Archived">Archived / Closed</option>
                        </select>
                      </div>
                    </div>

                    {/* Sender Profile */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-medium block">Sender Identity</span>
                        <span className="font-semibold text-slate-800 block">{msg.name}</span>
                        <span className="text-slate-500 block font-mono">{msg.email}</span>
                        <span className="text-slate-500 block font-mono">{msg.phone}</span>
                      </div>
                      <div className="sm:col-span-2 space-y-1 bg-slate-50 p-3 rounded-md border border-slate-100">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Message Text</span>
                        <p className="text-slate-650 leading-relaxed text-xs">"{msg.message}"</p>
                      </div>
                    </div>

                    {/* Actions & Dates */}
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                      <span className="text-2xs text-slate-400 font-mono">Received: {msg.createdAt}</span>
                      {onRemoveContactMessage && (
                        <button
                          onClick={() => onRemoveContactMessage(msg.id)}
                          className="text-slate-400 hover:text-red-500 text-2xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Lead</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {contactMessages.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-12 font-mono">No contact leads recorded yet.</p>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
