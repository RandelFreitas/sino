import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Divider, 
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Typography } from '@material-ui/core';
import { addClinic, getClinicById, updateClinic, cleanClinic } from '../../../../store/clinicReducer';

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

  const { clinicById } = props;

  const defaultFormShape = {
    address: {
      state: '',
      city: '',
      street: '',
      number: '',
      type: '',
      district: '',
      zip: '',
      obs: ''
    },
    name: '',
    email: '',
    cnpj: '',
    phone: '',
  };

  useEffect(()=>{
    let idUrl = window.location.href;
    idUrl = idUrl.split('/?');
    idUrl = idUrl[1];
    if(idUrl){
      props.getClinicById(idUrl);
    }else{
      props.cleanClinic();
    }
  },[])
  
  const formik = useFormik ({
    initialValues: (clinicById._id? clinicById : defaultFormShape),
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Nome obrigatório!'),
      address: Yup.object({
        zip: Yup.string()
          .required('Cep obrigatorio!'),
      }),
    }),
      onSubmit: values => {
        props.updateClinic(values);
      },
  });

  return (
    <div>
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

      <form onSubmit={formik.handleSubmit}>
        <Card className={classes.card}>
            <p style={{margin: 10}}>Dados</p>
            <div className={classes.data}>
              <TextField className={classes.middle}
                variant="outlined"
                label="Nome:"
                name="name"
                InputLabelProps={{ shrink: true }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <div>
                {formik.touched.name && formik.errors.name ? (
                  <Typography className={classes.error}>{formik.errors.name}</Typography>
                ) : null}
              </div>
              <TextField className={classes.middle}
                variant="outlined"
                label="Email:"
                name="email"
                InputLabelProps={{ shrink: true }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address.zip}
              />
              <div>
                {formik.touched.zip && formik.errors.zip ? (
                  <Typography className={classes.error}>{formik.errors.address.zip}</Typography>
                ) : null}
              </div>
            </div>
            <div>
              <TextField className={classes.middle}
                label="CNPJ:"
                name="cnpj"
                
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                />
              <TextField className={classes.middle}
                label="Telefone:"
                name="phone"
                
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
                
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField className={classes.street}
                label="Rua:"
                name="street"
                
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField className={classes.district}
                label="Barro:"
                name="district"
                
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField className={classes.city}
                label="Cidade:"
                name="city"
                
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField className={classes.state}
                label="Estado:"
                name="state"
                
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField className={classes.number}
                label="Número:"
                name="number"
                
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField className={classes.middle}
                label="Tipo:"
                name="type"
                
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField className={classes.middle}
                label="Complemento:"
                name="obs"
                
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </div>
            <Divider/>
            <Button type="submit" className={classes.button} variant="contained" color="primary">
              Salvar
            </Button>
            <Link  to={'/app'}>
              <Button className={classes.button} variant="outlined" color="primary">
                Cancelar
              </Button>
            </Link>
        </Card>
      </form>
    </div>
  )
}

ClinicSetup.prototypes = {
  clinicById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  clinicById: state.clinic.clinicById,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addClinic, getClinicById, updateClinic, cleanClinic }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicSetup);

