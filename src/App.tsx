import { ShowroomProvider } from './context/ShowroomContext'
import { ShoppingBoxProvider } from './context/ShoppingBoxContext'
import { Header } from './components/layout/Header'
import { ProductCatalog } from './components/showroom/ProductCatalog'
import { ProductModal } from './components/showroom/ProductModal'
import { ShoppingBoxDrawer } from './components/shopping-box/ShoppingBoxDrawer'
import { SelectionReviewModal } from './components/shopping-box/SelectionReviewModal'

export default function App() {
  return (
    <ShowroomProvider>
      <ShoppingBoxProvider>
        <div className="min-h-screen relative flex flex-col bg-[#0c1017] text-slate-100 selection:bg-sky-500/20 selection:text-white font-sans">
          
          {/* 1. Header Bar with Logo, WhatsApp & Shopping Box */}
          <Header />

          {/* 2. Main Product Showcase & Vitrine Grid */}
          <main className="flex-1 w-full relative z-10">
            <ProductCatalog />
          </main>

          {/* 3. Product Quick Inspection & Specs Modal */}
          <ProductModal />

          {/* 4. Curated Shopping Box Popup Modal */}
          <ShoppingBoxDrawer />

          {/* 5. Specification PDF Export Modal */}
          <SelectionReviewModal />
        </div>
      </ShoppingBoxProvider>
    </ShowroomProvider>
  )
}

