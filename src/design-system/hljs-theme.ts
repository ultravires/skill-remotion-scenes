import { createGlobalStyle } from 'styled-components';

// This is a minimal version of Atom One Dark theme
export const HljsTheme = `
  .hljs {
    color: #abb2bf;
    background: #282c34;
  }
  .hljs-comment, .hljs-quote {
    color: #5c6370;
    font-style: italic;
  }
  .hljs-doctag, .hljs-keyword, .hljs-formula {
    color: #c678dd;
  }
  .hljs-section, .hljs-name, .hljs-selector-tag, .hljs-deletion, .hljs-subst {
    color: #e06c75;
  }
  .hljs-literal {
    color: #56b6c2;
  }
  .hljs-string, .hljs-regexp, .hljs-addition, .hljs-attribute, .hljs-meta .hljs-string {
    color: #98c379;
  }
  .hljs-attr, .hljs-variable, .hljs-template-variable, .hljs-type, .hljs-selector-class, .hljs-selector-attr, .hljs-tag, .hljs-number {
    color: #d19a66;
  }
  .hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-id, .hljs-title {
    color: #61afef;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: bold;
  }
  .hljs-link {
    text-decoration: underline;
  }
`;
