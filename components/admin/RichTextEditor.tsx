import React, { useRef, useEffect, useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Unlink,
  Undo,
  Redo,
  Sparkles,
  Code,
  Eye,
  Minus,
  CheckCircle2,
  PlusCircle,
  FileCode,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Type your content here...',
  minHeight = '360px',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlSource, setHtmlSource] = useState(value || '');

  // Sync value from props only if not internal edit
  useEffect(() => {
    setHtmlSource(value || '');
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const handleVisualInput = () => {
    if (editorRef.current) {
      const currentHtml = editorRef.current.innerHTML;
      isInternalChange.current = true;
      setHtmlSource(currentHtml);
      onChange(currentHtml);
    }
  };

  const handleHtmlSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setHtmlSource(newHtml);
    isInternalChange.current = true;
    onChange(newHtml);
    if (editorRef.current) {
      editorRef.current.innerHTML = newHtml;
    }
  };

  const toggleHtmlMode = () => {
    if (!isHtmlMode) {
      // Switching to HTML source code view
      if (editorRef.current) {
        setHtmlSource(editorRef.current.innerHTML);
      }
      setIsHtmlMode(true);
    } else {
      // Switching back to Visual WYSIWYG view
      setIsHtmlMode(false);
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = htmlSource;
        }
      }, 0);
    }
  };

  const execCmd = (command: string, value: string | undefined = undefined) => {
    if (isHtmlMode) return;
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      handleVisualInput();
    }
  };

  const setHeading = (tag: string) => {
    if (isHtmlMode) return;
    document.execCommand('formatBlock', false, tag);
    if (editorRef.current) {
      editorRef.current.focus();
      handleVisualInput();
    }
  };

  const insertLink = () => {
    if (isHtmlMode) return;
    const url = prompt('Enter the link URL (e.g. https://... or tel: / mailto:):');
    if (url) {
      execCmd('createLink', url);
    }
  };

  const insertCustomHtml = () => {
    const rawHtml = prompt('Paste your Raw HTML snippet here:');
    if (rawHtml) {
      if (isHtmlMode) {
        const updated = htmlSource + '\n' + rawHtml;
        setHtmlSource(updated);
        onChange(updated);
      } else {
        execCmd('insertHTML', rawHtml);
      }
    }
  };

  const insertCustomBox = (type: 'info' | 'highlight' | 'warning') => {
    let boxHtml = '';
    if (type === 'info') {
      boxHtml = `<div style="background-color: #fff9f2; border-left: 4px solid #c8102e; padding: 14px 18px; border-radius: 8px; margin: 16px 0; color: #4b5563;">
  <strong style="color: #74161f; font-size: 15px; display: block; margin-bottom: 4px;">Important Service Notice:</strong>
  <p style="margin: 0; color: #6b7280; font-size: 13px;">All reservations, date lock-ins, and orders are governed by the policy terms outlined below.</p>
</div><p><br/></p>`;
    } else if (type === 'highlight') {
      boxHtml = `<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; margin: 16px 0;">
  <h4 style="color: #0f172a; margin-top: 0; margin-bottom: 6px; font-weight: 600;">Key Policy Milestone</h4>
  <p style="margin: 0; color: #475569; font-size: 13px;">Description of key milestone, hygiene standard, or policy guarantee.</p>
</div><p><br/></p>`;
    } else if (type === 'warning') {
      boxHtml = `<div style="background-color: #fff1f2; border: 1px solid #fecdd3; border-left: 4px solid #e11d48; padding: 14px 18px; border-radius: 8px; margin: 16px 0; color: #9f1239;">
  <strong style="color: #9f1239; font-size: 15px; display: block; margin-bottom: 4px;">Cancellation Terms:</strong>
  <p style="margin: 0; color: #881337; font-size: 13px;">Strict 45-day prior notice required for full deposit rollover without penalties.</p>
</div><p><br/></p>`;
    }

    if (isHtmlMode) {
      const updated = htmlSource + '\n' + boxHtml;
      setHtmlSource(updated);
      onChange(updated);
    } else {
      execCmd('insertHTML', boxHtml);
    }
  };

  return (
    <div className="w-full border border-[#d8c5b0] rounded-2xl overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-[#c8102e] focus-within:border-transparent transition-all">
      {/* CKEditor-Style Rich Toolbar */}
      <div className="bg-[#fcfaf7] border-b border-[#e8dfd3] p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-2 text-gray-700 select-none">
        <div className="flex flex-wrap items-center gap-1">
          {/* HTML Source Toggle (CKEditor Style) */}
          <div className="pr-1.5 border-r border-[#e0d3c1]">
            <button
              type="button"
              onClick={toggleHtmlMode}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isHtmlMode
                  ? 'bg-[#c8102e] text-white shadow-sm'
                  : 'bg-white hover:bg-gray-100 text-gray-800 border border-[#d8c5b0]'
              }`}
              title={isHtmlMode ? 'Switch to Visual Editor' : 'Switch to HTML Code View'}
            >
              {isHtmlMode ? <Eye className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5 text-[#c8102e]" />}
              <span>{isHtmlMode ? 'Visual Mode' : '<> HTML Source'}</span>
            </button>
          </div>

          {/* Undo / Redo */}
          <div className="flex items-center space-x-0.5 pr-1.5 border-r border-[#e0d3c1]">
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('undo')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-600 hover:text-gray-900 disabled:opacity-30 transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('redo')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-600 hover:text-gray-900 disabled:opacity-30 transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>

          {/* Headings */}
          <div className="flex items-center space-x-0.5 px-1.5 border-r border-[#e0d3c1]">
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => setHeading('<h1>')}
              className="px-2 py-1 rounded-lg hover:bg-white hover:shadow-2xs text-xs font-bold text-gray-700 hover:text-[#c8102e] disabled:opacity-30 transition-colors"
              title="Heading 1"
            >
              H1
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => setHeading('<h2>')}
              className="px-2 py-1 rounded-lg hover:bg-white hover:shadow-2xs text-xs font-bold text-gray-700 hover:text-[#c8102e] disabled:opacity-30 transition-colors"
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => setHeading('<h3>')}
              className="px-2 py-1 rounded-lg hover:bg-white hover:shadow-2xs text-xs font-bold text-gray-700 hover:text-[#c8102e] disabled:opacity-30 transition-colors"
              title="Heading 3"
            >
              H3
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => setHeading('<p>')}
              className="px-2 py-1 rounded-lg hover:bg-white hover:shadow-2xs text-xs font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-30 transition-colors"
              title="Paragraph Text"
            >
              P
            </button>
          </div>

          {/* Basic Formatting */}
          <div className="flex items-center space-x-0.5 px-1.5 border-r border-[#e0d3c1]">
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('bold')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-[#c8102e] disabled:opacity-30 transition-colors"
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('italic')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-[#c8102e] disabled:opacity-30 transition-colors"
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('underline')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-[#c8102e] disabled:opacity-30 transition-colors"
              title="Underline (Ctrl+U)"
            >
              <Underline className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('strikeThrough')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-gray-900 disabled:opacity-30 transition-colors"
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </button>
          </div>

          {/* Lists & Quotes */}
          <div className="flex items-center space-x-0.5 px-1.5 border-r border-[#e0d3c1]">
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('insertUnorderedList')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-[#c8102e] disabled:opacity-30 transition-colors"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('insertOrderedList')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-[#c8102e] disabled:opacity-30 transition-colors"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => setHeading('<blockquote>')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-[#c8102e] disabled:opacity-30 transition-colors"
              title="Quote Block"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('insertHorizontalRule')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-gray-900 disabled:opacity-30 transition-colors"
              title="Horizontal Divider"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center space-x-0.5 px-1.5 border-r border-[#e0d3c1]">
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('justifyLeft')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-gray-900 disabled:opacity-30 transition-colors"
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('justifyCenter')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-gray-900 disabled:opacity-30 transition-colors"
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('justifyRight')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-gray-900 disabled:opacity-30 transition-colors"
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>

          {/* Links & Clear */}
          <div className="flex items-center space-x-0.5 px-1.5 border-r border-[#e0d3c1]">
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={insertLink}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-[#c8102e] disabled:opacity-30 transition-colors"
              title="Insert Link"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('unlink')}
              className="p-1.5 rounded-lg hover:bg-white hover:shadow-2xs text-gray-700 hover:text-gray-900 disabled:opacity-30 transition-colors"
              title="Remove Link"
            >
              <Unlink className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isHtmlMode}
              onClick={() => execCmd('removeFormat')}
              className="px-2 py-1 rounded-lg hover:bg-white hover:shadow-2xs text-[11px] font-bold text-gray-600 hover:text-red-700 disabled:opacity-30 transition-colors"
              title="Clear Formatting"
            >
              Clear
            </button>
          </div>

          {/* Insert Raw HTML Button */}
          <div className="px-1">
            <button
              type="button"
              onClick={insertCustomHtml}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 transition-colors"
              title="Paste raw HTML snippet"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>+ Insert HTML</span>
            </button>
          </div>
        </div>

        {/* Pre-styled Policy Callout Widgets */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => insertCustomBox('info')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200/80 transition-colors"
            title="Insert Styled Policy Box"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>+ Policy Box</span>
          </button>
          <button
            type="button"
            onClick={() => insertCustomBox('warning')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-900 text-xs font-semibold border border-red-200/80 transition-colors"
            title="Insert Notice Alert"
          >
            <span>+ Notice Alert</span>
          </button>
        </div>
      </div>

      {/* Editor Body: Toggle between HTML Source Code Area & WYSIWYG Visual Canvas */}
      {isHtmlMode ? (
        <div className="relative">
          <div className="bg-gray-900 text-gray-300 text-[11px] px-4 py-2 border-b border-gray-800 flex items-center justify-between font-mono">
            <span>HTML Source Code Editor Mode — Paste or edit raw HTML tags directly</span>
            <span className="text-emerald-400 font-semibold">● Raw HTML Active</span>
          </div>
          <textarea
            value={htmlSource}
            onChange={handleHtmlSourceChange}
            placeholder="Paste your raw HTML & inline CSS here..."
            style={{ minHeight }}
            className="w-full p-5 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs sm:text-[13px] leading-relaxed focus:outline-none resize-y selection:bg-[#c8102e] selection:text-white"
          />
        </div>
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleVisualInput}
          onBlur={handleVisualInput}
          style={{ minHeight }}
          data-placeholder={placeholder}
          className="prose max-w-none p-5 sm:p-7 focus:outline-none text-gray-800 text-sm sm:text-base leading-relaxed overflow-y-auto selection:bg-[#c8102e] selection:text-white"
        />
      )}
    </div>
  );
}
