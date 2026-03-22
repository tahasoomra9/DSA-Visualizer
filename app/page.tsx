export default function Home() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-3xl w-full">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--primary)" }}>
            DSA Visualizer
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
            Testing Arrays
          </p>
          
          <div 
            className="p-8 rounded-lg border"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--primary)" }}>
              Array Structure
            </h2>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className="w-12 h-12 flex items-center justify-center rounded border-2 font-semibold transition-all hover:scale-110"
                  style={{
                    backgroundColor: "var(--background)",
                    color: "var(--primary)",
                    borderColor: "var(--accent)",
                  }}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
