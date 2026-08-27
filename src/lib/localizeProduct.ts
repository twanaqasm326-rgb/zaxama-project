import { Product } from '../types/product'
import { Language, TRANSLATIONS } from '../data/translations'

export function getLocalizedProduct(product: Product, lang: Language): Product {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en
  const nameKey = `prod.${product.id}.name`
  const shortKey = `prod.${product.id}.short`
  const fullKey = `prod.${product.id}.full`

  return {
    ...product,
    name: dict[nameKey] || product.name,
    shortDescription: dict[shortKey] || product.shortDescription,
    fullDescription: dict[fullKey] || product.fullDescription,
  }
}
