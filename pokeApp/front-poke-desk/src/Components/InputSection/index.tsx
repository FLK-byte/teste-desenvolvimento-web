import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, CircularProgress, AutocompleteChangeReason, AutocompleteInputChangeReason } from '@mui/material/';
import { Pokemons } from "../../Components/pokemons/pokemons"
import { DeletePokemonModal } from "../deletePokemonModal/index"
import { CreatePokemonModal } from "../createPokemonModal/index"
import { Content } from '../../Pages/Home/style'
import { Pokemon } from "models/pokemon.model"
import api from '../../services/api';

export function PokemonSearch() {
  const [PokemonsFiltrados, setPokemonsFiltrados] = useState<Pokemon[]>()
  const [data, setData] = useState<Pokemon[]>()
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = (num: any) => {
    setPage(num);
  }

  useEffect(() => {
    const dados = async () => {
      setLoading(true)
      const res = await api.post<Pokemon[]>("pokemon")
      setData(res.data)
      setLoading(false)
    }
    dados()
  }, [])

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Pokemon | String | null,
    reason: AutocompleteChangeReason
  ) => {
    reason == "clear" ? setPokemonsFiltrados(undefined) :
      value && (value as Pokemon).Name ? setPokemonsFiltrados([value as Pokemon]) : null
  }
  const handleInput = (
    event: React.SyntheticEvent<Element, Event>,
    value: String,
  ) => {
    setPokemonsFiltrados(data?.filter(pokemon =>
      pokemon.Name.toLowerCase().match(value.toLowerCase())
    ))
  }

  return (
    <>
      <Content>
        <DeletePokemonModal />
        <CreatePokemonModal />
      </Content>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) => option.Name === value.Name}
        getOptionLabel={(option) => option.Name}
        freeSolo={true}
        onChange={handleChange}
        onInputChange={handleInput}
        options={data || []}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pokemons"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}

                </React.Fragment>
              ),
            }}
          />
        )}
      />
      {data &&
        <Pokemons pokemons={PokemonsFiltrados || data} page={page} handleClick={handleClick} />}
    </>
  );

}


