import { Banner, Page } from "./style";
import { PokemonSearch } from "../../Components/InputSection"


export function Home() {
    return (
        <Page>
            <Banner src="./src/assets/banner.png" />
            <PokemonSearch />
        </Page>)
}  