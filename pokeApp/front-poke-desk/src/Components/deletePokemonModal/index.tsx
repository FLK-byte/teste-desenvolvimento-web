import { useState } from 'react';
import { TextField, Modal, Button, Box, Grid } from '@mui/material';
import api from '../../services/api';
import {Cards} from '../cards/cards';
import {Pokemon} from 'models/pokemon.model'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({Name, Pokedex_Number}: Pokemon) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deletarPokemon = ()=>{  
      api.post("deletePokemon", {pokedexNumber : Pokedex_Number})
  }

  return (
    <>
      <Button onClick={handleOpen} disabled={Name ? false : true}>Deletar</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h1>Deseja Deletar o pokemon {Name ? Name : "selecionado"} ?</h1>
          <Button onClick={()=>{handleClose(),deletarPokemon()}}>SIM</Button>
          <Button onClick={handleClose}>NÃO</Button>
        </Box>
      </Modal>
    </>
  );
}

export function DeletePokemonModal() {
  const [open, setOpen] = useState(false);
  const [pokemonToSearch, setPokemonToSearch] = useState<string>();
  const [pokemonFinded, sePokemonFinded] = useState<Pokemon>();
 
  const littleApi = async (pokemon: string) => {
    const { data } = await api.post("pokemon", { name: pokemon })
    sePokemonFinded(data)
  }

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const clickButton = () => {
    littleApi(pokemonToSearch as string)
    console.log(pokemonFinded)
  }
  return (
    <>
      <Button onClick={handleOpen}>Deletar Pokemon</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Grid sx={{ ...style, width: 400, alignItems: "center" }} container spacing={1} direction="column">
          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Procure um pokemon" variant="outlined" onChange={event => setPokemonToSearch(event.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={clickButton}>Procurar pokemon</Button>
          </Grid>
          <Grid item xs={12}>
            {!pokemonFinded ? <p>Procure um pokemon para deletar</p> : <Cards {...pokemonFinded}/> }
          </Grid>
          <Grid item xs={12}>
            <ChildModal {...pokemonFinded as Pokemon}/>
          </Grid>

        </Grid>
      </Modal>
    </>
  );
}