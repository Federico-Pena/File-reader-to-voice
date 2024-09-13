import useVoice from '@/hooks/useVoice'
import './SelectVoice.css'
import { useVoiceContext } from '@/hooks/useUseContext'
const SelectVoice = () => {
  const { changeVoice } = useVoice()
  const { selectedVoice, voices } = useVoiceContext()
  const handleVoiceChange = (event) => {
    const voiceName = event.target.value
    changeVoice(voiceName)
  }
  return (
    <>
      <h2>Opciones de Lectura</h2>
      <label htmlFor="voiceSelect">Selecciona una voz:</label>
      <select
        id="voiceSelect"
        value={selectedVoice ? selectedVoice.name : 'Voces'}
        onChange={handleVoiceChange}
        aria-label="Selecciona la voz para la lectura en voz alta"
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
    </>
  )
}
export default SelectVoice
