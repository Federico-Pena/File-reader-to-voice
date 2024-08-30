import { useFileReader } from "@/hooks/useFileReader";
import "./FormFile.css";
const FormFile = () => {
  const { handleFileUpload } = useFileReader();

  return (
    <>
      <h2>Subir Archivo</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFileUpload(e.target.fileInput.files[0]);
        }}
      >
        <label htmlFor="fileInput">
          Sube un archivo para leer
          <input
            name="fileInput"
            id="fileInput"
            type="file"
            accept="application/pdf"
            aria-label="Sube un archivo para leer"
          />
        </label>
        <button className="btn-form" title="Enviar" type="submit">
          Enviar
        </button>
      </form>
    </>
  );
};
export default FormFile;
