import PropTypes from "prop-types";

function SearchResults({ results }) {
  return (
    <div className="max-w-md mx-auto">
      {results?.length > 0 ? (
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-1">
            Resultados de la búsqueda:
          </p>
          {results.map((result, index) => (
            <div key={index} className="border-b border-gray-300 py-1">
              <p className="text-lg font-medium mb-1">
                Cancion: {result?.title}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                Artista: {result?.artist}
              </p>
              <p className="text-gray-600 text-sm">Album: {result?.album}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg font-medium text-gray-700">
          No se encontraron similitudes.
        </p>
      )}
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
};

export default SearchResults;
