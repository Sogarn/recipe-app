// src/App.tsx
import "./App.css";
import { useState, FormEvent } from "react";
import * as API from "./API"
import { Recipe } from "./types";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await API.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={(event) => handleSearchSubmit(event)}>
        <input
        type="text"
        required
        placeholder="Enter a search term ..."
        value={searchTerm}
        onChange={(event)=> setSearchTerm(event.target.value)}>
        </input>
        <button type="submit">Submit</button>
      </form>

      {recipes.map((recipe) => (
        <div>
          Recipe Image Location: {recipe.image}
          <br />
          Recipe Title: {recipe.title}
        </div>
      ))}
    </div>
  )
};

export default App;