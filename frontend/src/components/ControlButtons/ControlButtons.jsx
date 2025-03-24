import {
  IconBackNext,
  IconPause,
  IconPlay,
  IconStop
} from '@/components/Icons/Icons'
import './ControlButtons.css'
import { useDataContext, useVoiceContext } from '@/hooks/useUseContext'
import useVoice from '@/hooks/useVoice'
import { ACTIONS_LOCAL_DATA_TYPES } from '@/context/localDataContextReducer'
import { ACTIONS_VOICES_TYPES } from '@/context/voiceContextReducer'

const ControlButtons = () => {
  const { stop, play } = useVoice()
  const {
    dispatch: dispatchData,
    currentPage,
    textParagraphs
  } = useDataContext()
  const { rateUtterance, dispatch: dispatchVoice, speaking } = useVoiceContext()

  const totalPages = textParagraphs.length
  const setIndexReadedText = (index) => {
    dispatchData({
      type: ACTIONS_LOCAL_DATA_TYPES.SET_READED_TEXT_INDEX,
      payload: index
    })
  }

  const handleChangePage = (page) => {
    stop()
    dispatchData({
      type: ACTIONS_LOCAL_DATA_TYPES.SET_PAGE,
      payload: page
    })
    dispatchData({
      type: ACTIONS_LOCAL_DATA_TYPES.SET_CURRENT_PARAGRAPH,
      payload: textParagraphs[page]
    })
    setIndexReadedText(0)
  }

  return (
    <div className="btns-container">
      <label htmlFor="rate">
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          id="rate"
          value={rateUtterance}
          onChange={(e) => {
            stop()
            dispatchVoice({
              type: ACTIONS_VOICES_TYPES.SET_RATE_UTTERANCE,
              payload: e.target.value
            })
          }}
        />
        {Number(rateUtterance ?? 1).toFixed(2)}x
      </label>
      <button
        className="btn-play-pause"
        aria-label={speaking ? 'Pausar' : 'Reproducir'}
        title={speaking ? 'Pausar' : 'Reproducir'}
        onClick={() => play()}
      >
        {speaking ? <IconPause /> : <IconPlay />}
      </button>
      <button
        className="btn-cancel"
        aria-label="Detener"
        title="Detener"
        onClick={stop}
        disabled={!speaking && !window.speechSynthesis.pending}
      >
        <IconStop />
      </button>
      {totalPages > 0 ? (
        <div className="pagination-controls">
          <button
            type="button"
            disabled={currentPage === 0}
            className="icon-back-prev"
            onClick={() => currentPage > 0 && handleChangePage(currentPage - 1)}
            aria-label="Anterior"
          >
            <span aria-label="Anterior" role="img">
              <IconBackNext aria-label="Anterior" />
            </span>
          </button>
          <div
            className="pagination-container"
            style={{ '--total-pages': totalPages }}
          >
            {totalPages > 0 ? (
              Array.from({ length: totalPages }).map((page, index) => (
                <button
                  type="button"
                  title={`Pagina ${index + 1}`}
                  key={index}
                  onClick={() => handleChangePage(index)}
                  disabled={currentPage === index}
                >
                  {index + 1}
                </button>
              ))
            ) : (
              <button
                type="button"
                title={`Pagina 0`}
                onClick={() => handleChangePage(0)}
                disabled={currentPage === 0}
              >
                0
              </button>
            )}
          </div>
          <button
            type="button"
            disabled={currentPage === totalPages - 1}
            className="icon-back-next"
            onClick={() =>
              currentPage < totalPages - 1 && handleChangePage(currentPage + 1)
            }
            aria-label="Siguiente"
          >
            <span
              aria-label="Siguiente"
              role="img"
              onClick={() =>
                currentPage < totalPages - 1 &&
                handleChangePage(currentPage + 1)
              }
            >
              <IconBackNext />
            </span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
export default ControlButtons
