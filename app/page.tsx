"use client";
import { useState, useEffect } from "react";
import PokeCard from "./components/card";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  display:"swap"
});
export default function Home() {
  const [pokelist, setPokeList] = useState();
  const [limit, setLimit] = useState(20);
  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    .then(response => response.json())
    .then(json => setPokeList(json.results))
    .catch(error => console.error(error));
  },[limit]);
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex justify-around w-full pb-4 ">
          <div className={`${lexend.className} text-6xl font-bold text-sky-50`}>POKÉDEX</div>
        </header>
        <div>
        <div className="flex flex-col items-center">
          <label htmlFor="limit" className={`${lexend.className} text-white`}>Number of Pokémon</label>
        <input type="number" value={limit} onChange={(e) => setLimit(parseInt(e.target.value))} className={`${lexend.className} shadow-inner shadow-gray-500 rounded-4xl p-4 rounded-3xl text-center bg-transparent`} aria-label="limit"/>
        </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pokelist?.map((pokemon: {name: string, url: string}) => {
            return (
              <PokeCard key={pokemon.name} url={pokemon.url} />
            );
          }
          )}
        </div>
      </div>
    </main>);
}
