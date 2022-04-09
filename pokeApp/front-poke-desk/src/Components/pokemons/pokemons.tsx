import { POKEMONS_PER_PAGE } from '../../utils/constants';
import {Cards} from '../cards/cards';
import Pagination from '@mui/material/Pagination';
import { Content } from "../../Pages/Home/style";
import {Pokemon} from 'models/pokemon.model'

interface pokemonsProps {
  pokemons: Pokemon[],
  page:number,
  handleClick: (page : number)=>void
}

export const Pokemons = ({ pokemons, page, handleClick } : pokemonsProps) => {
  const startIndex = (page - 1) * POKEMONS_PER_PAGE;
  const selectedPokemons = pokemons.slice(startIndex, startIndex + POKEMONS_PER_PAGE);
  const totalPages = Math.ceil(pokemons.length / POKEMONS_PER_PAGE)
  return <>
    <Content>
      {
        selectedPokemons.map((pokemon: Pokemon) => (
          <Cards {...pokemon} />
        ))
      }
    </Content>
    <Pagination count={totalPages} page={page} onChange={(event, page) => handleClick(page)} />
  </>
}



