import React, { useEffect } from "react";
import { Fade, Button, Modal, Typography, Box, Backdrop } from "@mui/material/";
import { CreatePokemonForm } from "../createPokemonForm/index";
import api from "../../services/api";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CreatePokemonModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreatePokemonModal({
  open,
  onClose,
}: CreatePokemonModalProps) {
  const [pokedexNumber, setPokedexNumber] = React.useState<number>();

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await api.get("pokemon");
      console.log(data);
      setPokedexNumber(data);
    };
    fetchApi();
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <CreatePokemonForm number={+pokedexNumber} />
        </Box>
      </Fade>
    </Modal>
  );
}
