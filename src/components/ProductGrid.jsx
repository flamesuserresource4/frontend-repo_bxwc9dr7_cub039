import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Eye } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const ProductCard = ({p}) => {
  return (
    <motion.div whileHover={{y:-6}} className="group relative rounded-2xl p-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
      style={{boxShadow:'0 10px 40px rgba(0,0,0,0.35)'}}>
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
        background:'linear-gradient(145deg, rgba(198,255,0,0.12), rgba(0,229,255,0.12))',
        opacity:0,
        transition:'opacity .3s'
      }}></div>
      <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-white/10 to-white/0 grid place-items-center overflow-hidden">
        <img src={p.image} alt={p.title} className="object-cover h-full w-full mix-blend-screen opacity-90" />
      </div>
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className="text-white font-semibold">{p.title}</h3>
          <div className="flex items-center gap-1 text-white/70 text-sm">
            <Star size={14} className="text-yellow-300" />
            <span>{p.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="text-white font-semibold">${p.price.toFixed(0)}</div>
      </div>
      <button className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-black"
        style={{background:'#C6FF00'}}>Add to Cart</button>
      <button className="absolute top-3 right-3 inline-flex items-center justify-center h-9 w-9 rounded-full bg-black/40 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <Eye size={16} />
      </button>
    </motion.div>
  )
}

const ProductGrid = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="shop" className="relative py-20" style={{background:'#0A0A0C'}}>
      <div className="absolute inset-0" aria-hidden style={{
        background:'radial-gradient(800px 400px at 10% 0%, rgba(198,255,0,0.15), transparent), radial-gradient(900px 500px at 90% 10%, rgba(0,229,255,0.12), transparent)'
      }} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-white text-2xl sm:text-3xl font-bold">Pro Paddles</h2>
          <p className="text-white/60 text-sm">Minimal grid. Maximum performance.</p>
        </div>
        {loading ? (
          <p className="text-white/60">Loading products…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid