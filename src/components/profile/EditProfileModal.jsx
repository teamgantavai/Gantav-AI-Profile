import React, { useState, useCallback, useRef } from 'react';
import { X, RefreshCw, Save, Upload, Check, Trash2, MessageSquare, Briefcase, Code, AtSign, Camera } from 'lucide-react';
import Cropper from 'react-easy-crop';

const EditProfileModal = ({
  isDarkMode,
  setIsEditModalOpen,
  editForm,
  setEditForm,
  handleSave,
  isSaving,
  isFirstSetup = false,
}) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const onCropComplete = useCallback((_, cap) => setCroppedAreaPixels(cap), []);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => { setImage(reader.result); setIsCropping(true); setError(''); });
    reader.addEventListener('error', () => setError('Failed to read file.'));
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const createImage = (url) => new Promise((res, rej) => {
    const img = new Image();
    img.addEventListener('load', () => res(img));
    img.addEventListener('error', rej);
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
  });

  const getCroppedImg = async (src, px) => {
    const img = await createImage(src);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    canvas.width = px.width;
    canvas.height = px.height;
    ctx.drawImage(img, px.x, px.y, px.width, px.height, 0, 0, px.width, px.height);
    return canvas.toDataURL('image/jpeg', 0.85);
  };

  const handleCropSave = async () => {
    try {
      if (!croppedAreaPixels) return;
      const cropped = await getCroppedImg(image, croppedAreaPixels);
      setEditForm({ ...editForm, avatar: cropped, useGeneratedAvatar: false });
      setIsCropping(false);
      setImage(null);
    } catch {
      setError('Failed to crop image.');
    }
  };

  const removeAvatar = () => setEditForm({ ...editForm, avatar: null, useGeneratedAvatar: true });

  // ── Validation + save ─────────────────────────────────────────────────────
  const onSaveClick = () => {
    if (!editForm.name?.trim()) {
      setError('Full name is required.'); return;
    }
    if (!editForm.username?.trim()) {
      setError('Username is required.'); return;
    }
    if (editForm.username.length < 3) {
      setError('Username must be at least 3 characters.'); return;
    }
    if (!editForm.destination?.trim()) {
      setError('Career goal is required.'); return;
    }
    if (!editForm.location?.trim()) {
      setError('Location is required.'); return;
    }
    setError('');
    handleSave();
  };

  const d = isDarkMode;
  const inputCls = `w-full p-4 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all ${d ? 'bg-slate-900/50 border-white/10 text-white placeholder:text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`;
  const labelCls = `text-[10px] font-black uppercase tracking-widest px-1 ${d ? 'text-slate-500' : 'text-slate-600'}`;

  const avatarSrc = editForm?.avatar
    || `https://api.dicebear.com/7.x/${editForm?.avatarStyle || 'avataaars'}/svg?seed=${editForm?.avatarSeed || 'seed'}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className={`w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-[3rem] sm:rounded-[3rem] border shadow-2xl transition-all ${d ? 'bg-[#0D1625] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>

        {/* Cropper view */}
        {isCropping ? (
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black">Crop Photo</h3>
              <button onClick={() => { setIsCropping(false); setImage(null); }}
                className={`p-2 rounded-xl ${d ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}>
                <X size={20} />
              </button>
            </div>
            <div className="relative w-full h-72 bg-slate-900 rounded-3xl overflow-hidden border border-white/5">
              <Cropper image={image} crop={crop} zoom={zoom} aspect={1}
                onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} />
            </div>
            <div className="space-y-4">
              <input type="range" value={zoom} min={1} max={3} step={0.1}
                onChange={e => setZoom(Number(e.target.value))}
                className="w-full h-1 bg-violet-500/20 rounded-lg appearance-none cursor-pointer accent-violet-500" />
              <button onClick={handleCropSave}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all">
                <Check size={18} /> Apply Crop
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-black">
                  {isFirstSetup ? 'Set Up Your Profile' : 'Edit Profile'}
                </h3>
                {isFirstSetup && (
                  <p className={`text-xs mt-1 font-medium ${d ? 'text-slate-400' : 'text-slate-500'}`}>
                    Complete your profile to get started
                  </p>
                )}
              </div>
              {!isFirstSetup && (
                <button onClick={() => setIsEditModalOpen(false)}
                  className={`p-2 rounded-xl transition-colors ${d ? 'hover:bg-white/10 text-slate-500' : 'hover:bg-slate-100 text-slate-400'}`}>
                  <X size={22} />
                </button>
              )}
            </div>

            <div className="space-y-7">
              {/* Avatar picker */}
              <div className="flex flex-col items-center gap-5">
                <div className="relative">
                  <div className={`w-28 h-28 rounded-[2rem] border-[4px] p-1.5 ${d ? 'bg-slate-900 border-violet-500/30 shadow-xl' : 'bg-slate-50 border-violet-500/20 shadow-lg'}`}>
                    <img src={avatarSrc} alt="Avatar"
                      className={`rounded-[1.5rem] w-full h-full object-cover ${d ? 'bg-slate-800' : 'bg-slate-200'}`} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex gap-1.5">
                    <button onClick={() => fileInputRef.current?.click()}
                      className={`w-9 h-9 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-lg hover:bg-violet-500 transition-all hover:scale-110 border-2 ${d ? 'border-[#0D1625]' : 'border-white'}`}>
                      <Upload size={15} />
                    </button>
                    {editForm?.avatar && (
                      <button onClick={removeAvatar}
                        className={`w-9 h-9 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-lg hover:bg-rose-400 transition-all hover:scale-110 border-2 ${d ? 'border-[#0D1625]' : 'border-white'}`}>
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
                </div>

                {!editForm?.avatar && (
                  <div className="flex flex-col items-center gap-3 w-full">
                    <div className={`flex gap-1.5 p-1.5 rounded-2xl ${d ? 'bg-white/5 border border-white/5' : 'bg-slate-100 border border-slate-200'}`}>
                      {['avataaars', 'bottts', 'adventurer'].map(style => (
                        <button key={style}
                          onClick={() => setEditForm({ ...editForm, avatarStyle: style })}
                          className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${editForm?.avatarStyle === style
                            ? 'bg-violet-600 text-white shadow-md'
                            : d ? 'text-slate-500 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-200'}`}>
                          {style}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setEditForm({ ...editForm, avatarSeed: Math.random().toString(36).substring(7) })}
                      className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-colors ${d ? 'text-violet-400 hover:bg-violet-400/10' : 'text-violet-600 hover:bg-violet-50'}`}>
                      <RefreshCw size={13} /> Randomize
                    </button>
                  </div>
                )}
              </div>

              {/* Form fields */}
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className={labelCls}>Full Name <span className="text-rose-500">*</span></label>
                  <input type="text" value={editForm?.name || ''} placeholder="Your full name"
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })} className={inputCls} />
                </div>

                {/* Username — now required */}
                <div className="space-y-2">
                  <label className={labelCls}>Username <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold ${d ? 'text-slate-500' : 'text-slate-400'}`}>@</span>
                    <input type="text" value={editForm?.username || ''} placeholder="yourhandle"
                      onChange={e => setEditForm({ ...editForm, username: e.target.value.replace(/[^a-z0-9_.]/g, '').toLowerCase() })}
                      className={`${inputCls} pl-9`} />
                  </div>
                  <p className={`text-[10px] px-1 ${d ? 'text-slate-600' : 'text-slate-400'}`}>Lowercase letters, numbers, underscores only</p>
                </div>

                {/* Career Goal */}
                <div className="space-y-2">
                  <label className={labelCls}>Career Goal <span className="text-rose-500">*</span></label>
                  <input type="text" value={editForm?.destination || ''} placeholder="e.g. Senior AI Engineer at Google"
                    onChange={e => setEditForm({ ...editForm, destination: e.target.value })} className={inputCls} />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className={labelCls}>Location <span className="text-rose-500">*</span></label>
                  <input type="text" value={editForm?.location || ''} placeholder="e.g. New Delhi, IN"
                    onChange={e => setEditForm({ ...editForm, location: e.target.value })} className={inputCls} />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className={labelCls}>Bio</label>
                  <textarea rows={3} value={editForm?.bio || ''} placeholder="Tell us about yourself..."
                    onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                    className={`${inputCls} resize-none`} />
                </div>

                {/* Social Links */}
                <div className="pt-2 space-y-4">
                  <h4 className={`text-[10px] font-black uppercase tracking-widest ${d ? 'text-slate-400' : 'text-slate-500'}`}>Social Links</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'linkedin', label: 'LinkedIn', prefix: 'linkedin.com/in/', placeholder: 'username', icon: Briefcase },
                      { key: 'github', label: 'GitHub', prefix: 'github.com/', placeholder: 'username', icon: Code },
                      { key: 'x', label: 'X (Twitter)', prefix: 'x.com/', placeholder: 'handle', icon: AtSign },
                      { key: 'discord', label: 'Discord', prefix: '@', placeholder: 'username', icon: MessageSquare },
                      { key: 'instagram', label: 'Instagram', prefix: 'instagram.com/', placeholder: 'username', icon: Camera },
                    ].map((item) => (
                      <div key={item.key} className="space-y-1.5">
                        <label className={`text-[9px] font-black uppercase tracking-widest px-1 ${d ? 'text-slate-600' : 'text-slate-400'}`}>{item.label}</label>
                        <div className={`flex items-center rounded-2xl border overflow-hidden focus-within:ring-2 focus-within:ring-violet-500 transition-all ${d ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                          <div className={`pl-4 flex items-center gap-1.5 pr-2 text-[10px] font-black opacity-40 select-none shrink-0 ${d ? 'text-white' : 'text-slate-900'}`}>
                            <item.icon size={12} />
                            <span>{item.prefix}</span>
                          </div>
                          <input type="text"
                            value={editForm?.socials?.[item.key] || ''}
                            onChange={e => setEditForm({ ...editForm, socials: { ...editForm.socials, [item.key]: e.target.value } })}
                            placeholder={item.placeholder}
                            className={`w-full p-3 bg-transparent text-xs font-bold focus:outline-none ${d ? 'text-white placeholder:text-slate-700' : 'text-slate-900 placeholder:text-slate-300'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Error banner */}
              {error && (
                <div className={`p-3 rounded-xl border text-[10px] font-black uppercase tracking-widest text-center ${d ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                  {error}
                </div>
              )}

              {/* Save button */}
              <button
                type="button"
                onClick={onSaveClick}
                disabled={isSaving}
                className={`w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-violet-900/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${isSaving ? 'opacity-80 cursor-wait' : 'hover:shadow-violet-900/50 hover:opacity-95'}`}
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw size={16} className="animate-spin" /> Saving…
                  </div>
                ) : (
                  <>
                    <Save size={18} />
                    {isFirstSetup ? 'Save & Get Started' : 'Save Profile'}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfileModal;