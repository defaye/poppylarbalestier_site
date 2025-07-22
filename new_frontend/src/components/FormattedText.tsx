import React from 'react';
import { lineBreaksToBr, newlineToBreak, preserveWhitespace } from '@/utils/textFormatters';

interface FormattedTextProps {
  text: string;
  className?: string;
  preserveWhitespace?: boolean;
  convertNewlines?: boolean;
}

/**
 * Component that renders text with line breaks converted to <br> tags
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ 
  text, 
  className = '', 
  preserveWhitespace: preserve = false,
  convertNewlines = true
}) => {
  const formatText = (inputText: string): string => {
    if (!inputText) return '';
    
    if (preserve) {
      return preserveWhitespace(inputText);
    }
    
    if (convertNewlines) {
      return newlineToBreak(inputText);
    }
    
    return lineBreaksToBr(inputText);
  };

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: formatText(text) }}
    />
  );
};

/**
 * Component specifically for CMS content that needs line break formatting
 */
export const CMSContent: React.FC<{ content: string; className?: string }> = ({ 
  content, 
  className = '' 
}) => {
  return (
    <FormattedText 
      text={content} 
      className={className}
      convertNewlines={true}
    />
  );
};

/**
 * Hook to format text with line breaks
 */
export const useFormattedText = (text: string, options: {
  preserveWhitespace?: boolean;
  convertNewlines?: boolean;
} = {}) => {
  const { preserveWhitespace: preserve = false, convertNewlines = true } = options;
  
  const formatText = React.useCallback((inputText: string): string => {
    if (!inputText) return '';
    
    if (preserve) {
      return preserveWhitespace(inputText);
    }
    
    if (convertNewlines) {
      return newlineToBreak(inputText);
    }
    
    return lineBreaksToBr(inputText);
  }, [preserve, convertNewlines]);

  return formatText(text);
};
