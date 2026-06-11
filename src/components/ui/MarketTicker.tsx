"use client";

const MARKET_DATA = [
  { name: "NIFTY 50", price: "23,516.10", change: "+0.82%", up: true },
  { name: "BANK NIFTY", price: "51,148.75", change: "+1.12%", up: true },
  { name: "SENSEX", price: "77,301.14", change: "+0.76%", up: true },
  { name: "NIFTY IT", price: "38,924.50", change: "-0.34%", up: false },
  { name: "NIFTY FIN", price: "24,689.30", change: "+0.91%", up: true },
  { name: "NIFTY 50", price: "23,516.10", change: "+0.82%", up: true },
  { name: "BANK NIFTY", price: "51,148.75", change: "+1.12%", up: true },
  { name: "SENSEX", price: "77,301.14", change: "+0.76%", up: true },
  { name: "NIFTY IT", price: "38,924.50", change: "-0.34%", up: false },
  { name: "NIFTY FIN", price: "24,689.30", change: "+0.91%", up: true },
];

export function MarketTicker() {
  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-8 bg-[#0a0a0a] border-b border-white/5 overflow-hidden">
      {/* Live indicator */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">
          Live
        </span>
      </div>

      {/* Ticker scroll */}
      <div className="ticker-scroll flex items-center h-full pl-16">
        <div className="ticker-track flex items-center gap-8 whitespace-nowrap">
          {MARKET_DATA.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-text-muted text-xs font-medium">
                {item.name}
              </span>
              <span className="text-text-primary text-xs font-semibold">
                {item.price}
              </span>
              <span
                className={`text-xs font-bold ${
                  item.up ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="ticker-track flex items-center gap-8 whitespace-nowrap ml-8" aria-hidden="true">
          {MARKET_DATA.map((item, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-2">
              <span className="text-text-muted text-xs font-medium">
                {item.name}
              </span>
              <span className="text-text-primary text-xs font-semibold">
                {item.price}
              </span>
              <span
                className={`text-xs font-bold ${
                  item.up ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
