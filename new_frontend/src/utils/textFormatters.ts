/**
 * Text formatting utilities for converting line breaks and newlines to HTML
 */

/**
 * Converts line breaks (\n) to HTML <br> tags
 * @param text - The text to format
 * @returns Formatted text with <br> tags
 */
export const lineBreaksToBr = (text: string): string => {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
};

/**
 * Converts newlines (\r\n, \n, \r) to HTML <br> tags
 * @param text - The text to format
 * @returns Formatted text with <br> tags
 */
export const newlineToBreak = (text: string): string => {
  if (!text) return '';
  return text.replace(/\r\n|\n|\r/g, '<br>');
};

/**
 * Converts double line breaks to paragraph breaks
 * @param text - The text to format
 * @returns Formatted text with paragraph breaks
 */
export const doubleBrToParagraph = (text: string): string => {
  if (!text) return '';
  return text.replace(/\n\n/g, '</p><p>');
};

/**
 * Preserves whitespace and converts line breaks to <br> tags
 * @param text - The text to format
 * @returns Formatted text with preserved whitespace
 */
export const preserveWhitespace = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\n/g, '<br>')
    .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
    .replace(/  /g, '&nbsp;&nbsp;');
};
