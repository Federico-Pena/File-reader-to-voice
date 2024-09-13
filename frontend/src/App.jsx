import '@/App.css'
import FormFile from '@/components/FormFile/FormFile'
import { useFileReaderContext, useDataContext } from '@/hooks/useUseContext'
import TextOutput from '@/components/TextOutput/TextOutput'
import SelectVoice from './components/SelectVoice/SelectVoice'
import ControlButtons from './components/ControlButtons/ControlButtons'
import { speechSynthesisInWindow } from './utils/compatibilityNavigator'
import Compatibility from './components/Compatibility'
function App() {
  const { error, loading } = useFileReaderContext()
  const { currentParagraphs } = useDataContext()

  if (speechSynthesisInWindow() !== true) {
    return (
      <main className="mainApp">
        <section className="section-textOutput">
          <Compatibility />
        </section>
      </main>
    )
  }

  return (
    <main className="mainApp">
      <section className="section-formFile">
        <FormFile />
      </section>
      <section className="section-selectVoice">
        <SelectVoice />
        <ControlButtons />
      </section>
      {(error || currentParagraphs || loading) && (
        <section className="section-textOutput">
          <TextOutput />
        </section>
      )}
    </main>
  )
}

export default App
