import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  FileCode, 
  Clock, 
  RotateCcw, 
  AlertCircle, 
  Film, 
  Image as ImageIcon, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ListTree,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download
} from 'lucide-react';

const getAttachmentUrl = (filePath) => {
  if (!filePath) return '';
  if (filePath.startsWith('http://') || filePath.startsWith('https://') || filePath.startsWith('data:')) {
    return filePath;
  }
  if (filePath.startsWith('/attachments/')) {
    return filePath;
  }
  const match = filePath.match(/test-results[/\\](.+)$/);
  if (match) {
    return `/test-results/${match[1].replace(/\\/g, '/')}`;
  }
  return filePath.startsWith('/') ? filePath : `/${filePath}`;
};

function ScreenshotCard({ att, idx, onZoom }) {
  const [loadStatus, setLoadStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [currentUrl, setCurrentUrl] = useState(() => getAttachmentUrl(att.path));
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  // Sync state if att changes
  useEffect(() => {
    setLoadStatus('loading');
    setCurrentUrl(getAttachmentUrl(att.path));
    setFallbackAttempted(false);
  }, [att.path]);

  const formatLabel = (att.contentType?.split('/')[1] || att.fileName?.split('.').pop() || 'PNG').toUpperCase();

  const handleImageError = () => {
    if (!fallbackAttempted) {
      setFallbackAttempted(true);
      const baseName = att.fileName || (att.path ? att.path.split(/[/\\]/).pop() : '');
      if (baseName && !currentUrl.includes('/attachments/screenshots/')) {
        setCurrentUrl(`/attachments/screenshots/${baseName}`);
        return;
      }
    }
    setLoadStatus('error');
  };

  const handleRetry = (e) => {
    e.stopPropagation();
    setLoadStatus('loading');
    setFallbackAttempted(false);
    const base = getAttachmentUrl(att.path);
    setCurrentUrl(`${base}${base.includes('?') ? '&' : '?'}t=${Date.now()}`);
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-brand-500/50 transition-all duration-200 dark:bg-slate-900/90 dark:border-slate-800">
      {/* Card Header info */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between dark:bg-slate-900/60 dark:border-slate-800/80">
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-brand-500/10 dark:text-brand-400">
            <ImageIcon className="w-4 h-4" />
          </span>
          <div className="truncate">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block truncate">
              {att.name && att.name !== 'screenshot' ? att.name : 'Tangkapan Layar Pengujian'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono block truncate dark:text-slate-400">
              {att.fileName}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold dark:bg-slate-800 dark:text-slate-300">
            {formatLabel}
          </span>
          {loadStatus === 'loaded' && (
            <button
              type="button"
              onClick={() => onZoom(idx, currentUrl)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:text-brand-400 dark:bg-brand-500/10 dark:hover:bg-brand-500/20 transition cursor-pointer"
              title="Perbesar Layar Penuh"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="hidden sm:inline text-[11px]">Perbesar</span>
            </button>
          )}
        </div>
      </div>

      {/* Inline image preview container */}
      <div 
        onClick={() => {
          if (loadStatus === 'loaded') onZoom(idx, currentUrl);
        }}
        className={`relative ${loadStatus === 'loaded' ? 'cursor-zoom-in' : ''} bg-slate-100/70 dark:bg-slate-950/70 flex items-center justify-center overflow-hidden min-h-[160px] p-2`}
      >
        {loadStatus === 'loading' && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3 animate-pulse text-slate-400 dark:text-slate-500">
            <ImageIcon className="w-8 h-8 opacity-40 animate-pulse" />
            <span className="text-xs font-medium">Memuat tangkapan layar...</span>
          </div>
        )}

        {loadStatus === 'error' && (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Tangkapan Layar Tidak Tersedia
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mt-0.5">
                File gambar tidak ditemukan di server atau telah dibersihkan oleh siklus uji Playwright.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Coba Muat Ulang</span>
            </button>
          </div>
        )}

        <img 
          src={currentUrl} 
          alt={att.name || 'Pratinjau Screenshot'} 
          loading="lazy"
          onLoad={() => setLoadStatus('loaded')}
          onError={handleImageError}
          className={`w-full h-auto max-h-[460px] object-contain rounded-lg transition-all duration-300 select-none ${
            loadStatus === 'loaded' ? 'block group-hover:scale-[1.01]' : 'hidden'
          }`}
        />

        {loadStatus === 'loaded' && (
          <div className="absolute inset-0 bg-slate-900/25 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/85 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xl backdrop-blur-md">
              <ZoomIn className="w-4 h-4 text-brand-400" />
              <span>Klik untuk perbesar layar penuh</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const isImageAttachment = (att) => {
  if (!att) return false;
  if (att.contentType && att.contentType.includes('image')) return true;
  if (att.name && att.name.toLowerCase().includes('screenshot')) return true;
  const fileName = att.fileName || att.path || '';
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(fileName);
};

const isVideoAttachment = (att) => {
  if (!att) return false;
  if (att.contentType && att.contentType.includes('video')) return true;
  if (att.name && att.name.toLowerCase().includes('video')) return true;
  const fileName = att.fileName || att.path || '';
  return /\.(webm|mp4|ogg)$/i.test(fileName);
};

export default function TestDetailDrawer({ test, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const [copied, setCopied] = useState(false);
  const [zoomImageIndex, setZoomImageIndex] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);

  const attachments = test?.attachments || [];
  const imageAttachments = attachments.filter(isImageAttachment);
  const videoAttachments = attachments.filter(isVideoAttachment);
  const otherAttachments = attachments.filter(att => !isImageAttachment(att) && !isVideoAttachment(att));

  // Keyboard navigation & Escape handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (zoomImageIndex !== null) {
          setZoomImageIndex(null);
          setZoomScale(1);
        } else {
          onClose();
        }
      } else if (zoomImageIndex !== null) {
        if (e.key === 'ArrowLeft' && zoomImageIndex > 0) {
          setZoomImageIndex(prev => prev - 1);
          setZoomScale(1);
        } else if (e.key === 'ArrowRight' && zoomImageIndex < imageAttachments.length - 1) {
          setZoomImageIndex(prev => prev + 1);
          setZoomScale(1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, zoomImageIndex, imageAttachments.length]);

  if (!test) return null;

  const copyErrorStack = () => {
    if (!test.errors || test.errors.length === 0) return;
    const fullError = test.errors.map(e => `${e.message}\n${e.stack}`).join('\n\n');
    navigator.clipboard.writeText(fullError);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'passed':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30">PASSED</span>;
      case 'failed':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30 animate-pulse">FAILED</span>;
      case 'flaky':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30">FLAKY</span>;
      case 'skipped':
      case 'untested':
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/30">UNTESTED</span>;
    }
  };

  const currZoomImage = zoomImageIndex !== null ? imageAttachments[zoomImageIndex] : null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-2xl bg-white border-l border-slate-200 shadow-2xl flex flex-col dark:bg-[#0f172a] dark:border-slate-800">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between dark:border-slate-800 dark:bg-slate-900/60">
              <div className="space-y-2 pr-6">
                <div className="flex items-center space-x-2">
                  {getStatusBadge(test.status)}
                  {test.tcCode && (
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30">
                      {test.tcCode}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-mono dark:text-slate-400">{test.projectName}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug dark:text-white">
                  {test.scenarioName}
                </h2>
                {test.suiteTitle && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{test.suiteTitle}</p>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-1.5">
                {onPrev && (
                  <button
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 disabled:opacity-30 transition dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                    title="Test Sebelumnya"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                {onNext && (
                  <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 disabled:opacity-30 transition dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                    title="Test Selanjutnya"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition ml-2 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                  title="Tutup (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs dark:bg-slate-900/60 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">
                    <Clock className="w-3 h-3 text-indigo-600 dark:text-brand-400" /> Durasi
                  </span>
                  <span className="text-sm font-bold font-mono text-slate-900 mt-1 block dark:text-white">
                    {test.durationH}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs dark:bg-slate-900/60 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">
                    <RotateCcw className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Percobaan
                  </span>
                  <span className="text-sm font-bold font-mono text-slate-900 mt-1 block dark:text-white">
                    {test.retryCount > 0 ? `${test.retryCount} Retries` : 'First Run'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs dark:bg-slate-900/60 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Modul</span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block truncate dark:text-white">
                    {test.module}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs dark:bg-slate-900/60 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Browser</span>
                  <span className="text-sm font-bold font-mono text-emerald-600 mt-1 block dark:text-emerald-400">
                    {test.projectName}
                  </span>
                </div>
              </div>

              {/* Spec File Path */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between shadow-2xs dark:bg-slate-900/80 dark:border-slate-800">
                <div className="flex items-center space-x-2 overflow-hidden">
                  <FileCode className="w-4 h-4 text-indigo-600 dark:text-brand-400 shrink-0" />
                  <span className="font-mono text-slate-700 font-semibold truncate dark:text-slate-300">{test.filePath}</span>
                  {test.line && (
                    <span className="text-slate-400 font-mono font-bold">:{test.line}</span>
                  )}
                </div>
              </div>

              {/* Error Message & Stack Trace (if failed/flaky) */}
              {test.errors && test.errors.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5 dark:text-rose-400">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Error Details & Stack Trace</span>
                    </h3>
                    <button
                      onClick={copyErrorStack}
                      className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-transparent"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Tersalin!' : 'Salin Error'}</span>
                    </button>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-rose-200 bg-rose-50/50 dark:border-rose-900/60 dark:bg-[#070b14]">
                    {test.errors.map((err, idx) => (
                      <div key={idx} className="p-4 space-y-3 font-mono text-xs">
                        {err.message && (
                          <div className="p-3 rounded-lg bg-white border border-rose-200 text-rose-700 font-semibold whitespace-pre-wrap leading-relaxed shadow-2xs dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-300">
                            {err.message}
                          </div>
                        )}
                        {err.stack && (
                          <div className="text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-72 p-3 bg-slate-900 rounded-lg">
                            {err.stack}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Test Steps Timeline (if steps recorded) */}
              {test.steps && test.steps.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 dark:text-slate-300">
                    <ListTree className="w-4 h-4 text-indigo-600 dark:text-brand-400" />
                    <span>Alur Langkah Pengujian ({test.steps.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {test.steps.map((st, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs shadow-2xs dark:bg-slate-900/60 dark:border-slate-800/80"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center font-mono text-[10px] font-bold dark:bg-brand-500/10 dark:text-brand-400 dark:border-brand-500/30">
                            {i + 1}
                          </span>
                          <span className="text-slate-800 font-medium dark:text-slate-200">{st.title}</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 font-semibold">
                          {st.duration > 0 ? `${st.duration}ms` : '✓'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LAMPIRAN HASIL */}
              {attachments.length > 0 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 dark:text-slate-300">
                      <Film className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Lampiran Hasil ({attachments.length})</span>
                    </h3>
                    {imageAttachments.length > 0 && (
                      <span className="text-[11px] text-slate-500 font-medium dark:text-slate-400">
                        {imageAttachments.length} tangkapan layar tersedia
                      </span>
                    )}
                  </div>

                  {/* Inline Screenshot Previews */}
                  {imageAttachments.length > 0 && (
                    <div className="space-y-4">
                      {imageAttachments.map((att, idx) => (
                        <ScreenshotCard
                          key={idx}
                          att={att}
                          idx={idx}
                          onZoom={(i) => {
                            setZoomImageIndex(i);
                            setZoomScale(1);
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Video Recordings */}
                  {videoAttachments.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 dark:text-slate-300">
                        <Film className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Rekaman Pengujian Video ({videoAttachments.length})</span>
                      </h4>
                      <div className="space-y-3">
                        {videoAttachments.map((att, idx) => {
                          const url = getAttachmentUrl(att.path);
                          return (
                            <div 
                              key={idx}
                              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs dark:bg-slate-900/90 dark:border-slate-800"
                            >
                              <div className="px-4 py-2 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs dark:bg-slate-900/60 dark:border-slate-800/80">
                                <span className="font-semibold text-slate-900 dark:text-slate-200 truncate">{att.fileName}</span>
                                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold dark:bg-emerald-950/60 dark:text-emerald-400">
                                  VIDEO
                                </span>
                              </div>
                              <div className="p-2 bg-black flex items-center justify-center">
                                <video 
                                  controls 
                                  className="w-full max-h-72 rounded-lg bg-black" 
                                  src={url}
                                >
                                  Browser Anda tidak mendukung tag video.
                                </video>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Other Attachments (Traces, Text, etc.) */}
                  {otherAttachments.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 dark:text-slate-300">
                        <FileCode className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>File Lampiran Lainnya ({otherAttachments.length})</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {otherAttachments.map((att, idx) => {
                          const url = getAttachmentUrl(att.path);
                          return (
                            <a 
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs hover:border-slate-300 hover:bg-slate-100/70 transition shadow-2xs dark:bg-slate-900/60 dark:border-slate-800 dark:hover:bg-slate-800/60"
                            >
                              <div className="flex items-center space-x-2 overflow-hidden">
                                <FileCode className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                <div className="truncate">
                                  <span className="text-slate-900 font-semibold block truncate dark:text-slate-200">
                                    {att.name}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-mono block truncate">
                                    {att.fileName}
                                  </span>
                                </div>
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex items-center justify-between dark:border-slate-800 dark:bg-slate-900/40">
              <span>ID: <code className="text-slate-700 font-mono font-medium dark:text-slate-400">{test.id}</code></span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold shadow-xs transition dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-transparent cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox / Zoom Modal */}
      {zoomImageIndex !== null && currZoomImage && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/92 backdrop-blur-md select-none animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setZoomImageIndex(null);
              setZoomScale(1);
            }
          }}
        >
          {/* Lightbox Top Bar */}
          <div className="p-4 bg-slate-950/85 border-b border-slate-800 flex items-center justify-between shrink-0 text-white z-10 backdrop-blur-sm">
            <div className="flex items-center space-x-3 overflow-hidden pr-4">
              <span className="p-1.5 rounded-lg bg-white/10 text-brand-400">
                <ImageIcon className="w-4 h-4" />
              </span>
              <div className="truncate">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-white truncate">
                    {currZoomImage.name || 'Screenshot Preview'}
                  </span>
                  {imageAttachments.length > 1 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/15 text-slate-300 font-semibold">
                      {zoomImageIndex + 1} / {imageAttachments.length}
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-slate-400 truncate">
                  {currZoomImage.fileName}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2 shrink-0">
              {/* Zoom Controls */}
              <div className="flex items-center space-x-1 bg-white/10 rounded-xl p-1 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomScale(prev => Math.max(0.5, Number((prev - 0.25).toFixed(2))));
                  }}
                  disabled={zoomScale <= 0.5}
                  className="p-1.5 rounded-lg hover:bg-white/15 disabled:opacity-30 transition cursor-pointer"
                  title="Perkecil (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomScale(1);
                  }}
                  className="px-2 py-1 font-mono text-xs font-bold text-slate-200 hover:text-white transition cursor-pointer"
                  title="Reset Zoom (100%)"
                >
                  {Math.round(zoomScale * 100)}%
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomScale(prev => Math.min(3, Number((prev + 0.25).toFixed(2))));
                  }}
                  disabled={zoomScale >= 3}
                  className="p-1.5 rounded-lg hover:bg-white/15 disabled:opacity-30 transition cursor-pointer"
                  title="Perbesar (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Download / Open in tab */}
              <a
                href={getAttachmentUrl(currZoomImage.path)}
                download={currZoomImage.fileName}
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 transition cursor-pointer"
                title="Unduh Screenshot"
              >
                <Download className="w-4 h-4" />
              </a>

              <a
                href={getAttachmentUrl(currZoomImage.path)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 transition cursor-pointer"
                title="Buka di Tab Baru"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setZoomImageIndex(null);
                  setZoomScale(1);
                }}
                className="p-2 rounded-xl bg-white/15 hover:bg-rose-600/80 text-white border border-white/10 transition ml-2 cursor-pointer"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image Container */}
          <div 
            className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setZoomImageIndex(null);
                setZoomScale(1);
              }
            }}
          >
            {/* Previous Image Arrow */}
            {imageAttachments.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomImageIndex(prev => (prev > 0 ? prev - 1 : imageAttachments.length - 1));
                  setZoomScale(1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/15 shadow-2xl backdrop-blur-md transition z-20 hover:scale-105 cursor-pointer"
                title="Screenshot Sebelumnya (←)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* The Zoomed Image */}
            <div 
              className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomScale})` }}
            >
              <img
                src={getAttachmentUrl(currZoomImage.path)}
                alt={currZoomImage.name || 'Zoomed Screenshot'}
                onError={(e) => {
                  const base = currZoomImage.fileName || (currZoomImage.path ? currZoomImage.path.split(/[/\\]/).pop() : '');
                  if (base && !e.currentTarget.src.includes('/attachments/screenshots/')) {
                    e.currentTarget.src = `/attachments/screenshots/${base}`;
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomScale(prev => (prev === 1 ? 1.75 : 1));
                }}
                className={`max-w-[92vw] max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10 select-none ${
                  zoomScale === 1 ? 'cursor-zoom-in' : 'cursor-zoom-out'
                }`}
              />
            </div>

            {/* Next Image Arrow */}
            {imageAttachments.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomImageIndex(prev => (prev < imageAttachments.length - 1 ? prev + 1 : 0));
                  setZoomScale(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/15 shadow-2xl backdrop-blur-md transition z-20 hover:scale-105 cursor-pointer"
                title="Screenshot Selanjutnya (→)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar Hints */}
          <div className="py-2.5 px-4 bg-slate-950/85 border-t border-slate-800/80 text-center text-xs text-slate-400 flex items-center justify-center space-x-4 shrink-0 backdrop-blur-sm">
            <span className="hidden sm:inline">💡 Tekan <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-slate-300">ESC</kbd> untuk menutup</span>
            {imageAttachments.length > 1 && (
              <span className="hidden sm:inline">| Navigasi dengan tombol panah <kbd className="px-1 py-0.5 rounded bg-white/10 font-mono text-[10px] text-slate-300">←</kbd> <kbd className="px-1 py-0.5 rounded bg-white/10 font-mono text-[10px] text-slate-300">→</kbd></span>
            )}
            <span>| Klik gambar untuk toggle zoom</span>
          </div>
        </div>
      )}
    </>
  );
}
