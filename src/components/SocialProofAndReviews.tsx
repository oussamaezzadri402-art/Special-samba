import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle2, MessageSquare, User, Send, Heart } from 'lucide-react';
import { Review, ProductVariant } from '../types';
import { REVIEWS_DATA } from '../data/products';

interface SocialProofAndReviewsProps {
  selectedVariant: ProductVariant;
}

export const SocialProofAndReviews: React.FC<SocialProofAndReviewsProps> = ({
  selectedVariant
}) => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [userRating, setUserRating] = useState<number>(5);
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('الدار البيضاء');
  const [userComment, setUserComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) return;

    const newRev: Review = {
      id: Date.now().toString(),
      authorName: userName,
      city: userCity,
      rating: userRating,
      date: 'الآن',
      commentDarija: userComment,
      verifiedPurchase: true,
      variantName: selectedVariant.arabicName,
      size: 42,
      likes: 1
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setUserName('');
      setUserComment('');
    }, 2000);
  };

  const handleLike = (id: string) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  return (
    <section className="py-12 sm:py-20 relative bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>تقييمات وتجارب الزبناء بالمغرب</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            أشنو قالو الزبناء ديالنا بعد ما استلمو صباطهم؟
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            أكثر من 480 زبون جربو حذاء Spezial و Samba وكتبو انطباعاتهم بكل مصداقية.
          </p>
        </div>

        {/* Rating Breakdown Summary Box */}
        <div className="bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-800 mb-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-center shrink-0">
              <span className="text-4xl sm:text-5xl font-black text-white block">4.9</span>
              <div className="flex text-amber-400 my-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-zinc-400">من أصل 5 نجوم</span>
            </div>

            <div className="border-r border-zinc-800 pr-4 hidden sm:block">
              <span className="text-sm font-bold text-white block">نسبة رضا الزبناء: 98.4%</span>
              <span className="text-xs text-zinc-400">بناءً على 482 طلب مؤكد ومستلم فـ 2026</span>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs sm:text-sm border border-zinc-700 transition-colors"
          >
            {showForm ? 'إلغاء' : 'أضف تقييمك وتجربتك ✍️'}
          </button>
        </div>

        {/* Optional Review Form */}
        {showForm && (
          <form onSubmit={handleAddReview} className="bg-zinc-900 p-6 rounded-2xl border border-amber-500/40 mb-10 space-y-4">
            <h3 className="text-base font-extrabold text-white">شارِكنا رأيك بكل صراحة:</h3>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">تقييمك:</span>
              <div className="flex text-amber-400 cursor-pointer">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    onClick={() => setUserRating(s)}
                    className={`w-6 h-6 ${s <= userRating ? 'fill-amber-400' : 'text-zinc-600'}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="اسمك الكامل"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-zinc-950 text-white p-3 rounded-xl border border-zinc-800 text-xs"
              />
              <input
                type="text"
                placeholder="مدينتك (مثال: الدار البيضاء)"
                value={userCity}
                onChange={(e) => setUserCity(e.target.value)}
                className="bg-zinc-950 text-white p-3 rounded-xl border border-zinc-800 text-xs"
              />
            </div>

            <textarea
              required
              rows={3}
              placeholder="اكتب انطباعك عن جودة الجلد والتوصيل والمقاس..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="w-full bg-zinc-950 text-white p-3 rounded-xl border border-zinc-800 text-xs"
            />

            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 text-zinc-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors"
            >
              {submitted ? 'تم إرسال تقييمك بنجاح! شرفتنا' : 'نشر التقييم'}
            </button>
          </form>
        )}

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
                      {rev.authorName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-extrabold text-sm text-white block">{rev.authorName}</span>
                      <span className="text-[11px] text-zinc-400 block">{rev.city} • {rev.date}</span>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                  "{rev.commentDarija}"
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> زبون قام بالشراء والطلب
                </span>

                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1 text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>مفيد ({rev.likes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
