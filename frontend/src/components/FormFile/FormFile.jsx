import useFileReader from '@/hooks/useFileReader'
import './FormFile.css'
const FormFile = () => {
  const { handleFileUpload, clientMimeTypes, inputMimeTypes } = useFileReader()

  return (
    <>
      <h2>Subir Archivo</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleFileUpload(e.target.fileInput.files[0])
        }}
      >
        <label htmlFor="fileInput">
          Sube un archivo para leer
          <input
            name="fileInput"
            id="fileInput"
            type="file"
            accept={inputMimeTypes
              .map((type) => `${type.toLowerCase()}`)
              .join(', ')}
            aria-label="Sube un archivo para leer"
          />
        </label>
        {clientMimeTypes.length > 0 && (
          <div className="mime-types-list">
            <p>Formatos:</p>
            <ul>
              {clientMimeTypes.map((type, index) => (
                <li key={index}>.{type}</li>
              ))}
            </ul>
          </div>
        )}
        <button className="btn-form" title="Enviar" type="submit">
          Enviar
        </button>
      </form>
    </>
  )
}
export default FormFile
