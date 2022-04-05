import { Banner, Page, Content } from "./style";
import { PokemonsScreen } from "../../Components/InputSection";
import PokemonsExibicao from "../../Components/pokemons/pokemons";

export function Home() {
  return (
    <Page>
      <Banner />
      <PokemonsScreen />
    </Page>
  );
}
