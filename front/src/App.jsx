import './GlobalStyles.css'
import './App.css'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Content } from './components/Content/Content'

function App() {
  return (
    <div className="full-section">
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default App
