import '@/App.css'
import FormFile from '@/components/FormFile/FormFile'
import { useFileReaderContext, useDataContext } from '@/hooks/useUseContext'
import TextOutput from '@/components/TextOutput/TextOutput'
import SelectVoice from './components/SelectVoice/SelectVoice'
import ControlButtons from './components/ControlButtons/ControlButtons'
function App() {
  const { error, loading } = useFileReaderContext()
  const { currentParagraphs } = useDataContext()

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
