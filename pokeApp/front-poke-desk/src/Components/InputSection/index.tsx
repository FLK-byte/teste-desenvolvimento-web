import React, { useState, useEffect, SyntheticEvent } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import PokemonsDisplay from "../../Components/pokemons/pokemons";
import { POKEMONS_PER_PAGE } from "../../utils/constants";
import DeletePokemonModal from "../deletePokemonModal/index";
import CreatePokemonModal from "../createPokemonModal/index";
import { Content } from "../../Pages/Home/style";
import api from "../../services/api";
import { toast } from "react-toastify";
import { AutocompleteChangeReason, Box } from "@mui/material";

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

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function PokemonsScreen() {
  const [PokemonsFiltrados, setPokemonsFiltrados] = useState<Pokemon[]>();

  const [data, setData] = useState<Pokemon[]>();
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>();

  const handleClick = (num: any) => {
    setPage(num);
  };

  useEffect(() => {
    const dados = async () => {
      setLoading(true);
      try {
        const { data } = await api.post<Pokemon[]>("/pokemon");
        setData(data);
        setTotalPages(Math.ceil(data.length / POKEMONS_PER_PAGE));
        setLoading(false);
        return;
      } catch (err) {
        toast.error("Po deu merda");
        setLoading(false);
        return;
      }
    };
    dados();
  }, []);

  const handleSearchPokemon = (
    event: SyntheticEvent,
    value: string | Pokemon | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason === "clear") {
      setPokemonsFiltrados(undefined);
      return;
    }
    if (value && (value as Pokemon)?.Name) {
      setPokemonsFiltrados([value as Pokemon]);
    }
  };

  const handleFilterBySearch = (_: SyntheticEvent, value: string) => {
    setPokemonsFiltrados(
      data?.filter((pokemon) =>
        pokemon.Name.toLowerCase().match(value.toLowerCase())
      )
    );
  };

  return (
    <>
      <Content>
        <DeletePokemonModal />
        <CreatePokemonModal />
      </Content>
      <Box mb={2}>
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.Name || option}
          options={data || []}
          loading={loading}
          freeSolo={true}
          onChange={handleSearchPokemon}
          onInputChange={handleFilterBySearch}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pokemons"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Box>
      {data && (
        <PokemonsDisplay
          pokemons={PokemonsFiltrados || data || []}
          page={page}
          handleClick={handleClick}
        />
      )}
    </>
  );
}
