import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Trophy, Calendar, Play } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const PlayerPage = () => {
  const { slug } = useParams()
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/players/${slug}`)
        const data = await res.json()
        setPlayer(data)
      } catch(e){ console.error(e) }
    }
    load()
  }, [slug])

  if(!player) return <div className="min-h-screen grid place-items-center" style={{background:'#0A0A0C'}}><p className="text-white/60">Loading…</p></div>

  return (
    <div className="min-h-screen" style={{background:'#0A0A0C'}}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white"><ChevronLeft size={16}/> Back</Link>
          <div className="text-white/60">Rank #{player.ranking} • DUPR {player.dupr?.toFixed(1)}</div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img src={player.portrait} alt={player.name} className="w-full rounded-2xl border border-white/10" />
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-white/80">
              <div className="text-white text-xl font-semibold">{player.name} {player.flag}</div>
              <p className="mt-2 text-sm">{player.bio}</p>
            </div>
          </div>
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-3">Achievements</h3>
              <div className="space-y-3">
                {player.achievements?.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <Calendar size={16} className="text-white/40"/>
                    <span className="text-white font-semibold">{a.year}</span>
                    <span>— {a.title}</span>
                    {a.event && <span className="text-white/50">({a.event})</span>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-3">Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {player.highlights?.map((h, i) => (
                  <a key={i} href={h} target="_blank" className="group relative rounded-xl overflow-hidden border border-white/10">
                    <div className="aspect-video bg-white/5 grid place-items-center text-white/60">
                      <Play className="group-hover:text-white transition-colors"/>
                    </div>
                    <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-white/30"/>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerPage