import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Palette, Award, Code, Smartphone, ChevronRight, ArrowRight, 
  Search, SlidersHorizontal, Eye, ShieldCheck, Mail, MapPin, Users, HelpCircle, CheckCircle, PhoneCall, MessageCircle
} from 'lucide-react';

// Types and Seeded Data
import { CreativeService, ServiceInquiry, ContactMessage } from './types';
import { INITIAL_SERVICES } from './data';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ServicesSection from './components/ServicesSection';
import ServiceDetail from './components/ServiceDetail';

const SEED_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: "MSG-8201",
    name: "Suresh Prabhu",
    email: "suresh@harvestfoods.in",
    phone: "+91 80123 99421",
    topic: "Digital Branding Consultant",
    message: "Hi! We are looking to design and restructure our digital identity, brand manuals, and asset templates for 200 employees as part of our upcoming annual launch. Do you support ongoing retainer briefs?",
    attachmentName: null,
    createdAt: "Jun 30, 2026",
    status: "New"
  },
  {
    id: "MSG-1032",
    name: "Divya Teja",
    email: "divya@brandpulse.agency",
    phone: "+91 91522 00392",
    topic: "Web/App Development Consult",
    message: "Interested in hiring ADR's digital studio to design a high-fidelity responsive React app mockup and brand guide. Please schedule a Google Meet consultation session.",
    attachmentName: null,
    createdAt: "Jun 29, 2026",
    status: "Replied"
  }
];

