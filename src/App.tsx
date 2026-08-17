import { ShowroomProvider } from './context/ShowroomContext'
import { ShoppingBoxProvider } from './context/ShoppingBoxContext'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/showroom/HeroSection'
import { SignatureMonolith } from './components/showroom/SignatureMonolith'
import { FeaturedSpotlight } from './components/showroom/FeaturedSpotlight'
import { ProductCatalog } from './components/showroom/ProductCatalog'
import { BrandStory } from './components/showroom/BrandStory'
import { ProductModal } from './components/showroom/ProductModal'
import { ShoppingBoxDrawer } from './components/shopping-box/ShoppingBoxDrawer'
import { SelectionReviewModal } from './components/shopping-box/SelectionReviewModal'

export default function App() {
  return (
    <ShowroomProvider>
      <ShoppingBoxProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
          
          {/* Sticky Accessible Header with Live Selection Pill */}
          <Header />

          {/* Core Showcase Flow: Immersive Editorial Exhibition */}
          <main className="flex-1 w-full">
            {/* 1. First Impression: Brand Hero & Atmospheric Light Canvas */}
            <HeroSection />

            {/* 2. Deep Monolith Chamber: Signature Architectural Centerpiece */}
            <SignatureMonolith />

            {/* 3. Curated Dialogue: Linen Chamber Asymmetric Spotlight */}
            <FeaturedSpotlight />

            {/* 4. Permanent Collection: Archive Transition & Discovery */}
            <ProductCatalog />

            {/* 5. Heritage & Materiality: Atelier Provenance */}
            <BrandStory />
          </main>

          {/* Footer & Atelier Contact */}
          <Footer />

          {/* Context-Preserving Product Inspection Modal */}
          <ProductModal />

          {/* Dedicated Showroom Selection Box Drawer */}
          <ShoppingBoxDrawer />

          {/* Client Review & Architectural PDF Generation Modal */}
          <SelectionReviewModal />
        </div>
      </ShoppingBoxProvider>
    </ShowroomProvider>
  )
}
