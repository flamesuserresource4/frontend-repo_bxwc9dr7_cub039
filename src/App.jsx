import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Players from './components/Players'

function App() {
  return (
    <div className="min-h-screen" style={{background:'#0A0A0C'}}>
      <Navbar />
      <Hero />
      <ProductGrid />
      <Players />
      <footer className="border-t border-white/10 py-10 text-center text-white/50" style={{background:'#0A0A0C'}}>
        <p>© {new Date().getFullYear()} Future Pickle. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App