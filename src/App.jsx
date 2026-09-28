

// export default App
import { useState, useEffect } from 'react'
import './App.css'
import { CATEGORIES, PRODUCTS } from './data/products'
import Navbar from './components/Navbar'
import Categories from './components/Categories'
import ProductList from './components/ProductList'
import Hero from './components/Hero'
import CartModal from './components/CartModal'
import BottomCartBar from './components/BottomCartBar'
import InstallPrompt from './components/InstallPrompt'


const MIN_ORDER_AMOUNT = 100 // Kam se kam order rakam
const FREE_DELIVERY_THRESHOLD = 300 // ₹300 se upar free delivery
const DELIVERY_FEE = 20 // ₹300 se kam par lagne wala delivery charge
function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('gaonmart_cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [search, setSearch] = useState('')

  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')

  const [userAddress, setUserAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  
  const [showCart, setShowCart] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const [notification, setNotification] = useState('')


useEffect(() => {
    localStorage.setItem('gaonmart_cart', JSON.stringify(cart))
  }, [cart])

// 🎙️ Voice Search Logic
  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Aapke browser mein Voice Search support nahi karta!')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'hi-IN' // Hindi + Hinglish dono samjhega
    recognition.start()

    recognition.onstart = () => {
      setNotification('🎙️ Sun raha hoon... Boliye!')
    }

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript
      setSearch(voiceText) // Jo bola, seedhe search box mein chala jayega
      setNotification(`🔍 Searched: "${voiceText}"`)
      setTimeout(() => setNotification(''), 2500)
    }

    recognition.onerror = () => {
      setNotification('Kuch sunai nahi diya, dubara try karein.')
      setTimeout(() => setNotification(''), 2000)
    }
  }

  const [isScanning, setIsScanning] = useState(false)

  // 📷 Parchi Scan karke Auto Cart me daalne ka logic
  const handleParchiScan = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsScanning(true)
    setNotification('📷 Parchi padh raha hoon... thoda ruko!')

    try {
      // 1. Photo ko base64 me badlo
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1]

        // 2. Available products ki list AI ko batao
        const availableItems = PRODUCTS.map(p => p.name).join(', ')

        // 3. Gemini API ko bhejo
        const apiKey = 'H70PaT3Prnb3wuPb2Nptx5jzVeLD8YSlDeRlpFflDGn7d77alHzVxk97Jznj_VRmw132hHvqfOT3BlbkFJ4vF_orBHu3zZrcsuLuxwy_E__1EsK8dhc4TcYDiG9IbgQsGo4RrwkFW10Ss5LcTjsfK8yij_EA' // 👈 Apni key yahan paste karna
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: `Yeh ek grocery parchi/list ki photo hai. Hamari dukan me ye items hain: [${availableItems}]. Is parchi me se match hone wale items ke naam comma se separate karke do, bas items ke naam likhna aur kuch nahi. Jaise: Rice, Fresh Milk` },
                  { inline_data: { mime_type: file.type, data: base64Data } }
                ]
              }]
            })
          }
        )

        const data = await response.json()
        const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

        // 4. Match hone wale products ko Cart me add karo
        let addedCount = 0
        PRODUCTS.forEach(prod => {
          if (textResult.toLowerCase().includes(prod.name.toLowerCase())) {
            addToCart(prod)
            addedCount++
          }
        })

        setIsScanning(false)
        if (addedCount > 0) {
          setNotification(`✅ Parchi se ${addedCount} samaan cart me jud gaye!`)
        } else {
          setNotification('Parchi ka samaan dukan me nahi mila!')
        }
        setTimeout(() => setNotification(''), 3000)
      }
    } catch (err) {
      setIsScanning(false)
      setNotification('Parchi padhne me dikkat aayi!')
      setTimeout(() => setNotification(''), 2500)
    }
  }

  const addToCart = (product) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id)

    if (existingIndex !== -1) {
      const updatedCart = [...cart]
      updatedCart[existingIndex].qty += 1
      setCart(updatedCart)
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }

    // 👉 notification popup ke liye
    setNotification(`✅ ${product.name} cart mein add ho gaya!`)
    setTimeout(() => setNotification(''), 2000) // 2 second baad khud gayab hoga
  }
  

  const updateQuantity = (productId, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          return { ...item, qty: item.qty + change }
        }
        return item
      })
      .filter((item) => item.qty > 0) // Agar quantity 0 ho jaye toh cart se hata do

    setCart(updatedCart)
  }


  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove))
  }


 const sendOrderToWhatsApp = () => {
    if (cart.length === 0) return

    // Naam, phone aur address check karo
    if (!userName.trim() || !userPhone.trim() || !userAddress.trim()) {
      alert('Kripya apna Naam, Mobile Number aur Pata bharein!')
      return
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    if (total < MIN_ORDER_AMOUNT) {
      alert(`Home delivery ke liye kam se kam ₹${MIN_ORDER_AMOUNT} ka order hona zaroori hai!`)
      return
    }

    const deliveryCharge = itemsTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
    const finalGrandTotal = itemsTotal + deliveryCharge

    // 1. Samaan ki saaf list banao
    const itemsSummary = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.name}* (${item.qty} ${item.unit || 'unit'}) = ₹${item.price * item.qty}`
      )
      .join('\n')

    // 2. Dukandar ka number (91 ke sath apna 10 digit number daalo)
    const storeNumber = '917783891504'

    // 3. Poora structure ek hi baar mein taiyar karo
    const message = `🛍️ *NAYA ORDER - VIKASH MART*\n` +
      `--------------------------------\n` +
      `👤 *Grahak:* ${userName.trim()}\n` +
      `📞 *Phone:* ${userPhone.trim()}\n` +
      `📍 *Pata:* ${userAddress.trim()}\n` +
      `💳 *Payment:* ${paymentMethod}\n` +
      `--------------------------------\n` +
      `🛒 *Samaan List:*\n${itemsSummary}\n` +
      `--------------------------------\n` +
      `💰 *Kul Rakam (Total):* ₹${total}\n` +
      `--------------------------------\n` +
      `_Kripya order confirm karke delivery ka samay batayein._`

    const whatsappUrl = `https://wa.me/${storeNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank')

    setCart([]) // Cart khali kar do
    localStorage.removeItem('gaonmart_cart') // Memory se bhi hata do
    setShowCart(false) // Cart popup band kar do
    if (typeof setNotification === 'function') {
      setNotification('🎉 Order WhatsApp par bhej diya gaya hai!')
      setTimeout(() => setNotification(''), 4000)
    }
  }

  const filteredProducts = PRODUCTS.filter((item) => {
    // 1. Search filter
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase().trim())
    
    // 2. Category filter (case-insensitive check)
    const matchesCategory = 
      selectedCategory === 'All' || 
      item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()

    return matchesSearch && matchesCategory
  })

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    return (
    <>
      {/* Toast Notification */}
      {notification && <div className="toast-notification">{notification}</div>}
{/* 👉 PWA Custom Install Banner */}
      <InstallPrompt />
     <Navbar
        search={search}
        setSearch={setSearch}
        isScanning={isScanning}
        startVoiceSearch={startVoiceSearch}
        handleParchiScan={handleParchiScan}
        cartCount={cart.length}
        onOpenCart={() => setShowCart(!showCart)}
      />
     {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQty={typeof updateQuantity !== 'undefined' ? updateQuantity : updateQty}
          cartTotal={cartTotal}
          minOrder={typeof MIN_ORDER_AMOUNT !== 'undefined' ? MIN_ORDER_AMOUNT : 100}
          userName={userName}
          setUserName={setUserName}
          userPhone={userPhone}
          setUserPhone={setUserPhone}
          userAddress={userAddress}
          setUserAddress={setUserAddress}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onCheckout={sendOrderToWhatsApp}
        />
      )}
     {/* 👉 Clean Hero Component */}
      <Hero onShopNow={() => setSelectedCategory('All')} />

    <Categories
  categories={CATEGORIES}
  selectedCategory={selectedCategory}
  onSelectCategory={setSelectedCategory}
/>
      
      

        {/* Products Grid */}
      <ProductList products={filteredProducts} onAddToCart={addToCart} />
     {/* 👉 Mobile Floating Cart Bar */}
     <BottomCartBar
        cart={cart}
        cartTotal={cartTotal}
        onOpenCart={() => setShowCart(true)}
      />
    </>
  )
}

export default App