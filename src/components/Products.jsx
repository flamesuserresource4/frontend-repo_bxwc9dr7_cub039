import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

function Rating({ value }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className={`${i < full ? 'text-[#C6FF00]' : 'text-white/20'} fill-current`} />
      ))}
      {half && <div className="text-white/60 text-xs ml-1">{value.toFixed(1)}</div>}
    </div>
  )
}

export default function Products() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      try {
        const res = await fetch(`${base}/api/products`)
        if (res.ok) {
          const data = await res.json()
          setItems(data)
        }
      } catch (e) {
        // ignore in demo if backend unavailable
      }
    }
    load()
  }, [])

  const skeletons = Array.from({ length: 3 })

  return (
    <section id="shop" className="relative bg-[#0A0A0C] text-white py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold">Quantum Paddles</h2>
            <p className="text-white/60 mt-2">Minimal silhouettes, maximal performance.</p>
          </div>
          <a href="#" className="text-[#C6FF00] hover:opacity-80">View all</a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(items.length ? items : skeletons).map((item, idx) => (
            <div key={idx} className="group relative rounded-2xl bg-white/5 border border-white/10 p-4 overflow-hidden backdrop-blur-xl">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#C6FF00]/10 to-[#00E5FF]/10" />
              <div className="relative aspect-[4/5] rounded-xl bg-gradient-to-br from-black to-black/40 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 translate-y-4 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="mx-auto h-full w-full max-w-[240px]">
                    <div className="h-full w-full rounded-xl bg-gradient-to-br from-[#C6FF00] to-[#00E5FF] opacity-80 blur-2xl scale-110" />
                  </div>
                </div>
                <img src={item?.image || `https://images.unsplash.com/photo-1599050751795-5cda3a2a7f7b`} alt="Paddle" className="relative z-10 h-3/4 w-auto object-contain drop-shadow-[0_20px_40px_rgba(198,255,0,0.35)] group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{item?.title || 'Prototype Paddle'}</h3>
                  <div className="mt-1 text-white/60 text-sm">{item?.colorway || 'Neon Edge'}</div>
                  <div className="mt-2"><Rating value={item?.rating || 4.8} /></div>
                </div>
                <div className="text-right">
                  <div className="text-[#C6FF00] font-semibold">${item?.price || 229}</div>
                  <button className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs">
                    Quick view
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}