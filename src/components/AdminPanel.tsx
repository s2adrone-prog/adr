import React, { useState } from 'react';
import { 
  Package, LayoutGrid, Mail, Plus, Trash2, Edit, Check, TrendingUp, Users, Clock, MessageSquare, Tag, FileText, Smartphone
} from 'lucide-react';
import { Product, ServiceInquiry, ProductVariant, ContactMessage } from '../types';

interface ProductInquiry {
  id: string;
  productName: string;
  variantName: string;
  quantity: number;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  customText: string;
  customColor: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Replied';
}

interface AdminPanelProps {
  categories: string[];
  onAddCategory: (category: string) => void;
  onRemoveCategory: (category: string) => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onRemoveProduct: (productId: string) => void;
  
  productInquiries: ProductInquiry[];
  onUpdateProductInquiryStatus: (inqId: string, status: ProductInquiry['status']) => void;
  onRemoveProductInquiry?: (inqId: string) => void;

  inquiries: ServiceInquiry[];
  onUpdateInquiryStatus: (inquiryId: string, status: ServiceInquiry['status']) => void;
  onRemoveInquiry?: (inqId: string) => void;

  contactMessages: ContactMessage[];
  onUpdateContactMessageStatus: (msgId: string, status: ContactMessage['status']) => void;
  onRemoveContactMessage?: (msgId: string) => void;
}

