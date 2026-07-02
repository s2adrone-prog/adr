import React, { useState } from 'react';
import { MessageSquare, Star, Plus } from 'lucide-react';
import { Review } from '../types';

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export default function Reviews({ reviews, onAddReview }: ReviewsProps) {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Stats calculation
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) 
    : '5.0';

  const countByStars = (stars: number) => 
    reviews.filter((r) => r.rating === stars).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && comment.trim()) {
      onAddReview({ userName, rating, comment });
      setUserName('');
      setRating(5);
      setComment('');
      setShowForm(false);
    }
  };

  return (
    <div id="product-reviews-section" className="space-y-8 bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-2xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <span>Customer Feedback ({totalReviews})</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Real reviews submitted by certified print buyers.</p>
        </div>
        
        {!showForm && (
          <button
            id="write-review-btn"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-md border border-slate-200 cursor-pointer transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-600" />
            <span>Write a Review</span>
          </button>
        )}
      </div>

      {/* Grid Stats & Review Builder */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left: Star Metrics Breakdown (5 Columns) */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900 font-mono">{avgRating}</span>
            <div className="text-yellow-400 text-lg">
              {'★'.repeat(Math.round(parseFloat(avgRating)))}
              {'☆'.repeat(5 - Math.round(parseFloat(avgRating)))}
            </div>
            <span className="text-2xs text-slate-400 font-medium font-mono">({totalReviews} total)</span>
          </div>

          {/* Progress Bars */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = countByStars(stars);
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <span className="w-3 font-mono text-slate-500">{stars}★</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${percentage}%` }}
                      className="h-full bg-yellow-400 rounded-full"
                    />
                  </div>
                  <span className="w-8 text-right font-mono text-slate-400 text-2xs">{percentage.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Review submission / Display (7 Columns) */}
        <div className="md:col-span-7 space-y-6">
          {/* Form */}
          {showForm && (
            <form id="add-review-form" onSubmit={handleSubmit} className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3 animate-fade-in">
              <h4 className="text-xs font-bold text-slate-700 uppercase">Submit Your Review</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="review-name-input" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Your Name</label>
                  <input
                    id="review-name-input"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="E.g., John Doe"
                    className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden focus:border-indigo-500 text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="review-rating-select" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Score</label>
                  <select
                    id="review-rating-select"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden text-slate-700"
                  >
                    <option value="5">5 Stars (Excellent)</option>
                    <option value="4">4 Stars (Good)</option>
                    <option value="3">3 Stars (Average)</option>
                    <option value="2">2 Stars (Poor)</option>
                    <option value="1">1 Star (Terrible)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="review-comment-textarea" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Review Comments</label>
                <textarea
                  id="review-comment-textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details of your customization experience..."
                  className="w-full text-xs border border-slate-200 bg-white rounded-md p-2 focus:outline-hidden focus:border-indigo-500 text-slate-800"
                  required
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  id="cancel-review-btn"
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-xs text-slate-500 hover:bg-slate-100 px-3 py-1.5 rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="submit-review-btn"
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-1.5 rounded-md cursor-pointer transition-colors"
                >
                  Post Review
                </button>
              </div>
            </form>
          )}

          {/* List of reviews */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {reviews.map((r) => (
              <div key={r.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{r.userName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{r.date}</span>
                  </div>
                  <div className="flex text-yellow-400 text-2xs">
                    {'★'.repeat(r.rating)}
                    {'☆'.repeat(5 - r.rating)}
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {r.comment}
                </p>
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">No reviews yet. Be the first to customized and rate this item!</p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
