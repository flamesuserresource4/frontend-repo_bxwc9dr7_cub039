import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Flag, Sparkles, Play } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const PlayerCard = ({player}) => {
  return (
    <motion.div whileHover={{y:-6}} className="group relative rounded-2xl p-4 bg-white/5 backdrop-blur-md border border-white/10">
      <div className="flex items-center gap-4">
        <img src={player.portrait} alt={player.name} className="h-20 w-20 object-cover rounded-xl" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-white font-semibold">{player.name}</h4>
            <span className="text-white/60 text-sm">{player.flag}</span>
          </div>
          <div className="text-white/70 text-sm">Rank #{player.ranking} • DUPR {player.dupr.toFixed(1)}</div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px] text-white/70">
            <div className="rounded-md bg-white/5 p-1.5"><span className="block text-white text-sm font-semibold">{Intl.NumberFormat().format(player.socials?.instagram || 0)}</span>IG</div>
            <div className="rounded-md bg-white/5 p-1.5"><span className="block text-white text-sm font-semibold">{Intl.NumberFormat().format(player.socials?.tiktok || 0)}</span>TT</div>
            <div className="rounded-md bg-white/5 p-1.5"><span className="block text-white text-sm font-semibold">{Intl.NumberFormat().format(player.socials?.youtube || 0)}</span>YT</div>
          </div>
        </div>
        <a href={`/player/${player.slug}`} className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 text-white bg-black/40 hover:border-white/30">
          <Sparkles size={16} />
        </a>
      </div>
    </motion.div>
  )
}

const Players = () => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/players`)
        const data = await res.json()
        setPlayers(data)
      } catch(e){ console.error(e) }
    }
    load()
  }, [])

  return (
    <section id="players" className="relative py-20" style={{background:'#0A0A0C'}}>
      <div className="absolute inset-0" aria-hidden style={{
        background:'radial-gradient(800px 400px at 80% 0%, rgba(198,255,0,0.12), transparent)'
      }} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-white text-2xl sm:text-3xl font-bold">Top Players</h2>
          <p className="text-white/60 text-sm">Elite athletes. Futuristic energy.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map(pl => <PlayerCard key={pl.id} player={pl} />)}
        </div>
      </div>
    </section>
  )
}

export default Players