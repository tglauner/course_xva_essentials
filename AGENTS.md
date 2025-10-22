# Repository-wide Agent Instructions

- Use the shared `BlockMath` and `InlineMath` wrappers in `frontend/src/lib/math/MathComponents.jsx`, which internally leverage `better-react-mathjax`, instead of instantiating the low-level `MathJax` component directly. This keeps formula rendering consistent across modules.

