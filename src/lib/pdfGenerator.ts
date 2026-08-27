import { jsPDF } from 'jspdf'
import { PDFDocumentData } from '../types/pdf'
import { BRAND_CONFIG } from '../data/brand'
import { registerArabicFont, needsArabicFont } from './pdfFontLoader'

/**
 * Loads an image from a URL with timeout and converts it into a Base64 Data URL for jsPDF.
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
          const maxW = 300
          const scale = Math.min(1, maxW / (img.width || 300))
          canvas.width = (img.width || 300) * scale
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
 * Generates a clean, simple, and elegant PDF order specification sheet.
 * Accepts an optional language code to select the correct font for Arabic/Kurdish text.
 */
export async function generateSpecificationPDF(data: PDFDocumentData, language: string = 'en'): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  // Determine which font family to use based on language
  const useArabic = needsArabicFont(language)
  let fontFamily = 'helvetica'

  if (useArabic) {
    const registered = registerArabicFont(doc)
    if (registered) {
      fontFamily = 'Amiri'
    }
  }

  const pageWidth = 210
  const pageHeight = 297
  const margin = 16
  const contentWidth = pageWidth - margin * 2

  // Sophisticated Color Palette
  const COLOR_DARK = [20, 26, 36] as const
  const COLOR_BLUE = [14, 165, 233] as const
  const COLOR_BORDER = [220, 226, 235] as const
  const COLOR_BG_LIGHT = [248, 250, 252] as const
  const COLOR_MUTED = [100, 116, 139] as const

  let currentPage = 1
  let y = margin

  // Pre-load product images
  const imagePromises = data.items.map(item =>
    getBase64ImageFromUrl(item.product.mainImage, 2500)
  )
  const loadedImages = await Promise.all(imagePromises)

  // Header renderer
  const drawPageHeader = () => {
    // Top Accent Bar
    doc.setFillColor(COLOR_BLUE[0], COLOR_BLUE[1], COLOR_BLUE[2])
    doc.rect(margin, 10, contentWidth, 1.2, 'F')

    // Brand Name
    doc.setFont(fontFamily, 'bold')
    doc.setFontSize(16)
    doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
    doc.text(BRAND_CONFIG.name, margin, 20)

    // Tagline
    doc.setFont(fontFamily, 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    doc.text('ORDER & INVOICE DOCUMENT', margin, 24.5)

    // Right Ref and Date
    doc.setFont(fontFamily, 'bold')
    doc.setFontSize(9)
    doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
    doc.text(data.documentNumber, pageWidth - margin, 19, { align: 'right' })

    doc.setFont(fontFamily, 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    doc.text(`Date: ${data.generatedAt}`, pageWidth - margin, 23.5, { align: 'right' })

    // Header Divider
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2])
    doc.setLineWidth(0.3)
    doc.line(margin, 27, pageWidth - margin, 27)

    return 33
  }

  // Footer renderer
  const drawPageFooter = (pageNumber: number, totalPages: number) => {
    const footerY = pageHeight - 12
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2])
    doc.setLineWidth(0.3)
    doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4)

    doc.setFont(fontFamily, 'normal')
    doc.setFontSize(7)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    doc.text(`${BRAND_CONFIG.name} • Contact: ${BRAND_CONFIG.contact.phone}`, margin, footerY)
    doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, footerY, { align: 'right' })
  }

  // Draw Page 1 Header
  y = drawPageHeader()

  // 1. Customer Information Box
  const hasEmail = Boolean(data.client?.email)
  const hasNotes = Boolean(data.client?.notes)
  const custBoxHeight = (hasEmail || hasNotes) ? 30 : 22
  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2])
  doc.roundedRect(margin, y, contentWidth, custBoxHeight, 2, 2, 'F')
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2])
  doc.setLineWidth(0.3)
  doc.roundedRect(margin, y, contentWidth, custBoxHeight, 2, 2, 'S')

  doc.setFont(fontFamily, 'bold')
  doc.setFontSize(8)
  doc.setTextColor(COLOR_BLUE[0], COLOR_BLUE[1], COLOR_BLUE[2])
  doc.text('CUSTOMER & DELIVERY DETAILS', margin + 5, y + 6)

  // Customer Details Grid - Row 1: Name, Phone, Email
  doc.setFont(fontFamily, 'bold')
  doc.setFontSize(8)
  doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
  doc.text('Client Name:', margin + 5, y + 12)
  doc.text('Phone:', margin + 65, y + 12)
  doc.text(hasEmail ? 'Email:' : 'City / Address:', margin + 120, y + 12)

  doc.setFont(fontFamily, 'normal')
  doc.setFontSize(8)
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
  doc.text(data.client?.clientName || 'Valued Customer', margin + 24, y + 12)
  doc.text(data.client?.phone || 'Not Specified', margin + 76, y + 12)
  doc.text(
    hasEmail
      ? (data.client?.email || 'N/A')
      : (data.client?.address || data.client?.city || 'Not Specified'),
    hasEmail ? margin + 131 : margin + 142,
    y + 12
  )

  // Customer Details Grid - Row 2 (if email exists, show address on row 2, or show notes)
  if (hasEmail) {
    doc.setFont(fontFamily, 'bold')
    doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
    doc.text('City / Address:', margin + 5, y + 18)

    doc.setFont(fontFamily, 'normal')
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    doc.text(data.client?.address || data.client?.city || 'Not Specified', margin + 27, y + 18)

    if (data.client?.notes) {
      doc.setFont(fontFamily, 'bold')
      doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
      doc.text('Notes:', margin + 85, y + 18)

      doc.setFont(fontFamily, 'normal')
      doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
      const noteText = doc.splitTextToSize(data.client.notes, contentWidth - 98)
      doc.text(noteText, margin + 96, y + 18)
    }
  } else if (data.client?.notes) {
    doc.setFont(fontFamily, 'bold')
    doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
    doc.text('Special Notes:', margin + 5, y + 18)

    doc.setFont(fontFamily, 'normal')
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    const noteText = doc.splitTextToSize(data.client.notes, contentWidth - 32)
    doc.text(noteText, margin + 26, y + 18)
  }

  y += custBoxHeight + 6

  // 2. Ordered Products Table Header
  doc.setFillColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
  doc.roundedRect(margin, y, contentWidth, 7.5, 1, 1, 'F')

  doc.setFont(fontFamily, 'bold')
  doc.setFontSize(7)
  doc.setTextColor(255, 255, 255)

  doc.text('#', margin + 3, y + 5)
  doc.text('PRODUCT DETAILS', margin + 28, y + 5)
  doc.text('QTY', pageWidth - margin - 55, y + 5, { align: 'center' })
  doc.text('UNIT PRICE', pageWidth - margin - 32, y + 5, { align: 'right' })
  doc.text('TOTAL (IQD)', pageWidth - margin - 4, y + 5, { align: 'right' })

  y += 8.5

  // 3. Products Rows
  for (let i = 0; i < data.items.length; i++) {
    const item = data.items[i]
    const imgData = loadedImages[i]
    const rowHeight = 22

    // Page Break Check
    if (y + rowHeight > pageHeight - 38) {
      doc.addPage()
      currentPage++
      y = drawPageHeader()

      // Re-draw Table Header
      doc.setFillColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
      doc.roundedRect(margin, y, contentWidth, 7.5, 1, 1, 'F')
      doc.setFont(fontFamily, 'bold')
      doc.setFontSize(7)
      doc.setTextColor(255, 255, 255)
      doc.text('#', margin + 3, y + 5)
      doc.text('PRODUCT DETAILS', margin + 28, y + 5)
      doc.text('QTY', pageWidth - margin - 55, y + 5, { align: 'center' })
      doc.text('UNIT PRICE', pageWidth - margin - 32, y + 5, { align: 'right' })
      doc.text('TOTAL (IQD)', pageWidth - margin - 4, y + 5, { align: 'right' })
      y += 8.5
    }

    // Row Background (Alternating subtle)
    if (i % 2 === 0) {
      doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2])
      doc.rect(margin, y, contentWidth, rowHeight, 'F')
    }

    // Row Bottom Border
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2])
    doc.setLineWidth(0.2)
    doc.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight)

    // Index Number
    doc.setFont(fontFamily, 'bold')
    doc.setFontSize(8)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    doc.text(String(i + 1), margin + 3, y + 11)

    // Product Thumbnail
    const imgW = 16
    const imgH = 16
    const imgX = margin + 8
    const imgY = y + 3

    if (imgData) {
      try {
        doc.addImage(imgData, 'JPEG', imgX, imgY, imgW, imgH)
        doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2])
        doc.rect(imgX, imgY, imgW, imgH, 'S')
      } catch {
        doc.setFillColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2])
        doc.rect(imgX, imgY, imgW, imgH, 'F')
      }
    } else {
      doc.setFillColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2])
      doc.rect(imgX, imgY, imgW, imgH, 'F')
    }

    // Product Title & Brand
    const textX = margin + 28
    doc.setFont(fontFamily, 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])

    const maxTitleW = contentWidth - 85
    const titleLines: string[] = doc.splitTextToSize(item.product.name, maxTitleW)
    doc.text(titleLines[0], textX, y + 8)

    // Brand / SKU
    doc.setFont(fontFamily, 'normal')
    doc.setFontSize(7)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    const codeText = `${item.product.brand || 'FAKHAMA'} • Code: ${item.product.code}`
    doc.text(codeText, textX, y + 13)

    if (item.selectedOption) {
      doc.setFont(fontFamily, 'bold')
      doc.setTextColor(COLOR_BLUE[0], COLOR_BLUE[1], COLOR_BLUE[2])
      doc.text(`Option: ${item.selectedOption.name}`, textX, y + 17.5)
    }

    // Qty
    doc.setFont(fontFamily, 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
    doc.text(`${item.quantity}`, pageWidth - margin - 55, y + 11, { align: 'center' })

    // Unit Price
    doc.setFont(fontFamily, 'normal')
    doc.setFontSize(8)
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
    doc.text(`${item.product.price.toLocaleString()} IQD`, pageWidth - margin - 32, y + 11, { align: 'right' })

    // Subtotal
    doc.setFont(fontFamily, 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
    doc.text(`${(item.product.price * item.quantity).toLocaleString()} IQD`, pageWidth - margin - 4, y + 11, { align: 'right' })

    y += rowHeight
  }

  y += 6

  // 4. Prominent Box at the End of Orders Showing the Total Money in Dinar
  const totalBoxH = 26
  if (y + totalBoxH > pageHeight - 25) {
    doc.addPage()
    currentPage++
    y = drawPageHeader()
  }

  // Outer Box Frame
  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2])
  doc.roundedRect(margin, y, contentWidth, totalBoxH, 2, 2, 'F')
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2])
  doc.setLineWidth(0.4)
  doc.roundedRect(margin, y, contentWidth, totalBoxH, 2, 2, 'S')

  // Left side: Summary Info
  doc.setFont(fontFamily, 'bold')
  doc.setFontSize(9)
  doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
  doc.text('ORDER SUMMARY', margin + 6, y + 8)

  doc.setFont(fontFamily, 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2])
  doc.text(`Total Pieces Selected: ${data.totalItems} items`, margin + 6, y + 14)
  doc.text('All prices are in Iraqi Dinar (IQD). Thank you for your order!', margin + 6, y + 19)

  // Right side: Highlighted Total Money in Dinar Box
  const rightBoxW = 68
  const rightBoxX = pageWidth - margin - rightBoxW - 4
  doc.setFillColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2])
  doc.roundedRect(rightBoxX, y + 3, rightBoxW, totalBoxH - 6, 1.5, 1.5, 'F')

  doc.setFont(fontFamily, 'bold')
  doc.setFontSize(7)
  doc.setTextColor(COLOR_BLUE[0], COLOR_BLUE[1], COLOR_BLUE[2])
  doc.text('TOTAL AMOUNT IN DINAR', rightBoxX + rightBoxW / 2, y + 9, { align: 'center' })

  doc.setFont(fontFamily, 'bold')
  doc.setFontSize(12)
  doc.setTextColor(255, 255, 255)
  const totalDinarText = `${(data.estimatedTotal || 0).toLocaleString()} IQD`
  doc.text(totalDinarText, rightBoxX + rightBoxW / 2, y + 17, { align: 'center' })

  // Footer numbering
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    drawPageFooter(p, totalPages)
  }

  return doc
}

/**
 * Trigger download of generated PDF
 */
export function downloadSpecificationPDF(doc: jsPDF, filename = 'fakhama-order-specification.pdf') {
  doc.save(filename)
}
