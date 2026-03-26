import React, { useState, useCallback, useRef } from 'react';
import { X, Camera, RefreshCw, Save, Upload, Check, Trash2 } from 'lucide-react';
import Cropper from 'react-easy-crop';

const EditProfileModal = ({ isDarkMode, setIsEditModalOpen, editForm, setEditForm, handleSave }) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const fileInputRef = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result);
        setIsCropping(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL('image/jpeg');
  };

  const handleCropSave = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setEditForm({ ...editForm, avatar: croppedImage, useGeneratedAvatar: false });
      setIsCropping(false);
      setImage(null);
    } catch (e) {
      console.error(e);
    }
  };

  const removeAvatar = () => {
    setEditForm({ ...editForm, avatar: null, useGeneratedAvatar: true });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className={`w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-[3rem] sm:rounded-[3rem] p-8 border shadow-2xl transition-all ${isDarkMode ? 'bg-[#0D1625] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
        
        {isCropping ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black">Crop Photo</h3>
              <button onClick={() => setIsCropping(false)} className="p-2 text-slate-500"><X /></button>
            </div>
            
            <div className="relative w-full h-64 bg-slate-900 rounded-3xl overflow-hidden border border-white/5">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="space-y-4">
              <div className="px-2">
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1 bg-violet-500/20 rounded-lg appearance-none cursor-pointer accent-violet-500"
                />
              </div>
              <button 
                onClick={handleCropSave}
                className="w-full bg-violet-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" /> Apply Crop
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black">Edit Profile</h3>
              <button onClick={() => setIsEditModalOpen(false)} className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-white/5 text-slate-500' : 'hover:bg-slate-100 text-slate-400'}`}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="flex flex-col items-center gap-6">
                <div className="relative group">
                  <div className={`w-32 h-32 rounded-[2.5rem] border-[4px] p-2 transition-transform active:scale-95 ${isDarkMode ? 'bg-slate-900 border-violet-500/30 shadow-violet-900/20 shadow-xl' : 'bg-slate-50 border-violet-500/20 shadow-lg'}`}>
                    {editForm.avatar ? (
                      <img 
                        src={editForm.avatar} 
                        alt="Profile" 
                        className="rounded-[1.8rem] w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={`https://api.dicebear.com/7.x/${editForm.avatarStyle}/svg?seed=${editForm.avatarSeed}`} 
                        alt="Preview" 
                        className={`rounded-[1.8rem] w-full h-full object-cover ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}
                      />
                    )}
                  </div>
                  
                  <div className="absolute -bottom-1 -right-1 flex gap-2">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-10 h-10 rounded-2xl bg-violet-600 border-4 border-[#0D1625] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    {editForm.avatar && (
                      <button 
                        onClick={removeAvatar}
                        className="w-10 h-10 rounded-2xl bg-rose-500 border-4 border-[#0D1625] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={onFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
                
                {!editForm.avatar && (
                  <div className="flex flex-col items-center gap-3 w-full animate-in fade-in duration-500">
                    <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-500/5 border border-slate-500/10">
                      {['avataaars', 'bottts', 'adventurer'].map(style => (
                        <button 
                          key={style}
                          onClick={() => setEditForm({...editForm, avatarStyle: style, useGeneratedAvatar: true})}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editForm.avatarStyle === style && !editForm.avatar ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-500/10'}`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={() => setEditForm({...editForm, avatarSeed: Math.random().toString(36).substring(7), useGeneratedAvatar: true})}
                      className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-colors ${isDarkMode ? 'text-violet-400 hover:bg-violet-400/10' : 'text-violet-600 hover:bg-violet-600/10'}`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Randomize Persona
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest px-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Full Name</label>
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      placeholder="Your name"
                      className={`w-full p-4 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white placeholder:text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest px-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Career Goal</label>
                    <input 
                      type="text" 
                      value={editForm.destination} 
                      onChange={(e) => setEditForm({...editForm, destination: e.target.value})}
                      placeholder="e.g. AI Engineer"
                      className={`w-full p-4 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white placeholder:text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest px-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>Bio</label>
                    <textarea 
                      rows="3"
                      value={editForm.bio} 
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                      className={`w-full p-4 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white placeholder:text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-violet-900/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Save className="w-5 h-5" /> Save Profile
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfileModal;
