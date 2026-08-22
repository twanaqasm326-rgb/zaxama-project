import { jsPDF } from 'jspdf'
import { PDFDocumentData } from '../types/pdf'
import { BRAND_CONFIG } from '../data/brand'

/**
 * Loads an image from a URL with timeout and converts it into a Base64 Data URL for jsPDF.
 * Fails gracefully to null on network error, CORS restriction, or timeout without blocking PDF generation.
 */
async function getBase64ImageFromUrl(imageUrl: string, timeoutMs = 2500): Promise<string | null> {
  return new Promise((resolve) => {
    let isDone = false
    const timer = setTimeout(() => {
      if (!isDone) {
        isDone = true
        resolve(null)
      }
    }, timeoutMs)

    try {
      const img = new Image()
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = () => {
        if (isDone) return
        isDone = true
        clearTimeout(timer)
        try {
          const canvas = document.createElement('canvas')
          // Downscale image to max 400x300 for crisp PDF rendering without excessive document weight
          const maxW = 400
          const scale = Math.min(1, maxW / (img.width || 400))
          canvas.width = (img.width || 400) * scale
          canvas.height = (img.height || 300) * scale
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
            resolve(dataUrl)
          } else {
            resolve(null)
          }
        } catch {
          // Catch canvas tainted / CORS error safely
          resolve(null)
        }
      }
      img.onerror = () => {
        if (isDone) return
        isDone = true
        clearTimeout(timer)
        resolve(null)
      }
      img.src = imageUrl
    } catch {
      if (!isDone) {
        isDone = true
        clearTimeout(timer)
        resolve(null)
      }
    }
  })
}

/**
 * Generates an architectural product selection and specification PDF for FAKHAMA DECOR
 */
