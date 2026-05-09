import { defineConfig } from 'unocss'

/**
 * UnoCSS shortcut tokens for syai-claude-workshop.
 *
 * Palette anchors (D-01, locked in 02-CONTEXT.md):
 *   --bg-main:      #1A1714  warm near-black slide canvas
 *   --surface-code: #14110E  ~3% darker, code-block panel only (D-02, D-05)
 *   --text-main:    #F4ECE0  warm cream body / heading text
 *   --text-dim:     rgba(244, 236, 224, 0.65)  secondary cream
 *   --accent:       #CC785C  rust — code-block left rule + opt-in (D-03, D-04)
 *
 * Per D-08, every color used in slides.md or style.css MUST flow through
 * one of these shortcuts. No inline hex literals in slides.
 */
export default defineConfig({
  shortcuts: {
    // Backgrounds
    'bg-main': 'bg-[#1A1714]',
    'bg-surface-code': 'bg-[#14110E]',

    // Text
    'text-main': 'text-[#F4ECE0]',
    'text-dim': 'text-[rgba(244,236,224,0.65)]',
    'text-accent': 'text-[#CC785C]',

    // Borders (consumed by code-block left rule in 02-03)
    'border-accent': 'border-[#CC785C]',
  },
})
