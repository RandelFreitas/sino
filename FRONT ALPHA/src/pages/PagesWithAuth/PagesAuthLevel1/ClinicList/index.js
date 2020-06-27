import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

import { list } from '../../../../store/clinicReducer';
import { auth2 } from '../../../../store/authReducer';
import { Modal } from '../../../../components';


const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    maxHeight: 300,
    margin: 50,
  },
  media: {
    height: 140,
  },
  button: {
    width: '100%',
    marginLeft: 50,
  },
  maxCaracter: {
    maxLength: 10,
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
});

const ClinicList = (props) => {
  const { clinics } = props;

  useEffect(() => {
    props.list();
    console.log('entrou')
  },[5]);

  const classes = useStyles();
  let match = useRouteMatch();

  return(
    <Grid container>
      <Modal />
      {clinics.map( clinic => {
        return(
          <Grid item className={classes.root} md={3} key={clinic._id}>  
            <Card>
              <CardActionArea>
                <CardMedia className={classes.media} image="/static/img/clinica01.png"/>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {clinic.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {clinic.address.city}
                  </Typography>
                </CardContent>
              </CardActionArea>
              
              <CardActions>
                <Button variant="contained" color="primary">
                  <a onClick={ () => props.auth2(clinic._id)}> Gerenciar </a>
                </Button>
                <Button variant="contained" color="primary">
                  <Link className={classes.link} to={`${match.url}/clinicSetup/?${clinic._id}`}> Configurações </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )})
      }
    </Grid>
  )
}

ClinicList.prototypes = {
  clinics: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  clinics: state.clinic.clinics
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({list, auth2}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicList);