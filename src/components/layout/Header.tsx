import React from 'react'
import { ShoppingBag } from 'lucide-react'
import { BrandLogo } from '../ui/BrandLogo'
import { useShoppingBox } from '../../context/ShoppingBoxContext'
import { useShowroom } from '../../context/ShowroomContext'
import { BRAND_CONFIG } from '../../data/brand'

export const Header: React.FC = () => {
  const { setIsOpen: setIsShoppingBoxOpen, totalCount: totalSelectedCount } = useShoppingBox()
  const { setSelectedCategory, setSearchQuery } = useShowroom()

  const handleLogoClick = () => {
    setSelectedCategory('all')
    setSearchQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleWhatsAppChat = () => {
    const message = encodeURIComponent(
      `Hello ${BRAND_CONFIG.name}! I would like to inquire about your luxury home decor collections.`
    )
    // Direct WhatsApp chat link
    const phone = BRAND_CONFIG.contact.phone || '07517447522'
    const formattedPhone = phone.startsWith('0') ? '964' + phone.slice(1) : phone.replace(/[^0-9]/g, '')
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank')
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c1017]/95 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-200 shadow-lg">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between h-20 sm:h-24">
        
        {/* Left: Brand Logo & Brand Name */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
          aria-label="Go to home"
        >
          <BrandLogo size="md" showText={true} />
        </button>

        {/* Right Actions: WhatsApp Link & Shopping Box */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* WhatsApp Direct Chat Button */}
          <button
            onClick={handleWhatsAppChat}
            className="inline-flex items-center gap-2 sm:gap-2.5 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-400 hover:text-emerald-300 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold border border-emerald-500/40 hover:border-emerald-400/60 shadow-sm transition-all duration-200 cursor-pointer group"
            title="Chat with us on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 fill-emerald-400 group-hover:scale-110 transition-transform shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span className="tracking-wide">WhatsApp</span>
          </button>

          {/* Shopping Box Button */}
          <button
            onClick={() => setIsShoppingBoxOpen(true)}
            className="inline-flex items-center gap-2 sm:gap-2.5 bg-[#141a26] hover:bg-[#1c2436] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold border border-slate-700/80 hover:border-sky-500/50 shadow-sm transition-all duration-200 cursor-pointer group"
            aria-label={`Open shopping box with ${totalSelectedCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-sky-400 group-hover:scale-110 transition-transform" />
              {totalSelectedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              )}
            </div>
            <span className="font-medium tracking-wide">Shopping Box</span>
            {totalSelectedCount > 0 && (
              <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-sky-500 text-white shadow-xs">
                {totalSelectedCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  )
}



