import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  RefreshCw,
  Loader2,
  ExternalLink,
  ImageIcon,
} from 'lucide-react';

interface ImageKitUploaderProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
  label?: string;
  currentImageUrl?: string;
  onClear?: () => void;
  aspect?: 'square' | 'banner' | 'auto';
}

export default function ImageKitUploader({
  onUploadSuccess,
  folder = '/shuvayan_gallery',
  label = 'Service Image',
  currentImageUrl,
  onClear,
  aspect = 'auto',
}: ImageKitUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync with external reset
  useEffect(() => {
    if (!currentImageUrl) {
      setUploadedUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [currentImageUrl]);

  const activeUrl = currentImageUrl ? (uploadedUrl || currentImageUrl) : uploadedUrl;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg(null);

    try {
      // 1. Read file as Base64 string
      const reader = new FileReader();
      
      const fileDataPromise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      const base64Data = await fileDataPromise;

      // 2. Upload via backend API route
      const uploadRes = await fetch('/api/imagekit/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: base64Data,
          fileName: file.name,
          folder: folder,
        }),
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData?.error || `Upload failed with status ${uploadRes.status}`);
      }

      if (!uploadData?.url) {
        throw new Error('ImageKit did not return a valid URL. Please retry.');
      }

      setUploadedUrl(uploadData.url);
      onUploadSuccess(uploadData.url);
    } catch (err: any) {
      console.error('Image upload error:', err);
      setErrorMsg(err?.message || 'Could not upload image. Please check your ImageKit configuration and retry.');
    } finally {
      setIsUploading(false);
    }
  };

  const copyUrl = () => {
    if (activeUrl) {
      navigator.clipboard.writeText(activeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isBannerMode = aspect === 'banner';

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5 truncate">
          <Sparkles className="w-3.5 h-3.5 text-[#d99824] flex-shrink-0" />
          <span className="truncate">{label}</span>
        </label>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 flex-shrink-0">
          <CheckCircle2 className="w-3 h-3" />
          <span>Cloud Storage</span>
        </span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* When Image Is Present */}
      {activeUrl ? (
        isBannerMode ? (
          /* Wide Panoramic Banner Preview */
          <div className="bg-white border border-[#e5d8c3] rounded-3xl p-4 shadow-xs space-y-3 transition-all">
            <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-gray-950 border border-gray-200 shadow-md group">
              <Image
                src={activeUrl}
                alt="Banner background preview"
                fill
                className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4 sm:p-5">
                <div className="text-left text-white max-w-lg">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/30 text-[#d99824] inline-block mb-1.5">
                    Live Banner Preview
                  </span>
                  <p className="text-xs font-mono text-gray-300 truncate bg-black/40 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    {activeUrl}
                  </p>
                </div>

                <a
                  href={activeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-white/90 hover:bg-white text-gray-900 rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-1 text-xs font-bold"
                  title="View original image"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">View Full</span>
                </a>
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold py-2 px-5 rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  <span>{isUploading ? 'Uploading Banner...' : 'Replace Banner Image'}</span>
                </button>

                <button
                  type="button"
                  onClick={copyUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUploadedUrl(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                  onUploadSuccess('');
                  if (onClear) onClear();
                }}
                className="inline-flex items-center gap-1 text-gray-500 hover:text-red-600 hover:bg-red-50 text-xs font-semibold py-2 px-4 rounded-xl border border-gray-200 transition-colors cursor-pointer"
              >
                Clear Image
              </button>
            </div>
          </div>
        ) : (
          /* Standard / Compact Card Preview */
          <div className="bg-white border border-[#e5d8c3] rounded-2xl p-3.5 shadow-xs space-y-3 transition-all">
            <div className="flex items-center gap-3">
              {/* Thumbnail image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-900 flex-shrink-0 border border-gray-200 shadow-xs group">
                <Image
                  src={activeUrl}
                  alt="Active media preview"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={activeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-white/90 rounded-full text-gray-800 hover:scale-110 transition-transform"
                    title="View full image"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Path info and link copy */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Active Asset
                  </span>
                  <button
                    type="button"
                    onClick={copyUrl}
                    className="text-[10px] font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2.5 py-0.5 rounded-md transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[11px] font-mono text-gray-500 bg-[#faf7f2] px-2 py-1 rounded border border-[#ecdcc8] truncate">
                  {activeUrl}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center justify-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isUploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span>{isUploading ? 'Uploading...' : 'Replace Photo'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUploadedUrl(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                  onUploadSuccess('');
                  if (onClear) onClear();
                }}
                className="inline-flex items-center justify-center gap-1 text-gray-500 hover:text-red-600 hover:bg-red-50 text-xs font-semibold py-2 px-3.5 rounded-xl border border-gray-200 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        )
      ) : (
        /* When No Image is Selected: Clean Modern Dropzone */
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl ${
            isBannerMode ? 'p-10' : 'p-6'
          } text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2.5 ${
            isUploading
              ? 'bg-amber-50/60 border-[#d99824]'
              : 'border-[#d8cbba] hover:border-[#c8102e] hover:bg-[#fff9f8] bg-[#fbf9f6]'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <Loader2 className="w-7 h-7 text-[#c8102e] animate-spin" />
              <span className="text-xs font-bold text-gray-800">
                Optimizing &amp; Uploading photo...
              </span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-[#fdecd2] text-[#8c4604] flex items-center justify-center shadow-xs">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">
                  <span className="text-[#c8102e] underline decoration-1 underline-offset-2">
                    Click to upload
                  </span>{' '}
                  or drag and drop your {isBannerMode ? 'banner background' : 'photo'} here
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  High resolution JPG, PNG, WEBP (Max 10MB)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
