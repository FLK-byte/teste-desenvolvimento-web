import { useQuery } from "../../services/hook"
import {Pokemon} from 'models/pokemon.model'


export function BuscarAPI() {
  const { data, loading, refetch } = useQuery<Pokemon[]>({ query: "pokemons" }, 1)
  console.log(data)
  return (
    <div>
      <h3>
        Lista de Pokemons Abaixo
      </h3>
      <ul>
        {
          data && data.map((item) => (<li> {item.Name}</li>))
        }
      </ul>
    </div>

  )
}