export function IframeDemo({ url, title }: { url: string, title: string }) {
  return (
    <div className="w-full h-full flex flex-col bg-slate-900">
      <div className="h-10 bg-slate-800 flex items-center px-4 border-b border-white/10 shrink-0">
        <div className="flex gap-2 items-center text-slate-400 text-sm">
          <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center">i</div>
          <span className="truncate">{url}</span>
        </div>
      </div>
      <iframe 
        src={url} 
        title={title}
        className="w-full flex-1 border-0 bg-white"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
