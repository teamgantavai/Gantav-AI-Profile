import React, { useState, useRef } from 'react';
import { ArrowRight, Sun, Moon, Mail, Lock, Eye, EyeOff, CheckCircle, RefreshCw } from 'lucide-react';
import { signUpWithEmail, signInWithGoogle, resendVerificationEmail, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const parseError = (code) => ({
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
    'auth/popup-blocked': 'Popup blocked. Please allow popups for this site.',
}[code] || 'Something went wrong. Please try again.');

// ── Email Verification Screen ─────────────────────────────────────────────────
const VerifyEmailScreen = ({ email, isDarkMode, onResend, onBack, resendCooldown }) => {
    const d = isDarkMode;
    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 ${d ? 'bg-[#05070A] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
            <div className="w-full max-w-[400px]">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/30 flex items-center justify-center">
                        <Mail size={40} className="text-violet-400" />
                    </div>
                </div>

                <div className={`border rounded-[2.5rem] p-8 sm:p-10 shadow-2xl ${d ? 'bg-[#0D1117]/80 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'}`}>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-3">Verify your email</h2>
                        <p className={`text-sm leading-relaxed ${d ? 'text-slate-400' : 'text-slate-500'}`}>
                            We sent a verification link to
                        </p>
                        <p className="text-sm font-bold text-violet-400 mt-1">{email}</p>
                        <p className={`text-sm mt-3 leading-relaxed ${d ? 'text-slate-400' : 'text-slate-500'}`}>
                            Click the link in the email to verify your account, then come back and sign in.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className={`rounded-2xl p-4 mb-6 space-y-3 ${d ? 'bg-white/5 border border-white/5' : 'bg-slate-50 border border-slate-200'}`}>
                        {[
                            { step: '1', text: 'Check your email inbox' },
                            { step: '2', text: 'Click the verification link' },
                            { step: '3', text: 'Come back and sign in below' },
                        ].map(({ step, text }) => (
                            <div key={step} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-black shrink-0">{step}</div>
                                <span className={`text-xs font-bold ${d ? 'text-slate-300' : 'text-slate-700'}`}>{text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Resend */}
                    <button
                        onClick={onResend}
                        disabled={resendCooldown > 0}
                        className={`w-full h-12 rounded-2xl border flex items-center justify-center gap-2 text-sm font-bold transition-all mb-3 ${resendCooldown > 0
                            ? d ? 'border-white/5 text-slate-600 cursor-not-allowed' : 'border-slate-100 text-slate-300 cursor-not-allowed'
                            : d ? 'border-white/10 hover:bg-white/5 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                    >
                        <RefreshCw size={15} />
                        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend verification email'}
                    </button>

                    {/* Go to Login */}
                    <button
                        onClick={onBack}
                        className="w-full h-14 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-violet-900/20 active:scale-95"
                    >
                        <span>Go to Sign In</span><ArrowRight size={18} />
                    </button>
                </div>

                <p className={`text-center text-xs mt-6 ${d ? 'text-slate-600' : 'text-slate-400'}`}>
                    Check spam/junk if you don't see the email
                </p>
            </div>
        </div>
    );
};

// ── Main SignUp Component ──────────────────────────────────────────────────────
const SignUpScreen = ({ onNavigate, isDarkMode: darkProp, setIsDarkMode: setDarkProp }) => {
    const [_dark, _setDark] = useState(true);
    const isDarkMode = darkProp !== undefined ? darkProp : _dark;
    const setIsDarkMode = setDarkProp !== undefined ? setDarkProp : _setDark;

    const [screen, setScreen] = useState('signup'); // 'signup' | 'verify'
    const [registeredEmail, setRegisteredEmail] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [showCf, setShowCf] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingType, setLoadingType] = useState('');
    const [error, setError] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);

    const startCooldown = () => {
        setResendCooldown(60);
        const t = setInterval(() => {
            setResendCooldown(prev => { if (prev <= 1) { clearInterval(t); return 0; } return prev - 1; });
        }, 1000);
    };

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirm) { setError('Passwords do not match.'); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        setIsLoading(true); setLoadingType('email'); setError('');
        try {
            await signUpWithEmail(email, password);
            setRegisteredEmail(email);
            startCooldown();
            setScreen('verify');
        } catch (err) {
            setError(parseError(err.code));
        } finally {
            setIsLoading(false); setLoadingType('');
        }
    };

    const handleGoogleSignUp = async () => {
        setIsLoading(true); setLoadingType('google'); setError('');
        try {
            await signInWithGoogle();
            // AuthProvider handles redirect automatically
        } catch (err) {
            setError(parseError(err.code));
            setIsLoading(false); setLoadingType('');
        }
    };

    const handleResend = async () => {
        try {
            await resendVerificationEmail();
            startCooldown();
        } catch (err) {
            console.error('Resend failed:', err);
        }
    };

    if (screen === 'verify') {
        return (
            <VerifyEmailScreen
                email={registeredEmail}
                isDarkMode={isDarkMode}
                onResend={handleResend}
                onBack={() => onNavigate?.('login')}
                resendCooldown={resendCooldown}
            />
        );
    }

    const d = isDarkMode;
    const busy = (type) => isLoading && loadingType === type;

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-500 selection:bg-violet-500/30 ${d ? 'bg-[#05070A] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>

            <button onClick={() => setIsDarkMode(!isDarkMode)}
                className={`fixed top-6 right-6 p-3 rounded-2xl border transition-all z-50 ${d ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600 shadow-lg hover:bg-slate-50'}`}>
                {d ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
                <div className={`absolute -top-[10%] -right-[10%] w-[40%] h-[40%] blur-[120px] rounded-full ${d ? 'bg-violet-600/10' : 'bg-violet-600/5'}`} />
                <div className={`absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] blur-[120px] rounded-full ${d ? 'bg-indigo-600/10' : 'bg-indigo-600/5'}`} />
            </div>

            <div className="w-full max-w-[400px] relative z-10">
                {/* Brand */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden shadow-2xl mb-4 border border-white/10">
                        <img src="/logo.png" alt="Gantav AI" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Gantav <span className="text-violet-500">AI</span></h1>
                    <p className={`text-[10px] font-black uppercase tracking-[0.3em] mt-2 ${d ? 'text-slate-500' : 'text-slate-400'}`}>Your Learning OS</p>
                </div>

                <div className={`border rounded-[2.5rem] p-8 sm:p-10 shadow-2xl transition-all duration-500 ${d ? 'bg-[#0D1117]/80 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'}`}>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold">Create Account</h2>
                        <p className={`text-sm mt-1 font-medium ${d ? 'text-slate-400' : 'text-slate-500'}`}>Start your learning journey today</p>
                    </div>

                    {error && (
                        <div className={`p-4 rounded-2xl border mb-6 ${d ? 'bg-rose-500/10 border-rose-500/25' : 'bg-rose-50 border-rose-200'}`}>
                            <p className={`text-sm font-semibold ${d ? 'text-rose-400' : 'text-rose-600'}`}>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleEmailSignUp} className="space-y-4 mb-6">
                        {/* Email */}
                        <div className="relative group">
                            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${d ? 'text-slate-500' : 'text-slate-400'} group-focus-within:text-violet-500`} size={18} />
                            <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required
                                className={`w-full h-12 rounded-xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 border transition-all ${d ? 'bg-white/5 border-white/5 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                        </div>
                        {/* Password */}
                        <div className="relative group">
                            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${d ? 'text-slate-500' : 'text-slate-400'} group-focus-within:text-violet-500`} size={18} />
                            <input type={showPw ? 'text' : 'password'} placeholder="Password (min 6 characters)" value={password} onChange={e => setPassword(e.target.value)} required
                                className={`w-full h-12 rounded-xl pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 border transition-all ${d ? 'bg-white/5 border-white/5 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                            <button type="button" onClick={() => setShowPw(!showPw)}
                                className={`absolute right-4 top-1/2 -translate-y-1/2 ${d ? 'text-slate-500 hover:text-violet-400' : 'text-slate-400 hover:text-violet-500'}`}>
                                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {/* Confirm */}
                        <div className="relative group">
                            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${d ? 'text-slate-500' : 'text-slate-400'} group-focus-within:text-violet-500`} size={18} />
                            <input type={showCf ? 'text' : 'password'} placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} required
                                className={`w-full h-12 rounded-xl pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 border transition-all ${d ? 'bg-white/5 border-white/5 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900'} ${confirm && confirm !== password ? 'border-rose-500/50' : ''}`} />
                            <button type="button" onClick={() => setShowCf(!showCf)}
                                className={`absolute right-4 top-1/2 -translate-y-1/2 ${d ? 'text-slate-500 hover:text-violet-400' : 'text-slate-400 hover:text-violet-500'}`}>
                                {showCf ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <button type="submit" disabled={isLoading || !email || !password || !confirm}
                            className="w-full h-14 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-violet-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                            {busy('email') ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <><span>Create Account</span><ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center"><div className={`w-full border-t ${d ? 'border-white/5' : 'border-slate-100'}`} /></div>
                        <span className={`relative px-4 text-[10px] font-black uppercase tracking-[0.2em] ${d ? 'bg-[#0D1117] text-slate-600' : 'bg-white text-slate-400'}`}>Or sign up with</span>
                    </div>

                    <button type="button" onClick={handleGoogleSignUp} disabled={isLoading}
                        className={`w-full h-14 rounded-2xl border flex items-center justify-center gap-3 text-sm font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${d ? 'bg-white/[0.08] border-white/10 hover:bg-white/[0.12] text-white' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'}`}>
                        {busy('google') ? <div className="w-5 h-5 border-2 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" /> : <><GoogleIcon /><span>Continue with Google</span></>}
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={() => onNavigate?.('login')} className="group flex flex-col items-center gap-1 mx-auto">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${d ? 'text-slate-600' : 'text-slate-400'}`}>Already have an account?</span>
                        <span className="flex items-center gap-1 text-sm font-bold text-violet-500 group-hover:text-violet-400 transition-colors">
                            Sign in <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpScreen;