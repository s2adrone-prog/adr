import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Palette, Award, Code, Smartphone, ChevronRight, ArrowRight, 
  Search, SlidersHorizontal, Eye, ShieldCheck, Heart, Share2, PhoneCall, 
  MessageCircle, Mail, MapPin, Users, HelpCircle, CheckCircle, Tag
} from 'lucide-react';

// Types and Seeded Data
import { 
  Product, CreativeService, ServiceInquiry, 
  CustomizedDesign, Review, ProductVariant, ContactMessage, ProductInquiry 
} from './types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SERVICES } from './data';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Customizer from './components/Customizer';
import Reviews from './components/Reviews';
import AdminPanel from './components/AdminPanel';
import ServicesSection from './components/ServicesSection';
import ServiceDetail from './components/ServiceDetail';

const SEED_PRODUCT_INQUIRIES: ProductInquiry[] = [
  {
    id: "ADR-PROD-2481",
    productName: "Customized White Mug",
    variantName: "Standard 11oz (White)",
    quantity: 12,
    price: 2988,
    customerName: "Ananya Iyer",
    customerEmail: "ananya.iyer@techindia.com",
    customerPhone: "+91 94412 88231",
    notes: "Please heat-transfer our vector company logo clearly on both sides. High priority for corporate milestone event next Friday.",
    customText: "TechIndia 10 Years",
    customColor: "#3b82f6",
    createdAt: "Jun 28, 2026",
    status: "Contacted"
  },
  {
    id: "ADR-PROD-9031",
    productName: "Luxe Sublimation Glossy Tile",
    variantName: "Ceramic Tile (6x6 inches) with Wood Easel",
    quantity: 5,
    price: 2495,
    customerName: "Karan Johar",
    customerEmail: "karan@outlook.com",
    customerPhone: "+91 98845 10224",
    notes: "We uploaded our wedding family photo. Please make sure the colors are warm and high-contrast.",
    customText: "The Johar Family 2026",
    customColor: "#dc2626",
    createdAt: "Jul 01, 2026",
    status: "New"
  }
];

const SEED_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: "MSG-8201",
    name: "Suresh Prabhu",
    email: "suresh@harvestfoods.in",
    phone: "+91 80123 99421",
    topic: "Bulk Print Order Discount",
    message: "Hi! We are looking to print customized Sipper Bottles and MDF Sheets for 200 employees as part of our upcoming annual retreat. What is the wholesale discount model you offer for premium aluminum bottles?",
    attachmentName: "Harvest_Logo_Specs.pdf",
    createdAt: "Jun 30, 2026",
    status: "New"
  },
  {
    id: "MSG-1032",
    name: "Divya Teja",
    email: "divya@brandpulse.agency",
    phone: "+91 91522 00392",
    topic: "Digital Branding Consultant",
    message: "Interested in hiring ADR's digital agency to restructure our client's brand manual and design a high-fidelity responsive React app mockup. Please schedule a Google Meet consultation session.",
    attachmentName: null,
    createdAt: "Jun 29, 2026",
    status: "Replied"
  }
];

