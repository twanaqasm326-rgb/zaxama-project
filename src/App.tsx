import { ShowroomProvider } from './context/ShowroomContext'
import { ShoppingBoxProvider } from './context/ShoppingBoxContext'
import { AtmosphericBackground } from './components/layout/AtmosphericBackground'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/showroom/HeroSection'
import { ProductCatalog } from './components/showroom/ProductCatalog'
import { ProductModal } from './components/showroom/ProductModal'
import { ShoppingBoxDrawer } from './components/shopping-box/ShoppingBoxDrawer'
import { SelectionReviewModal } from './components/shopping-box/SelectionReviewModal'
import { FloatingSelectionButton } from './components/shopping-box/FloatingSelectionButton'

export default function App() {
  return (
    <ShowroomProvider>
      <ShoppingBoxProvider>
        <div className="min-h-screen relative flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
          {/* Living Atmospheric Canvas: Moving Light Orbs, Noise Grain & Subtle Grid */}
          <AtmosphericBackground />

          {/* Main Showroom Sections */}
          <main className="flex-1 w-full relative z-10">
            {/* Section 1: Business Intro & Logo Stage */}
            <HeroSection />

            {/* Section 2: Permanent Products Collection & Selection Gallery */}
            <ProductCatalog />
          </main>

          {/* Atelier Footer with Logo, Short Summary, Email & WhatsApp */}
          <Footer />

          {/* Discreet Floating Selection Box Trigger */}
          <FloatingSelectionButton />

          {/* Interactive Product Inspection Popup */}
          <ProductModal />

          {/* Curated Selection Box Drawer */}
          <ShoppingBoxDrawer />

          {/* Specification PDF Generation & Export Modal */}
          <SelectionReviewModal />
        </div>
      </ShoppingBoxProvider>
    </ShowroomProvider>
  )
}
