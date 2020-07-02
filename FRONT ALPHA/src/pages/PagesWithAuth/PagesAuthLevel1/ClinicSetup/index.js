import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

import { Formik } from 'formik';
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
  let match = useRouteMatch();
  const { clinicById } = props;

  const [idUrl, setIdUrl] = useState(window.location.href.split('/?')[1]);
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
    if(idUrl){
      props.getClinicById(idUrl);
    }else{
      props.cleanClinic();
    }
  },[])

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
      </Card>
      <Divider/>

      <Formik 
        initialValues= {clinicById._id? clinicById : defaultFormShape}
        enableReinitialize

        validationSchema={Yup.object({
          name: Yup.string()
            .required('Nome obrigatório!'),
          address: Yup.object({
            zip: Yup.string()
              .required('Cep obrigatorio!'),
          }),
        })}

        onSubmit={(values) => {
          if(clinicById._id){
            const { name, email, cnpj, phone } = values;
            const { state, city, street, number, type, district, zip, obs } = values.address;
            const address = {state, city, street, number, type, district, zip, obs};
            const clinicUpdate = { name, email, cnpj, phone, address };
            props.updateClinic(clinicUpdate, clinicById._id);
          }else{
            props.addClinic(values);
          }
        }} 
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
          <Card className={classes.card}>
            <p style={{margin: 10}}>Dados</p>
            <div className={classes.data}>
              <TextField className={classes.middle}
                variant="outlined"
                label="Nome:"
                name="name"
                InputLabelProps={{ shrink: true }}
                {...formik.getFieldProps('name')}
              />
              <div>
                {formik.touched.name && formik.errors.name ? (
                  <Typography className={classes.error}>{formik.errors.name}</Typography>
                ) : null}
              </div>
              <TextField className={classes.middle}
                variant="outlined"
                label="Cep:"
                name="address.zip"
                InputLabelProps={{ shrink: true }}
                {...formik.getFieldProps('address.zip')}
              />
              <div>
                {formik.touched.address && formik.errors.address ? (
                  <Typography className={classes.error}>{formik.errors.address.zip}</Typography>
                ) : null}
              </div>
              <Divider/>
              <Button type="submit" className={classes.button} variant="contained" color="primary">
                {clinicById._id? 'Atualizar': 'Salvar'}
              </Button>
              <Button className={classes.button} variant="outlined" color="primary">
                Cancelar
              </Button>
            </div>
          </Card>
        </form>
        )}
      </Formik>
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

