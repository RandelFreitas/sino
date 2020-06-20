import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
import { getClinicById } from '../../../store/clinicReducer';

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
  const { loading } = props;

  useEffect(() => {
    let idUrl = window.location.href;
    idUrl = idUrl.split('/?');
    idUrl = idUrl[1];
    props.getClinicById(idUrl);
    
  },[]);

  let content;
  if(loading){
    content = (
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
              value={clinicById.name || ''}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.middle}
              label="Email:"
              value={clinicById.email}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </div>
          <div>
            <TextField className={classes.middle}
              label="CNPJ:"
              value={clinicById.cnpj || ''}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              />
            <TextField className={classes.middle}
              label="Telefone:"
              value={clinicById.phone || ''}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </div>
          <Divider/>
          <div>
            <p style={{margin: 10}}>Endereço</p>
            <TextField className={classes.zip}
              label="Cep:"
              value={clinicById.address.zip}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.street}
              label="Rua:"
              value={clinicById.address.street}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.district}
              label="Barro:"
              value={clinicById.address.district}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.city}
              label="Cidade:"
              value={clinicById.address.city}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.state}
              label="Estado:"
              value={clinicById.address.state}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.number}
              label="Número:"
              value={clinicById.address.number}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.middle}
              label="Tipo:"
              value={clinicById.address.type}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField className={classes.middle}
              label="Complemento:"
              value={clinicById.address.obs}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </div>
          <Divider/>
          <Button className={classes.button} variant="contained" color="primary">
            Salvar
          </Button>
          <Button className={classes.button} variant="contained" color="primary">
            Cancelar
          </Button>
        </Card>
      </div>
    );
  }else {
    content = "Carregando...";
  }
  
  return (
    <div>
      {content}
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
  bindActionCreators({ getClinicById }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicSetup);

