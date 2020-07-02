import React, { useEffect, useState } from 'react';
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
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import Pagination from '@material-ui/lab/Pagination';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

import { list } from '../../../../store/clinicReducer';
import { AlertDialog } from '../../../../components/';

const useStyles = makeStyles((theme) =>({
  root: {
    flexGrow: 1,
  },
  item: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
  center: {
    justifyContent: 'center',
  },
  clinics: {
    justifyContent: 'space-between'
  },
}));

const ClinicList = (props) => {
  const classes = useStyles();
  const match = useRouteMatch();
  
  const { clinics, infos } = props;
  const nOfPages = infos.pages;
  const [page, setPage] = useState(1);
  const [nOfItems, setNoOfItems] = useState(9);

  useEffect(() => {
    props.list(page, nOfItems);
  },[page, nOfItems]);
  
  const handleChange=(event, value)=>{
    setPage(value);
  }
  const handleNofItems=(event)=>{
    setNoOfItems(event.target.value);
    setPage(1);
  }

  const mapClinic = (
    <React.Fragment>
      {clinics.map( clinic => {
          return(
            <Grid key={clinic._id} item md={4} sm={6} xs={12}>
              <div className={classes.item}>  
                <Card>
                  <CardActionArea>
                    <CardMedia className={classes.media} image="/static/img/clinica01.png"/>
                    <CardContent>
                      <Typography noWrap variant="h5" component="h2">
                        {clinic.name}
                      </Typography>
                      <Typography noWrap variant="body2" color="textSecondary" component="p">
                        {clinic.address.city} - {clinic.address.state}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className={classes.center}>
                    <Button component={Link} to={`${match.url}/clinic/?${clinic._id}`} variant="contained" color="primary">
                      Gerenciar
                    </Button>
                    <Button component={Link} to={`${match.url}/clinicSetup/?${clinic._id}`} variant="contained" color="primary">
                      Configurações
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </Grid>
          )})
        }
    </React.Fragment>
  )

  return(
    <div className={classes.root}>
      <Grid className={classes.center} container spacing={1}>
        <Grid className={classes.clinics} container item xs={12} >
          <AlertDialog />
          <div>
            <FormControl>
              <FormHelperText>Número por página:</FormHelperText>
              <Select
                value={nOfItems}
                onChange={handleNofItems}
                inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={27}>27</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid container item className={classes.center} xs={12} spacing={3}>
          <Box component="span">
            <Pagination
              count={nOfPages}
              page={page}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          {mapClinic}
        </Grid>
        <Grid className={classes.center} container item xs={12} spacing={3}>
          <Box component="span">
            <Pagination
              count={nOfPages}
              page={page}
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

ClinicList.prototypes = {
  clinics: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  clinics: state.clinic.clinics,
  infos: state.clinic.infos,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({list}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicList);