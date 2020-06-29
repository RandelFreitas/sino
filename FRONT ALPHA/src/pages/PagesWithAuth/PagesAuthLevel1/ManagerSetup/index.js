import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Divider, 
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Typography,
  Tab,
  Paper,
  Tabs
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 8
  },
  middle: {
    width: '46%',
    margin: 8,
  },
  zip: {
    width: '26%',
    margin: 8,
  },
  street: {
    width: '66%',
    margin: 8,
  },
  district: {
    width: '26%',
    margin: 8,
  },
  city: {
    width: '21%',
    margin: 8,
  },
  state: {
    width: '21%',
    margin: 8,
  },
  number: {
    width: '20%',
    margin: 8,
  },
  button: {
    float: 'right',
    margin: 8,
  },
  media: {
    margin: 'auto',
    width: 140,
    height: 140,
  },
  card: {
    marginBottom: 10,
  },
  center: {
    margin: 'auto',
  }
}));

const ManagerSetup = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Perfil" />
          <Tab label="Clinicas" />
          <Tab label="Equipe" />
        </Tabs>
      </Paper>
      <Divider/>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="/static/img/clinica01.png"
              title="Contemplative Reptile"
            />
          </CardActionArea>
          <CardActions>
            <Button className={classes.center} size="small" color="primary">
              Alterar Foto
            </Button>
          </CardActions>
          <CardActions>
            <Typography className={classes.center} variant='h5'>
              Dr. Marcos Randel
            </Typography>
          </CardActions>
        </Card>
      <Divider/>
      <Card className={classes.card}>
        <p style={{margin: 10}}>Dados</p>
        <div className={classes.data}>
          <TextField className={classes.middle}
            label="Nome:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField className={classes.middle}
            label="Email:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </div>
        <div>
          <TextField className={classes.middle}
            label="Cpf:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            />
          <TextField className={classes.middle}
            label="Telefone:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </div>
        <Divider/>
        <div>
          <p style={{margin: 10}}>Endereço</p>
          <TextField className={classes.zip}
            label="Cep:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField className={classes.street}
            label="Rua:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField className={classes.district}
            label="Barro:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField className={classes.city}
            label="Cidade:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField className={classes.state}
            label="Estado:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField className={classes.number}
            label="Número:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField className={classes.middle}
            label="Tipo:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField className={classes.middle}
            label="Complemento:"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </div>
        <Divider/>
        <Button className={classes.button} variant="contained" color="primary">
          Editar
        </Button>
        <Button className={classes.button} variant="outline" color="primary">
          Cancelar
        </Button>
      </Card>
    </div>
  );
}

export default ManagerSetup;