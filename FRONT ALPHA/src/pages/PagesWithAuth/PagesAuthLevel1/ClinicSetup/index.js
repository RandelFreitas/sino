import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

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
  Tabs } from '@material-ui/core';
import { addClinic, getClinicById } from '../../../../store/clinicReducer';

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
  },
  mask: {
    margin: 8,
    borderWidth: 1,
    height: 30,
    borderRadius: 4,
    borderColor: '#bcbcbc',
    textContent: 'auto'
  }
}));

const ClinicSetup = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dataInit = {
    name: '',
    email: '',
    cnpj: '',
    phone: '',
    address: {
      state: '',
      city: '',
      district: '',
      zip: '',
      obs: ''
    }
  }

  const [clinic, setClinic] = useState(dataInit);
  const onChange = (event) => {
    const { name, value } = event.target;
    setClinic({...clinic, [name]: value });
    console.log(clinic);
  }

  const onSubmit = () => {
    const newClinic = {
      name: clinic.name,
      email: clinic.email,
      cnpj: clinic.cnpj,
      phone: clinic.phone,
      address: clinic.address
    }
    props.addClinic(newClinic);
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
          <p style={{margin: 10}}>Dados</p>
          <div className={classes.data}>
            <TextField className={classes.middle}
              label="Nome:"
              name="name"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.middle}
              label="Email:"
              name="email"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </div>
          <div>
            <TextField className={classes.middle}
              label="CNPJ:"
              name="cnpj"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              />
          </div>
          <Divider/>
          <div>
            <p style={{margin: 10}}>Endereço</p>
            <TextField className={classes.zip}
              label="Cep:"
              name="zip"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.street}
              label="Rua:"
              name="street"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.district}
              label="Barro:"
              name="district"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.city}
              label="Cidade:"
              name="city"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.state}
              label="Estado:"
              name="state"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.number}
              label="Número:"
              name="number"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.middle}
              label="Tipo:"
              name="type"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.middle}
              label="Complemento:"
              name="obs"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </div>
          <Divider/>
          <Button onClick={onSubmit} className={classes.button} variant="contained" color="primary">
            Salvar
          </Button>
          <Link  to={'/app'}>
            <Button className={classes.button} variant="outlined" color="primary">
              Cancelar
            </Button>
          </Link>
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
  bindActionCreators({ addClinic, getClinicById }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicSetup);

