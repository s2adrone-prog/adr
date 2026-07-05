import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowUpRight, MessageCircle } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  setIsAdminMode: (admin: boolean) => void;
}

export default function Footer({ setCurrentTab, setIsAdminMode }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleLinkClick = (tab: string) => {
    setCurrentTab(tab);
    setIsAdminMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xl font-black text-white bg-indigo-600 px-3 py-1.5 rounded w-max">
              <span>ADR</span>
              <span className="font-light opacity-80 font-sans">STUDIO</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your premier digital agency for premium branding guidelines, custom-crafted graphic blueprints, web applications, and mobile products. Designed with absolute meticulous attention to layout, typography, and clean interaction.
            </p>
            {/* WhatsApp Floating/Direct Action */}
            <div className="pt-2">
              <a
                id="footer-whatsapp-btn"
                href="https://wa.me/919876543210?text=Hello%20ADR%20Creative%20Studio!%20I%20want%20to%20inquire%20about%20creative%20services."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Studio Focus */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest">Studio Focus</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-indigo-450 transition-colors cursor-pointer flex items-center gap-1 group text-slate-400">
                  <span>Logo Crafting</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-indigo-450 transition-colors cursor-pointer flex items-center gap-1 group text-slate-400">
                  <span>Graphic Systems</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-indigo-450 transition-colors cursor-pointer flex items-center gap-1 group text-slate-400">
                  <span>Web App Engineering</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-indigo-450 transition-colors cursor-pointer flex items-center gap-1 group text-slate-400">
                  <span>Native Mobile Apps</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Creative & Tech */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest">Creative & Tech</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-indigo-450 transition-colors cursor-pointer flex items-center gap-1 group text-slate-400">
                  <span>Logo & Graphic Design</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-indigo-450 transition-colors cursor-pointer flex items-center gap-1 group text-slate-400">
                  <span>Corporate Branding Kit</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-indigo-450 transition-colors cursor-pointer flex items-center gap-1 group text-slate-400">
                  <span>Web App Development</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-indigo-450 transition-colors cursor-pointer flex items-center gap-1 group text-slate-400">
                  <span>Mobile App Design</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest">Stay Inspired</h4>
            <p className="text-xs text-slate-400">
              Subscribe to receive curated graphic design insights, executive branding guides, and digital strategy newsletters.
            </p>
            {subscribed ? (
              <div className="bg-slate-800 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-sm text-xs text-center animate-fade-in">
                <span className="font-semibold">Subscribed successfully!</span> Welcome to our creative design digest.
              </div>
            ) : (
              <form id="newsletter-form" onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  id="newsletter-email-input"
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 text-xs text-slate-100 px-3 py-2 rounded-sm focus:outline-hidden focus:border-indigo-500"
                  required
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-sm cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Address Summary */}
            <div className="pt-2 border-t border-slate-850 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>ADR Complex, MG Road, Bangalore, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>hello@adr-estore.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>© 2026 ADR Creative Studio. All Rights Reserved. Crafted with pristine premium design principles.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => handleLinkClick('about')}>About Us</span>
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => handleLinkClick('contact')}>Contact Support</span>
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => handleLinkClick('admin')}>Merchant Area</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
