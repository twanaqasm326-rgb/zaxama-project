import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { ShowroomProvider } from './context/ShowroomContext'
import { ShoppingBoxProvider } from './context/ShoppingBoxContext'
import { Header } from './components/layout/Header'
import { BackgroundDots } from './components/layout/BackgroundDots'
import { WhatsAppFloatingHelp } from './components/layout/WhatsAppFloatingHelp'
import { ProductCatalog } from './components/showroom/ProductCatalog'
import { ProductModal } from './components/showroom/ProductModal'
import { ShoppingBoxDrawer } from './components/shopping-box/ShoppingBoxDrawer'
import { SelectionReviewModal } from './components/shopping-box/SelectionReviewModal'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ShowroomProvider>
          <ShoppingBoxProvider>
            <div className="min-h-screen relative flex flex-col bg-[#f8f7f4] dark:bg-[#0c1017] text-slate-900 dark:text-slate-100 selection:bg-sky-500/20 selection:text-sky-900 dark:selection:text-white font-sans transition-colors duration-300">
              {/* Ambient Background Dots & Micro-Grid */}
              <BackgroundDots />
              
              {/* 1. Frosted Blur Glass Header Bar */}
              <Header />

              {/* 2. Main Product Showcase & Vitrine Grid */}
              <main className="flex-1 w-full relative z-10 pt-[3.25rem] sm:pt-20">
                <ProductCatalog />
              </main>

              {/* 3. Floating Bottom WhatsApp Help Button */}
              <WhatsAppFloatingHelp />

              {/* 4. Product Quick Inspection & Specs Modal */}
              <ProductModal />

              {/* 5. Curated Shopping Box Popup Modal */}
              <ShoppingBoxDrawer />

              {/* 6. Order Invoice Export Modal */}
              <SelectionReviewModal />
            </div>
          </ShoppingBoxProvider>
        </ShowroomProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
