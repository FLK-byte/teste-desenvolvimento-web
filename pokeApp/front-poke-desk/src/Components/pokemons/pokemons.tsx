import React from "react";
import { POKEMONS_PER_PAGE } from "../../utils/constants";
import Cards from "../cards/cards";
import Pagination from "@mui/material/Pagination";
import { Content } from "../../Pages/Home/style";
import { Container, Grid } from "@mui/material";

interface Pokemon {
  Name: string;
  Pokedex_Number: number;
  Type_1: string;
  Type_2: string;
  STAT_TOTAL: string;
  ATK: string;
  DEF: string;
  STA: string;
}

interface PokemonsProps {
  pokemons: Pokemon[];
  page: number;
  handleClick: (page: number) => void;
}

const pokemons = ({ pokemons, page, handleClick }: PokemonsProps) => {
  const startIndex = (page - 1) * POKEMONS_PER_PAGE;
  const selectedPokemons = pokemons.slice(
    startIndex,
    startIndex + POKEMONS_PER_PAGE
  );

  const totalPages = Math.ceil(pokemons.length / POKEMONS_PER_PAGE);

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {selectedPokemons.map((pokemon: Pokemon, key) => (
            <Grid item xs={12} md={3}>
              <Cards pokemon={pokemon} key={key} />
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, page) => handleClick(page)}
        />
      </Container>
    </>
  );
};

export default pokemons;
