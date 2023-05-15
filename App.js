import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const apiKey = "36399964-17a53c0ffca7e3cb47120cae8"; 

  // Fonction qui récupère les données à partir de l'API Pixabay
  const fetchData = async () => {
    if (searchTerm) {
      // Construire l'URL de l'API Pixabay avec la clé API et la requête de recherche
      const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}`;

      // Appel de l'API avec Axios
      const response = await axios.get(apiUrl);

      // On stock nos résultats dans le state
      setResults(response.data.hits);
    }
  };

  // On utilise useEffect pour appeler fetchData lorsqu'il y a un changement dans searchTerm
  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  // Fonction qui gère la soumission de notre formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Recherche d'images</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border border-gray-300 rounded py-2 px-4 mb-4"
          type="text"
          placeholder="Recherche..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Rechercher
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {/* Afficher les résultats d'image sous forme de cartes */}
        {results.map((result) => (
          <div key={result.id} className="rounded overflow-hidden shadow-lg">
            <img src={result.previewURL} alt={result.tags} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {result.user}
              </div>
              <p className="text-gray-700 text-base">
                {result.tags}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {result.likes} likes
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {result.views} views
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {result.comments} comments
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