export default function AdminPanel({
  categories,
  onAddCategory,
  onRemoveCategory,
  products,
  onAddProduct,
  onUpdateProduct,
  onRemoveProduct,
  productInquiries,
  onUpdateProductInquiryStatus,
  onRemoveProductInquiry,
  inquiries,
  onUpdateInquiryStatus,
  onRemoveInquiry,
  contactMessages,
  onUpdateContactMessageStatus,
  onRemoveContactMessage
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'categories' | 'products' | 'product_inquiries' | 'service_inquiries' | 'contact_leads'>('analytics');
  
  // Category management states
  const [newCategory, setNewCategory] = useState('');

  // Product form states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState(categories[0] || '');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState(499);
  const [prodImage, setProdImage] = useState('');
  const [prodVariants, setProdVariants] = useState<ProductVariant[]>([
    { id: 'v-1', name: 'Standard / Free', priceModifier: 0 }
  ]);
  const [variantLabel, setVariantLabel] = useState('Size Options');

  const pendingProdInqs = productInquiries.filter(i => i.status === 'New').length;
  const pendingServInqs = inquiries.filter(i => i.status === 'New').length;
  const pendingContactMsgs = contactMessages.filter(i => i.status === 'New').length;

  const handleAddCategoryLocal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodImage.trim()) return;

    const newProd: Product = {
      id: editingProduct ? editingProduct.id : `prod-custom-${Date.now()}`,
      name: prodName,
      category: prodCategory,
      description: prodDesc,
      basePrice: prodPrice,
      mockupImage: prodImage,
      overlayArea: editingProduct ? editingProduct.overlayArea : { top: 25, left: 25, width: 50, height: 50, borderRadius: '4px' },
      variants: prodVariants,
      variantLabel: variantLabel,
      estimatedDelivery: '3-5 Days',
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviews: editingProduct ? editingProduct.reviews : [],
      featured: editingProduct ? editingProduct.featured : false
    };

    if (editingProduct) {
      onUpdateProduct(newProd);
    } else {
      onAddProduct(newProd);
    }

    setEditingProduct(null);
    setShowProductForm(false);
    resetProductForm();
  };

  const resetProductForm = () => {
    setProdName('');
    setProdCategory(categories[0] || '');
    setProdDesc('');
    setProdPrice(499);
    setProdImage('');
    setVariantLabel('Size Options');
    setProdVariants([{ id: 'v-1', name: 'Standard / Free', priceModifier: 0 }]);
  };

  const startEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdDesc(p.description);
    setProdPrice(p.basePrice);
    setProdImage(p.mockupImage);
    setVariantLabel(p.variantLabel);
    setProdVariants(p.variants);
    setShowProductForm(true);
  };

  const handleAddVariant = () => {
    setProdVariants([
      ...prodVariants,
      { id: `var-${Date.now()}`, name: 'New Variant Option', priceModifier: 50 }
    ]);
  };

  const handleRemoveVariant = (id: string) => {
    setProdVariants(prodVariants.filter(v => v.id !== id));
  };

  const handleUpdateVariantField = (id: string, field: 'name' | 'priceModifier', val: any) => {
    setProdVariants(
      prodVariants.map(v => v.id === id ? { ...v, [field]: val } : v)
    );
  };

  return (
    <div id="admin-panel-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Tabs navigation */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-1 bg-white p-4 rounded-xl border border-slate-100 shadow-3xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">Merchant CMS Panel</span>
          
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
            id="admin-tab-categories"
            onClick={() => setActiveTab('categories')}
            className={`w-full text-left py-2 px-3 text-xs font-semibold rounded-md flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'categories' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Print Categories</span>
          </button>

          <button
            id="admin-tab-products"
            onClick={() => setActiveTab('products')}
            className={`w-full text-left py-2 px-3 text-xs font-semibold rounded-md flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'products' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Physical Products</span>
          </button>

          <button
            id="admin-tab-prod-inquiries"
            onClick={() => setActiveTab('product_inquiries')}
            className={`w-full text-left py-2 px-3 text-xs font-semibold rounded-md flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'product_inquiries' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Product Inquiries</span>
            {pendingProdInqs > 0 && (
              <span className="ml-auto bg-emerald-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                {pendingProdInqs}
              </span>
            )}
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
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest pb-3 border-b border-slate-100 font-mono">ADR Showcase Analytics Dashboard</h2>
              
              {/* Analytics metrics grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">Product Leads</span>
                    <Smartphone className="w-4.5 h-4.5 text-indigo-600" />
                  </div>
                  <span className="text-lg font-black text-slate-900 font-mono block mt-2">{productInquiries.length}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{pendingProdInqs} uncontacted leads</span>
                </div>

                <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">Service Briefs</span>
                    <FileText className="w-4.5 h-4.5 text-indigo-600" />
                  </div>
                  <span className="text-lg font-black text-slate-900 font-mono block mt-2">{inquiries.length}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{pendingServInqs} new creative project briefs</span>
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
                    <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">Showcase Catalog</span>
                    <Package className="w-4.5 h-4.5 text-slate-800" />
                  </div>
                  <span className="text-lg font-black text-slate-900 font-mono block mt-2">{products.length} Items</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{categories.length} active print categories</span>
                </div>
              </div>

              {/* Conversion funnels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                <div className="space-y-3">
                  <span className="text-2xs font-bold text-slate-500 uppercase block">Product Inquiries Funnel</span>
                  <div className="space-y-3">
                    {['New', 'Contacted', 'Replied'].map((status) => {
                      const count = productInquiries.filter(i => i.status === status).length;
                      const percent = productInquiries.length > 0 ? (count / productInquiries.length) * 100 : 0;
                      return (
                        <div key={status} className="flex items-center gap-3 text-xs">
                          <span className="w-24 font-semibold text-slate-700">{status}</span>
                          <div className="flex-1 h-3 bg-slate-100 rounded-sm overflow-hidden flex">
                            <div style={{ width: `${percent}%` }} className="bg-emerald-600 h-full" />
                          </div>
                          <span className="w-10 font-mono text-slate-500 text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-2xs font-bold text-slate-500 uppercase block">Service Consultations Funnel</span>
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
              </div>
            </div>
          )}

          {/* TAB: Categories */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">Print Categories</h2>
                  <p className="text-2xs text-slate-400">Add or remove physical print-on-demand categories available for customization.</p>
                </div>
              </div>

              {/* Add category form */}
              <form id="add-category-form" onSubmit={handleAddCategoryLocal} className="flex gap-2 max-w-md">
                <input
                  id="admin-new-category-input"
                  type="text"
                  placeholder="E.g., Customized Phone Covers"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 text-xs border border-slate-200 rounded-md px-3 py-2 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-slate-800"
                  required
                />
                <button
                  id="add-category-submit-btn"
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-md cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </form>

              {/* Categories list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs">
                    <span className="font-semibold text-slate-700">{cat}</span>
                    <button
                      onClick={() => onRemoveCategory(cat)}
                      className="text-slate-400 hover:text-red-500 p-1 rounded-sm hover:bg-white cursor-pointer transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Products */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">Physical Products</h2>
                  <p className="text-2xs text-slate-400">Add, edit or configure base print-on-demand items.</p>
                </div>
                {!showProductForm && (
                  <button
                    id="show-product-form-btn"
                    onClick={() => {
                      resetProductForm();
                      setEditingProduct(null);
                      setShowProductForm(true);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Product</span>
                  </button>
                )}
              </div>

              {/* Product Form */}
              {showProductForm && (
                <form id="admin-product-form" onSubmit={handleCreateProduct} className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-4 max-w-3xl animate-fade-in">
                  <h3 className="text-xs font-bold text-slate-700 uppercase">
                    {editingProduct ? 'Edit Product Details' : 'Create New Base Print Product'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prod-name-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Product Title</label>
                      <input
                        id="prod-name-input"
                        type="text"
                        placeholder="E.g. Custom Premium Ceramic Mug"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-800"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="prod-category-select" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Print Category</label>
                      <select
                        id="prod-category-select"
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-700"
                        required
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prod-price-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Base Price (INR)</label>
                      <input
                        id="prod-price-input"
                        type="number"
                        value={prodPrice}
                        onChange={(e) => setProdPrice(parseInt(e.target.value) || 0)}
                        className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-850"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="prod-image-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Mockup Image URL</label>
                      <input
                        id="prod-image-input"
                        type="url"
                        placeholder="Unsplash mockup link or upload URL"
                        value={prodImage}
                        onChange={(e) => setProdImage(e.target.value)}
                        className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="prod-desc-textarea" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Description</label>
                    <textarea
                      id="prod-desc-textarea"
                      rows={2}
                      placeholder="Brief specifications, material characteristics, etc."
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-800"
                    />
                  </div>

                  {/* Variant configuration */}
                  <div className="pt-2 border-t border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Product Variants</span>
                      <button
                        type="button"
                        onClick={handleAddVariant}
                        className="text-2xs font-bold text-indigo-600 hover:underline cursor-pointer"
                      >
                        + Add Variant Option
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="variant-label-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Option Title Label</label>
                        <input
                          id="variant-label-input"
                          type="text"
                          placeholder="E.g., Size, Volume, Frame Dimension"
                          value={variantLabel}
                          onChange={(e) => setVariantLabel(e.target.value)}
                          className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 max-h-[150px] overflow-y-auto pt-1">
                      {prodVariants.map((variant) => (
                        <div key={variant.id} className="flex gap-2 items-center animate-fade-in">
                          <input
                            type="text"
                            placeholder="Variant Name (e.g. Medium 15oz)"
                            value={variant.name}
                            onChange={(e) => handleUpdateVariantField(variant.id, 'name', e.target.value)}
                            className="flex-1 text-xs border border-slate-200 bg-white rounded-md p-1.5 focus:outline-hidden text-slate-800"
                            required
                          />
                          <input
                            type="number"
                            placeholder="Price Modifier (e.g. +100)"
                            value={variant.priceModifier}
                            onChange={(e) => handleUpdateVariantField(variant.id, 'priceModifier', parseInt(e.target.value) || 0)}
                            className="w-28 text-xs border border-slate-200 bg-white rounded-md p-1.5 focus:outline-hidden text-slate-800"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(variant.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
                            title="Remove Variant"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 justify-end pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => {
                        setShowProductForm(false);
                        setEditingProduct(null);
                      }}
                      className="text-xs text-slate-500 hover:bg-slate-100 px-3 py-2 rounded-md cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-md cursor-pointer"
                    >
                      {editingProduct ? 'Save Updates' : 'Add to Catalog'}
                    </button>
                  </div>
                </form>
              )}

              {/* Products Table/Grid list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="border border-slate-150 p-3 rounded-lg flex flex-col justify-between hover:shadow-xs transition-shadow bg-slate-50/20">
                    <div className="flex gap-3">
                      <img
                        src={p.mockupImage}
                        alt={p.name}
                        className="w-14 h-14 object-cover rounded-sm shrink-0 bg-slate-50 border border-slate-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">{p.category}</span>
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mt-1">{p.name}</h4>
                        <span className="text-xs font-black text-slate-900 font-mono">₹{p.basePrice}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => startEditProduct(p)}
                        className="p-1 text-slate-500 hover:text-indigo-600 rounded-sm hover:bg-slate-50 cursor-pointer transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemoveProduct(p.id)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded-sm hover:bg-slate-50 cursor-pointer transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Product Inquiries */}
          {activeTab === 'product_inquiries' && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">Custom Print Product Leads</h2>
                <p className="text-2xs text-slate-400 mt-1">Review personalized physical mockup layouts built via the Web Customizer.</p>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {productInquiries.map((inq) => (
                  <div key={inq.id} className="border border-slate-200 rounded-xl p-4 space-y-3 hover:shadow-2xs transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2.5 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold text-slate-900 font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md">ID: {inq.id}</span>
                        <span className="text-[10px] text-slate-400 font-mono ml-2">({inq.createdAt})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xs font-bold text-slate-500 uppercase">Status:</span>
                        <select
                           value={inq.status}
                           onChange={(e) => onUpdateProductInquiryStatus(inq.id, e.target.value as ProductInquiry['status'])}
                           className={`text-2xs font-bold px-2.5 py-1 rounded-full cursor-pointer focus:outline-hidden ${
                             inq.status === 'Replied' ? 'bg-emerald-100 text-emerald-800' :
                             inq.status === 'Contacted' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                           }`}
                        >
                          <option value="New">New Specification</option>
                          <option value="Contacted">Contacted Client</option>
                          <option value="Replied">Completed / Quoted</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Customer</span>
                        <span className="font-semibold text-slate-800">{inq.customerName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Contact Details</span>
                        <span className="text-slate-600 block">{inq.customerPhone}</span>
                        <span className="text-slate-500 block text-2xs">{inq.customerEmail || "No Email"}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Item Details</span>
                        <span className="font-semibold text-slate-800">{inq.productName}</span>
                        <span className="text-slate-500 text-2xs block">{inq.variantName} • Qty: {inq.quantity}</span>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1.5 border border-slate-100">
                      <div>
                        <span className="text-[10px] text-indigo-650 font-bold uppercase tracking-wide block">Custom Print Specifications</span>
                        <p className="mt-1 text-slate-700 font-mono text-2xs leading-relaxed">
                          • Text Content: <span className="text-slate-900 font-bold">{inq.customText || "None"}</span><br />
                          • Styling Color: <span className="font-semibold" style={{ color: inq.customColor || '#000' }}>{inq.customColor || "Default Black"}</span><br />
                          • Custom Notes: <span className="text-slate-600 italic">"{inq.notes || "No extra instructions specified."}"</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                      <span className="text-slate-400">Pre-calculated Estimate: <strong className="text-slate-800 font-mono">₹{inq.price}</strong></span>
                      {onRemoveProductInquiry && (
                        <button
                          onClick={() => onRemoveProductInquiry(inq.id)}
                          className="text-slate-400 hover:text-red-500 text-2xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Archive Lead</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {productInquiries.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-12 font-mono">No custom product enquiries captured yet.</p>
                )}
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
                  <div key={inq.id} className="border border-slate-200 rounded-xl p-4 space-y-3 hover:shadow-2xs transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2.5 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold text-slate-900 bg-indigo-50 text-indigo-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{inq.serviceName}</span>
                        <span className="text-[10px] text-slate-400 font-mono ml-2">Tier: {inq.packageName} (₹{inq.packagePrice})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xs font-bold text-slate-500 uppercase">Status:</span>
                        <select
                          value={inq.status}
                          onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as ServiceInquiry['status'])}
                          className={`text-2xs font-bold px-2.5 py-1 rounded-full cursor-pointer focus:outline-hidden ${
                            inq.status === 'Booked' ? 'bg-emerald-100 text-emerald-800' :
                            inq.status === 'Proposal Sent' ? 'bg-indigo-100 text-indigo-800' :
                            inq.status === 'Contacted' ? 'bg-slate-100 text-slate-850' : 'bg-amber-100 text-amber-800'
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
                        <span className="text-slate-500 block">{inq.customerEmail}</span>
                        <span className="text-slate-500 block">{inq.customerPhone}</span>
                      </div>
                      <div className="sm:col-span-2 space-y-1 bg-slate-50 p-2 rounded-md">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Creative Brief</span>
                        <p className="text-slate-600 leading-relaxed text-xs italic">"{inq.projectBrief}"</p>
                      </div>
                    </div>

                    {/* Attachments */}
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs text-slate-400">
                      <div>
                        <span>Client Budget Bracket: <strong className="text-slate-700 font-mono">₹{inq.budget}</strong></span>
                        {inq.attachmentName && (
                          <span className="ml-3 font-medium text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded inline-flex items-center gap-1">
                            📎 {inq.attachmentName}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-2xs font-mono">{inq.createdAt}</span>
                        {onRemoveInquiry && (
                          <button
                            onClick={() => onRemoveInquiry(inq.id)}
                            className="text-slate-400 hover:text-red-500 p-1 rounded-sm cursor-pointer"
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
                <p className="text-2xs text-slate-400 mt-1">Review contact inquiries captured from the main footer Contact Us form.</p>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {contactMessages.map((msg) => (
                  <div key={msg.id} className="border border-slate-200 rounded-xl p-4 space-y-3 hover:shadow-2xs transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2.5 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-black text-slate-700 font-mono bg-slate-100 px-2.5 py-0.5 rounded">Topic: {msg.topic || "General Inquiry"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xs font-bold text-slate-500 uppercase">Message status:</span>
                        <select
                           value={msg.status}
                           onChange={(e) => onUpdateContactMessageStatus(msg.id, e.target.value as ContactMessage['status'])}
                           className={`text-2xs font-bold px-2.5 py-1 rounded-full cursor-pointer focus:outline-hidden ${
                             msg.status === 'Archived' ? 'bg-slate-150 text-slate-650' :
                             msg.status === 'Replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
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
                        <span className="text-slate-500 block">{msg.email}</span>
                        <span className="text-slate-500 block">{msg.phone}</span>
                      </div>
                      <div className="sm:col-span-2 space-y-1 bg-slate-50 p-2.5 rounded-md">
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
