import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Sun, Moon, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { signInWithEmail, signInWithGoogle, sendPasswordReset } from '../../firebase';

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const parseError = (code) => ({
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
    'auth/popup-blocked': 'Popup blocked. Please allow popups for this site.',
    'auth/email-not-verified': 'Please verify your email before signing in.',
}[code] || 'Something went wrong. Please try again.');

// ── Shared UI pieces ──────────────────────────────────────────────────────────
const Brand = ({ d }) => (
    <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden shadow-2xl mb-4 border border-white/10">
            <img src="/logo.png" alt="Gantav AI" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Gantav <span className="text-violet-500">AI</span></h1>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] mt-2 ${d ? 'text-slate-500' : 'text-slate-400'}`}>Your Learning OS</p>
    </div>
);

const Card = ({ d, children }) => (
    <div className={`border rounded-[2.5rem] p-8 sm:p-10 shadow-2xl transition-all duration-500 ${d ? 'bg-[#0D1117]/80 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'}`}>
        {children}
    </div>
);

// ── Forgot Password Screen ────────────────────────────────────────────────────
const ForgotPasswordScreen = ({ isDarkMode, onBack }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const d = isDarkMode;

    const startCooldown = () => {
        setCooldown(60);
        const t = setInterval(() => setCooldown(p => { if (p <= 1) { clearInterval(t); return 0; } return p - 1; }), 1000);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!email.trim()) { setError('Please enter your email address.'); return; }
        setIsLoading(true); setError('');
        try {
            await sendPasswordReset(email.trim());
            setSent(true);
            startCooldown();
        } catch (err) {
            setError(parseError(err.code));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 ${d ? 'bg-[#05070A] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
            <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
                <div className={`absolute -top-[10%] -left-[10%] w-[40%] h-[40%] blur-[120px] rounded-full ${d ? 'bg-violet-600/10' : 'bg-violet-600/5'}`} />
            </div>
            <div className="w-full max-w-[400px] relative z-10">
                <Brand d={d} />
                <Card d={d}>
                    {/* Back button */}
                    <button onClick={onBack} className={`flex items-center gap-2 text-xs font-bold mb-6 transition-colors ${d ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                        <ArrowLeft size={15} /> Back to Sign In
                    </button>

                    {sent ? (
                        /* Success state */
                        <div className="text-center py-4">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={32} className="text-emerald-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">Check your email</h2>
                            <p className={`text-sm leading-relaxed mb-2 ${d ? 'text-slate-400' : 'text-slate-500'}`}>
                                We sent a password reset link to
                            </p>
                            <p className="text-sm font-bold text-violet-400 mb-6">{email}</p>
                            <p className={`text-xs leading-relaxed mb-8 ${d ? 'text-slate-500' : 'text-slate-400'}`}>
                                Click the link in the email to reset your password. Check spam if you don't see it.
                            </p>

                            <button onClick={handleSend} disabled={cooldown > 0 || isLoading}
                                className={`w-full h-12 rounded-2xl border flex items-center justify-center gap-2 text-sm font-bold transition-all mb-3 ${cooldown > 0
                                    ? d ? 'border-white/5 text-slate-600 cursor-not-allowed' : 'border-slate-100 text-slate-300 cursor-not-allowed'
                                    : d ? 'border-white/10 hover:bg-white/5 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}>
                                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend reset email'}
                            </button>

                            <button onClick={onBack}
                                className="w-full h-14 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-violet-900/20 active:scale-95">
                                <span>Back to Sign In</span><ArrowRight size={18} />
                            </button>
                        </div>
                    ) : (
                        /* Form state */
                        <>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold">Forgot Password?</h2>
                                <p className={`text-sm mt-2 leading-relaxed ${d ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Enter the email address you signed up with and we'll send you a reset link.
                                </p>
                            </div>

                            {error && (
                                <div className={`p-4 rounded-2xl border mb-6 ${d ? 'bg-rose-500/10 border-rose-500/25' : 'bg-rose-50 border-rose-200'}`}>
                                    <p className={`text-sm font-semibold ${d ? 'text-rose-400' : 'text-rose-600'}`}>{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSend} className="space-y-4">
                                <div className="relative group">
                                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${d ? 'text-slate-500' : 'text-slate-400'} group-focus-within:text-violet-500`} size={18} />
                                    <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required autoFocus
                                        className={`w-full h-12 rounded-xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 border transition-all ${d ? 'bg-white/5 border-white/5 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                                </div>
                                <button type="submit" disabled={isLoading || !email}
                                    className="w-full h-14 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-violet-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        : <><span>Send Reset Link</span><ArrowRight size={18} /></>}
                                </button>
                            </form>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
};

// ── Main Login Screen ─────────────────────────────────────────────────────────
const LoginScreen = ({ onNavigate, isDarkMode: darkProp, setIsDarkMode: setDarkProp }) => {
    const [_dark, _setDark] = useState(true);
    const isDarkMode = darkProp !== undefined ? darkProp : _dark;
    const setIsDarkMode = setDarkProp !== undefined ? setDarkProp : _setDark;

    const [screen, setScreen] = useState('login'); // 'login' | 'forgot'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPw] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingType, setLoadingType] = useState('');
    const [error, setError] = useState('');

    if (screen === 'forgot') {
        return <ForgotPasswordScreen isDarkMode={isDarkMode} onBack={() => setScreen('login')} />;
    }

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true); setLoadingType('email'); setError('');
        try {
            const result = await signInWithEmail(email, password);
            // Optionally enforce email verification
            // if (!result.user.emailVerified) {
            //     await logOut();
            //     setError('Please verify your email before signing in.');
            //     setIsLoading(false); setLoadingType('');
            // }
        } catch (err) {
            setError(parseError(err.code));
            setIsLoading(false); setLoadingType('');
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true); setLoadingType('google'); setError('');
        try {
            await signInWithGoogle();
        } catch (err) {
            setError(parseError(err.code));
            setIsLoading(false); setLoadingType('');
        }
    };

    const d = isDarkMode;
    const busy = (type) => isLoading && loadingType === type;

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-500 selection:bg-violet-500/30 ${d ? 'bg-[#05070A] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>

            <button onClick={() => setIsDarkMode(!isDarkMode)}
                className={`fixed top-6 right-6 p-3 rounded-2xl border transition-all z-50 ${d ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600 shadow-lg hover:bg-slate-50'}`}>
                {d ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
                <div className={`absolute -top-[10%] -left-[10%] w-[40%] h-[40%] blur-[120px] rounded-full ${d ? 'bg-violet-600/10' : 'bg-violet-600/5'}`} />
                <div className={`absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] blur-[120px] rounded-full ${d ? 'bg-blue-600/10' : 'bg-blue-600/5'}`} />
            </div>

            <div className="w-full max-w-[400px] relative z-10">
                <Brand d={d} />

                <Card d={d}>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold">Welcome back</h2>
                        <p className={`text-sm mt-1 font-medium ${d ? 'text-slate-400' : 'text-slate-500'}`}>Sign in to continue your journey</p>
                    </div>

                    {error && (
                        <div className={`p-4 rounded-2xl border mb-6 ${d ? 'bg-rose-500/10 border-rose-500/25' : 'bg-rose-50 border-rose-200'}`}>
                            <p className={`text-sm font-semibold ${d ? 'text-rose-400' : 'text-rose-600'}`}>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleEmailSignIn} className="space-y-4 mb-6">
                        <div className="relative group">
                            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${d ? 'text-slate-500' : 'text-slate-400'} group-focus-within:text-violet-500`} size={18} />
                            <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required
                                className={`w-full h-12 rounded-xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 border transition-all ${d ? 'bg-white/5 border-white/5 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                        </div>

                        <div className="relative group">
                            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${d ? 'text-slate-500' : 'text-slate-400'} group-focus-within:text-violet-500`} size={18} />
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
                                className={`w-full h-12 rounded-xl pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 border transition-all ${d ? 'bg-white/5 border-white/5 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                            <button type="button" onClick={() => setShowPw(!showPassword)}
                                className={`absolute right-4 top-1/2 -translate-y-1/2 ${d ? 'text-slate-500 hover:text-violet-400' : 'text-slate-400 hover:text-violet-500'}`}>
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Forgot password link */}
                        <div className="flex justify-end">
                            <button type="button" onClick={() => setScreen('forgot')}
                                className={`text-xs font-bold transition-colors ${d ? 'text-slate-500 hover:text-violet-400' : 'text-slate-400 hover:text-violet-600'}`}>
                                Forgot password?
                            </button>
                        </div>

                        <button type="submit" disabled={isLoading || !email || !password}
                            className="w-full h-14 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-violet-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                            {busy('email') ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                : <><span>Sign In</span><ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center"><div className={`w-full border-t ${d ? 'border-white/5' : 'border-slate-100'}`} /></div>
                        <span className={`relative px-4 text-[10px] font-black uppercase tracking-[0.2em] ${d ? 'bg-[#0D1117] text-slate-600' : 'bg-white text-slate-400'}`}>Or continue with</span>
                    </div>

                    <button type="button" onClick={handleGoogleSignIn} disabled={isLoading}
                        className={`w-full h-14 rounded-2xl border flex items-center justify-center gap-3 text-sm font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${d ? 'bg-white/[0.08] border-white/10 hover:bg-white/[0.12] text-white' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'}`}>
                        {busy('google') ? <div className="w-5 h-5 border-2 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
                            : <><GoogleIcon /><span>Continue with Google</span></>}
                    </button>
                </Card>

                <div className="mt-8 text-center">
                    <button onClick={() => onNavigate?.('signup')} className="group flex flex-col items-center gap-1 mx-auto">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${d ? 'text-slate-600' : 'text-slate-400'}`}>No account yet?</span>
                        <span className="flex items-center gap-1 text-sm font-bold text-violet-500 group-hover:text-violet-400 transition-colors">
                            Create one <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;