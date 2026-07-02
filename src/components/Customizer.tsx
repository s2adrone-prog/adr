import React, { useState, useRef } from 'react';
import { Upload, Type, Move, ZoomIn, Check, RotateCcw, ArrowRight, Heart, ShieldAlert, MessageCircle, Mail } from 'lucide-react';
import { Product, ProductVariant, CustomizedDesign } from '../types';

interface CustomizerProps {
  product: Product;
  selectedVariant: ProductVariant;
  setSelectedVariant: (variant: ProductVariant) => void;
  onEnquire: (inquiryDetails: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    notes: string;
    customization: CustomizedDesign;
    variant: ProductVariant;
    quantity: number;
  }) => void;
  onSaveDesign?: (customization: CustomizedDesign) => void;
}

const GOOGLE_FONTS = [
  { name: 'Inter (Sans)', value: 'Inter, sans-serif' },
  { name: 'Space Grotesk (Tech)', value: 'Space Grotesk, sans-serif' },
  { name: 'Playfair (Elegant)', value: 'Playfair Display, serif' },
  { name: 'JetBrains (Mono)', value: 'JetBrains Mono, monospace' },
  { name: 'Pacifico (Script)', value: 'Pacifico, cursive' },
  { name: 'Impact (Bold)', value: 'Impact, sans-serif' }
];

const PRESET_TEXT_COLORS = [
  '#ffffff', '#000000', '#f43f5e', '#06b6d4', '#eab308', '#22c55e', '#6366f1', '#a855f7'
];

export default function Customizer({
  product,
  selectedVariant,
  setSelectedVariant,
  onEnquire,
  onSaveDesign
}: CustomizerProps) {
  const [text, setText] = useState('Happy Printing');
  const [textColor, setTextColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Space Grotesk, sans-serif');
  const [fontSize, setFontSize] = useState(16);
  const [textX, setTextX] = useState(0); // percentage offset -50 to 50
  const [textY, setTextY] = useState(30); // percentage offset -50 to 50

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageScale, setImageScale] = useState(1.0);
  const [imageX, setImageX] = useState(0);
  const [imageY, setImageY] = useState(0);

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'options' | 'enquiry'>('text');
  const [dragType, setDragType] = useState<'none' | 'image' | 'text'>('none');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Enquiry Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle uploaded custom design image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
          setActiveTab('image');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setText('Happy Printing');
    setTextColor('#000000');
    setFontFamily('Space Grotesk, sans-serif');
    setFontSize(16);
    setTextX(0);
    setTextY(30);
    setImageSrc(null);
    setImageScale(1.0);
    setImageX(0);
    setImageY(0);
  };

  const getCustomizationData = (): CustomizedDesign => ({
    text,
    textColor,
    fontFamily,
    fontSize,
    textX,
    textY,
    imageSrc,
    imageScale,
    imageX,
    imageY
  });

  const handleSaveDesignLocal = () => {
    if (onSaveDesign) {
      onSaveDesign(getCustomizationData());
      alert("Design saved successfully! You can review saved designs in the Merchant Panel or view them here.");
    }
  };

  const triggerWhatsAppEnquiry = () => {
    // Generate pre-filled WhatsApp link
    const businessPhone = "919152255225"; // ADR E-Store WhatsApp contact
    const variantStr = selectedVariant ? selectedVariant.name : "Base Variant";
    const customTextStr = text.trim() ? `"${text}" (Color: ${textColor}, Font: ${fontFamily.split(',')[0]})` : "None";
    const customImageStr = imageSrc ? "Yes (Custom photo uploaded)" : "No";
    
    const message = `Hi ADR E-Store! I am interested in customizing this product:\n\n*Product:* ${product.name}\n*Category:* ${product.category}\n*Sizing/Variant:* ${variantStr}\n*Quantity:* ${qty}\n*Custom Text:* ${customTextStr}\n*Uploaded Image:* ${customImageStr}\n*Estimated Price:* ₹${(product.basePrice + (selectedVariant?.priceModifier || 0)) * qty}\n\n*My Details:*\nName: ${customerName || "Interested Buyer"}\nPhone: ${customerPhone || "Not specified"}\nNotes: ${notes || "None"}\n\nCan you please guide me on how to proceed?`;
    
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Please provide at least your Name and Phone Number so we can reach back.");
      return;
    }

    onEnquire({
      customerName,
      customerEmail,
      customerPhone,
      notes,
      customization: getCustomizationData(),
      variant: selectedVariant,
      quantity: qty
    });

    setFormSubmitted(true);
    triggerWhatsAppEnquiry();
  };

  return (
    <div id={`customizer-${product.id}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-xs">
      
      {/* LEFT COLUMN: Visualizer Mockup (7 Columns) */}
      <div className="lg:col-span-7 flex flex-col items-center">
        {/* Sticky Container */}
        <div className="w-full max-w-md bg-slate-50 border border-slate-100 rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center">
          
          {/* Main Visualizer Canvas wrapper */}
          <div id="visualizer-mockup-canvas" className="relative w-80 h-80 sm:w-96 sm:h-96 select-none bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
            {/* The base product mockup image */}
            <img
              src={product.mockupImage}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Bounded Overlay customization area */}
            <div
              id="customizer-overlay-bounds"
              style={{
                top: `${product.overlayArea.top}%`,
                left: `${product.overlayArea.left}%`,
                width: `${product.overlayArea.width}%`,
                height: `${product.overlayArea.height}%`,
                borderRadius: product.overlayArea.borderRadius || '0px',
              }}
              className="absolute border border-dashed border-indigo-500/40 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors z-10 flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Optional custom uploaded user image */}
              {imageSrc && (
                <div
                  style={{
                    transform: `translate(${imageX}px, ${imageY}px) scale(${imageScale})`,
                  }}
                  className="absolute pointer-events-none transition-transform duration-75"
                >
                  <img
                    src={imageSrc}
                    alt="Custom Uploaded"
                    className="max-w-[120px] max-h-[120px] object-contain opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Custom User Text */}
              {text.trim() && (
                <div
                  style={{
                    fontFamily: fontFamily,
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    transform: `translate(${textX}px, ${textY}px)`,
                  }}
                  className="absolute font-semibold max-w-[90%] text-center break-words select-none pointer-events-none leading-tight"
                >
                  {text}
                </div>
              )}
            </div>
          </div>

          {/* Reset button & badge */}
          <div className="w-full flex justify-between items-center mt-4">
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Customizer Active
            </span>
            <button
              id="customizer-reset-btn"
              onClick={handleReset}
              className="text-2xs font-semibold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Canvas</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Tool Control Panel & Lead Form (5 Columns) */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Header summary info */}
        <div className="space-y-1">
          <span className="text-indigo-650 text-2xs font-bold uppercase tracking-wider font-mono">Custom Mockup & Enquiry</span>
          <h1 className="text-xl font-extrabold text-slate-900 leading-snug">{product.name}</h1>
          <p className="text-xs text-slate-500 leading-relaxed">{product.description}</p>
          <div className="pt-2 flex items-center gap-4">
            <div>
              <span className="text-2xs text-slate-400 block font-semibold uppercase">Showcase Price</span>
              <strong className="text-lg font-black text-slate-950 font-mono">₹{product.basePrice + (selectedVariant?.priceModifier || 0)}</strong>
            </div>
            <div className="border-l border-slate-150 pl-4">
              <span className="text-2xs text-slate-400 block font-semibold uppercase">Substrate Delivery</span>
              <strong className="text-xs font-bold text-slate-800">{product.estimatedDelivery}</strong>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-150 gap-4">
          <button
            id="tab-btn-text"
            onClick={() => setActiveTab('text')}
            className={`pb-2 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
              activeTab === 'text' ? 'text-indigo-600 font-extrabold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Type className="w-4 h-4" />
              <span>Add Text</span>
            </div>
            {activeTab === 'text' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />}
          </button>

          <button
            id="tab-btn-image"
            onClick={() => setActiveTab('image')}
            className={`pb-2 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
              activeTab === 'image' ? 'text-indigo-600 font-extrabold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Upload className="w-4 h-4" />
              <span>Add Photo</span>
            </div>
            {activeTab === 'image' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />}
          </button>

          <button
            id="tab-btn-options"
            onClick={() => setActiveTab('options')}
            className={`pb-2 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
              activeTab === 'options' ? 'text-indigo-600 font-extrabold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Size Options</span>
            </div>
            {activeTab === 'options' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />}
          </button>

          <button
            id="tab-btn-enquiry"
            onClick={() => setActiveTab('enquiry')}
            className={`pb-2 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
              activeTab === 'enquiry' ? 'text-indigo-600 font-extrabold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span className="text-emerald-650">Enquire Now</span>
            </div>
            {activeTab === 'enquiry' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />}
          </button>
        </div>

        {/* Tab Content: Text Editor */}
        {activeTab === 'text' && (
          <div className="space-y-4 animate-fade-in">
            {/* Input */}
            <div>
              <label htmlFor="custom-text-input" className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Custom Printing Text</label>
              <input
                id="custom-text-input"
                type="text"
                placeholder="Type anything here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:border-indigo-500 text-slate-800 font-medium"
              />
            </div>

            {/* Font Picker */}
            <div>
              <label htmlFor="font-family-select" className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Typography Style</label>
              <select
                id="font-family-select"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-white text-slate-700"
              >
                {GOOGLE_FONTS.map((font) => (
                  <option key={font.value} value={font.value}>{font.name}</option>
                ))}
              </select>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Text Tint Color</label>
              <div className="flex flex-wrap gap-2 items-center">
                {PRESET_TEXT_COLORS.map((col) => (
                  <button
                    key={col}
                    onClick={() => setTextColor(col)}
                    style={{ backgroundColor: col }}
                    className={`w-6.5 h-6.5 rounded-full border cursor-pointer transition-all ${
                      textColor === col ? 'ring-2 ring-indigo-500 scale-110 border-white' : 'border-slate-200 hover:scale-105'
                    }`}
                  />
                ))}
                {/* Custom Color Input */}
                <input
                  id="custom-text-color-picker"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 p-0 cursor-pointer bg-white"
                  title="Pick a custom color"
                />
              </div>
            </div>

            {/* Position Controls */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="text-size-slider" className="text-2xs font-bold text-slate-500 uppercase flex justify-between">
                  <span>Size</span>
                  <span className="font-mono text-slate-800">{fontSize}px</span>
                </label>
                <input
                  id="text-size-slider"
                  type="range"
                  min="10"
                  max="32"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-1.5 accent-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="text-y-offset-slider" className="text-2xs font-bold text-slate-500 uppercase flex justify-between">
                  <span>Vertical Offset</span>
                  <span className="font-mono text-slate-800">{textY}px</span>
                </label>
                <input
                  id="text-y-offset-slider"
                  type="range"
                  min="-80"
                  max="80"
                  value={textY}
                  onChange={(e) => setTextY(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-1.5 accent-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="text-x-offset-slider" className="text-2xs font-bold text-slate-500 uppercase flex justify-between">
                  <span>Horizontal Offset</span>
                  <span className="font-mono text-slate-800">{textX}px</span>
                </label>
                <input
                  id="text-x-offset-slider"
                  type="range"
                  min="-60"
                  max="60"
                  value={textX}
                  onChange={(e) => setTextX(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-1.5 accent-indigo-500"
                />
              </div>
            </div>

            <button
              onClick={() => setActiveTab('image')}
              className="w-full mt-2 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1.5"
            >
              <span>Next: Add Custom Photo / Logo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Content: Image Upload */}
        {activeTab === 'image' && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <span className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-2">Upload Photo or Corporate Logo</span>
              
              <div
                id="dropzone-area"
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/10 p-6 rounded-lg text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5"
              >
                <Upload className="w-8 h-8 text-slate-400" />
                <span className="text-xs font-semibold text-slate-700">Click to Browse or Drag & Drop</span>
                <span className="text-2xs text-slate-400">Supports PNG, JPG, or SVG. Clear background recommended.</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {imageSrc && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-800 font-semibold">Custom Image Controls</span>
                  <button
                    onClick={() => setImageSrc(null)}
                    className="text-2xs font-bold text-red-500 hover:underline cursor-pointer"
                  >
                    Remove Image
                  </button>
                </div>

                {/* Scaling */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="image-scale-slider" className="text-2xs font-bold text-slate-500 uppercase flex justify-between">
                      <span>Scale / Zoom</span>
                      <span className="font-mono text-slate-800">{(imageScale * 100).toFixed(0)}%</span>
                    </label>
                    <input
                      id="image-scale-slider"
                      type="range"
                      min="0.3"
                      max="2.5"
                      step="0.1"
                      value={imageScale}
                      onChange={(e) => setImageScale(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-1.5 accent-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="image-y-offset-slider" className="text-2xs font-bold text-slate-500 uppercase flex justify-between">
                      <span>Vertical Offset</span>
                      <span className="font-mono text-slate-800">{imageY}px</span>
                    </label>
                    <input
                      id="image-y-offset-slider"
                      type="range"
                      min="-120"
                      max="120"
                      value={imageY}
                      onChange={(e) => setImageY(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-1.5 accent-indigo-500"
                    />
                  </div>
                </div>

                {/* Positional X */}
                <div>
                  <label htmlFor="image-x-offset-slider" className="text-2xs font-bold text-slate-500 uppercase flex justify-between">
                    <span>Horizontal Offset</span>
                    <span className="font-mono text-slate-800">{imageX}px</span>
                  </label>
                  <input
                    id="image-x-offset-slider"
                    type="range"
                    min="-120"
                    max="120"
                    value={imageX}
                    onChange={(e) => setImageX(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-1.5 accent-indigo-500"
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveTab('options')}
              className="w-full py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1.5"
            >
              <span>Next: Sizing & Variants</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Content: Variant Selection */}
        {activeTab === 'options' && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <span className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select {product.variantLabel}
              </span>
              <div className="flex flex-col gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    id={`variant-btn-${variant.id}`}
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      selectedVariant.id === variant.id
                        ? 'border-indigo-500 bg-indigo-50/30 font-bold text-indigo-750 shadow-3xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{variant.name}</span>
                    <span className="font-mono text-slate-500">
                      {variant.priceModifier === 0
                        ? 'Base Price'
                        : `+ ₹${variant.priceModifier}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('enquiry')}
              className="w-full py-2.5 bg-indigo-600 text-white text-xs font-extrabold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-1.5"
            >
              <span>Next: Custom Enquiry Lead Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Content: Enquiry Form */}
        {activeTab === 'enquiry' && (
          <form onSubmit={handleEnquirySubmit} className="space-y-3.5 animate-fade-in text-left">
            {formSubmitted ? (
              <div className="bg-emerald-50/50 border border-emerald-150 p-4 rounded-xl space-y-3">
                <span className="text-emerald-700 font-bold text-sm block">✓ Inquiry Captured Successfully!</span>
                <p className="text-2xs text-slate-600 leading-relaxed">
                  We've recorded your custom specifications inside our Merchant Dashboard. We will also trigger WhatsApp to establish instant 1-on-1 chatting with our printing representative.
                </p>
                <button
                  type="button"
                  onClick={triggerWhatsAppEnquiry}
                  className="w-full bg-emerald-650 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Re-open WhatsApp Chat</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setCustomerName('');
                    setCustomerPhone('');
                    setNotes('');
                  }}
                  className="text-[10px] text-slate-400 hover:underline block text-center w-full mt-1.5 font-bold"
                >
                  Submit Another Specification
                </button>
              </div>
            ) : (
              <>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-150">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Custom specifications summary:</span>
                  <p className="text-2xs text-slate-700 font-mono mt-1">
                    • {qty}x {product.name} ({selectedVariant?.name || "Standard Size"})<br />
                    {text.trim() && `• Text: "${text}" (${textColor})\n`}
                    {imageSrc && `• Attachment: Personal graphic uploaded\n`}
                    • Estimated Cost: <span className="font-bold text-slate-900">₹{(product.basePrice + (selectedVariant?.priceModifier || 0)) * qty}</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label htmlFor="enquiry-name" className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1">Your Full Name *</label>
                    <input
                      id="enquiry-name"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white focus:outline-hidden focus:border-indigo-500 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="enquiry-phone" className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1">Mobile / WhatsApp *</label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white focus:outline-hidden focus:border-indigo-500 text-slate-800"
                      />
                    </div>
                    <div>
                      <label htmlFor="enquiry-email" className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email Address</label>
                      <input
                        id="enquiry-email"
                        type="email"
                        placeholder="e.g. name@example.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white focus:outline-hidden focus:border-indigo-500 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="enquiry-notes" className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1">Customization Instructions (Notes)</label>
                    <textarea
                      id="enquiry-notes"
                      rows={2}
                      placeholder="Provide placement preferences, ink requests, background cleanings or packaging guidelines..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white focus:outline-hidden focus:border-indigo-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Enquire on WhatsApp (Submit specs)</span>
                  </button>
                  
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400">or submit details directly to our staff</span>
                  </div>
                </div>
              </>
            )}
          </form>
        )}

        {/* Global Controls (Qty, Save Design) */}
        {!formSubmitted && (
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                <button
                  type="button"
                  id="qty-decrement-btn"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-1.5 text-slate-500 hover:text-slate-800 cursor-pointer font-bold"
                >
                  -
                </button>
                <span className="px-2 text-xs font-bold text-slate-800 font-mono">{qty}</span>
                <button
                  type="button"
                  id="qty-increment-btn"
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-1.5 text-slate-500 hover:text-slate-800 cursor-pointer font-bold"
                >
                  +
                </button>
              </div>

              {/* Save Design */}
              <button
                type="button"
                id="save-design-btn"
                onClick={handleSaveDesignLocal}
                className="flex-1 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <Heart className="w-3.5 h-3.5 text-indigo-500" />
                <span>Save Design Preview</span>
              </button>
            </div>

            {activeTab !== 'enquiry' && (
              <button
                type="button"
                onClick={() => setActiveTab('enquiry')}
                className="w-full bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
              >
                <span>Enquire with these custom specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Security Banner */}
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 justify-center">
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" />
              <span>Verified premium substrate. Professional 300 DPI high-fidelity sublimated heat press.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
