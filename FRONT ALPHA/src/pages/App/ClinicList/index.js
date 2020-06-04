import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Link, useRouteMatch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { list } from '../../../store/clinicReducer';
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

  function teste (){
    console.log(clinics.clinics.docs[1].cnpj);
  }

  const classes = useStyles();
  let match = useRouteMatch();

        return(
          <Link to={`${match.url}/clinica`}>
            <Typography onClick={teste}>TESTE </Typography>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/static/img/clinica01.png"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Clinica
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Guaraciaba do Norte - CE
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        )
}

ClinicList.prototypes = {
  clinics: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  clinics: state.clinic
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({list}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ClinicList);