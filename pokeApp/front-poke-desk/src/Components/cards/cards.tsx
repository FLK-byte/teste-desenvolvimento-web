import React from 'react';
import { styled } from '@mui/material/styles';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Typography, IconButton, IconButtonProps} from '@mui/material/';
import {Pokemon} from 'models/pokemon.model'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface IPokemon {
  pokemon: Pokemon
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const UrlNumberPath = (PokedexNumber: number): string => {
  if (PokedexNumber < 10) {
    return `00${PokedexNumber}`
  } else if (PokedexNumber < 100) {
    return `0${PokedexNumber}`
  }
  return `${PokedexNumber}`

}
export function Cards({pokemon}: IPokemon) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 215 }}>
      <CardHeader
        title={pokemon.Name }
      />
      <CardMedia
        component="img"
        height="215"
        image={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${UrlNumberPath(pokemon.Pokedex_Number)}.png`}
        alt="Pokemon"
      />
      <CardContent>
      </CardContent>
      <CardActions disableSpacing>
        <Typography paragraph>Pokemon Stats</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph={true}>{`Total Stats: ${pokemon.STAT_TOTAL} `}</Typography>
          <Typography>
            {`Attack: ${pokemon.ATK} Deffense: ${pokemon.DEF} Stamina: ${pokemon.STA} `}
          </Typography>
          <Typography paragraph={true}>{`Tipos: `}</Typography>
          <Typography>
            {`Tipo Primário: ${pokemon.Type_1}`}
          </Typography>
          <Typography>
            {`Tipo Secundário: ${pokemon.Type_2}`}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}