import jsPDF from 'jspdf'
import { EbookData } from '@/types/ebook'

// Helper function to strip markdown and HTML tags
function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '') // Remove markdown headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
    .replace(/`([^`]+)`/g, '$1') // Remove code blocks
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .trim()
}

export async function exportToPDF(ebook: EbookData) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = pdf.internal.pageSize.width
  const pageHeight = pdf.internal.pageSize.height
  const margin = 20
  const maxWidth = pageWidth - 2 * margin

  // Add title page
  pdf.setFontSize(24)
  pdf.setFont('helvetica', 'bold')
  const titleLines = pdf.splitTextToSize(ebook.title, maxWidth)
  const titleY = pageHeight / 2 - (titleLines.length * 10) / 2
  pdf.text(titleLines, pageWidth / 2, titleY, { align: 'center' })
  
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'normal')
  pdf.text(`by ${ebook.author}`, pageWidth / 2, titleY + titleLines.length * 10 + 10, { align: 'center' })

  // Add table of contents
  pdf.addPage()
  pdf.setFontSize(20)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Table of Contents', margin, 30)
  
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  let yPos = 50
  
  ebook.chapters.forEach((chapter, index) => {
    if (yPos > pageHeight - margin) {
      pdf.addPage()
      yPos = margin + 10
    }
    const tocText = `${index + 1}. ${chapter.title}`
    pdf.text(tocText, margin, yPos)
    yPos += 10
  })

  // Add chapters
  ebook.chapters.forEach((chapter, chapterIndex) => {
    if (chapterIndex > 0) {
      pdf.addPage()
    }

    // Chapter title
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    const chapterTitleLines = pdf.splitTextToSize(chapter.title, maxWidth)
    let yPosition = margin + 10
    
    chapterTitleLines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin + 10
      }
      pdf.text(line, margin, yPosition)
      yPosition += 10
    })

    yPosition += 5

    // Chapter content - strip markdown and format
    const cleanContent = stripMarkdown(chapter.content)
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'normal')
    
    const contentLines = pdf.splitTextToSize(cleanContent, maxWidth)
    
    for (let i = 0; i < contentLines.length; i++) {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin + 10
      }
      pdf.text(contentLines[i], margin, yPosition)
      yPosition += 6
    }
  })

  // Save the PDF
  const fileName = `${ebook.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
  pdf.save(fileName)
}

