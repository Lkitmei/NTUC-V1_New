import React, { useState } from 'react';
import { X, Mail, Lock, User, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
  onAuthSuccess: (email: string) => void;
}

export default function AuthModal({ isOpen, onClose, type, onAuthSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all credentials');
      return;
    }
    // Simulate successful mock registration or login
    setIsDone(true);
    setTimeout(() => {
      onAuthSuccess(email);
      setIsDone(false);
      setEmail('');
      setPassword('');
      setName('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl flex flex-col p-6 relative"
        onClick={(e) => e.stopPropagation()}
        id="auth-credential-modal"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-surface-gray text-outline hover:text-text-main transition-colors"
          id="close-auth-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-scale-up">
            <CheckCircle className="w-12 h-12 text-green-500 mb-3 animate-bounce" />
            <h3 className="font-bold text-lg text-text-main">
              {type === 'login' ? 'Welcome Back!' : 'Welcome to FairPrice!'}
            </h3>
            <p className="text-xs text-outline mt-1">Verifying secure grocery token...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <img 
                alt="FairPrice" 
                className="h-10 w-10 mx-auto mb-2.5 object-contain"
                src="https://lh3.googleusercontent.com/aida/AP1WRLugE-gf0LRFfcyOzca9YBDdH4TYl0ySeqxdREjGT6WOOfnuh5W1m_bSTvDbRTEkOZb-BGxEDJ8WC3zyFlbU-HgZwLeAaPwp3QxL8pRTMMaQxBy4H3vuEPd81p1-kt3jP1Y_YUl9TrUxk6kj5SaAcRf2CWiOr7ZRaeYXXy7C_REt50c5VpCHxjHSCAhqhglOlMws5re-jdpI-63gzBR3RDRhI-KhA2eoj3YnOkeP5jJbkkOg0bi2ycjH8rc"
              />
              <h2 className="font-headline-md text-lg font-bold text-text-main">
                {type === 'login' ? 'Log in to your account' : 'Register for Digital Club'}
              </h2>
              <p className="text-xs text-outline mt-1">
                {type === 'login' 
                  ? 'Access your cart across devices and save with LinkPoints' 
                  : 'Start earning points and access member-only flash deals!'}
              </p>
            </div>

            {type === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    className="w-full pl-9 pr-3 py-2 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="Victor Mei"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-outline" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  className="w-full pl-9 pr-3 py-2 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="name@example.sg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-outline" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full pl-9 pr-3 py-2 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-outline" />
              </div>
            </div>

            {type === 'signup' && (
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="mt-0.5 rounded border-outline-variant text-primary focus:ring-primary"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                />
                <label htmlFor="newsletter" className="text-[11px] text-on-surface-variant leading-tight">
                  I wish to receive exclusive promotions, member rebates, and NTUC FairPrice newsletters.
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-container text-white py-2 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
              id="auth-submit-btn"
            >
              {type === 'login' ? 'Sign In' : 'Join as Member'}
            </button>
            
            <div className="text-center pt-2 text-xs">
              <span className="text-outline">
                {type === 'login' ? "Don't have an account? " : 'Already a digital member? '}
              </span>
              <button
                type="button"
                onClick={() => {
                  alert(type === 'login' ? 'Please click Sign Up above to register!' : 'Please click Log In above to enter details!');
                }}
                className="text-primary font-bold hover:underline"
              >
                {type === 'login' ? 'Create Account' : 'Log In instead'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
