export function AIScamSimulator() {
  const backendUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="w-full h-[calc(100vh-64px)]">
      <iframe
        src={backendUrl}
        className="w-full h-full border-none"
        title="AI Scam Simulator"
      />
    </div>
  );
}
