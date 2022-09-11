import { useEffect, useState } from "react";
import Character from "./Character";

function NavPage({ page, setPage }) {
  const nextPage = () => {
    setPage(page + 1);
  };

  const previewPage = () => {
    setPage(page == 1 ? page : page - 1);
  };
  return (
    <header className="d-flex justify-content-between">
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => {
          previewPage();
        }}
      >
        Page: {page - 1}
      </button>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => {
          nextPage();
        }}
      >
        Page: {page}
      </button>
    </header>
  );
}

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const URL = `https://rickandmortyapi.com/api/character?page=${page}`;
  const callAPI = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data.results);
    setCharacters(data.results);
    setLoading(false);
  };

  useEffect(() => {
    callAPI();
  }, []);

  useEffect(() => {
    callAPI();
  }, [page]);

  return (
    <div className="container ">
      <NavPage page={page} setPage={setPage} />

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="row"></div>
          <div className="row">
            {characters.map((character) => {
              return (
                <div className="col-md-4" key={character.id}>
                  <Character character={character} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterList;
