import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

import { Link, useRouteMatch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { list, authClinic } from '../../../store/clinicReducer';
import PropTypes from 'prop-types';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 50,
  },
  media: {
    height: 140,
  },
});

const ClinicList = (props) => {
  const { clinics } = props;

  useEffect(() => {
    props.list();
  },[])

  const classes = useStyles();
  let match = useRouteMatch();

  return(
    <Grid container>
      {clinics.map( clinic => {
        return(
          <Grid item className={classes.root} md={3} key={clinic._id}>  
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
              <Button size="small" color="primary">
                <Link to={`${match.url}/clinica?${clinic._id}`}> Gerenciar </Link>
              </Button>
              <Button size="small" color="primary">
                <Link to={`${match.url}/menu`}> Configurações </Link>
              </Button>
              <Button size="small" color="primary">
                <p onClick={() => props.authClinic(clinic._id)}> HISTORY </p>
              </Button>
            </CardActions>
          </Grid>
        )
      })
    }     
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image="/static/img/mais.jpg"/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Cadastrar nova clínica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
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
  bindActionCreators({list, authClinic}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ClinicList);