import { CategoryDefinition } from '../types/product'

export const SHOWROOM_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'all',
    label: 'All Objects',
    shortLabel: 'All Pieces',
    description: 'Complete curation of architectural living, bespoke lighting, and sculptural furniture.',
    badgeText: 'Curated',
  },
  {
    id: 'living',
    label: 'Living & Seating',
    shortLabel: 'Living',
    description: 'Low-profile lounge chairs, travertine coffee monoliths, and sculpted modular sofas.',
    badgeText: 'Atelier',
  },
  {
    id: 'lighting',
    label: 'Architectural Lighting',
    shortLabel: 'Lighting',
    description: 'Hand-patinated brass pendants, alabaster sconces, and ambient floor luminaires.',
    badgeText: 'Bespoke',
  },
  {
    id: 'dining',
    label: 'Dining & Surfaces',
    shortLabel: 'Dining',
    description: 'Monolithic walnut tables, sculpted oak dining chairs, and honed stone credenzas.',
    badgeText: 'Solid Wood',
  },
  {
    id: 'decor',
    label: 'Objects & Vessels',
    shortLabel: 'Objects',
    description: 'Brutalist bronze vessels, smoked glass mirrors, and carved limestone pedestals.',
    badgeText: 'Artisan',
  },
  {
    id: 'outdoor',
    label: 'Outdoor Atelier',
    shortLabel: 'Outdoor',
    description: 'Weathered teak loungers, lava stone planters, and marine-grade woven daybeds.',
    badgeText: 'Elemental',
  },
]
