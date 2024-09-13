const userAgentDetect = (userAgent) => {
  userAgent = userAgent.toLowerCase()

  if (/chrome|crios|crmo/.test(userAgent) && !/edg|opera|opr/.test(userAgent)) {
    return 'Google Chrome'
  } else if (/firefox|fxios/.test(userAgent)) {
    return 'Mozilla Firefox'
  } else if (/safari/.test(userAgent) && !/chrome|crios/.test(userAgent)) {
    return 'Safari'
  } else if (/edg/.test(userAgent)) {
    return 'Microsoft Edge'
  } else if (/opr|opera/.test(userAgent)) {
    return 'Opera'
  } else if (/msie|trident/.test(userAgent)) {
    return 'Internet Explorer'
  } else if (/android/.test(userAgent)) {
    return 'Navegador Android'
  } else if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'Navegador en iOS'
  } else {
    return 'Navegador desconocido'
  }
}
const speechSynthesisInWindow = () => {
  const navegador = userAgentDetect(navigator.userAgent)
  if (navegador === 'Mozilla Firefox') {
    return 'PC Firefox'
  } else if (
    navegador !== 'Microsoft Edge' &&
    /android/.test(navigator.userAgent.toLowerCase())
  ) {
    return 'Android no Edge'
  } else if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    return 'No speech recognition'
  } else {
    return true
  }
}

export { userAgentDetect, speechSynthesisInWindow }