export default function App() {
  // Navigation & UI States
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedService, setSelectedService] = useState<CreativeService | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Core CMS state
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [services, setServices] = useState<CreativeService[]>(INITIAL_SERVICES);

  // User inquiries & messages state
  const [inquiries, setInquiries] = useState<ServiceInquiry[]>([]);
  const [productInquiries, setProductInquiries] = useState<ProductInquiry[]>(SEED_PRODUCT_INQUIRIES);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(SEED_CONTACT_MESSAGES);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Filter Shop states
  const [selectedShopCategory, setSelectedShopCategory] = useState<string>('All');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(3000);
  const [minRatingFilter, setMinRatingFilter] = useState<number>(0);

  // User Mock Email
  const userEmail = "s2adrone@gmail.com";

  // Contact Form Submission state
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  // --- LOCAL STORAGE PERSISTENCE SYNC ---
  useEffect(() => {
    const savedCats = localStorage.getItem('adr_categories');
    const savedProds = localStorage.getItem('adr_products');
    const savedInqs = localStorage.getItem('adr_inquiries');
    const savedProdInqs = localStorage.getItem('adr_product_inquiries');
    const savedContactMsgs = localStorage.getItem('adr_contact_messages');
    const savedWish = localStorage.getItem('adr_wishlist');

    if (savedCats) setCategories(JSON.parse(savedCats));
    if (savedProds) setProducts(JSON.parse(savedProds));
    if (savedInqs) setInquiries(JSON.parse(savedInqs));
    if (savedProdInqs) setProductInquiries(JSON.parse(savedProdInqs));
    if (savedContactMsgs) setContactMessages(JSON.parse(savedContactMsgs));
    if (savedWish) setWishlist(JSON.parse(savedWish));
  }, []);

  useEffect(() => {
    localStorage.setItem('adr_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('adr_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('adr_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('adr_product_inquiries', JSON.stringify(productInquiries));
  }, [productInquiries]);

  useEffect(() => {
    localStorage.setItem('adr_contact_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('adr_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // --- STATE MODIFICATION HANDLERS ---

  const handleAddCategory = (newCat: string) => {
    setCategories([...categories, newCat]);
  };

  const handleRemoveCategory = (cat: string) => {
    setCategories(categories.filter(c => c !== cat));
  };

  const handleAddProduct = (p: Product) => {
    setProducts([...products, p]);
  };

  const handleUpdateProduct = (p: Product) => {
    setProducts(products.map(item => item.id === p.id ? p : item));
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateProductInquiryStatus = (inqId: string, status: ProductInquiry['status']) => {
    setProductInquiries(productInquiries.map(i => i.id === inqId ? { ...i, status } : i));
  };

  const handleRemoveProductInquiry = (inqId: string) => {
    setProductInquiries(productInquiries.filter(i => i.id !== inqId));
  };

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

  const handleAddProductInquiry = (inqData: Omit<ProductInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newProdInq: ProductInquiry = {
      ...inqData,
      id: `ADR-PROD-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'New'
    };
    setProductInquiries([newProdInq, ...productInquiries]);
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

  const handleToggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(w => w !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // --- DETAIL VIEW TRANSITION HANDLERS ---
  const launchProductCustomizer = (p: Product) => {
    setSelectedProduct(p);
    setSelectedVariant(p.variants[0]);
    setCurrentTab('product-detail');
    setIsAdminMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const launchServiceDetail = (s: CreativeService) => {
    setSelectedService(s);
    setCurrentTab('service-detail');
    setIsAdminMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddReview = (prodId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    setProducts(products.map((p) => {
      if (p.id === prodId) {
        const updatedReviews = [newRev, ...p.reviews];
        const avg = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return {
          ...p,
          reviews: updatedReviews,
          rating: parseFloat(avg.toFixed(1))
        };
      }
      return p;
    }));

    // Update selected product state as well
    if (selectedProduct && selectedProduct.id === prodId) {
      const updatedReviews = [newRev, ...selectedProduct.reviews];
      const avg = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
      setSelectedProduct({
        ...selectedProduct,
        reviews: updatedReviews,
        rating: parseFloat(avg.toFixed(1))
      });
    }
  };

  const handleProductInquiry = (inquiryDetails: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    notes: string;
    customization: CustomizedDesign;
    variant: ProductVariant;
    quantity: number;
  }) => {
    handleAddProductInquiry({
      productName: selectedProduct?.name || "Unknown Product",
      variantName: inquiryDetails.variant.name,
      quantity: inquiryDetails.quantity,
      price: ((selectedProduct?.basePrice || 0) + inquiryDetails.variant.priceModifier) * inquiryDetails.quantity,
      customerName: inquiryDetails.customerName,
      customerEmail: inquiryDetails.customerEmail,
      customerPhone: inquiryDetails.customerPhone,
      notes: inquiryDetails.notes,
      customText: inquiryDetails.customization.text,
      customColor: inquiryDetails.customization.textColor
    });
    // Reset to catalog and clear selection
    setCurrentTab('shop');
    setSelectedProduct(null);
  };

  // --- FILTERED SELECTIONS FOR SHOP AND HOME ---
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedShopCategory === 'All' || p.category === selectedShopCategory;
    const matchesPrice = p.basePrice <= maxPriceFilter;
    const matchesRating = p.rating >= minRatingFilter;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

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
                categories={categories}
                onAddCategory={handleAddCategory}
                onRemoveCategory={handleRemoveCategory}
                products={products}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onRemoveProduct={handleRemoveProduct}
                productInquiries={productInquiries}
                onUpdateProductInquiryStatus={handleUpdateProductInquiryStatus}
                onRemoveProductInquiry={handleRemoveProductInquiry}
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

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                      <div className="lg:col-span-7 space-y-6 text-left">
                        <span className="text-indigo-400 text-xs font-black uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1.5 rounded-full inline-block">
                          Premium Printing & Digital Agency
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                          We Craft Your <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-slate-200">
                            Unique Visual Identity
                          </span>
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-350 max-w-xl leading-relaxed">
                          Whether it's custom heat-pressed mugs and premium crystal display clocks, or state-of-the-art vector logos and enterprise digital systems — ADR E-Store engineered excellence directly onto your physical goods and digital blueprints.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-2">
                          <button
                            id="hero-explore-products-btn"
                            onClick={() => setCurrentTab('shop')}
                            className="bg-white text-slate-950 text-xs font-black px-6 py-3.5 rounded-lg flex items-center gap-1.5 hover:bg-slate-100 cursor-pointer shadow-md transition-all active:translate-y-0"
                          >
                            <span>Customize Print Products</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                          <button
                            id="hero-consultation-btn"
                            onClick={() => setCurrentTab('services')}
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
                            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
                            alt="Custom printed tile design mockup"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                            <span className="text-[10px] bg-indigo-600 text-white font-bold uppercase px-2 py-0.5 rounded-md w-max">Signature Collection</span>
                            <h3 className="text-sm font-bold mt-1 text-white">Luxe Glossy Sublimation Tiles</h3>
                            <p className="text-[10px] text-slate-300">Custom fused photo sheets featuring precision acrylic tabletop stand.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PROMOTIONAL / COUPON BANNER */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-150">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-black shrink-0 shadow-sm">%</div>
                        <div>
                          <h4 className="text-slate-900 font-bold text-sm">Festive Season Special Print Discount!</h4>
                          <p className="text-2xs text-slate-500 mt-0.5">Use discount codes at physical checkout to save up to ₹500.</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-white border border-slate-150 px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-3xs">
                          <Tag className="w-4 h-4 text-indigo-600" />
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Copy Promo</span>
                            <strong className="font-mono text-xs text-slate-800 uppercase font-bold">FESTIVE10 (10% Off)</strong>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-150 px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-3xs">
                          <Tag className="w-4 h-4 text-indigo-600" />
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Bulk Discount</span>
                            <strong className="font-mono text-xs text-slate-800 uppercase font-bold">BULK25 (25% Off)</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FEATURED PHYSICAL PRODUCTS (3-4 items) */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-indigo-650 text-xs font-bold uppercase tracking-wider font-mono">Top Personalized Items</span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">Featured Print-On-Demand Products</h2>
                      </div>
                      <button
                        onClick={() => setCurrentTab('shop')}
                        className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Entire Catalog</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {products.filter(p => p.featured).slice(0, 4).map((p) => (
                        <div
                          key={p.id}
                          className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-3xs hover:shadow-md transition-shadow flex flex-col justify-between"
                        >
                          <div className="relative h-64 bg-slate-50 overflow-hidden flex items-center justify-center">
                            <img
                              src={p.mockupImage}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            {/* Wishlist floating toggle */}
                            <button
                              onClick={() => handleToggleWishlist(p.id)}
                              className="absolute top-3 right-3 bg-white/95 p-1.5 rounded-full hover:bg-white text-slate-500 hover:text-red-500 shadow-2xs z-10 transition-colors cursor-pointer"
                            >
                              <Heart className={`w-4 h-4 ${wishlist.includes(p.id) ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>
                          </div>

                          <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                            <div className="space-y-1">
                              <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">{p.category}</span>
                              <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{p.name}</h3>
                              <span className="text-xs font-black text-slate-950 font-mono">₹{p.basePrice}</span>
                            </div>

                            <button
                              id={`customize-launch-btn-${p.id}`}
                              onClick={() => launchProductCustomizer(p)}
                              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold py-2 rounded-md cursor-pointer transition-colors"
                            >
                              Customize & Preview
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FEATURED CREATIVE DIGITAL SERVICES */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <div className="border border-slate-150 p-6 sm:p-8 rounded-2xl bg-white space-y-8">
                      <div className="text-center max-w-xl mx-auto space-y-1">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">What Clients Say</h3>
                        <p className="text-sm font-black text-slate-900">Endorsed by hundreds of local Indian D2C startups.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed">
                          <div className="flex text-yellow-400">★★★★★</div>
                          <p className="italic">"We ordered 50 customized sublimation ceramic tiles for our corporate client gifting system. The finish was impeccably glossy and came securely nested inside custom velvet stands."</p>
                          <span className="font-bold text-slate-800 block">- Rajesh Sharma (CEO, InvoTech)</span>
                        </div>
                        <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed">
                          <div className="flex text-yellow-400">★★★★★</div>
                          <p className="italic">"The Corporate Branding guidelines manual delivered was exhaustively detailed. Helped our developers maintain layout consistency across both native app widgets and emails."</p>
                          <span className="font-bold text-slate-800 block">- Meera Nair (Marketing Director, Harvest)</span>
                        </div>
                        <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed">
                          <div className="flex text-yellow-400">★★★★★</div>
                          <p className="italic">"Excellent customer service! The click-to-WhatsApp support was incredibly prompt in answering sizing guidelines for our premium Customized Sipper Bottles."</p>
                          <span className="font-bold text-slate-800 block">- Devendra Goel (D2C Consultant)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* TAB: SHOP PRODUCT LISTINGS */}
              {currentTab === 'shop' && (
                <motion.div
                  key="shop-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in"
                >
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Filter Sidebar (Left) */}
                    <div className="w-full lg:w-64 shrink-0 bg-white border border-slate-100 p-5 rounded-xl shadow-3xs space-y-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase pb-3 border-b border-slate-100">
                        <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                        <span>Filter Custom Goods</span>
                      </div>

                      {/* Categories list */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Print Categories</span>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => setSelectedShopCategory('All')}
                            className={`w-full text-left py-1.5 px-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                              selectedShopCategory === 'All' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            All Categories
                          </button>
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setSelectedShopCategory(cat)}
                              className={`w-full text-left py-1.5 px-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                                selectedShopCategory === cat ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Range Filter */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <label htmlFor="price-filter-slider" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                          <span>Max Price Budget</span>
                          <span className="font-mono text-slate-800 font-bold">₹{maxPriceFilter}</span>
                        </label>
                        <input
                          id="price-filter-slider"
                          type="range"
                          min="100"
                          max="3000"
                          step="50"
                          value={maxPriceFilter}
                          onChange={(e) => setMaxPriceFilter(parseInt(e.target.value))}
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                      </div>

                      {/* Reset button */}
                      <button
                        onClick={() => {
                          setSelectedShopCategory('All');
                          setMaxPriceFilter(3000);
                          setSearchQuery('');
                        }}
                        className="w-full py-2 border border-slate-200 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    </div>

                    {/* Products Grid (Right) */}
                    <div className="flex-1 space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Print-on-Demand Catalog</h1>
                          <p className="text-2xs text-slate-450 mt-0.5">Explore physical models prepared for high-fidelity substrate sublimation.</p>
                        </div>
                        <span className="text-xs text-slate-500 font-mono font-bold">Showing {filteredProducts.length} customized products</span>
                      </div>

                      {/* Main grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((p) => (
                          <div
                            key={p.id}
                            className="group relative bg-white border border-slate-100 rounded-xl overflow-hidden shadow-3xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                          >
                            <div className="relative h-60 bg-slate-50 flex items-center justify-center">
                              <img
                                src={p.mockupImage}
                                alt={p.name}
                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <div className="p-4 space-y-2">
                              <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">{p.category}</span>
                              <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-650 transition-colors line-clamp-1">{p.name}</h3>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-slate-950 font-mono">₹{p.basePrice}</span>
                                <span className="text-[10px] text-slate-400 font-mono">★ {p.rating}</span>
                              </div>

                              <button
                                id={`shop-customize-launch-btn-${p.id}`}
                                onClick={() => launchProductCustomizer(p)}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors"
                              >
                                Customize / Order
                              </button>
                            </div>
                          </div>
                        ))}

                        {filteredProducts.length === 0 && (
                          <div className="col-span-full text-center py-16 text-slate-400">
                            <Search className="w-12 h-12 mx-auto text-slate-350 mb-3" />
                            <p className="text-xs font-bold">No custom products match your selected parameters.</p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* TAB: PRODUCT CUSTOMIZER & DETAILS PAGE */}
              {currentTab === 'product-detail' && selectedProduct && selectedVariant && (
                <motion.div
                  key="product-detail-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-12"
                >
                  {/* Customizer */}
                  <Customizer
                    product={selectedProduct}
                    selectedVariant={selectedVariant}
                    setSelectedVariant={setSelectedVariant}
                    onEnquire={handleProductInquiry}
                  />

                  {/* Reviews Section */}
                  <Reviews 
                    reviews={selectedProduct.reviews}
                    onAddReview={(rev) => handleAddReview(selectedProduct.id, rev)}
                  />
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
                  className="max-w-4xl mx-auto px-4 py-12 animate-fade-in space-y-12 text-slate-600 leading-relaxed"
                >
                  <div className="text-center space-y-3">
                    <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full inline-block">The ADR Heritage</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Crafting Excellence Since 2018</h1>
                    <p className="text-xs sm:text-sm text-slate-400">Pioneering heat sublimation substrate craftsmanship in Bangalore, India.</p>
                  </div>

                  <div className="space-y-6 text-xs sm:text-sm">
                    <p>
                      At <strong>ADR E-Store</strong>, we sit at the intersection of material science printing technology and digital agency craftsmanship. We believe that your corporate or personal brand shouldn't be limited to static computer screens. Your identity belongs on beautiful, functional daily companions.
                    </p>
                    <p>
                      From our cutting-edge print facility based in Bangalore, we leverage high-temperature flatbed vacuum heat transfers to bond customized photos and high-resolution corporate logos permanently into the physical structures of white ceramic mugs, sports aluminium sippers, and high-optical crystal frames. Our printing methods resist fading, scratches, or dishwasher temperature cycles.
                    </p>
                    <p>
                      Simultaneously, our dedicated creative studio crafts beautiful vector logos, comprehensive corporate brand manuals, highly performant responsive React/Next.js web portals, and cross-platform mobile apps. We treat graphic design and application development with equal attention to detail, assuring unified excellence across physical and digital fronts.
                    </p>
                  </div>

                  {/* Team collage/Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-center">
                    <div>
                      <span className="text-2xl font-black text-indigo-650 block">50,000+</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Customized Items Printed</span>
                    </div>
                    <div>
                      <span className="text-2xl font-black text-slate-700 block">4.9 ★</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Average Rating score</span>
                    </div>
                    <div>
                      <span className="text-2xl font-black text-indigo-600 block">300+</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Digital branding clients</span>
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
                  className="max-w-5xl mx-auto px-4 py-12 animate-fade-in space-y-12"
                >
                  <div className="text-center space-y-3">
                    <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full inline-block font-mono">Instant Support Hub</span>
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
                        href="https://wa.me/919876543210?text=Hello%20ADR%20E-Store!%20I%20have%20an%20order%20inquiry."
                        target="_blank"
                        rel="noreferrer"
                        className="p-5 rounded-2xl bg-emerald-600 text-white flex items-center justify-between shadow-xs hover:bg-emerald-500 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex gap-3 items-center">
                          <MessageCircle className="w-8 h-8 fill-white shrink-0" />
                          <div className="text-left">
                            <h4 className="text-xs font-bold font-mono">WhatsApp Hotline</h4>
                            <p className="text-[10px] text-emerald-100">Click to instantly chat with print consultants.</p>
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
                          <p className="text-2xs text-slate-600 leading-relaxed max-w-xs mx-auto">Your branding inquiry has been logged securely. One of our lead designers will reach out via email within 2 hours.</p>
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
                              <option>Bulk Print Order Discount</option>
                              <option>Digital Branding Consultant</option>
                              <option>Current Order Tracking Help</option>
                              <option>Other Custom Inquiry</option>
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
        href="https://wa.me/919876543210?text=Hello%20ADR%20E-Store!%20I%20would%20like%20to%20enquire%20about%20customized%20printing%20and%20branding%20services."
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
