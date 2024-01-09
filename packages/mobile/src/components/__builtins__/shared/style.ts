export function getStyleNumber (value: string | number) {
  const num = Number(value)
  if (isNaN(num)) {
    return value
  } else {
    return `${value}px`
  }
}

export function pascalCaseToKebabCase (str) {
  return str.replace(/([A-Z])/g, match => '-' + match.toLowerCase())
}