export async function generateSpecificationPDF(data: PDFDocumentData): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = 210
  const pageHeight = 297
  const margin = 16
  const contentWidth = pageWidth - margin * 2

  // Color definitions (RGB)
  const COLOR_OBSIDIAN = [33, 30, 26] as const
  const COLOR_BRONZE = [184, 147, 88] as const
  const COLOR_TRAVERTINE = [232, 227, 218] as const
  const COLOR_MUTED = [112, 108, 100] as const
  const COLOR_LINEN = [250, 248, 245] as const

  let currentPage = 1
  let y = margin

  // Helper to draw the header on any page
  const drawPageHeader = (_pageNumber: number) => {
    // Top fine bronze bar
    doc.setFillColor(COLOR_BRONZE[0], COLOR_BRONZE[1], COLOR_BRONZE[2])
    doc.rect(margin, 10, contentWidth, 0.8, 'F')

    // Brand Name
    doc.setFont('times', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])
    doc.text(data.branding.companyName || BRAND_CONFIG.name, margin, 18)

    // Subtitle (data-driven from branding configuration)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    const subtitleText = (data.branding.tagline || BRAND_CONFIG.tagline || 'SHOWROOM SPECIFICATIONS').toUpperCase()
    doc.text(subtitleText, margin, 22)

    // Right-aligned Document Reference & Date
    doc.setFont('courier', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])
    doc.text(data.documentNumber, pageWidth - margin, 17, { align: 'right' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    doc.text(`ISSUED: ${data.generatedAt}`, pageWidth - margin, 21, { align: 'right' })

    // Divider under header
    doc.setDrawColor(COLOR_TRAVERTINE[0], COLOR_TRAVERTINE[1], COLOR_TRAVERTINE[2])
    doc.setLineWidth(0.3)
    doc.line(margin, 25, pageWidth - margin, 25)

    return 32
  }

  // Helper to draw the footer on every page
  const drawPageFooter = (pageNumber: number, totalPages: number) => {
    const footerY = pageHeight - 12
    doc.setDrawColor(COLOR_TRAVERTINE[0], COLOR_TRAVERTINE[1], COLOR_TRAVERTINE[2])
    doc.setLineWidth(0.3)
    doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    
    // Dynamic contact text from branding data
    const addressStr = data.branding.address || BRAND_CONFIG.showroomAddress
    const emailStr = data.branding.contactEmail || BRAND_CONFIG.contact.email
    const phoneStr = data.branding.contactPhone || BRAND_CONFIG.contact.phone
    doc.text(
      `${addressStr} • ${emailStr} • ${phoneStr}`,
      margin,
      footerY
    )

    doc.text(
      `PRODUCT SELECTION & SPECIFICATION SHEET • PAGE ${pageNumber} OF ${totalPages}`,
      pageWidth - margin,
      footerY,
      { align: 'right' }
    )
  }

  // Pre-load all product images concurrently with timeout safety
  const imagePromises = data.items.map(item =>
    getBase64ImageFromUrl(item.product.mainImage, 2500)
  )
  const loadedImages = await Promise.all(imagePromises)

  // Start Page 1
  y = drawPageHeader(currentPage)

  // Document Title & Project Metadata Block
  doc.setFillColor(COLOR_LINEN[0], COLOR_LINEN[1], COLOR_LINEN[2])
  doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'F')
  doc.setDrawColor(COLOR_TRAVERTINE[0], COLOR_TRAVERTINE[1], COLOR_TRAVERTINE[2])
  doc.setLineWidth(0.3)
  doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'S')

  // Document Title inside block
  doc.setFont('times', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])
  doc.text(data.options?.documentTitle || 'Product Selection & Specification Overview', margin + 5, y + 7)

  // Metadata Columns
  const col1X = margin + 5
  const col2X = margin + 65
  const col3X = margin + 125

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(COLOR_BRONZE[0], COLOR_BRONZE[1], COLOR_BRONZE[2])
  doc.text('PROJECT / CLIENT:', col1X, y + 14)
  doc.text('DESIGN FIRM / CONTACT:', col2X, y + 14)
  doc.text('SELECTION SUMMARY:', col3X, y + 14)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])

  // Client Details
  const clientName = data.client?.clientName || 'Showroom Selection'
  const projectTitle = data.client?.projectTitle || 'Architectural Reference'
  doc.text(clientName, col1X, y + 19)
  doc.setFontSize(6.5)
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
  doc.text(projectTitle, col1X, y + 23)

  // Firm Details
  doc.setFontSize(7.5)
  doc.setTextColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])
  const company = data.client?.companyName || 'Client Selection'
  const contact = data.client?.email || data.client?.phone || (data.branding.contactEmail || BRAND_CONFIG.contact.email)
  doc.text(company, col2X, y + 19)
  doc.setFontSize(6.5)
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
  doc.text(contact, col2X, y + 23)

  // Selection Totals
  doc.setFont('courier', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])
  doc.text(`${data.totalItems} Objects Selected`, col3X, y + 19)
  if (data.options?.includePricing !== false && data.estimatedTotal) {
    doc.setTextColor(COLOR_BRONZE[0], COLOR_BRONZE[1], COLOR_BRONZE[2])
    doc.text(`Est. Value: ${data.estimatedTotal.toLocaleString()} IQD`, col3X, y + 23)
  }

  y += 34

  // Client Custom Notes (if provided)
  if (data.client?.notes && data.options?.includeNotes !== false) {
    doc.setFillColor(255, 255, 255)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(7)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    const noteLines = doc.splitTextToSize(`Project Notes: "${data.client.notes}"`, contentWidth - 8)
    const noteHeight = noteLines.length * 3.5 + 4
    doc.roundedRect(margin, y, contentWidth, noteHeight, 1.5, 1.5, 'S')
    doc.text(noteLines, margin + 4, y + 4)
    y += noteHeight + 4
  }

  // Section Header for Items
  doc.setFont('times', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])
  doc.text('SELECTED PRODUCT SPECIFICATIONS', margin, y)
  y += 5

  // Render Product Items with dynamic height & text wrapping calculation
  for (let i = 0; i < data.items.length; i++) {
    const item = data.items[i]
    const imgData = loadedImages[i]

    // Pre-calculate title lines to prevent horizontal overlap with right column
    const imgW = 32
    const imgH = 32
    const textX = margin + 3 + imgW + 5
    const priceColumnWidth = 52
    const maxTitleWidth = contentWidth - imgW - priceColumnWidth - 10

    doc.setFont('times', 'bold')
    doc.setFontSize(10.5)
    const titleLines: string[] = doc.splitTextToSize(item.product.name, maxTitleWidth)

    // Calculate required details height
    let specsLineCount = 0
    if (data.options?.includeSpecifications !== false) {
      if (item.product.dimensions) specsLineCount++
      if (item.product.materials && item.product.materials.length > 0) specsLineCount++
      if (item.product.leadTime) specsLineCount++
    }
    const optionExtra = item.selectedOption ? 4.5 : 0
    const calculatedContentHeight = 10 + (titleLines.length * 4.5) + optionExtra + (specsLineCount * 3.8) + 4
    const itemHeight = Math.max(38, calculatedContentHeight)

    // Check if we need a page break
    if (y + itemHeight > pageHeight - 30) {
      doc.addPage()
      currentPage++
      y = drawPageHeader(currentPage)
    }

    // Product Card Container
    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(COLOR_TRAVERTINE[0], COLOR_TRAVERTINE[1], COLOR_TRAVERTINE[2])
    doc.setLineWidth(0.3)
    doc.roundedRect(margin, y, contentWidth, itemHeight, 2, 2, 'FD')

    // 1. Thumbnail Image on Left
    const imgX = margin + 3
    const imgY = y + 3

    if (imgData && data.options?.includeImages !== false) {
      try {
        doc.addImage(imgData, 'JPEG', imgX, imgY, imgW, imgH)
        doc.setDrawColor(COLOR_TRAVERTINE[0], COLOR_TRAVERTINE[1], COLOR_TRAVERTINE[2])
        doc.rect(imgX, imgY, imgW, imgH, 'S')
      } catch {
        // Fallback image placeholder
        doc.setFillColor(COLOR_LINEN[0], COLOR_LINEN[1], COLOR_LINEN[2])
        doc.rect(imgX, imgY, imgW, imgH, 'F')
      }
    } else {
      // Clean vector placeholder when image is missing or timed out
      doc.setFillColor(COLOR_LINEN[0], COLOR_LINEN[1], COLOR_LINEN[2])
      doc.rect(imgX, imgY, imgW, imgH, 'F')
      doc.setDrawColor(COLOR_TRAVERTINE[0], COLOR_TRAVERTINE[1], COLOR_TRAVERTINE[2])
      doc.rect(imgX, imgY, imgW, imgH, 'S')
    }

    // 2. Product Meta & Details

    // SKU & Category Line
    doc.setFont('courier', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(COLOR_BRONZE[0], COLOR_BRONZE[1], COLOR_BRONZE[2])
    doc.text(item.product.code, textX, y + 7)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    const categoryLabel = (item.product.category || 'OBJECT').toUpperCase()
    doc.text(`•  ${categoryLabel} COLLECTION`, textX + 22, y + 7)

    // Product Title (Wrapped multi-line safe)
    doc.setFont('times', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])
    let curTitleY = y + 13
    titleLines.forEach(line => {
      doc.text(line, textX, curTitleY)
      curTitleY += 4.5
    })

    // Selected Option / Finish
    let subY = curTitleY + 1
    if (item.selectedOption) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])
      doc.text('Selected Option: ', textX, subY)

      doc.setFont('helvetica', 'normal')
      doc.setTextColor(COLOR_BRONZE[0], COLOR_BRONZE[1], COLOR_BRONZE[2])
      doc.text(item.selectedOption.name, textX + 22, subY)
      subY += 4.5
    }

    // Dimensions & Materials (if available in data)
    if (data.options?.includeSpecifications !== false) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(6.5)
      doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])

      if (item.product.dimensions) {
        const dimStr = `Dimensions: ${item.product.dimensions.width} × ${item.product.dimensions.depth} × ${item.product.dimensions.height}`
        doc.text(dimStr, textX, subY)
        subY += 3.8
      }

      if (item.product.materials && item.product.materials.length > 0) {
        const matStr = `Materials: ${item.product.materials.slice(0, 3).join(', ')}`
        doc.text(matStr, textX, subY)
        subY += 3.8
      }

      if (item.product.leadTime) {
        doc.text(`Lead Time: ${item.product.leadTime}`, textX, subY)
      }
    }

    // 3. Right Column: Quantity, Estimated Price, Subtotal
    const priceX = pageWidth - margin - 4
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    doc.text(`Qty: ${item.quantity}`, priceX, y + 8, { align: 'right' })

    if (data.options?.includePricing !== false) {
      doc.setFont('courier', 'normal')
      doc.setFontSize(7.5)
      doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
      doc.text(`Unit: ${item.product.price.toLocaleString()} IQD`, priceX, y + 14, { align: 'right' })

      doc.setFont('courier', 'bold')
      doc.setFontSize(8.5)
      doc.setTextColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])
      doc.text(`${(item.product.price * item.quantity).toLocaleString()} IQD`, priceX, y + 21, { align: 'right' })
    }

    y += itemHeight + 4
  }

  // Summary & Non-Binding Notice Box
  const summaryBoxHeight = 32
  if (y + summaryBoxHeight > pageHeight - 25) {
    doc.addPage()
    currentPage++
    y = drawPageHeader(currentPage)
  }

  doc.setFillColor(COLOR_LINEN[0], COLOR_LINEN[1], COLOR_LINEN[2])
  doc.roundedRect(margin, y, contentWidth, summaryBoxHeight, 2, 2, 'FD')
  doc.setDrawColor(COLOR_TRAVERTINE[0], COLOR_TRAVERTINE[1], COLOR_TRAVERTINE[2])
  doc.setLineWidth(0.3)
  doc.roundedRect(margin, y, contentWidth, summaryBoxHeight, 2, 2, 'S')

  // Left side: Non-Binding Document Notice
  doc.setFont('times', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])
  doc.text('SPECIFICATION & SELECTION NOTICE', margin + 5, y + 7)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.5)
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
  const noticeLines = [
    '• This document represents a curated product selection and architectural specification overview.',
    '• Dimensions, material specifications, and estimated values are provided for planning and reference.',
    '• To inquire about bespoke proportions, finish samples, or availability, please contact our team.',
  ]
  let nY = y + 12
  noticeLines.forEach(line => {
    doc.text(line, margin + 5, nY)
    nY += 4
  })

  // Right side: Estimated Selection Value Box
  if (data.options?.includePricing !== false && data.estimatedTotal) {
    const totalBoxX = pageWidth - margin - 52
    doc.setFillColor(COLOR_OBSIDIAN[0], COLOR_OBSIDIAN[1], COLOR_OBSIDIAN[2])
    doc.roundedRect(totalBoxX, y + 4, 48, 24, 1.5, 1.5, 'F')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6)
    doc.setTextColor(COLOR_TRAVERTINE[0], COLOR_TRAVERTINE[1], COLOR_TRAVERTINE[2])
    doc.text('ESTIMATED SELECTION VALUE', totalBoxX + 24, y + 10, { align: 'center' })

    doc.setFont('courier', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(255, 255, 255)
    doc.text(`${data.estimatedTotal.toLocaleString()}`, totalBoxX + 24, y + 17, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(5.5)
    doc.setTextColor(COLOR_BRONZE[0], COLOR_BRONZE[1], COLOR_BRONZE[2])
    doc.text('IQD • CATALOG REFERENCE', totalBoxX + 24, y + 22, { align: 'center' })
  }

  // Draw footers on all pages now that we know total page count
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    drawPageFooter(p, totalPages)
  }

  return doc
}

/**
 * Trigger immediate download of generated PDF
 */
export function downloadSpecificationPDF(doc: jsPDF, filename = 'fakhama-decor-specifications.pdf') {
  doc.save(filename)
}
