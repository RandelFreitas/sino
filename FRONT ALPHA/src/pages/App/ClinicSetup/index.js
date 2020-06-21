import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

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
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { addClinic } from '../../../store/clinicReducer';

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

const ClinicSetup = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { clinicById } = props;
  let match = useRouteMatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    state: '',
    city: '',
    street: '',
    number: '',
    type: '',
    district: '',
    zip: '',
    obs: '',
  });
  
  const createClinic = (event) => {
    event.preventDefault();
    const clinic = {
      name,
      email,
      cnpj,
      phone,
      address
    }
    props.addClinic(clinic);
  }
  
  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary">
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
              
            </Typography>
          </CardActions>
        </Card>
      <Divider/>

      <Card className={classes.card}>
        <form onSubmit={createClinic} noValidate>
          <p style={{margin: 10}}>Dados</p>
          <div className={classes.data}>
            <TextField className={classes.middle}
              label="Nome:"
              
              onChange={event => setName(event.target.value)}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.middle}
              label="Email:"
              onChange={event => setEmail(event.target.value)}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </div>
          <div>
            <TextField className={classes.middle}
              label="CNPJ:"
              onChange={event => setCnpj(event.target.value)}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              />
            <TextField className={classes.middle}
              label="Telefone:"
              onChange={event => setPhone(event.target.value)}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </div>
          <Divider/>
          <div>
            <p style={{margin: 10}}>Endereço</p>
            <TextField className={classes.zip}
              label="Cep:"
              onChange={event => setAddress({zip: event.target.value})}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.street}
              label="Rua:"
              onChange={event => setAddress({...address, street: event.target.value})}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.district}
              label="Barro:"
              onChange={event => setAddress({...address, district: event.target.value})}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.city}
              label="Cidade:"
              onChange={event => setAddress({...address, city: event.target.value})}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.state}
              label="Estado:"
              onChange={event => setAddress({...address, state: event.target.value})}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.number}
              label="Número:"
              onChange={event => setAddress({...address, number: event.target.value})}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.middle}
              label="Tipo:"
              onChange={event => setAddress({...address, type: event.target.value})}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.middle}
              label="Complemento:"
              onChange={event => setAddress({...address, obs: event.target.value})}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </div>
          <Divider/>
          <Button type="submit" className={classes.button} variant="contained" color="primary">
            Salvar
          </Button>
          <Link  to={'/app'}>
            <Button className={classes.button} variant="contained" color="primary">
              Cancelar
            </Button>
          </Link>
        </form>
      </Card>
    </div>
  )
}

ClinicSetup.prototypes = {
  clinicById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  clinicById: state.clinic.clinicById,
  loading: state.clinic.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addClinic }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicSetup);

