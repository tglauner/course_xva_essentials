# Repository-wide Agent Instructions

- When updating or adding mathematical content in frontend modules, render formulas with KaTeX components (e.g., `BlockMath`/`InlineMath` from `better-react-mathjax`) instead of plain HTML so expressions display with professional mathematical typography.
- Standardize on the exported `BlockMath` and `InlineMath` helpers from `better-react-mathjax`; avoid instantiating the low-level `MathJax` component directly so formula rendering remains consistent across modules.