export default function App() {
  // Navigation & UI States
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<CreativeService | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Core CMS state
  const [services, setServices] = useState<CreativeService[]>(INITIAL_SERVICES);

  // User inquiries & messages state
  const [inquiries, setInquiries] = useState<ServiceInquiry[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(SEED_CONTACT_MESSAGES);

  // Contact Form Submission state
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  // --- LOCAL STORAGE PERSISTENCE SYNC ---
  useEffect(() => {
    const savedInqs = localStorage.getItem('adr_inquiries');
    const savedContactMsgs = localStorage.getItem('adr_contact_messages');

    if (savedInqs) setInquiries(JSON.parse(savedInqs));
    if (savedContactMsgs) setContactMessages(JSON.parse(savedContactMsgs));
  }, []);

  useEffect(() => {
    localStorage.setItem('adr_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('adr_contact_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  // --- STATE MODIFICATION HANDLERS ---
  const handleUpdateInquiryStatus = (inqId: string, status: ServiceInquiry['status']) => {
    setInquiries(inquiries.map(i => i.id === inqId ? { ...i, status } : i));
  };

  const handleRemoveInquiry = (inqId: string) => {
    setInquiries(inquiries.filter(i => i.id !== inqId));
  };

  const handleUpdateContactMessageStatus = (msgId: string, status: ContactMessage['status']) => {
    setContactMessages(contactMessages.map(m => m.id === msgId ? { ...m, status } : m));
  };

  const handleRemoveContactMessage = (msgId: string) => {
    setContactMessages(contactMessages.filter(m => m.id !== msgId));
  };

  const handleAddInquiry = (inqData: Omit<ServiceInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: ServiceInquiry = {
      ...inqData,
      id: `ADR-INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'New'
    };
    setInquiries([newInq, ...inquiries]);
  };

  const handleAddContactMessage = (msgData: { name: string; phone: string; email: string; topic: string; message: string }) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      attachmentName: null,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'New'
    };
    setContactMessages([newMsg, ...contactMessages]);
  };

  // --- DETAIL VIEW TRANSITION HANDLERS ---
  const launchServiceDetail = (s: CreativeService) => {
    setSelectedService(s);
    setCurrentTab('service-detail');
    setIsAdminMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="application-viewport" className="min-h-screen flex flex-col bg-slate-50/40 text-slate-700 font-sans relative">
      
      {/* Dynamic Header */}
      <Navbar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
      />

      {/* Main viewport block */}
      <main id="main-content-flow" className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* RENDER: ADMIN CMS-LITE DASHBOARD */}
          {isAdminMode ? (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <AdminPanel
                inquiries={inquiries}
                onUpdateInquiryStatus={handleUpdateInquiryStatus}
                onRemoveInquiry={handleRemoveInquiry}
                contactMessages={contactMessages}
                onUpdateContactMessageStatus={handleUpdateContactMessageStatus}
                onRemoveContactMessage={handleRemoveContactMessage}
              />
            </motion.div>
          ) : (
            /* STANDARD TABS ROUTING */
            <React.Fragment>
              
              {/* TAB: HOME LANDING */}
              {currentTab === 'home' && (
                <motion.div
                  key="home-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-16 pb-16"
                >
                  {/* Hero Banner Welcome Section */}
                  <div className="relative bg-slate-900 text-white overflow-hidden py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
                      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-slate-500 blur-3xl"></div>
                    </div>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-left">
                      <div className="lg:col-span-7 space-y-6">
                        <span className="text-indigo-400 text-xs font-black uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1.5 rounded-full inline-block">
                          Premium Branding & Digital Agency
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                          We Craft Your <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-slate-200">
                            Unique Visual Identity
                          </span>
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-350 max-w-xl leading-relaxed">
                          Whether it's state-of-the-art vector logos, high-fidelity corporate manuals, or highly performant React/Next.js web architectures — ADR Studio delivers pristine layout clarity and software excellence.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-2">
                          <button
                            id="hero-explore-services-btn"
                            onClick={() => setCurrentTab('services')}
                            className="bg-white text-slate-950 text-xs font-black px-6 py-3.5 rounded-lg flex items-center gap-1.5 hover:bg-slate-100 cursor-pointer shadow-md transition-all active:translate-y-0"
                          >
                            <span>Explore Creative Services</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                          <button
                            id="hero-consultation-btn"
                            onClick={() => setCurrentTab('contact')}
                            className="bg-transparent text-white border border-slate-700 hover:border-slate-400 text-xs font-semibold px-6 py-3.5 rounded-lg cursor-pointer transition-all"
                          >
                            Get Digital Services Quote
                          </button>
                        </div>
                      </div>

                      {/* Right showcase banner collage */}
                      <div className="lg:col-span-5 relative flex justify-center">
                        <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                          <img
                            src="https://images.unsplash.com/photo-1531685222403-f928502d2b30?auto=format&fit=crop&q=80&w=800"
                            alt="Custom print design and branding manual"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                            <span className="text-[10px] bg-indigo-600 text-white font-bold uppercase px-2 py-0.5 rounded-md w-max">Corporate Identity</span>
                            <h3 className="text-sm font-bold mt-1 text-white">Full-Scale Brand Blueprints</h3>
                            <p className="text-[10px] text-slate-300">Modern layouts, typographic harmony, and vector-perfect assets.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HIGH-FIDELITY CORE CAPABILITIES */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 border border-slate-150 shadow-3xs text-left">
                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                          <Palette className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Visual Perfection</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          We implement grid systems and balanced negative space to make all layouts look exceptionally professional and high-contrast.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                          <Code className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Clean Software Engineering</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Web and mobile apps custom-engineered with clean typescript components. Light-weight, high-performance, and responsive.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                          <Award className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Corporate Heritage</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Endorsed by hundreds of local Indian D2C startups for high-end digital identity manual blueprints and vector guides.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FEATURED CREATIVE DIGITAL SERVICES */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-left">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider font-mono">Expert Consulting Services</span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">Creative & Branding Services</h2>
                      </div>
                      <button
                        onClick={() => setCurrentTab('services')}
                        className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All Digital Packages</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {services.slice(0, 3).map((serv) => (
                        <div
                          key={serv.id}
                          className="bg-white border border-slate-100 p-6 rounded-2xl shadow-3xs flex flex-col justify-between hover:shadow-xs transition-shadow"
                        >
                          <div className="space-y-4">
                            <span className="text-[10px] bg-indigo-50 text-indigo-850 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Service Capsule</span>
                            <h3 className="text-sm font-bold text-slate-900">{serv.name}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{serv.shortDescription}</p>
                          </div>
                          
                          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-400">Starting from ₹{serv.packages.basic.price}</span>
                            <button
                              onClick={() => launchServiceDetail(serv)}
                              className="text-indigo-650 inline-flex items-center gap-1 hover:translate-x-1 transition-transform cursor-pointer"
                            >
                              <span>Details</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TRUST SIGNALS & CLIENT TESTIMONIALS */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-left">
                    <div className="border border-slate-150 p-6 sm:p-8 rounded-2xl bg-white space-y-8">
                      <div className="text-center max-w-xl mx-auto space-y-1">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">What Clients Say</h3>
                        <p className="text-sm font-black text-slate-900">Endorsed by hundreds of local Indian D2C startups.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed">
                          <div className="flex text-yellow-400">★★★★★</div>
                          <p className="italic">"We hired ADR Studio to structure our brand guidelines and vector assets. The corporate specification manual was brilliantly clear and helped our staff align on colors, fonts, and layout."</p>
                          <span className="font-bold text-slate-800 block">- Rajesh Sharma (CEO, InvoTech)</span>
                        </div>
                        <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed">
                          <div className="flex text-yellow-400">★★★★★</div>
                          <p className="italic">"The Corporate Branding guidelines manual delivered was exhaustively detailed. Helped our developers maintain layout consistency across both native app widgets and emails."</p>
                          <span className="font-bold text-slate-800 block">- Meera Nair (Marketing Director, Harvest)</span>
                        </div>
                        <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed">
                          <div className="flex text-yellow-400">★★★★★</div>
                          <p className="italic">"Excellent customer service! Their web engineering squad delivered our React platform dashboard exactly on schedule with spotless responsiveness across tablets and phones."</p>
                          <span className="font-bold text-slate-800 block">- Devendra Goel (D2C Consultant)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* TAB: SERVICES LISTINGS */}
              {currentTab === 'services' && (
                <motion.div
                  key="services-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ServicesSection 
                    services={services}
                    onSelectService={launchServiceDetail}
                  />
                </motion.div>
              )}

              {/* TAB: SERVICE DETAIL CONSULTATION PAGE */}
              {currentTab === 'service-detail' && selectedService && (
                <motion.div
                  key="service-detail-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ServiceDetail 
                    service={selectedService}
                    onBack={() => setCurrentTab('services')}
                    onSubmitInquiry={handleAddInquiry}
                  />
                </motion.div>
              )}

              {/* TAB: ABOUT US */}
              {currentTab === 'about' && (
                <motion.div
                  key="about-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-4xl mx-auto px-4 py-12 animate-fade-in space-y-12 text-slate-600 leading-relaxed text-left"
                >
                  <div className="text-center space-y-3">
                    <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full inline-block">The ADR Heritage</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Crafting Excellence Since 2018</h1>
                    <p className="text-xs sm:text-sm text-slate-400">Pioneering corporate branding guidelines, premium logos, and state-of-the-art web systems.</p>
                  </div>

                  <div className="space-y-6 text-xs sm:text-sm">
                    <p>
                      At <strong>ADR Studio</strong>, we sit at the intersection of high-fidelity graphic design and advanced digital software engineering. We believe that your corporate brand shouldn't be governed by messy, inconsistent assets. Your identity deserves pristine typographic blueprints and flawless user interfaces.
                    </p>
                    <p>
                      From our creative headquarters in Bangalore, we draft versatile vector logos, comprehensive corporate guideline manuals (detailing precise typography rules, custom hex-code colors, and brand rule books), and high-resolution layout grids.
                    </p>
                    <p>
                      Simultaneously, our tech consultants engineer highly performant, responsive React/Next.js web portals, and cross-platform mobile apps. We treat graphic layout and application architecture with equal attention to detail, assuring unified excellence across all business operations.
                    </p>
                  </div>

                  {/* Team collage/Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-center">
                    <div>
                      <span className="text-2xl font-black text-indigo-600 block">450+</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Brand Guidelines Delivered</span>
                    </div>
                    <div>
                      <span className="text-2xl font-black text-slate-700 block">4.9 ★</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Average Satisfaction Score</span>
                    </div>
                    <div>
                      <span className="text-2xl font-black text-indigo-650 block">300+</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Active Corporate Clients</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB: CONTACT US */}
              {currentTab === 'contact' && (
                <motion.div
                  key="contact-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-5xl mx-auto px-4 py-12 animate-fade-in space-y-12 text-left"
                >
                  <div className="text-center space-y-3">
                    <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full inline-block font-mono">Instant Studio Hub</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Connect with a Design Specialist</h1>
                    <p className="text-xs sm:text-sm text-slate-400">Have a custom wholesale or enterprise inquiry? Our team responds within 2 hours.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Contact Coordinates info (5 Columns) */}
                    <div className="md:col-span-5 space-y-6">
                      <div className="border border-slate-150 p-6 rounded-2xl bg-white space-y-6 text-xs text-slate-600">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Office Coordinates</span>
                        
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-800 block font-semibold">ADR Head Office</strong>
                            <span>ADR Complex, MG Road, Landmark: Near Central Metro Station, Bangalore, Karnataka, India - 560001</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <PhoneCall className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-800 block font-semibold">Telephonic Hotlines</strong>
                            <span>+91 98765 43210</span>
                            <span className="block text-2xs text-slate-400">Available: Mon - Sat (9:00 AM - 6:00 PM IST)</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-800 block font-semibold">Digital Mailbox</strong>
                            <span>hello@adr-estore.com</span>
                            <span className="block text-2xs text-slate-400">Wholesale: business@adr-estore.com</span>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Support Direct Banner */}
                      <a
                        href="https://wa.me/919876543210?text=Hello%20ADR%20Creative%20Studio!%20I%20have%20a%20branding%20or%20development%20inquiry."
                        target="_blank"
                        rel="noreferrer"
                        className="p-5 rounded-2xl bg-emerald-600 text-white flex items-center justify-between shadow-xs hover:bg-emerald-500 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex gap-3 items-center text-left">
                          <MessageCircle className="w-8 h-8 fill-white shrink-0" />
                          <div>
                            <h4 className="text-xs font-bold font-mono">WhatsApp Hotline</h4>
                            <p className="text-[10px] text-emerald-100">Click to instantly chat with design consultants.</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white" />
                      </a>
                    </div>

                    {/* Right: Message Form (7 Columns) */}
                    <div className="md:col-span-7 bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-3xs space-y-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Send an Immediate Message</span>

                      {contactSubmitted ? (
                        <div className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-xl text-center space-y-3 py-12 animate-fade-in">
                          <CheckCircle className="w-8 h-8 text-indigo-600 mx-auto" />
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Message Dispatched</h4>
                          <p className="text-2xs text-slate-600 leading-relaxed max-w-xs mx-auto">Your creative inquiry has been logged securely. One of our lead design consultants will reach out via email within 2 hours.</p>
                          <button type="button" onClick={() => setContactSubmitted(false)} className="text-[10px] text-indigo-600 hover:underline inline-block font-bold uppercase mt-2">Send another message</button>
                        </div>
                      ) : (
                        <form
                          id="contact-form"
                          onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const name = formData.get('name') as string;
                            const phone = formData.get('phone') as string;
                            const email = formData.get('email') as string;
                            const topic = formData.get('topic') as string;
                            const message = formData.get('message') as string;
                            handleAddContactMessage({ name, phone, email, topic, message });
                            setContactSubmitted(true);
                          }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="contact-name-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Your Name</label>
                              <input id="contact-name-input" name="name" type="text" placeholder="John" className="w-full text-xs border border-slate-200 bg-slate-50/50 p-2.5 rounded-md focus:bg-white text-slate-800" required />
                            </div>
                            <div>
                              <label htmlFor="contact-phone-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phone</label>
                              <input id="contact-phone-input" name="phone" type="tel" placeholder="+91" className="w-full text-xs border border-slate-200 bg-slate-50/50 p-2.5 rounded-md focus:bg-white text-slate-800" />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="contact-email-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                            <input id="contact-email-input" name="email" type="email" placeholder="john@domain.com" className="w-full text-xs border border-slate-200 bg-slate-50/50 p-2.5 rounded-md focus:bg-white text-slate-800" required />
                          </div>

                          <div>
                            <label htmlFor="contact-subject-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Topic</label>
                            <select id="contact-subject-input" name="topic" className="w-full text-xs border border-slate-200 bg-slate-50/50 p-2.5 rounded-md focus:bg-white text-slate-700">
                              <option>Digital Branding & Identity</option>
                              <option>Web/App Development Consult</option>
                              <option>Logo Design Package</option>
                              <option>Other Service Inquiry</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor="contact-message-textarea" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Detailed Message</label>
                            <textarea id="contact-message-textarea" name="message" rows={4} placeholder="Describe your specifications here..." className="w-full text-xs border border-slate-200 bg-slate-50/50 p-2.5 rounded-md focus:bg-white text-slate-850" required />
                          </div>

                          <button
                            id="submit-contact-form-btn"
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-lg cursor-pointer transition-colors"
                          >
                            Send Message
                          </button>
                        </form>
                      )}
                    </div>

                  </div>
                </motion.div>
              )}

            </React.Fragment>
          )}

        </AnimatePresence>
      </main>

      {/* Dynamic Footer */}
      <Footer 
        setCurrentTab={setCurrentTab}
        setIsAdminMode={setIsAdminMode}
      />

      {/* Persistent Floating WhatsApp Icon */}
      <a
        id="persistent-whatsapp-fab"
        href="https://wa.me/919876543210?text=Hello%20ADR%20Creative%20Studio!%20I%20would%20like%20to%20enquire%20about%20creative%20branding%20and%20web%20development%20services."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group cursor-pointer border border-emerald-500/30"
        title="Enquire on WhatsApp"
      >
        {/* Pulsing glow ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping opacity-75 pointer-events-none" />
        
        {/* Custom tooltip helper */}
        <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none border border-slate-800">
          Enquire on WhatsApp
        </span>
        
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600 relative z-10" />
      </a>

    </div>
  );
}
