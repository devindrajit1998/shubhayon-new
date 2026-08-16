import React, { useState, useRef } from 'react';
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
}

export default function ImageKitUploader({
  onUploadSuccess,
  folder = '/shuvayan_gallery',
  label = 'Service Image',
  currentImageUrl,
}: ImageKitUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const activeUrl = uploadedUrl || currentImageUrl;

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

      // 2. Upload via our secure backend API route
      const uploadRes = await fetch('/api/imagekit/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: base64Data,
          fileName: file.name,
          folder: folder,
        }),
      });

      const responseText = await uploadRes.text();
      let uploadData: any = {};
      try {
        uploadData = JSON.parse(responseText);
      } catch {
        throw new Error(`Upload server error (${uploadRes.status}). Please try again.`);
      }

      if (!uploadRes.ok || !uploadData.url) {
        throw new Error(uploadData.error || uploadData.message || 'Image upload failed');
      }

      setUploadedUrl(uploadData.url);
      onUploadSuccess(uploadData.url);
    } catch (err: any) {
      console.error('Upload error:', err);
      setErrorMsg(err.message || 'Upload error occurred');
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

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d99824]" />
          <span>{label}</span>
        </label>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
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

      {/* When Image Is Present: Show High-Quality Preview Card */}
      {activeUrl ? (
        <div className="bg-white border border-[#e5d8c3] rounded-2xl p-3.5 shadow-xs flex flex-col sm:flex-row items-center gap-4 transition-all">
          {/* Thumbnail image */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-900 flex-shrink-0 border border-gray-200 shadow-xs group">
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
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="flex-1 min-w-0 space-y-2 text-left w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                Current Photo
              </span>
              <button
                type="button"
                onClick={copyUrl}
                className="text-[11px] font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            <p className="text-xs font-mono text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-200 truncate">
              {activeUrl}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isUploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span>{isUploading ? 'Uploading...' : 'Replace Photo'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* When No Image is Selected: Clean Modern Dropzone */
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2.5 ${
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
                  or drag and drop your photo here
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
