import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative pt-24" style={{background:'#0A0A0C'}}>
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 opacity-60" style={{
          background: 'radial-gradient(1200px 600px at 20% -10%, rgba(198,255,0,0.25), transparent), radial-gradient(1000px 500px at 80% 0%, rgba(0,229,255,0.2), transparent)'
        }} />
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom, rgba(10,10,12,0), rgba(10,10,12,1))'}} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-8 items-center">
        <div className="py-16">
          <motion.h1 initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.8}}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Pickleball of the Future
          </motion.h1>
          <motion.p initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.1, duration:0.8}}
            className="mt-5 text-white/70 text-lg max-w-xl">
            Pro-grade gear. Minimal design. Ultra performance. Built with next‑gen materials and timeless style.
          </motion.p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#shop" className="group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-black"
              style={{background:'#C6FF00'}}>
              <span className="transform transition-transform group-hover:translate-x-0.5">Shop Paddle</span>
            </a>
            <a href="#community" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:border-white/40 transition-colors backdrop-blur-sm bg-white/5">
              Join Community
            </a>
          </div>
        </div>
        <div className="relative h-[420px] sm:h-[520px] lg:h-[640px] rounded-2xl overflow-hidden ring-1 ring-white/10">
          <Spline scene="https://prod.spline.design/FduaNp3csZktbOi3/scene.splinecode" />
        </div>
      </div>
    </section>
  )
}

export default Hero