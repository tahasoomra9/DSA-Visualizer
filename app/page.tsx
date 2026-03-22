import {ArrayStep} from "../examples/linearSearch"
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
            className="p-8 rounded-xl border-2"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--primary)" }}>
              Array Structure
            </h2>
            <div className="flex gap-2 flex-wrap">
              {ArrayStep.array.map((num, index) => {
                const isActive = ArrayStep.activeIndices.includes(index);

                return (
                  <div
                    key={`${num}-${index}`}
                    className="w-12 h-12 flex items-center justify-center rounded-xl border-2 font-semibold transition-all hover:scale-110"
                    style={{
                      borderColor: isActive ? "var(--primary)" : "var(--border)",
                      color: "var(--primary)",
                    }}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
