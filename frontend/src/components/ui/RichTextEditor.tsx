import { useEffect, useRef, useState, useCallback } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (v: string) => void;
  minHeight?: number;
  placeholder?: string;
}

interface ActiveStates {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  orderedList: boolean;
  unorderedList: boolean;
  justifyLeft: boolean;
  justifyCenter: boolean;
  justifyRight: boolean;
  blockTag: string;
}

const DEFAULT_ACTIVE: ActiveStates = {
  bold: false, italic: false, underline: false, strikethrough: false,
  orderedList: false, unorderedList: false,
  justifyLeft: true, justifyCenter: false, justifyRight: false,
  blockTag: 'p',
};

const RichTextEditor = ({ value, onChange, minHeight = 200, placeholder = 'Write here...' }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const [active, setActive] = useState<ActiveStates>(DEFAULT_ACTIVE);

  // Set initial value on mount only
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll selection state to update toolbar active states
  const updateActiveStates = useCallback(() => {
    try {
      const blockTag = document.queryCommandValue('formatBlock').toLowerCase() || 'p';
      setActive({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikethrough: document.queryCommandState('strikeThrough'),
        orderedList: document.queryCommandState('insertOrderedList'),
        unorderedList: document.queryCommandState('insertUnorderedList'),
        justifyLeft: document.queryCommandState('justifyLeft'),
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyRight: document.queryCommandState('justifyRight'),
        blockTag,
      });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const handleSelectionChange = () => {
      // Only fire if focus is inside our editor
      const sel = document.getSelection();
      if (sel && editor.contains(sel.anchorNode)) updateActiveStates();
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [updateActiveStates]);

  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val ?? undefined);
    if (editorRef.current) onChangeRef.current(editorRef.current.innerHTML);
    setTimeout(updateActiveStates, 0);
  };

  const handleInput = () => {
    if (editorRef.current) onChangeRef.current(editorRef.current.innerHTML);
    setTimeout(updateActiveStates, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b': e.preventDefault(); exec('bold'); break;
        case 'i': e.preventDefault(); exec('italic'); break;
        case 'u': e.preventDefault(); exec('underline'); break;
        case 'z': e.preventDefault(); exec(e.shiftKey ? 'redo' : 'undo'); break;
        case 'y': e.preventDefault(); exec('redo'); break;
      }
    }
  };

  const setBlock = (tag: string) => {
    exec('formatBlock', tag);
  };

  // Toolbar button component
  const Btn = ({
    title, onClick, isActive = false, children, className = ''
  }: {
    title: string; onClick: () => void; isActive?: boolean; children: React.ReactNode; className?: string;
  }) => (
    <button
      type="button"
      title={title}
      onMouseDown={e => { e.preventDefault(); onClick(); }}
      className={`
        px-2 py-1 rounded text-xs font-medium transition-all select-none
        ${isActive
          ? 'bg-devnest-mint text-devnest-dark shadow-sm'
          : 'text-white/80 hover:bg-white/15 hover:text-white'}
        ${className}
      `}
    >
      {children}
    </button>
  );

  const Sep = () => <div className="w-px h-5 bg-white/15 mx-0.5 self-center" />;

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden focus-within:border-devnest-mint/50 transition-colors">
      {/* ── TOOLBAR ── */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-2 bg-[#16162a] border-b border-white/10">

        {/* Block format dropdown */}
        <select
          title="Text style"
          value={active.blockTag || 'p'}
          onChange={e => setBlock(e.target.value)}
          onMouseDown={e => e.stopPropagation()}
          style={{ background: '#1e1e3a', color: '#fff' }}
          className="text-xs rounded px-2 py-1 outline-none cursor-pointer hover:opacity-80 transition mr-1 border border-white/10"
        >
          <option style={{ background: '#1e1e3a', color: '#fff' }} value="p">Normal</option>
          <option style={{ background: '#1e1e3a', color: '#fff' }} value="h1">Heading 1</option>
          <option style={{ background: '#1e1e3a', color: '#fff' }} value="h2">Heading 2</option>
          <option style={{ background: '#1e1e3a', color: '#fff' }} value="h3">Heading 3</option>
          <option style={{ background: '#1e1e3a', color: '#fff' }} value="h4">Heading 4</option>
          <option style={{ background: '#1e1e3a', color: '#fff' }} value="pre">Code Block</option>
          <option style={{ background: '#1e1e3a', color: '#fff' }} value="blockquote">Quote</option>
        </select>

        <Sep />

        {/* Bold / Italic / Underline / Strike */}
        <Btn title="Bold (Ctrl+B)" onClick={() => exec('bold')} isActive={active.bold} className="font-bold w-7">B</Btn>
        <Btn title="Italic (Ctrl+I)" onClick={() => exec('italic')} isActive={active.italic} className="italic w-7">I</Btn>
        <Btn title="Underline (Ctrl+U)" onClick={() => exec('underline')} isActive={active.underline} className="underline w-7">U</Btn>
        <Btn title="Strikethrough" onClick={() => exec('strikeThrough')} isActive={active.strikethrough} className="line-through w-7">S</Btn>

        <Sep />

        {/* Lists */}
        <Btn title="Bullet List" onClick={() => exec('insertUnorderedList')} isActive={active.unorderedList}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="4" cy="6" r="2"/><rect x="8" y="5" width="13" height="2"/><circle cx="4" cy="12" r="2"/><rect x="8" y="11" width="13" height="2"/><circle cx="4" cy="18" r="2"/><rect x="8" y="17" width="13" height="2"/></svg>
        </Btn>
        <Btn title="Numbered List" onClick={() => exec('insertOrderedList')} isActive={active.orderedList}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><text x="1" y="7" fontSize="7" fontWeight="bold">1.</text><rect x="8" y="5" width="13" height="2"/><text x="1" y="13" fontSize="7" fontWeight="bold">2.</text><rect x="8" y="11" width="13" height="2"/><text x="1" y="19" fontSize="7" fontWeight="bold">3.</text><rect x="8" y="17" width="13" height="2"/></svg>
        </Btn>

        <Sep />

        {/* Alignment */}
        <Btn title="Align Left" onClick={() => exec('justifyLeft')} isActive={active.justifyLeft}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="2"/><rect x="2" y="9" width="14" height="2"/><rect x="2" y="14" width="20" height="2"/><rect x="2" y="19" width="12" height="2"/></svg>
        </Btn>
        <Btn title="Align Center" onClick={() => exec('justifyCenter')} isActive={active.justifyCenter}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="2"/><rect x="5" y="9" width="14" height="2"/><rect x="2" y="14" width="20" height="2"/><rect x="6" y="19" width="12" height="2"/></svg>
        </Btn>
        <Btn title="Align Right" onClick={() => exec('justifyRight')} isActive={active.justifyRight}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="2"/><rect x="8" y="9" width="14" height="2"/><rect x="2" y="14" width="20" height="2"/><rect x="10" y="19" width="12" height="2"/></svg>
        </Btn>

        <Sep />

        {/* Indent / Outdent */}
        <Btn title="Indent" onClick={() => exec('indent')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="2"/><polygon points="2,9 8,12 2,15"/><rect x="10" y="11" width="12" height="2"/><rect x="2" y="18" width="20" height="2"/></svg>
        </Btn>
        <Btn title="Outdent" onClick={() => exec('outdent')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="2"/><polygon points="8,9 2,12 8,15"/><rect x="10" y="11" width="12" height="2"/><rect x="2" y="18" width="20" height="2"/></svg>
        </Btn>

        <Sep />

        {/* Undo / Redo */}
        <Btn title="Undo (Ctrl+Z)" onClick={() => exec('undo')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 10h10a6 6 0 010 12H8"/><polyline points="3 10 7 6 3 2 3 10"/></svg>
        </Btn>
        <Btn title="Redo (Ctrl+Y)" onClick={() => exec('redo')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10H11a6 6 0 000 12h5"/><polyline points="21 10 17 6 21 2 21 10"/></svg>
        </Btn>

        <Sep />

        {/* Clear formatting */}
        <Btn title="Clear all formatting" onClick={() => { exec('removeFormat'); setBlock('p'); }} className="text-red-400 hover:!text-white hover:!bg-red-500/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </Btn>
      </div>

      {/* ── EDITOR AREA ── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onClick={updateActiveStates}
        onFocus={updateActiveStates}
        data-placeholder={placeholder}
        className="px-4 py-3 text-white outline-none bg-white/5 leading-relaxed
          [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-white
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-2 [&_h2]:text-white
          [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1 [&_h3]:text-white
          [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-2 [&_h4]:mb-1 [&_h4]:text-white
          [&_p]:my-1 [&_p]:text-white/90
          [&_b]:font-bold [&_strong]:font-bold [&_strong]:text-white [&_b]:text-white
          [&_i]:italic [&_em]:italic
          [&_u]:underline
          [&_s]:line-through [&_strike]:line-through
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2
          [&_li]:my-0.5
          [&_blockquote]:border-l-4 [&_blockquote]:border-devnest-mint [&_blockquote]:pl-4 [&_blockquote]:text-white/70 [&_blockquote]:italic [&_blockquote]:my-3
          [&_pre]:bg-black/40 [&_pre]:text-devnest-mint [&_pre]:px-4 [&_pre]:py-3 [&_pre]:rounded-lg [&_pre]:font-mono [&_pre]:text-sm [&_pre]:my-2
          empty:before:content-[attr(data-placeholder)] empty:before:text-white/25 empty:before:pointer-events-none"
        style={{ minHeight }}
      />

      {/* ── STATUS BAR ── */}
      <div className="flex items-center gap-3 px-3 py-1 bg-[#16162a] border-t border-white/5 text-[10px] text-white/30">
        <span>Ctrl+B Bold &nbsp;·&nbsp; Ctrl+I Italic &nbsp;·&nbsp; Ctrl+U Underline &nbsp;·&nbsp; Ctrl+Z Undo</span>
      </div>
    </div>
  );
};

export default RichTextEditor;
