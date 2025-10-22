# Repository-wide Agent Instructions

- When updating or adding mathematical content in frontend modules, render formulas with KaTeX components (e.g., `BlockMath`/`InlineMath` from `better-react-mathjax`) instead of plain HTML so expressions display with professional mathematical typography.
- Use the shared `BlockMath` and `InlineMath` wrappers in `frontend/src/lib/math/MathComponents.jsx`, which internally leverage `better-react-mathjax`, instead of instantiating the low-level `MathJax` component directly. This keeps formula rendering consistent across modules.
