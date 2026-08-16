import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, CheckCircle2, AlertCircle, Sparkles, Copy, X, Loader2 } from 'lucide-react';

interface ImageKitUploaderProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageKitUploader({
  onUploadSuccess,
  folder = '/shuvayan_gallery',
  label = 'Upload Image to ImageKit CDN',
}: ImageKitUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg(null);
    setUploadedUrl(null);

    try {
      // 1. Fetch authentication parameters from our Next.js API
      const authRes = await fetch('/api/imagekit/auth');
      const authData = await authRes.json();

      if (authData.configured) {
        // 2. Real ImageKit Upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('publicKey', authData.publicKey);
        formData.append('signature', authData.signature);
        formData.append('expire', authData.expire);
        formData.append('token', authData.token);
        formData.append('folder', folder);

        const uploadRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (uploadData.url) {
          setUploadedUrl(uploadData.url);
          onUploadSuccess(uploadData.url);
        } else {
          throw new Error(uploadData.message || 'ImageKit upload failed');
        }
      } else {
        // 3. Fallback: Convert to Base64 Data URL for instant live preview without credentials
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setUploadedUrl(result);
          onUploadSuccess(result);
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setErrorMsg(err.message || 'Upload error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const copyUrl = () => {
    if (uploadedUrl) {
      navigator.clipboard.writeText(uploadedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#fcfaf7] border border-[#e5d8c3] rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d99824]" />
          <span>{label}</span>
        </label>
        <span className="text-[10px] font-semibold text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
          ImageKit CDN
        </span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Upload Drag & Click Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
          isUploading
            ? 'bg-amber-50/50 border-[#d99824]'
            : 'border-[#dfd1bd] hover:border-[#c8102e] hover:bg-white bg-white/60'
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <Loader2 className="w-6 h-6 text-[#c8102e] animate-spin" />
            <span className="text-xs font-semibold text-gray-700">Uploading to ImageKit CDN...</span>
          </div>
        ) : (
          <>
            <div className="w-9 h-9 rounded-full bg-[#fdecd2] text-[#8c4604] flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium text-gray-700">
              <span className="text-[#c8102e] font-bold">Click to select an image</span> or drag &amp; drop
            </p>
            <p className="text-[10px] text-gray-400">PNG, JPG, WEBP up to 10MB</p>
          </>
        )}
      </div>

      {/* Uploaded Success Preview Bar */}
      {uploadedUrl && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div className="truncate">
              <p className="font-bold text-emerald-900">Upload Ready &amp; Applied</p>
              <p className="text-[10px] text-emerald-700 truncate">{uploadedUrl}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={copyUrl}
            className="flex-shrink-0 inline-flex items-center gap-1 bg-white hover:bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-300 font-semibold text-[11px]"
          >
            <Copy className="w-3 h-3" />
            <span>{copied ? 'Copied' : 'Copy URL'}</span>
          </button>
        </div>
      )}

      {/* Error Banner */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2.5 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
