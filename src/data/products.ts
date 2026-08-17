import { Product } from '../types/product'

export const SHOWROOM_PRODUCTS: Product[] = [
  {
    id: 'fd-liv-01',
    code: 'FD-LIV-01',
    name: 'Kanso Curved Bouclé Lounge Chair',
    tagline: 'Sculptural comfort contoured in textured off-white bouclé on an oiled walnut plinth.',
    category: 'living',
    price: 3850,
    currency: 'USD',
    shortDescription: 'Organic curved armchair balancing architectural weight with enveloping softness.',
    fullDescription: 'The Kanso Lounge Chair embodies understated luxury through continuous fluid geometry. Sculpted by hand over a kiln-dried beech frame and upholstered in bespoke Italian wool bouclé, it rests on a discreet recessed walnut pedestal that creates the illusion of floating above the floor.',
    mainImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'
    ],
    availability: 'in-stock',
    leadTime: 'Immediate Dispatch (1-2 weeks)',
    isFeatured: true,
    isNew: true,
    designer: 'Studio Aurelia, Milan',
    origin: 'Handcrafted in Tuscany, Italy',
    tags: ['Lounge', 'Bouclé', 'Iconic', 'Living'],
    tier: 'tier-2',
    aspectRatio: '4:3',
    curationNote: 'Sculptural wool bouclé contoured over an oiled walnut plinth',
    dimensions: {
      width: '92 cm / 36.2 in',
      depth: '88 cm / 34.6 in',
      height: '76 cm / 29.9 in',
      weight: '34 kg / 75 lbs'
    },
    materials: ['Italian Wool Bouclé', 'Kiln-Dried European Beech', 'FSC Solid Walnut Base', 'High-Resilience Dual Foam'],
    specifications: [
      { label: 'Upholstery', value: '85% Wool, 15% Cotton Bouclé (Martindale 65,000)' },
      { label: 'Base Finish', value: 'Matte Natural Walnut Oil' },
      { label: 'Cushion Fill', value: 'Down-wrapped high-density memory core' },
      { label: 'Fire Rating', value: 'CAL 117-2013 & BS 5852 Compliant' }
    ],
    options: [
      { id: 'opt-ivory', name: 'Oatmeal Bouclé', colorHex: '#F2EFE9' },
      { id: 'opt-charcoal', name: 'Obsidian Weave', colorHex: '#2B2B2D' },
      { id: 'opt-clay', name: 'Terracotta Suede', colorHex: '#9E5B47' }
    ]
  },
  {
    id: 'fd-tab-02',
    code: 'FD-TAB-02',
    name: 'Sora Honed Travertine Coffee Table',
    tagline: 'Monolithic low-profile table crafted from Roman travertine with softened bullnose edges.',
    category: 'living',
    price: 5200,
    currency: 'USD',
    shortDescription: 'Two-tier travertine centerpiece celebrating natural geological veining and tactile mass.',
    fullDescription: 'Quarried directly from Tivoli, each Sora Coffee Table is waterjet cut and hand-honed by third-generation stone masons. The dual-tiered floating composition provides subtle functional display space while maintaining a commanding architectural presence in expansive living spaces.',
    mainImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85'
    ],
    availability: 'made-to-order',
    leadTime: '4 - 6 Weeks',
    isFeatured: true,
    designer: 'Atelier Fakhama Decor',
    origin: 'Rome, Italy',
    tags: ['Stone', 'Travertine', 'Monolith', 'Centerpiece'],
    tier: 'tier-1',
    aspectRatio: '16:9',
    curationNote: 'Geological Roman travertine centerpiece with softened bullnose edges',
    dimensions: {
      width: '140 cm / 55.1 in',
      depth: '85 cm / 33.5 in',
      height: '32 cm / 12.6 in',
      weight: '115 kg / 253 lbs'
    },
    materials: ['Natural Roman Travertine', 'Internal Steel Reinforcement Frame', 'Felt Floor Glides'],
    specifications: [
      { label: 'Surface Finish', value: 'Ultra-Matte Honed & Oleophobic Sealed' },
      { label: 'Edge Profile', value: 'Custom 12mm Soft Bullnose' },
      { label: 'Care', value: 'Neutral pH stone cleaner only' }
    ],
    options: [
      { id: 'opt-trav-navona', name: 'Travertino Navona (Warm Cream)', colorHex: '#EAE1D2' },
      { id: 'opt-trav-silver', name: 'Travertino Silver (Smoke Gray)', colorHex: '#C5C1BA' }
    ]
  },
  {
    id: 'fd-lit-03',
    code: 'FD-LIT-03',
    name: 'Aura Spun Brass Pendant Luminaire',
    tagline: 'Precision-turned satin brass canopy casting a warm diffused ambient halo.',
    category: 'lighting',
    price: 2450,
    currency: 'USD',
    shortDescription: 'Minimalist statement chandelier with hand-spun raw brass and frosted triplex glass.',
    fullDescription: 'The Aura Pendant transforms space through calibrated luminous warmth. Featuring concentric hand-spun brass discs that shield the warm 2700K integrated LED array, it reflects a soft, glare-free indirect glow downward across dining surfaces and reception lounges.',
    mainImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85'
    ],
    availability: 'in-stock',
    leadTime: '3-5 Business Days',
    isFeatured: false,
    isNew: true,
    designer: 'Henrik Vang, Copenhagen',
    origin: 'Copenhagen, Denmark',
    tags: ['Pendant', 'Brass', 'Lighting', 'Architectural'],
    tier: 'tier-3',
    aspectRatio: '4:3',
    curationNote: 'Turned raw satin brass canopy casting indirect ambient warmth',
    dimensions: {
      width: '65 cm / 25.6 in diameter',
      depth: '65 cm / 25.6 in diameter',
      height: '18 cm / 7.1 in (Drop adjustable up to 250 cm)',
      weight: '8.5 kg / 18.7 lbs'
    },
    materials: ['Solid Spun Brass', 'Mouth-Blown Opaline Triplex Glass', 'Braided Textile Cord'],
    specifications: [
      { label: 'Light Source', value: 'Custom 24W Warm-Dim LED Array (2200K - 3000K)' },
      { label: 'Lumens', value: '1850 lm | CRI > 95' },
      { label: 'Dimming', value: 'DALI / 0-10V / Phase Cut Dimming Compatible' },
      { label: 'Voltage', value: 'Universal 110V - 240V' }
    ],
    options: [
      { id: 'opt-brass-satin', name: 'Satin Brushed Brass', colorHex: '#D4AF37' },
      { id: 'opt-brass-bronze', name: 'Patinated Dark Bronze', colorHex: '#4A3B32' },
      { id: 'opt-brass-nickel', name: 'Brushed Nickel', colorHex: '#D8D8D8' }
    ]
  },
  {
    id: 'fd-din-04',
    code: 'FD-DIN-04',
    name: 'Monolith Solid Walnut Dining Table',
    tagline: 'Three-meter solid American walnut dining surface resting on sculptural fluted pedestal bases.',
    category: 'dining',
    price: 9400,
    currency: 'USD',
    shortDescription: 'Masterful timber engineering showcasing continuous live-match grain and chamfered edges.',
    fullDescription: 'The Monolith Dining Table is an heirloom centerpiece crafted from sustainably harvested old-growth walnut slabs. Each plank is air-dried for 18 months before undergoing precision joinery. The dual cylindrical fluted plinths conceal internal stabilization columns that ensure unyielding stability for up to 10 guests.',
    mainImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1530629013299-6cb10d168419?auto=format&fit=crop&w=1200&q=85'
    ],
    availability: 'made-to-order',
    leadTime: '6 - 8 Weeks',
    isFeatured: true,
    designer: 'Klaus & Møller Atelier',
    origin: 'Stockholm, Sweden',
    tags: ['Dining', 'Solid Walnut', 'Handcrafted', 'Heirloom'],
    tier: 'tier-1',
    aspectRatio: '16:9',
    curationNote: 'Three-meter heirloom American walnut with fluted pedestal bases',
    dimensions: {
      width: '280 cm / 110.2 in',
      depth: '110 cm / 43.3 in',
      height: '75 cm / 29.5 in',
      weight: '145 kg / 319 lbs'
    },
    materials: ['FSC Certified American Black Walnut', 'Organic Natural Wax Oil', 'Brass Leveling Feet'],
    specifications: [
      { label: 'Seating Capacity', value: '8 - 10 Guests Comfortably' },
      { label: 'Top Thickness', value: '45 mm Solid Hardwood' },
      { label: 'Joinery', value: 'Traditional Mortise & Tenon + Concealed Tension Rods' }
    ],
    options: [
      { id: 'opt-walnut-natural', name: 'Natural American Walnut', colorHex: '#5C4033' },
      { id: 'opt-oak-smoked', name: 'Smoked Nordic Oak', colorHex: '#423B36' },
      { id: 'opt-ash-bleached', name: 'Bleached Scandinavian Ash', colorHex: '#E5DFD3' }
    ]
  },
  {
    id: 'fd-din-05',
    code: 'FD-DIN-05',
    name: 'Kyoto Sculpted Oak Dining Chair',
    tagline: 'Minimalist ergonomics with curved steam-bent oak backrest and saddle leather seat.',
    category: 'dining',
    price: 1150,
    currency: 'USD',
    shortDescription: 'Refined silhouette combining traditional Japanese woodcraft with Scandinavian proportions.',
    fullDescription: 'The Kyoto Chair achieves supreme comfort through a seamlessly steam-bent solid oak lumbar rail that cradles the user. Fitted with hand-stitched full-grain vegetable-tanned leather, it matures with a rich patina over decades of gatherings.',
    mainImage: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1580481077195-c990263f3ce5?auto=format&fit=crop&w=1200&q=85'
    ],
    availability: 'in-stock',
    leadTime: 'Immediate Dispatch (1-2 weeks)',
    isFeatured: false,
    designer: 'Naoki Takahashi Studio',
    origin: 'Kyoto, Japan',
    tags: ['Dining', 'Oak', 'Leather', 'Minimalist'],
    tier: 'tier-3',
    aspectRatio: '3:4',
    curationNote: 'Steam-bent white oak lumbar rail with vegetable-tanned saddle leather',
    dimensions: {
      width: '54 cm / 21.2 in',
      depth: '52 cm / 20.5 in',
      height: '78 cm / 30.7 in',
      weight: '7.2 kg / 15.8 lbs'
    },
    materials: ['Solid White Oak', 'Full-Grain Saddle Leather', 'Concealed Dowel Joinery'],
    specifications: [
      { label: 'Seat Height', value: '46 cm / 18.1 in' },
      { label: 'Stackable', value: 'Up to 3 chairs safely' },
      { label: 'Leather Origin', value: 'Tärnsjö Garveri, Sweden (Vegetable Tanned)' }
    ],
    options: [
      { id: 'opt-oak-cognac', name: 'Natural Oak / Cognac Leather', colorHex: '#B87333' },
      { id: 'opt-black-black', name: 'Black Ebonized Oak / Black Leather', colorHex: '#1A1A1A' }
    ]
  },
  {
    id: 'fd-lit-06',
    code: 'FD-LIT-06',
    name: 'Solis Carved Alabaster Wall Sconce',
    tagline: 'Hand-carved Spanish alabaster disc glowing with ethereal translucency.',
    category: 'lighting',
    price: 1650,
    currency: 'USD',
    shortDescription: 'Architectural wall disc transforming organic stone veining into ambient illuminated art.',
    fullDescription: 'Each Solis Sconce is carved from a solid disc of genuine Aragonese alabaster. Backlit by a low-profile warm LED matrix, the stone reveals intricate mineral strata unique to every single piece, casting a peaceful eclipse-like glow onto vertical masonry.',
    mainImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85'
    ],
    availability: 'in-stock',
    leadTime: '3-5 Business Days',
    isFeatured: true,
    designer: 'Elena Marchesi',
    origin: 'Zaragoza, Spain',
    tags: ['Sconce', 'Alabaster', 'Warm Glow', 'Wall Art'],
    tier: 'tier-2',
    aspectRatio: '1:1',
    curationNote: 'Solid Aragonese alabaster disc radiating an eclipse-like amber glow',
    dimensions: {
      width: '38 cm / 15.0 in diameter',
      depth: '6 cm / 2.4 in projection',
      height: '38 cm / 15.0 in',
      weight: '4.8 kg / 10.5 lbs'
    },
    materials: ['Natural Spanish Alabaster', 'Antiqued Bronzed Brass Backplate', 'Integrated 2700K LED'],
    specifications: [
      { label: 'Color Temperature', value: '2700K Ultra-Warm Soft Ambient' },
      { label: 'Power Consumption', value: '14W LED | 900 Lumens' },
      { label: 'IP Rating', value: 'IP44 (Suitable for luxury powder rooms)' }
    ]
  },
  {
    id: 'fd-dec-07',
    code: 'FD-DEC-07',
    name: 'Brutalist Cast Bronze Vessel',
    tagline: 'Numbered collectible vessel lost-wax cast with an oxidized verdigris patina.',
    category: 'decor',
    price: 1850,
    currency: 'USD',
    shortDescription: 'Heavyweight sculptural object blurring the boundary between functional vase and monument.',
    fullDescription: 'Cast using the centuries-old lost-wax technique in an artisanal foundry, this vessel features deliberate tactile chisel marks and asymmetric facets. Finished with a multi-layered sulfur and heat patina, each piece in the numbered series of 50 develops an increasingly nuanced luster over time.',
    mainImage: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85'
    ],
    availability: 'limited-edition',
    leadTime: '1-2 Weeks (Numbered Edition of 50)',
    isFeatured: false,
    designer: 'Marc Vandeberg, Antwerp',
    origin: 'Antwerp, Belgium',
    tags: ['Vessel', 'Bronze', 'Collectible', 'Sculpture'],
    tier: 'tier-3',
    aspectRatio: '3:4',
    curationNote: 'Numbered lost-wax cast phosphor bronze with natural sulfur patina',
    dimensions: {
      width: '26 cm / 10.2 in',
      depth: '22 cm / 8.7 in',
      height: '42 cm / 16.5 in',
      weight: '12 kg / 26.4 lbs'
    },
    materials: ['Solid Phosphor Bronze (CuSn8)', 'Chemical Heat Patina', 'Signed & Numbered Base Stamp'],
    specifications: [
      { label: 'Edition', value: 'Limited Series of 50' },
      { label: 'Watertight', value: '100% Watertight Interior Enamel Coated' }
    ]
  },
  {
    id: 'fd-out-08',
    code: 'FD-OUT-08',
    name: 'Atlas Weathered Teak Daybed',
    tagline: 'Generous architectural daybed in reclaimed Indonesian teak with all-weather cushions.',
    category: 'outdoor',
    price: 6800,
    currency: 'USD',
    shortDescription: 'Low-slung outdoor sanctuary engineered to withstand coastal humidity and desert sun.',
    fullDescription: 'Constructed from sustainably reclaimed century-old grade-A plantation teak, the Atlas Daybed features extra-deep proportions and concealed marine stainless hardware. Upholstered in mildew-resistant Sunbrella canvas with quick-dry reticulated foam, it transitions gracefully from poolside sun terraces to shaded courtyards.',
    mainImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85'
    ],
    availability: 'made-to-order',
    leadTime: '4 - 5 Weeks',
    isFeatured: true,
    isNew: true,
    designer: 'Atelier Fakhama Decor',
    origin: 'Java, Indonesia',
    tags: ['Outdoor', 'Teak', 'Daybed', 'Poolside'],
    tier: 'tier-1',
    aspectRatio: '16:9',
    curationNote: 'Century-old reclaimed Javanese teak sanctuary with marine quick-dry canvas',
    dimensions: {
      width: '210 cm / 82.7 in',
      depth: '105 cm / 41.3 in',
      height: '62 cm / 24.4 in',
      weight: '68 kg / 150 lbs'
    },
    materials: ['Grade-A Reclaimed Teak', 'Sunbrella Luxe Marine Canvas', 'Reticulated Outdoor Quick-Dry Foam', '316 Stainless Fasteners'],
    specifications: [
      { label: 'Weather Rating', value: 'UV 50+ Resistant / Salt Air & Chlorine Proof' },
      { label: 'Cushion Fabric', value: 'Sunbrella Heritage Sand (Removable & Washable)' }
    ],
    options: [
      { id: 'opt-cushion-sand', name: 'Heritage Sand Canvas', colorHex: '#DFD8CC' },
      { id: 'opt-cushion-slate', name: 'Charcoal Basalt Canvas', colorHex: '#383A3F' }
    ]
  },
  {
    id: 'fd-liv-09',
    code: 'FD-LIV-09',
    name: 'Forma Modular Sectional Sofa',
    tagline: 'Endless configuration possibilities with architectural low-back geometric modules.',
    category: 'living',
    price: 8900,
    currency: 'USD',
    shortDescription: 'Generous 3-piece modular composition upholstered in heavy Belgian linen.',
    fullDescription: 'The Forma Sectional balances expansive lounge comfort with crisp architectural geometry. Constructed with pocket-sprung feather cushions and zero-VOC hardwood framing, its concealed magnetic interlocking brackets allow effortless reconfiguration.',
    mainImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85'
    ],
    availability: 'made-to-order',
    leadTime: '5 - 7 Weeks',
    isFeatured: false,
    designer: 'Mateo Rossi',
    origin: 'Brianza, Italy',
    tags: ['Modular', 'Sofa', 'Linen', 'Living'],
    tier: 'tier-2',
    aspectRatio: '16:9',
    curationNote: 'Low-profile architectural modular seating in washed Belgian flax linen',
    dimensions: {
      width: '320 cm / 126.0 in',
      depth: '190 cm / 74.8 in (with chaise)',
      height: '70 cm / 27.6 in',
      weight: '120 kg / 264 lbs'
    },
    materials: ['100% Belgian Washed Linen', 'Solid European Pine Frame', 'Goose Feather Down Layer', 'No-Sag Sinuous Springs'],
    specifications: [
      { label: 'Fabric Care', value: 'Dry cleanable removable covers' },
      { label: 'Seat Depth', value: '72 cm / 28.3 in' },
      { label: 'Configuration', value: '3 Modules (Left Arm + Center + Right Chaise)' }
    ],
    options: [
      { id: 'opt-linen-sand', name: 'Raw Natural Flax', colorHex: '#D6CEBE' },
      { id: 'opt-linen-olive', name: 'Washed Cypress Olive', colorHex: '#5A6054' }
    ]
  },
  {
    id: 'fd-dec-10',
    code: 'FD-DEC-10',
    name: 'Nocturne Smoked Glass & Brass Mirror',
    tagline: 'Oversized leaning floor mirror with beveled bronze-smoked glass and brushed brass border.',
    category: 'decor',
    price: 2750,
    currency: 'USD',
    shortDescription: 'Full-length architectural mirror reflecting warmth and depth into entryways and suites.',
    fullDescription: 'The Nocturne Mirror creates an enchanting visual depth with its subtle bronze smoke tint. Framed in heavy solid brass with exposed micro-screws and backed with anti-shatter safety film, it can be mounted flush or leaned with anti-tip security hardware.',
    mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85'
    ],
    availability: 'in-stock',
    leadTime: 'Immediate Dispatch (1-2 weeks)',
    isFeatured: false,
    designer: 'Fakhama Decor Object Lab',
    origin: 'Porto, Portugal',
    tags: ['Mirror', 'Smoked Glass', 'Brass', 'Decor'],
    tier: 'tier-2',
    aspectRatio: '3:4',
    curationNote: 'Leaning full-length bronze-smoked glass within solid brushed brass border',
    dimensions: {
      width: '100 cm / 39.4 in',
      depth: '5 cm / 2.0 in frame',
      height: '220 cm / 86.6 in',
      weight: '46 kg / 101 lbs'
    },
    materials: ['6mm Bronze Smoked Float Glass', 'Extruded Solid Brass Profile', 'Safety Backing Membrane'],
    specifications: [
      { label: 'Mounting', value: 'Dual orientation heavy-duty Z-bars included' },
      { label: 'Glass Tint', value: 'Warm Bronze Low-Iron Smoke' }
    ]
  }
]
