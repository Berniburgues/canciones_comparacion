import { useState } from "react";
import $ from "jquery";
import SearchResults from "./SearchResults";

function UploadSong() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = "6f72fbbdac8d2462efa74e33c8f87caa";

  async function handleFileSelect(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
      setError(new Error("Debe seleccionar un archivo de audio."));
      return;
    }

    setIsLoading(true);
    setError(null);

    const data = new FormData();
    data.append("api_token", API_KEY);
    data.append("return", "timecode");
    data.append("file", selectedFile);

    $.ajax({
      url: "https://api.audd.io/",
      type: "POST",
      data: data,
      contentType: false,
      processData: false,
      success: function (response) {
        setIsLoading(false);
        const resultArray = Array.isArray(response.result)
          ? response.result
          : [response.result];
        setResults(resultArray);
      },
      error: function (error) {
        setIsLoading(false);
        setError(error);
        console.log(error);
      },
    });
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Subir canción y buscar similitudes
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-lg font-medium text-gray-700">
            Seleccione un archivo de audio:
          </span>
          <input
            type="file"
            onChange={handleFileSelect}
            className="bg-gray-200 py-2 px-3 rounded-md"
          />
        </label>
        <button
          type="submit"
          disabled={!selectedFile || isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300 ease-in-out disabled:bg-gray-400 disabled:pointer-events-none"
        >
          {isLoading ? "Buscando..." : "Buscar similitudes"}
        </button>
      </form>
      {error && (
        <p className="text-red-500 mt-4">
          Ocurrió un error al buscar similitudes: {error.message}
        </p>
      )}
      {results && <SearchResults results={results} />}
    </div>
  );
}

export default UploadSong;
