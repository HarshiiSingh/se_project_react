import { useState } from 'react'
import './App.css'
import Header from '../Header/Header.jsx'
import Main from '../Main/Main.jsx'
import Footer from '../Footer/Footer.jsx'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'
import ItemModal from '../ItemModal/ItemModal.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <div className="page__content">
        <Header />
        <Main />
        <Footer />
      </div>
    
  )
}

export default App;
