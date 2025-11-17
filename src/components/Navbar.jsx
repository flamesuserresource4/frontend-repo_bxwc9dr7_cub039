import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-md bg-black/40 border-b border-white/10' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md" style={{
              background: 'linear-gradient(135deg,#C6FF00, #00E5FF)'
            }} />
            <span className="text-white text-sm tracking-widest font-semibold">FUTURE PICKLE</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a href="#shop" className="hover:text-white transition-colors">Shop</a>
            <a href="#players" className="hover:text-white transition-colors">Players</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md hover:bg-white/5 text-white"><Search size={18} /></button>
            <button className="p-2 rounded-md hover:bg-white/5 text-white"><User size={18} /></button>
            <button className="relative p-2 rounded-md hover:bg-white/5 text-white">
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] grid place-items-center rounded-full text-black" style={{background:'#C6FF00'}}>2</span>
            </button>
            <button className="md:hidden p-2 text-white" onClick={()=>setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
          </div>
        </div>
        {open && (
          <div className="md:hidden pb-4 space-y-2 text-white/80">
            <a href="#shop" className="block px-2 py-2 rounded hover:bg-white/5">Shop</a>
            <a href="#players" className="block px-2 py-2 rounded hover:bg-white/5">Players</a>
            <a href="#community" className="block px-2 py-2 rounded hover:bg-white/5">Community</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar