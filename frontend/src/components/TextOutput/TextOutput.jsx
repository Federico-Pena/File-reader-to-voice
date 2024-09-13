import {
  useDataContext,
  useFileReaderContext,
  useVoiceContext
} from '@/hooks/useUseContext'
import './TextOutput.css'
import { ACTIONS_LOCAL_DATA_TYPES } from '@/context/localDataContextReducer'
import { useEffect, useRef } from 'react'

const TextOutput = () => {
  const {
    currentParagraphs,
    currentPage,
    textParagraphs,
    readedTextIndex,
    nameFile,
    dispatch
  } = useDataContext()
  const { error, loading } = useFileReaderContext()
  const { speaking } = useVoiceContext()
  const wordRefs = useRef([])
  useEffect(() => {
    if (wordRefs.current[readedTextIndex]) {
      wordRefs.current[readedTextIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [readedTextIndex])

  const totalPages = textParagraphs.length
  const afterDisplay = speaking || window.speechSynthesis.pending ? 1 : 0

  const setIndexReadedText = (index) => {
    if (afterDisplay === 1) return
    dispatch({
      type: ACTIONS_LOCAL_DATA_TYPES.SET_READED_TEXT_INDEX,
      payload: index
    })
  }

  const renderTextWithHighlight = (paragraph) => {
    const words = paragraph.split('')
    wordRefs.current = []
    return words.map((word, index) => {
      const className =
        index <= readedTextIndex
          ? 'word-span-simple word-highlighted'
          : 'word-span-simple'
      return (
        <span
          key={index}
          className={className}
          onClick={() => setIndexReadedText(index)}
          ref={(el) => (wordRefs.current[index] = el)}
        >
          {word}
        </span>
      )
    })
  }

  if (loading) {
    return (
      <article className="articleText">
        <h2>Espere</h2>
        <span className="loader"></span>
      </article>
    )
  }

  if (error) {
    return (
      <article className="articleText">
        <h2 className="error">Ocurrió un error</h2>
        <p className="error">{error}</p>
      </article>
    )
  }

  if (currentParagraphs) {
    return (
      <article className="articleText">
        <samp className="page-info">
          Página: {currentPage + 1}/{totalPages}
        </samp>
        <h3>{nameFile ?? 'Texto extraído'}</h3>
        <p
          className="text-output"
          style={{
            '--after-scale': afterDisplay
          }}
        >
          {renderTextWithHighlight(currentParagraphs)}
        </p>
      </article>
    )
  }

  return null
}

export default TextOutput
