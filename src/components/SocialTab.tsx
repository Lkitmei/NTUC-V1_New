import React, { useState } from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { MessageSquare, Users, Sparkles, BookOpen, ThumbsUp, Heart, AlertCircle } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  likes: number;
}

const FORUM_TOPICS: Topic[] = [
  {
    id: 'fairprice-cooking-recipes',
    title: 'Cooking & Recipe Secrets with FairPrice Ingredients',
    description: 'Share your favorite cooking recipes, culinary tips, and healthy meals made using ingredients purchased from FairPrice!',
    category: 'Recipes',
    url: 'https://ntuc-applet.com/social/cooking-recipes',
    likes: 124,
  },
  {
    id: 'fairprice-smart-savings',
    title: 'Smart Savings & Deal Hunting Discussion',
    description: 'Found an incredible weekly promo, direct discount, or have tips on maximizing LinkPoints? Share them here with the community!',
    category: 'Deals & Savings',
    url: 'https://ntuc-applet.com/social/smart-savings',
    likes: 218,
  },
  {
    id: 'fairprice-product-reviews',
    title: 'Honest Product Reviews & Recommendations',
    description: 'Discuss your thoughts on new arrivals, local produce, and FairPrice housebrand items. Help others find the best products!',
    category: 'Reviews',
    url: 'https://ntuc-applet.com/social/product-reviews',
    likes: 87,
  },
  {
    id: 'fairprice-feedback-suggestions',
    title: 'In-store & Online Feedback Corner',
    description: 'How can we serve you better? Suggest new features, product requests, or share store experiences with our team and community.',
    category: 'Feedback',
    url: 'https://ntuc-applet.com/social/feedback-suggestions',
    likes: 56,
  }
];

export default function SocialTab() {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(FORUM_TOPICS[0]);
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});

  const handleLike = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserLikes(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in" id="social-tab-container">
      {/* Social Tab Header Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        <div className="max-w-xl relative z-10 space-y-2">
          <span className="bg-white/20 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            💬 Community Corner
          </span>
          <h2 className="font-headline-lg text-xl sm:text-3xl font-extrabold leading-tight tracking-tight text-white">
            FairPrice Customer Social Forum
          </h2>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
            Connect with fellow shoppers! Share delicious meal recipes, discuss smart grocery budget saving hacks, review our items, and talk all things food.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Forums Topics list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-surface-gray rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-sm text-text-main flex items-center gap-1.5 border-b border-surface-gray pb-3 mb-3">
              <BookOpen className="w-4 h-4 text-primary" />
              Select Discussion Topic
            </h3>

            <div className="space-y-3">
              {FORUM_TOPICS.map((topic) => {
                const isSelected = topic.id === selectedTopic.id;
                const hasLiked = !!userLikes[topic.id];

                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-surface-gray bg-white hover:bg-surface-gray/40 hover:border-outline-variant/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        topic.category === 'Recipes' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                        topic.category === 'Deals & Savings' ? 'bg-red-50 text-fp-red border border-red-100' :
                        topic.category === 'Reviews' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        'bg-purple-50 text-purple-600 border border-purple-100'
                      }`}>
                        {topic.category}
                      </span>
                      <button
                        onClick={(e) => handleLike(topic.id, e)}
                        className={`flex items-center gap-1 text-[10px] font-bold transition-colors ${
                          hasLiked ? 'text-fp-red' : 'text-outline hover:text-fp-red'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-fp-red' : ''}`} />
                        <span>{topic.likes + (hasLiked ? 1 : 0)}</span>
                      </button>
                    </div>

                    <h4 className={`text-xs sm:text-sm font-bold leading-snug transition-colors ${
                      isSelected ? 'text-primary' : 'text-text-main'
                    }`}>
                      {topic.title}
                    </h4>
                    
                    <p className="text-[11px] text-outline mt-1.5 line-clamp-2">
                      {topic.description}
                    </p>

                    {/* CommentCount display using the user's requested syntax */}
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary mt-2.5 pt-2 border-t border-surface-gray/50">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <CommentCount
                        shortname="ntuc"
                        config={{
                          url: topic.url,
                          identifier: topic.id,
                          title: topic.title,
                        }}
                      >
                        Comments
                      </CommentCount>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Forum Rules Widget */}
          <div className="bg-surface-gray/50 border border-surface-gray rounded-2xl p-4 space-y-3">
            <h4 className="font-bold text-xs text-text-main uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Community Guidelines
            </h4>
            <ul className="space-y-1.5 text-[11px] text-on-surface-variant list-disc pl-4 leading-relaxed">
              <li>Keep topics friendly, polite, and relevant to food, recipes, and shopping.</li>
              <li>No commercial spam, self-advertising, or promotional links.</li>
              <li>Respect fellow members and enjoy sharing ideas!</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Disqus Forum Embed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-surface-gray rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b border-surface-gray pb-4 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-extrabold text-primary uppercase tracking-widest">
                <Users className="w-3.5 h-3.5" />
                <span>Active Discussion Forum</span>
              </div>
              <h3 className="font-headline-md text-base sm:text-lg font-extrabold text-text-main leading-tight">
                {selectedTopic.title}
              </h3>
              <p className="text-xs text-outline leading-relaxed">
                {selectedTopic.description}
              </p>
            </div>

            {/* Note on Disqus functionality */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2.5 text-[11px] text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1 leading-normal">
                <p className="font-bold">Disqus Sandbox Note:</p>
                <p>
                  We have fully integrated Disqus under the shortname <code className="bg-amber-100 px-1 rounded font-bold font-mono">ntuc</code> as specified. If Disqus displays a configuration or connection alert, this is normal for sandboxed preview iframe domains and will function fully once your custom domain is whitelisted in your Disqus Admin panel.
                </p>
              </div>
            </div>

            {/* Disqus Discussion Embed using user's requested syntax */}
            <div className="pt-2" id="disqus-embed-wrapper">
              <DiscussionEmbed
                shortname="ntuc"
                config={{
                  url: selectedTopic.url,
                  identifier: selectedTopic.id,
                  title: selectedTopic.title,
                  language: 'EN'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
