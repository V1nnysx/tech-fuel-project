import './GlobalStyles.css'
import './App.css'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Content } from './components/Content/Content'

function App() {
  return (
    <div className='main-container'>
      <div>
        <Header />
      </div>
      <div className='main-content'>
        <Content />
        <Footer />
      </div>
    </div>
  )
}

export default App
