import { MathJax } from 'better-react-mathjax'

const formatMath = (math, inline) => {
  if (typeof math !== 'string') {
    return ''
  }

  const trimmed = math.trim()
  if (!trimmed) {
    return ''
  }

  return inline ? `\\(${trimmed}\\)` : `\\[${trimmed}\\]`
}

export const BlockMath = ({ math }) => {
  const content = formatMath(math, false)
  if (!content) {
    return null
  }

  return (
    <MathJax dynamic>{content}</MathJax>
  )
}

BlockMath.defaultProps = {
  math: ''
}

export const InlineMath = ({ math }) => {
  const content = formatMath(math, true)
  if (!content) {
    return null
  }

  return (
    <MathJax dynamic inline>{content}</MathJax>
  )
}

InlineMath.defaultProps = {
  math: ''
}
