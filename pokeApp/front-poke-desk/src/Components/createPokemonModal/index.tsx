import { useState, useEffect } from 'react';
import { Fade, Button, Modal, Box, Backdrop } from '@mui/material/';
import { CreatePokemonForm } from '../createPokemonForm/index'
import api from '../../services/api'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function CreatePokemonModal() {
  const [open, setOpen] = useState(false);
  const [pokedexNumber, setPokedexNumber] = useState();

  useEffect(() => {
    const call = async () => {
      const { data } = await api.get("pokemon")
      setPokedexNumber(data)
      console.log(data)
    }
    call()
  }, [])


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Criar Pokemon</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <CreatePokemonForm number={pokedexNumber} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}