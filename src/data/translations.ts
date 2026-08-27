export type Language = 'en' | 'ar' | 'ku' | 'tr'

export interface LanguageOption {
  code: Language
  shortCode: string
  label: string
  nativeName: string
  direction: 'ltr' | 'rtl'
  flag: string
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    shortCode: 'EN',
    label: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇬🇧',
  },
  {
    code: 'ar',
    shortCode: 'AR',
    label: 'Arabic',
    nativeName: 'العربية',
    direction: 'ltr',
    flag: '🇮🇶',
  },
  {
    code: 'ku',
    shortCode: 'KU',
    label: 'Kurdish',
    nativeName: 'کوردی',
    direction: 'ltr',
    flag: '☀️',
  },
  {
    code: 'tr',
    shortCode: 'TR',
    label: 'Turkish',
    nativeName: 'Türkçe',
    direction: 'ltr',
    flag: '🇹🇷',
  },
]

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Header
    'brand.name': 'FAKHAMA DECOR',
    'brand.tagline': 'Luxury Interior & Architectural Showroom',
    'header.shoppingBox': 'Shopping Box',
    'header.themeToggle': 'Switch theme mode',
    'header.language': 'Language',
    'header.selectLanguage': 'Select Language',

    // Product Card
    'card.add': 'ADD',
    'card.decrease': 'Decrease quantity',
    'card.increase': 'Increase quantity',
    'card.removeFromBox': 'Remove from Box',
    'card.inStock': 'In Stock',
    'card.newArrival': 'New Arrival',
    'card.featured': 'Featured',
    'card.onlyLeft': 'Only {count} left',

    // Product Modal
    'modal.specifications': 'Specifications',
    'modal.cancelSelection': 'CANCEL SELECTION',
    'modal.addToShoppingBox': 'ADD TO SHOPPING BOX',
    'modal.previousAngle': 'Previous angle',
    'modal.nextAngle': 'Next angle',
    'modal.immediateDispatch': 'Immediate Dispatch',

    // Shopping Box Drawer
    'drawer.title': 'Shopping Box',
    'drawer.pieceSelected': 'piece selected',
    'drawer.piecesSelected': 'pieces selected',
    'drawer.clearAll': 'Clear All',
    'drawer.removeItem': 'Remove item',
    'drawer.emptyTitle': 'Your Shopping Box is Empty',
    'drawer.emptySubtitle': 'Click ADD on any piece to start curating your selection.',
    'drawer.totalInDinar': 'Total in Dinar:',
    'drawer.sendInvoiceSheet': 'Send Invoice Sheet',

    // Selection Review / Invoice Modal
    'review.backToShoppingBox': 'Back to Shopping Box',
    'review.title': 'Customer & Order Details for Invoice',
    'review.subtitle': 'Please enter your details to generate your official invoice and enable direct WhatsApp sending.',
    'review.fullName': 'Full Name',
    'review.namePlaceholder': 'e.g. Ahmed Ali',
    'review.phone': 'WhatsApp / Phone Number',
    'review.phonePlaceholder': 'e.g. 0750 123 4567',
    'review.phoneMinDigits': '(Min 10 digits)',
    'review.cityAddress': 'City / Address (Optional)',
    'review.addressPlaceholder': 'e.g. Baghdad, Mansour',
    'review.specialNotes': 'Special Notes / Custom Requirements (Optional)',
    'review.notesPlaceholder': 'e.g. Preferred delivery time or custom finishes',
    'review.productOrdered': 'Product Ordered',
    'review.productsOrdered': 'Products Ordered',
    'review.readyToSend': 'Ready to send in Iraqi Dinar',
    'review.totalInDinar': 'Total in Dinar',
    'review.generating': 'Generating Invoice...',
    'review.generateAndReady': 'Generate & Ready Invoice',
    'review.docReadyTitle': 'Invoice Document Ready',
    'review.directWhatsAppConfigured': 'Direct WhatsApp delivery configured for:',
    'review.downloadAndOpen': 'Download & Open Invoice',
    'review.sendToWhatsApp': 'Send Invoice to WhatsApp',
    'review.returnToShowroom': '← Return to Showroom',
    'review.phoneError': 'Please enter at least 10 digits for your phone number (e.g. 0750 123 4567).',
    'review.generationError': 'Could not generate invoice. Please try again.',
    'review.waShareSuccess': 'Invoice shared successfully via WhatsApp!',
    'review.waDesktopNote': 'The invoice PDF file has been downloaded. Please attach it to this chat.',

    // Catalog & Filters
    'catalog.noProducts': 'No products found',
    'catalog.adjustSearch': 'Try adjusting your search query or clear active filters.',
    'catalog.resetAll': 'Reset All',
    'catalog.searchPlaceholder': 'Search products, collections...',

    // WhatsApp Floating Help
    'help.floatingText': 'Contact Me',
    'help.whatsappPreset': 'Hello FAKHAMA DECOR! I need assistance with your showroom collections.',

    // Common
    'common.required': '*',
    'common.optional': '(Optional)',
    'common.currency': 'IQD',

    // Product Translations (Names & Descriptions)
    'prod.fakhama-travertine-table.name': 'Carrara Fluted Travertine Monolith Table',
    'prod.fakhama-travertine-table.short': 'Monolithic honed Roman travertine coffee table with custom architectural fluted column legs.',
    'prod.fakhama-travertine-table.full': 'Sculpted from hand-selected Tuscan travertine blocks with a hand-honed matte finish. Features organic natural veining and dual fluted cylindrical monolithic bases.',

    'prod.fakhama-brass-chandelier.name': 'Aura Sculptural Brushed Brass Chandelier',
    'prod.fakhama-brass-chandelier.short': 'Branching brass statement chandelier with frosted opaline glass spherical diffusers.',
    'prod.fakhama-brass-chandelier.full': 'Custom forged from solid unlacquered brass that patinas gracefully over time. Emits a warm 2700K ambient glow across residential reception halls and grand dining rooms.',

    'prod.fakhama-ceramic-amphora.name': 'Maison Alabaster Fluted Ceramic Amphora',
    'prod.fakhama-ceramic-amphora.short': 'Wheel-thrown terracotta amphora with volcanic chalk wash texture.',
    'prod.fakhama-ceramic-amphora.full': 'Handcrafted by master potters using traditional coil and wheel techniques. Fired with an unglazed chalk-stone slip for rich tactile presence.',

    'prod.fakhama-marquina-plinth.name': 'Nero Marquina Monolithic Display Plinth',
    'prod.fakhama-marquina-plinth.short': 'Solid Nero Marquina black marble plinth with stark white calcite lightning veins.',
    'prod.fakhama-marquina-plinth.full': 'Mitered monolith plinth for elevating sculptures, floral urns, or functioning as an architectural focal side table.',

    'prod.fakhama-brass-mirror.name': 'Soleil Organic Cast Brass Arch Mirror',
    'prod.fakhama-brass-mirror.short': 'Full-length floor mirror featuring an organic hand-cast sculptural brass frame.',
    'prod.fakhama-brass-mirror.full': 'Sand-cast solid brass frame with undulating organic ripples that catch natural sunlight. Features 6mm distortion-free HD silver-backed mirror glass.',

    'prod.fakhama-boucle-chair.name': 'Kanso Bouclé Sculptural Lounge Chair',
    'prod.fakhama-boucle-chair.short': 'Curved cloud silhouette armchair upholstered in heavyweight ivory wool bouclé.',
    'prod.fakhama-boucle-chair.full': 'Ergonomic wrap-around comfort with dual-density high-resilience memory foam. Resting on discreet concealed darkened ash feet.',

    'prod.fakhama-wool-rug.name': 'Elysian Hand-Knotted Wool & Silk Rug (3x2m)',
    'prod.fakhama-wool-rug.short': 'High-density organic geometric relief rug hand-knotted from New Zealand virgin wool and bamboo silk.',
    'prod.fakhama-wool-rug.full': 'Takes over 120 days of artisan weaving. Features subtle high-low carved pile depths with radiant light reflection.',

    'prod.fakhama-travertine-sconce.name': 'Lumina Honed Travertine Sconce Pair',
    'prod.fakhama-travertine-sconce.short': 'Minimalist dual-emission architectural wall sconces sculpted from natural honed travertine stone.',
    'prod.fakhama-travertine-sconce.full': 'Casts an elegant halo of soft upward and downward ambient glow on textured interior walls.',

    'prod.fakhama-marble-bowl.name': 'Brutalist Carved Calacatta Marble Fruit Bowl',
    'prod.fakhama-marble-bowl.short': 'Heavyweight footed centerpiece bowl hand-carved from a single block of Calacatta Gold marble.',
    'prod.fakhama-marble-bowl.full': 'Showcases warm golden-grey veins across a silky honed interior basin. Perfect as a coffee table or dining centerpiece.',

    'prod.fakhama-earthenware-urn.name': 'Astraea Raw Earthenware Urn Duo',
    'prod.fakhama-earthenware-urn.short': 'Pair of organic silhouette ceramic vessels with textured sandy stone finish.',
    'prod.fakhama-earthenware-urn.full': 'Two complementary architectural forms designed to display dried botanicals or stand as sculptural silhouettes.',

    'prod.fakhama-plaster-art.name': 'Zenith Textured Plaster Wall Bas-Relief',
    'prod.fakhama-plaster-art.short': 'Large-scale textured plaster on linen canvas with architectural geometric shadow play.',
    'prod.fakhama-plaster-art.full': 'Hand-sculpted multidimensional ridges in natural limestone tones framed in slim darkened oak.',

    'prod.fakhama-bronze-lamp.name': 'Monarch Cast Bronze Ambient Table Lamp',
    'prod.fakhama-bronze-lamp.short': 'Sculptural bronze cone base table lamp with oatmeal textured linen empire shade.',
    'prod.fakhama-bronze-lamp.full': 'Hefty cast metal base with blackened oil-rubbed bronze patina. Includes inline brass rotary dimmer for bedside and credenza ambiance.',

    'prod.fakhama-verona-table.name': 'Verona Fluted Roman Stone Pedestal Table',
    'prod.fakhama-verona-table.short': 'Round pedestal occasional table in solid honed travertine with ribbed column base.',
    'prod.fakhama-verona-table.full': 'An architectural classic, carved from pure stone blocks with bullnose edge detailing.',

    'prod.fakhama-velvet-cushions.name': 'Silk Velvet Geometric Cushion Trio',
    'prod.fakhama-velvet-cushions.short': 'Trio of luxury Italian cotton-silk velvet cushions with natural goose down inserts.',
    'prod.fakhama-velvet-cushions.full': 'Rich tactile luster in deep olive, warm champagne, and smoked umber. Finished with concealed tonal YKK zippers.',

    'prod.fakhama-glass-vessel.name': 'Arcadia Solid Smoked Glass Vessel',
    'prod.fakhama-glass-vessel.short': 'Heavy mouth-blown smoked crystal glass vase with organic asymmetric silhouette.',
    'prod.fakhama-glass-vessel.full': 'Creates dramatic refractive light patterns on polished tables and shelving consoles.',

    'prod.fakhama-marble-bookends.name': 'Portoro Gold Marble Geometric Bookends',
    'prod.fakhama-marble-bookends.short': 'Pair of sculptural arch bookends crafted from black Portoro marble with golden honey veining.',
    'prod.fakhama-marble-bookends.full': 'Substantial weight to anchor art monographs and architectural folios effortlessly.',

    'prod.fakhama-spotlight.name': 'Spotlight COB LED Ceiling Light',
    'prod.fakhama-spotlight.short': 'Recessed COB LED downlight with high-efficiency aluminum heatsink and faceted reflector.',
    'prod.fakhama-spotlight.full': 'Professional-grade recessed ceiling spotlight featuring a high-output COB LED chip, precision faceted reflector for optimal light distribution, spring-loaded orange clips for easy ceiling installation, and a finned aluminum heatsink for superior thermal management.',
  },

  ar: {
    // Brand & Header
    'brand.name': 'فخامة للديكور',
    'brand.tagline': 'معرض الديكور الداخلي والمعماري الفاخر',
    'header.shoppingBox': 'سلة المشتريات',
    'header.themeToggle': 'تغيير وضع المظهر',
    'header.language': 'اللغة',
    'header.selectLanguage': 'اختر اللغة',

    // Product Card
    'card.add': 'إضافة',
    'card.decrease': 'تقليل الكمية',
    'card.increase': 'زيادة الكمية',
    'card.removeFromBox': 'إزالة من السلة',
    'card.inStock': 'متوفر بالمخزن',
    'card.newArrival': 'وصل حديثاً',
    'card.featured': 'مميز',
    'card.onlyLeft': 'متبقي {count} فقط',

    // Product Modal
    'modal.specifications': 'المواصفات الفنية',
    'modal.cancelSelection': 'إلغاء الاختيار',
    'modal.addToShoppingBox': 'إضافة إلى سلة المشتريات',
    'modal.previousAngle': 'الزاوية السابقة',
    'modal.nextAngle': 'الزاوية التالية',
    'modal.immediateDispatch': 'جاهز للشحن الفوري',

    // Shopping Box Drawer
    'drawer.title': 'سلة المشتريات',
    'drawer.pieceSelected': 'قطعة محددة',
    'drawer.piecesSelected': 'قطع محددة',
    'drawer.clearAll': 'مسح الكل',
    'drawer.removeItem': 'حذف العنصر',
    'drawer.emptyTitle': 'سلة المشتريات فارغة',
    'drawer.emptySubtitle': 'اضغط على "إضافة" على أي قطعة لبدء تجميع طلبك.',
    'drawer.totalInDinar': 'المجموع بالدينار:',
    'drawer.sendInvoiceSheet': 'إرسال قائمة الفاتورة',

    // Selection Review / Invoice Modal
    'review.backToShoppingBox': 'العودة إلى سلة المشتريات',
    'review.title': 'بيانات العميل والطلب للفاتورة',
    'review.subtitle': 'يرجى إدخال بياناتك لإنشاء الفاتورة الرسمية وتفعيل الإرسال المباشر عبر واتساب.',
    'review.fullName': 'الاسم الكامل',
    'review.namePlaceholder': 'مثال: أحمد علي',
    'review.phone': 'رقم الواتساب / الهاتف',
    'review.phonePlaceholder': 'مثال: ٠٧٥٠١٢٣٤٥٦٧',
    'review.phoneMinDigits': '(١٠ أرقام على الأقل)',
    'review.cityAddress': 'المدينة / العنوان (اختياري)',
    'review.addressPlaceholder': 'مثال: بغداد، المنصور',
    'review.specialNotes': 'ملاحظات خاصة / متطلبات مخصصة (اختياري)',
    'review.notesPlaceholder': 'مثال: وقت التوصيل المفضل أو تشطيبات خاصة',
    'review.productOrdered': 'منتج مطلوب',
    'review.productsOrdered': 'منتجات مطلوبة',
    'review.readyToSend': 'جاهز للإرسال بالدينار العراقي',
    'review.totalInDinar': 'المجموع بالدينار',
    'review.generating': 'جاري إنشاء الفاتورة...',
    'review.generateAndReady': 'إنشاء وتجهيز الفاتورة',
    'review.docReadyTitle': 'الفاتورة جاهزة',
    'review.directWhatsAppConfigured': 'تم تجهيز الإرسال المباشر لواتساب للرقم:',
    'review.downloadAndOpen': 'تحميل وفتح الفاتورة',
    'review.sendToWhatsApp': 'إرسال الفاتورة عبر واتساب',
    'review.returnToShowroom': '← العودة إلى المعرض',
    'review.phoneError': 'يرجى إدخال ١٠ أرقام على الأقل لرقم الهاتف (مثال: ٠٧٥٠١٢٣٤٥٦٧).',
    'review.generationError': 'تعذر إنشاء الفاتورة. يرجى المحاولة مرة أخرى.',
    'review.waShareSuccess': 'تمت مشاركة الفاتورة بنجاح عبر واتساب!',
    'review.waDesktopNote': 'تم تحميل ملف الفاتورة PDF. يرجى إرفاقه في هذه المحادثة.',

    // Catalog & Filters
    'catalog.noProducts': 'لم يتم العثور على منتجات',
    'catalog.adjustSearch': 'جرب تغيير كلمة البحث أو إعادة تعيين الفلاتر.',
    'catalog.resetAll': 'إعادة ضبط الكل',
    'catalog.searchPlaceholder': 'ابحث في المنتجات والمجموعات...',

    // WhatsApp Floating Help
    'help.floatingText': 'تواصل معي',
    'help.whatsappPreset': 'مرحباً فخامة للديكور! أحتاج إلى مساعدة بخصوص معروضاتكم.',

    // Common
    'common.required': '*',
    'common.optional': '(اختياري)',
    'common.currency': 'د.ع',

    // Product Translations
    'prod.fakhama-travertine-table.name': 'طاولة حجر الترافرتين الروماني المتجانسة',
    'prod.fakhama-travertine-table.short': 'طاولة قهوة فاخرة منحوتة من حجر الترافرتين الروماني الطبيعي مع أرجل أعمدة مضلعة معمارية.',
    'prod.fakhama-travertine-table.full': 'منحوتة يدوياً من كتل الترافرتين الإيطالي الفاخر بتشطيب ناعم غير لامع مع عروق طبيعية خلابة وقواعد أسطوانية مزدوجة متينة.',

    'prod.fakhama-brass-chandelier.name': 'ثريا أورا النحاسية النحتية المصقولة',
    'prod.fakhama-brass-chandelier.short': 'ثريا نحاسية متفرعة فاخرة مع كرات زجاجية أوبالين عاكسة للضوء الدافئ.',
    'prod.fakhama-brass-chandelier.full': 'مصنوعة يدوياً من النحاس الصلب الصافي. تمنح إضاءة محيطية دافئة بقوة 2700K تناسب غرف الاستقبال الفاخرة وصالات الطعام.',

    'prod.fakhama-ceramic-amphora.name': 'جرة ألاباستر الخزفية المضلعة الفاخرة',
    'prod.fakhama-ceramic-amphora.short': 'جرة فخارية يدوية بطابع بركاني محفور وتفاصيل معمارية فريدة.',
    'prod.fakhama-ceramic-amphora.full': 'صُنعت بواسطة أمهر الخزافين باستخدام تقنيات العجلة التراثية وتتميز بلمسة مطفية راقية تدوم طويلاً.',

    'prod.fakhama-marquina-plinth.name': 'قاعدة عرض رخام نيرو ماركينا المتجانسة',
    'prod.fakhama-marquina-plinth.short': 'قاعدة عرض من رخام نيرو ماركينا الأسود الطبيعي مع عروق الكالسيت البيضاء البراقة.',
    'prod.fakhama-marquina-plinth.full': 'قاعدة معمارية صلبة لعرض المنحوتات والمزهريات أو كطاولة جانبية متميزة في المساحات الفاخرة.',

    'prod.fakhama-brass-mirror.name': 'مرآة قوس النحاس المصبوب سولاي',
    'prod.fakhama-brass-mirror.short': 'مرآة أرضية كاملة بإطار نحاسي منحوت يدوياً بتموجات عضوية جذابة.',
    'prod.fakhama-brass-mirror.full': 'إطار نحاسي مصبوب بالرمل مع زجاج كريستالي عالي الوضوح بسماكة 6 ملم خالٍ من أي تشويه.',

    'prod.fakhama-boucle-chair.name': 'كرسي استرخاء كانسو بوكليه النحتي',
    'prod.fakhama-boucle-chair.short': 'كرسي بتصميم انسيابي مكسو بقماش صوف البوكليه العاجي فائق النعومة.',
    'prod.fakhama-boucle-chair.full': 'يوفر أقصى درجات الراحة بفضل الإسفنج عالي الكثافة والهيكل الخشبي الصلب وقواعد الرماد الداكنة.',

    'prod.fakhama-wool-rug.name': 'سجادة إليسيان صوف وحرير منسوجة يدوياً (٣×٢م)',
    'prod.fakhama-wool-rug.short': 'سجادة صوف نيوزيلندي وحرير خيزران بنقوش هندسية بارزة عالية الكثافة.',
    'prod.fakhama-wool-rug.full': 'استغرقت أكثر من 120 يوماً من الحياكة اليدوية الدقيقة، وتتميز بعمق نقش بارز وانعكاس ضوئي مبهر.',

    'prod.fakhama-travertine-sconce.name': 'زوج إضاءة جدارية لومينا ترافرتين',
    'prod.fakhama-travertine-sconce.short': 'إضاءة جدارية مزدوجة الاتجاه منحوتة من حجر الترافرتين الطبيعي الناعم.',
    'prod.fakhama-travertine-sconce.full': 'تضفي هالة إضاءة دافئة ناعمة للأعلى والأسفل تبرز جمال الجدران والمساحات الداخلية.',

    'prod.fakhama-marble-bowl.name': 'وعاء رخام كالاكاتا المنحوت الفاخر',
    'prod.fakhama-marble-bowl.short': 'وعاء ديكور منحوت من قطعة واحدة صلبة من رخام كالاكاتا الإيطالي بعروق ذهبية.',
    'prod.fakhama-marble-bowl.full': 'تصميم راقٍ يتوسط طاولات القهوة وغرف الطعام مع عروق رمادية وذهبية ساحرة.',

    'prod.fakhama-earthenware-urn.name': 'ثنائي مزهريات أستريا الفخارية النحتية',
    'prod.fakhama-earthenware-urn.short': 'زوج من الأواني الفخارية الفنية بملمس حجري رملي جذاب.',
    'prod.fakhama-earthenware-urn.full': 'تصميمان متناسقان لعرض النباتات المجففة أو كقطع فنية نحتية تضفي لمسة طبيعية هادئة.',

    'prod.fakhama-plaster-art.name': 'لوحة زينيث الجدارية الجصية البارزة',
    'prod.fakhama-plaster-art.short': 'عمل فني جداري بملمس الجص الطبيعي وإطار خشبي أسود فاخر.',
    'prod.fakhama-plaster-art.full': 'تموجات نحتية يدوية متعددة الأبعاد بألوان الحجر الجيري تمنح الجدران عمقاً وتأثيراً بصرياً أنيقاً.',

    'prod.fakhama-bronze-lamp.name': 'مصباح طاولة مونارك برونزي مصبوب',
    'prod.fakhama-bronze-lamp.short': 'مصباح طاولة بقاعدة برونزية ثقيلة وغطاء من الكتان الطبيعي المنسوج.',
    'prod.fakhama-bronze-lamp.full': 'قاعدة معدنية صلبة بلمسة برونزية عتيقة مع مفتاح تحكم بمستوى الإضاءة للسرير أو الكونسول.',

    'prod.fakhama-verona-table.name': 'طاولة فيرونا الرخامية ذات القاعدة الأسطوانية',
    'prod.fakhama-verona-table.short': 'طاولة دائرية أنيقة من حجر الترافرتين الصلب بقاعدة عمودية مضلعة.',
    'prod.fakhama-verona-table.full': 'تصميم معماري كلاسيكي منحوت من الصخور الطبيعية مع حواف مصقولة يدوياً بحرفية متناهية.',

    'prod.fakhama-velvet-cushions.name': 'ثلاثي وسائد مخملية حريرية هندسية',
    'prod.fakhama-velvet-cushions.short': 'ثلاث وسائد مخملية إيطالية فاخرة محشوة بريش الإوز الطبيعي.',
    'prod.fakhama-velvet-cushions.full': 'ألوان متناسقة من الزيتي الهادئ والشمبانيا الدافئة وسحابات مخفية متينة وعالية الجودة.',

    'prod.fakhama-glass-vessel.name': 'مزهرية أركاديا الزجاجية المدخنة',
    'prod.fakhama-glass-vessel.short': 'مزهرية زجاج كريستال مدخن منفوخة يدوياً بشكل انسيابي غير متماثل.',
    'prod.fakhama-glass-vessel.full': 'تعكس أشعة الضوء بأسلوب ساحر فوق الطاولات والأرفف الديكورية المصقولة.',

    'prod.fakhama-marble-bookends.name': 'مساند كتب رخام بورتورو الذهبي الفاخر',
    'prod.fakhama-marble-bookends.short': 'زوج من مساند الكتب النحتية المصنوعة من رخام بورتورو الأسود بعروق العسل الذهبية.',
    'prod.fakhama-marble-bookends.full': 'وزن صلب يثبت الكتب الفنية والمجلدات المعمارية بأناقة وثبات لا مثيل له.',

    'prod.fakhama-spotlight.name': 'سبوت لايت سقف COB LED مدمج',
    'prod.fakhama-spotlight.short': 'مصباح سبوت لايت مدمج للسقف بتقنية COB LED مع مشتت حراري من الألمنيوم وعاكس ضوئي دقيق.',
    'prod.fakhama-spotlight.full': 'سبوت لايت احترافي مدمج للسقف مزود بشريحة COB LED عالية الكفاءة، عاكس زجاجي مضلع لتوزيع ضوئي مثالي، وملاقط برتقالية لسهولة التركيب على الأسقف المستعارة.',
  },

  ku: {
    // Brand & Header
    'brand.name': 'فەخامە دیکۆر',
    'brand.tagline': 'پێشانگای ناوازەی دیکۆرات و دیزاینی ناوخۆیی',
    'header.shoppingBox': 'سەبەتەی کڕین',
    'header.themeToggle': 'گۆڕینی دۆخی ڕەنگ',
    'header.language': 'زمان',
    'header.selectLanguage': 'زمان هەڵبژێرە',

    // Product Card
    'card.add': 'زیادکردن',
    'card.decrease': 'کەمکردنەوەی ژمارە',
    'card.increase': 'زیادکردنی ژمارە',
    'card.removeFromBox': 'سڕینەوە لە سەبەتە',
    'card.inStock': 'لە کۆگا بەردەستە',
    'card.newArrival': 'تازە گەیشتوو',
    'card.featured': 'تایبەت',
    'card.onlyLeft': 'تەنها {count} ماوە',

    // Product Modal
    'modal.specifications': 'تایبەتمەندییەکان',
    'modal.cancelSelection': 'هەڵوەشاندنەوەی هەڵبژاردن',
    'modal.addToShoppingBox': 'زیادکردن بۆ سەبەتەی کڕین',
    'modal.previousAngle': 'وێنەی پێشوو',
    'modal.nextAngle': 'وێنەی داهاتوو',
    'modal.immediateDispatch': 'ئامادەیە بۆ ناردنی دەستبەجێ',

    // Shopping Box Drawer
    'drawer.title': 'سەبەتەی کڕین',
    'drawer.pieceSelected': 'دانە هەڵبژێردراوە',
    'drawer.piecesSelected': 'دانە هەڵبژێردراون',
    'drawer.clearAll': 'سڕینەوەی هەمووی',
    'drawer.removeItem': 'سڕینەوە',
    'drawer.emptyTitle': 'سەبەتەی کڕینەکەت بەتاڵە',
    'drawer.emptySubtitle': 'کرتە لەسەر "زیادکردن" بکە لەسەر هەر پارچەیەک بۆ دروستکردنی داواکارییەکەت.',
    'drawer.totalInDinar': 'کۆی گشتی بە دینار:',
    'drawer.sendInvoiceSheet': 'ناردنی پەڕەی پسوولە',

    // Selection Review / Invoice Modal
    'review.backToShoppingBox': 'گەڕانەوە بۆ سەبەتەی کڕین',
    'review.title': 'زانیاری کڕیار و داواکاری بۆ پسوولە',
    'review.subtitle': 'تکایە زانیارییەکانت بنووسە بۆ دەرکردنی پسوولەی فەرمی و ناردنی ڕاستەوخۆ لە ڕێگەی واتسئاپ.',
    'review.fullName': 'ناوی تەواو',
    'review.namePlaceholder': 'نموونە: ئەحمەد عەلی',
    'review.phone': 'ژمارەی واتسئاپ / مۆبایل',
    'review.phonePlaceholder': 'نموونە: ٠٧٥٠١٢٣٤٥٦٧',
    'review.phoneMinDigits': '(لانی کەم ١٠ ژمارە)',
    'review.cityAddress': 'شار / ناونیشان (ئارەزوومەندانە)',
    'review.addressPlaceholder': 'نموونە: هەولێر، بەختیاری',
    'review.specialNotes': 'تێبینی تایبەت / داواکاری تایبەت (ئارەزوومەندانە)',
    'review.notesPlaceholder': 'نموونە: کاتی گەیاندنی دڵخواز یان ڕەنگ و دیزاینی تایبەت',
    'review.productOrdered': 'بەرهەمی داواکراو',
    'review.productsOrdered': 'بەرهەمی داواکراو',
    'review.readyToSend': 'ئامادەیە بۆ ناردن بە دیناری عێراقی',
    'review.totalInDinar': 'کۆی گشتی بە دینار',
    'review.generating': 'پسوولە ئامادە دەکرێت...',
    'review.generateAndReady': 'دروستکردن و ئامادەکردنی پسوولە',
    'review.docReadyTitle': 'پسوولەکە ئامادەیە',
    'review.directWhatsAppConfigured': 'ناردنی ڕاستەوخۆی واتسئاپ ئامادەکرا بۆ:',
    'review.downloadAndOpen': 'داگرتن و کردنەوەی پسوولە',
    'review.sendToWhatsApp': 'ناردنی پسوولە بۆ واتسئاپ',
    'review.returnToShowroom': '← گەڕانەوە بۆ پێشانگا',
    'review.phoneError': 'تکایە لانی کەم ١٠ ژمارە بنووسە بۆ مۆبایل (نموونە: ٠٧٥٠١٢٣٤٥٦٧).',
    'review.generationError': 'دروستکردنی پسوولە سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەرەوە.',
    'review.waShareSuccess': 'پسوولەکە بە سەرکەوتوویی لە واتسئاپ هاوبەش کرا!',
    'review.waDesktopNote': 'فایلی پسوولەی PDF داگیراوە. تکایە لەم چاتەدا پەیوەستی بکە و بینێرە.',

    // Catalog & Filters
    'catalog.noProducts': 'هیچ بەرهەمێک نەدۆزرایەوە',
    'catalog.adjustSearch': 'وشەی گەڕانەکەت بگۆڕە یان فلتەرەکان پاک بکەرەوە.',
    'catalog.resetAll': 'ڕێکخستنەوەی هەموو',
    'catalog.searchPlaceholder': 'گەڕان بۆ بەرهەم و کۆمەڵەکان...',

    // WhatsApp Floating Help
    'help.floatingText': 'پەیوەندیم پێوە بکە',
    'help.whatsappPreset': 'سڵاو فەخامە دیکۆر! پێویستم بە هاوکارییە دەربارەی بەرهەمەکانتان.',

    // Common
    'common.required': '*',
    'common.optional': '(ئارەزوومەندانە)',
    'common.currency': 'د.ع',

    // Product Translations
    'prod.fakhama-travertine-table.name': 'مێزی بەردی تراڤێرتینی ڕۆمانی ناوازە',
    'prod.fakhama-travertine-table.short': 'مێزی قاوەی ناوازە لە بەردی تراڤێرتینی سروشتی ڕۆمانی لەگەڵ پایەی ئەندازیاری ستوونی.',
    'prod.fakhama-travertine-table.full': 'بە دەست لە بەردی تراڤێرتینی ئیتاڵی تاشراوە بە شێوازێکی نەرم و مات لەگەڵ ڕەگە سروشتییە سەرنجڕاکێشەکان.',

    'prod.fakhama-brass-chandelier.name': 'چلوچرای مسینی پۆڵاکراوی ئۆرا',
    'prod.fakhama-brass-chandelier.short': 'چلوچرای مسینی مۆدێرن بە گڵۆپی شووشەیی ئۆپالینی گەرم و ڕووناک.',
    'prod.fakhama-brass-chandelier.full': 'لە مسێکی پتەوی بێ ڕەنگ دروستکراوە کە بە تێپەڕبوونی کات جوانییەکەی زیاتر دەبێت. ڕووناکییەکی گەرمی 2700K دەبەخشێت.',

    'prod.fakhama-ceramic-amphora.name': 'گۆزەی سیرامیکی ئەلاباستەر',
    'prod.fakhama-ceramic-amphora.short': 'گۆزەی قوڕینی دەستکرد بە نەخشی گڕکانی و تێکستچەری تایبەت.',
    'prod.fakhama-ceramic-amphora.full': 'لەلایەن وەستایانی شارەزا بە شێوازی دەستی و تەقلیدی دروستکراوە بە ڕوویەکی ماتی جوان.',

    'prod.fakhama-marquina-plinth.name': 'پایەی مەڕمەڕی ڕەشی نیرۆ مارکینا',
    'prod.fakhama-marquina-plinth.short': 'پایەی مەڕمەڕی ڕەشی سروشتی لەگەڵ ڕەگی سپی بریقەدار.',
    'prod.fakhama-marquina-plinth.full': 'پایەیەکی پتەو بۆ دانانی پەیکەر و گوڵدان یان وەک مێزێکی لاوەکی جوان لە شوێنە فەخمەکاندا.',

    'prod.fakhama-brass-mirror.name': 'ئاوێنەی کەوانی مسینی سولێی',
    'prod.fakhama-brass-mirror.short': 'ئاوێنەی باڵای زەوی بە چوارچێوەی مسینی دەستکرد و شەپۆلاوی.',
    'prod.fakhama-brass-mirror.full': 'چوارچێوەی مسینی بەهێز لەگەڵ شووشەی کریستاڵی ٦ ملمی ڕوون و بێ کێماسی.',

    'prod.fakhama-boucle-chair.name': 'قەنەفەی پشوودانی بۆکلێی کانسۆ',
    'prod.fakhama-boucle-chair.short': 'قەنەفەی نەرمی پشوودان بە قوماشی خوری بۆکلێی شیری.',
    'prod.fakhama-boucle-chair.full': 'پشوودانێکی تەواو پێشکەش دەکات بە ئیسفەنجی کوالێتی بەرز و دارە پتەوەکانی.',

    'prod.fakhama-wool-rug.name': 'فەرشی دەستچنی خوری و ئاوریشمی ئەلیزیان (٣×٢م)',
    'prod.fakhama-wool-rug.short': 'فەرشی خوری نیوزلەندی و ئاوریشمی بامبۆ بە نەخشی ئەندازەیی بەرجەستە.',
    'prod.fakhama-wool-rug.full': 'زیاتر لە ١٢٠ ڕۆژ چنینی دەستی خایاندووە و ڕەنگدانەوەی ڕووناکی زۆر جوانە.',

    'prod.fakhama-travertine-sconce.name': 'جووتە گڵۆپی دیواری تراڤێرتینی لۆمینا',
    'prod.fakhama-travertine-sconce.short': 'گڵۆپی دیواری دوو ئاراستە لە بەردی تراڤێرتینی سروشتی.',
    'prod.fakhama-travertine-sconce.full': 'ڕووناکییەکی گەرم و هێمن بۆ سەرەوە و خوارەوە دەنێرێت و جوانی دیوارەکان دەردەخات.',

    'prod.fakhama-marble-bowl.name': 'قاپە مەڕمەڕی کاتراوی کالاکاتا',
    'prod.fakhama-marble-bowl.short': 'قاپێکی دیکۆری لە یەک پارچە بەردی مەڕمەڕی کالاکاتای ئاڵتوونی تاشراو.',
    'prod.fakhama-marble-bowl.full': 'دیزاینێکی شاهانە بە ڕەگی زێڕین و خۆڵەمێشی بۆ سەر مێزی میوان و نانخواردن.',

    'prod.fakhama-earthenware-urn.name': 'جووتە گوڵدانی گڵینی ئەستریا',
    'prod.fakhama-earthenware-urn.short': 'دوو دەفری گڵینی هونەری بە ڕووی بەردینی لمی.',
    'prod.fakhama-earthenware-urn.full': 'دوو فۆڕمی ئەندازیاری گونجاو بۆ گوڵی وشککراوە یان پارچەی هونەری ناوازە.',

    'prod.fakhama-plaster-art.name': 'تابلۆی گەچی بەرجەستەی زێنیس',
    'prod.fakhama-plaster-art.short': 'تابلۆی گەورەی گەچی بە تێکستچەری بەردی سروشتی و چوارچێوەی داری ڕەش.',
    'prod.fakhama-plaster-art.full': 'شەپۆلی دەستکردی فرەڕەهەند کە سێبەری ئەندازەیی جوان لەسەر دیوارەکان دروست دەکات.',

    'prod.fakhama-bronze-lamp.name': 'گڵۆپی سەر مێزی برۆنزی مۆنارک',
    'prod.fakhama-bronze-lamp.short': 'گڵۆپی سەر مێز بە بنکەی برۆنزی قورس و کڵاوی کتانی سروشتی.',
    'prod.fakhama-bronze-lamp.full': 'بنکەی کانزای قورس لەگەڵ دوگمەی دەستکاریکردنی ئاستی ڕووناکی بۆ سەر کۆنسۆڵ و تەختەخەو.',

    'prod.fakhama-verona-table.name': 'مێزی خڕی مەڕمەڕی ڤێرۆنا بە پایەی ستوونی',
    'prod.fakhama-verona-table.short': 'مێزی خڕی قەشەنگ لە بەردی تراڤێرتینی پتەو بە پایەی ستوونی نەخشێنراو.',
    'prod.fakhama-verona-table.full': 'شاکارێکی ئەندازیاری لە بەردی سروشتی تاشراو بە لێواری خڕکراوی دەستکرد.',

    'prod.fakhama-velvet-cushions.name': 'سێینەی سەرینچکەی مەخمەڵی ئاوریشمی',
    'prod.fakhama-velvet-cushions.short': 'سێ سەرینچکەی مەخمەڵی ئیتالی پڕکراو لە پەڕی قازی سروشتی.',
    'prod.fakhama-velvet-cushions.full': 'ڕەنگی دەوڵەمەندی زەیتوونی و شەمپانی لەگەڵ زیپی شاراوەی کوالێتی بەرز.',

    'prod.fakhama-glass-vessel.name': 'گوڵدانی کریستاڵی دووکەڵاوی ئارکادیا',
    'prod.fakhama-glass-vessel.short': 'گوڵدانی کریستاڵی قورسی دەمفووکراوی بە شێوازی ناڕێک و مۆدێرن.',
    'prod.fakhama-glass-vessel.full': 'ڕەنگدانەوەی ڕووناکی سەرنجڕاکێش دروست دەکات لەسەر مێز و ڕەفەکان.',

    'prod.fakhama-marble-bookends.name': 'ڕاگرگری کتێبی مەڕمەڕی پۆرتۆرۆ گۆڵد',
    'prod.fakhama-marble-bookends.short': 'جووتێک ڕاگرگری کتێب لە مەڕمەڕی پۆرتۆرۆی ڕەش بە ڕەگی زێڕینی هەنگوینی.',
    'prod.fakhama-marble-bookends.full': 'کێشێکی قورس و جێگیر بۆ ڕاگرتنی کتێب و ئەلبوومە گەورەکان بەوپەڕی فەخامەت.',

    'prod.fakhama-spotlight.name': 'سپۆت لایتی سەقفی COB LED مۆدێرن',
    'prod.fakhama-spotlight.short': 'سپۆت لایتی مۆدێرنی ناو سەقف بە تەکنەلۆژیای COB LED لەگەڵ فێنککەرەوەی ئەلەمنیۆم و عەدەسەی ڕووناکی.',
    'prod.fakhama-spotlight.full': 'سپۆت لایتی سەقفی پیشەگەرانە بە چیپی COB LED، عەدەسەی شووشەیی بۆ دابەشکردنی ڕووناکی بە یەکسانی، و کلاپسی پڕتەقاڵی بۆ دانانی ئاسان لەناو سەقفی مەغریبی.',
  },

  tr: {
    // Brand & Header
    'brand.name': 'FAKHAMA DECOR',
    'brand.tagline': 'Lüks İç Mimari ve Tasarım Showroomu',
    'header.shoppingBox': 'Alışveriş Kutusu',
    'header.themeToggle': 'Tema modunu değiştir',
    'header.language': 'Dil',
    'header.selectLanguage': 'Dil Seçin',

    // Product Card
    'card.add': 'EKLE',
    'card.decrease': 'Miktarı azalt',
    'card.increase': 'Miktarı artır',
    'card.removeFromBox': 'Kutudan çıkar',
    'card.inStock': 'Stokta Var',
    'card.newArrival': 'Yeni Ürün',
    'card.featured': 'Öne Çıkan',
    'card.onlyLeft': 'Son {count} adet kaldı',

    // Product Modal
    'modal.specifications': 'Teknik Özellikler',
    'modal.cancelSelection': 'SEÇİMİ İPTAL ET',
    'modal.addToShoppingBox': 'ALIŞVERİŞ KUTUSUNA EKLE',
    'modal.previousAngle': 'Önceki açı',
    'modal.nextAngle': 'Sonraki açı',
    'modal.immediateDispatch': 'Hemen Teslimat',

    // Shopping Box Drawer
    'drawer.title': 'Alışveriş Kutusu',
    'drawer.pieceSelected': 'parça seçildi',
    'drawer.piecesSelected': 'parça seçildi',
    'drawer.clearAll': 'Tümünü Temizle',
    'drawer.removeItem': 'Öğeyi kaldır',
    'drawer.emptyTitle': 'Alışveriş Kutunuz Boş',
    'drawer.emptySubtitle': 'Seçiminizi oluşturmaya başlamak için herhangi bir ürüne EKLE butonuna tıklayın.',
    'drawer.totalInDinar': 'Toplam Dinar:',
    'drawer.sendInvoiceSheet': 'Fatura Sayfasını Gönder',

    // Selection Review / Invoice Modal
    'review.backToShoppingBox': 'Alışveriş Kutusuna Dön',
    'review.title': 'Fatura İçin Müşteri ve Sipariş Detayları',
    'review.subtitle': 'Resmi faturanızı oluşturmak ve WhatsApp üzerinden doğrudan gönderim sağlamak için lütfen bilgilerinizi girin.',
    'review.fullName': 'Ad Soyad',
    'review.namePlaceholder': 'Örn: Ahmet Yılmaz',
    'review.phone': 'WhatsApp / Telefon Numarası',
    'review.phonePlaceholder': 'Örn: 0750 123 4567',
    'review.phoneMinDigits': '(En az 10 rakam)',
    'review.cityAddress': 'Şehir / Adres (İsteğe Bağlı)',
    'review.addressPlaceholder': 'Örn: Bağdat, Mansur',
    'review.specialNotes': 'Özel Notlar / Talepler (İsteğe Bağlı)',
    'review.notesPlaceholder': 'Örn: Tercih edilen teslimat zamanı veya özel kaplama detayları',
    'review.productOrdered': 'Sipariş Edilen Ürün',
    'review.productsOrdered': 'Sipariş Edilen Ürünler',
    'review.readyToSend': 'Irak Dinarı olarak gönderilmeye hazır',
    'review.totalInDinar': 'Dinar Olarak Toplam',
    'review.generating': 'Fatura Oluşturuluyor...',
    'review.generateAndReady': 'Faturayı Oluştur ve Hazırla',
    'review.docReadyTitle': 'Fatura Belgesi Hazır',
    'review.directWhatsAppConfigured': 'Doğrudan WhatsApp gönderimi şu numara için yapılandırıldı:',
    'review.downloadAndOpen': 'Faturayı İndir ve Aç',
    'review.sendToWhatsApp': 'Faturayı WhatsApp ile Gönder',
    'review.returnToShowroom': '← Showrooma Dön',
    'review.phoneError': 'Lütfen telefon numarası için en az 10 rakam girin (örn: 0750 123 4567).',
    'review.generationError': 'Fatura oluşturulamadı. Lütfen tekrar deneyin.',
    'review.waShareSuccess': 'Fatura WhatsApp üzerinden başarıyla paylaşıldı!',
    'review.waDesktopNote': 'Fatura PDF dosyası indirildi. Lütfen bu sohbete ekleyip gönderin.',

    // Catalog & Filters
    'catalog.noProducts': 'Ürün bulunamadı',
    'catalog.adjustSearch': 'Arama teriminizi değiştirmeyi veya filtreleri temizlemeyi deneyin.',
    'catalog.resetAll': 'Tümünü Sıfırla',
    'catalog.searchPlaceholder': 'Ürünlerde, koleksiyonlarda arayın...',

    // WhatsApp Floating Help
    'help.floatingText': 'Bana Ulaşın',
    'help.whatsappPreset': 'Merhaba FAKHAMA DECOR! Showroom koleksiyonlarınız hakkında yardıma ihtiyacım var.',

    // Common
    'common.required': '*',
    'common.optional': '(İsteğe Bağlı)',
    'common.currency': 'IQD',

    // Product Translations
    'prod.fakhama-travertine-table.name': 'Carrara Yivli Traverten Monolit Sehpa',
    'prod.fakhama-travertine-table.short': 'Özel mimari yivli sütun ayaklara sahip monolitik honlanmış Roma traverten sehpa.',
    'prod.fakhama-travertine-table.full': 'El ile seçilmiş Toskana traverten bloklarından mat finisajla yontulmuştur. Doğal damarlar ve silindirik yivli çift kaide içerir.',

    'prod.fakhama-brass-chandelier.name': 'Aura Heykelsi Fırçalanmış Pirinç Avize',
    'prod.fakhama-brass-chandelier.short': 'Buzlu opalin cam küre difüzörlü pirinç tasarım avize.',
    'prod.fakhama-brass-chandelier.full': 'Masif pirinçten dövülmüş, zamanla asil bir patina kazanan özel tasarım. Büyük salonlarda 2700K sıcak ambiyans ışığı yayar.',

    'prod.fakhama-ceramic-amphora.name': 'Maison Alabaster Yivli Seramik Amfora',
    'prod.fakhama-ceramic-amphora.short': 'Volkanik kireç taşı dokulu el yapımı pişmiş toprak amfora.',
    'prod.fakhama-ceramic-amphora.full': 'Usta seramikçiler tarafından geleneksel çömlekçi çarkında şekillendirilmiş, zengin dokulu özel parça.',

    'prod.fakhama-marquina-plinth.name': 'Nero Marquina Monolitik Mermer Kaide',
    'prod.fakhama-marquina-plinth.short': 'Beyaz kalsit damarlı masif Nero Marquina siyah mermer kaide.',
    'prod.fakhama-marquina-plinth.full': 'Heykelleri sergilemek veya mimari odaklı yan sehpa olarak kullanılmak üzere gönyelenmiş monolit kaide.',

    'prod.fakhama-brass-mirror.name': 'Soleil Organik Döküm Pirinç Kemer Ayna',
    'prod.fakhama-brass-mirror.short': 'Organik el dökümü heykelsi pirinç çerçeveli boy aynası.',
    'prod.fakhama-brass-mirror.full': 'Doğal gün ışığını yakalayan dalgalı organik hatlara sahip pirinç çerçeve ve 6mm bozulmasız kristal ayna camı.',

    'prod.fakhama-boucle-chair.name': 'Kanso Buklet Heykelsi Koltuk',
    'prod.fakhama-boucle-chair.short': 'Ağır gramajlı fildişi yün buklet döşemeli kavisli bulut silüetli koltuk.',
    'prod.fakhama-boucle-chair.full': 'Çift yoğunluklu yüksek dayanımlı sünger ile ergonomik sarıcı konfor ve gizli dişbudak ayaklar.',

    'prod.fakhama-wool-rug.name': 'Elysian El Dokuması Yün ve İpek Halı (3x2m)',
    'prod.fakhama-wool-rug.short': 'Yeni Zelanda yünü ve bambu ipeğinden el dokuması yüksek yoğunluklu kabartmalı halı.',
    'prod.fakhama-wool-rug.full': '120 günden fazla süren usta dokuma işlemi, ışığı yansıtan kabartmalı oyma detaylar.',

    'prod.fakhama-travertine-sconce.name': 'Lumina Honlanmış Traverten Aplik Çifti',
    'prod.fakhama-travertine-sconce.short': 'Doğal traverten taşından yontulmuş çift yönlü minimalist mimari duvar aplikleri.',
    'prod.fakhama-travertine-sconce.full': 'İç mekan duvarlarında yukarı ve aşağı doğru yumuşak, sıcak bir ışık halesi oluşturur.',

    'prod.fakhama-marble-bowl.name': 'Calacatta Mermer Oyma Meyve Kasesi',
    'prod.fakhama-marble-bowl.short': 'Tek parça masif Calacatta Gold mermer bloktan oyulmuş ağır ayaklı kase.',
    'prod.fakhama-marble-bowl.full': 'İpeksi honlanmış iç havzasında sıcak altın-gri damarlar sergiler, mükemmel bir masa odak noktasıdır.',

    'prod.fakhama-earthenware-urn.name': 'Astraea Ham Pişmiş Toprak Vazo İkilisi',
    'prod.fakhama-earthenware-urn.short': 'Dokulu kumlu taş finisajlı organik silüet seramik vazo çifti.',
    'prod.fakhama-earthenware-urn.full': 'Kuru bitkileri sergilemek veya heykelsi silüetler olarak durmak üzere tasarlanmış iki tamamlayıcı form.',

    'prod.fakhama-plaster-art.name': 'Zenith Dokulu Alçı Duvar Rölyefi',
    'prod.fakhama-plaster-art.short': 'Keten tuval üzerinde mimari geometrik gölge oyunlu büyük ölçekli dokulu alçı rölyef.',
    'prod.fakhama-plaster-art.full': 'Koyu meşe çerçeveli, doğal kireç taşı tonlarında el yapımı çok boyutlu rölyef sanatı.',

    'prod.fakhama-bronze-lamp.name': 'Monarch Döküm Bronz Masa Lambası',
    'prod.fakhama-bronze-lamp.short': 'Doğal keten başlıklı heykelsi koni tabanlı döküm bronz masa lambası.',
    'prod.fakhama-bronze-lamp.full': 'Karartılmış antik bronz patinalı ağır döküm gövde ve pirinç çevirmeli dimmer anahtar.',

    'prod.fakhama-verona-table.name': 'Verona Yivli Roma Taşı Sehpa',
    'prod.fakhama-verona-table.short': 'Yivli sütun kaideli masif honlanmış traverten yuvarlak sehpa.',
    'prod.fakhama-verona-table.full': 'Klasik mimari formda, el işçiliği yuvarlatılmış kenar detaylı saf taş bloktan oyulmuştur.',

    'prod.fakhama-velvet-cushions.name': 'İpek Kadife Geometrik Kırlent Üçlüsü',
    'prod.fakhama-velvet-cushions.short': 'Doğal kaz tüyü dolgulu lüks İtalyan pamuk-ipek kadife kırlent üçlüsü.',
    'prod.fakhama-velvet-cushions.full': 'Koyu zeytin, sıcak şampanya ve füme tonlarında gizli YKK fermuarlı şık set.',

    'prod.fakhama-glass-vessel.name': 'Arcadia Füme Kristal Cam Vazo',
    'prod.fakhama-glass-vessel.short': 'Asimetrik organik silüetli ağır ağızdan üfleme füme kristal cam vazo.',
    'prod.fakhama-glass-vessel.full': 'Cilalı masa ve raflarda dramatik kırılma ışık desenleri yaratır.',

    'prod.fakhama-marble-bookends.name': 'Portoro Altın Mermer Kitap Desteği',
    'prod.fakhama-marble-bookends.short': 'Altın bal damarlı siyah Portoro mermerden üretilmiş heykelsi kemer kitap desteği çifti.',
    'prod.fakhama-marble-bookends.full': 'Sanat ve mimari kitaplarını zahmetsizce sabitleyen sağlam ve ağır taş yapı.',

    'prod.fakhama-spotlight.name': 'Gömme COB LED Tavan Spotu',
    'prod.fakhama-spotlight.short': 'Yüksek verimli alüminyum soğutuculu ve fasetli reflektörlü gömme COB LED spot.',
    'prod.fakhama-spotlight.full': 'Yüksek çıkışlı COB LED çip, homojen ışık dağılımı için hassas fasetli reflektör, kolay montaj için turuncu yaylı klipsler ve üstün termal yönetim sağlayan kanatçıklı alüminyum gövde.',
  },
}
