import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

import CardComponent from '../../components/CardComponent';
import TableComponent from '../../components/TableComponent';

import api from '../../services/api';

export interface Classes {
  cardCategory: string,
  cardTitle: string,
  stats: string,
  successText: string,
  upArrowCardCategory: string,
  cardTitleWhite: string,
  cardCategoryWhite: string,
  messages: string
}

interface DashboardProps {
  classes: Classes
}

export interface CovidCountry {
  country: string;
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated_at: Date;
}

interface CovidState {
  uid: number,
  uf: string,
  state: string,
  cases: number,
  deaths: number,
  suspects: number,
  refuses: number,
  broadcast?: boolean,
  comments?: string,
  datetime: Date
}

const Dashboard: React.FC<DashboardProps> = (props) => {

  const { classes  }= props;

  const [covidBrazil, setCovidBrazil] = useState<CovidCountry>({
    country: "Brazil",
    cases: 0,
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    updated_at: new Date()
  });

  const [covidCountries, setCovidCountries] = useState<CovidCountry[]>([]);

  const [covidStates, setCovidStates] = useState<CovidState[]>([]);

  function getDataFromApi() {
    api.get('brazil').then(response => {
      setCovidBrazil(response.data.data);
    });
    api.get('countries').then(response => {
      setCovidCountries(response.data.data);
    });
    api.get('').then(response => {
      setCovidStates(response.data.data);
    });
  }

  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <CardComponent
            classes={classes}
            color="success"
            icon="accessibility"
            category="Recuperados"
            number={covidBrazil.recovered}
            updatedAt={covidBrazil.updated_at}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <CardComponent
            classes={classes}
            color="info"
            icon="rule"
            category="Confirmados"
            number={covidBrazil.confirmed}
            updatedAt={covidBrazil.updated_at}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
        <CardComponent
            classes={classes}
            color="warning"
            icon="warning"
            category="Casos"
            number={covidBrazil.cases}
            updatedAt={covidBrazil.updated_at}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
        <CardComponent
            classes={classes}
            color="danger"
            icon="error"
            category="Mortes"
            number={covidBrazil.deaths}
            updatedAt={covidBrazil.updated_at}
          />
        </GridItem>
      </GridContainer>

      {/*
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart={true}>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart={true}>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart={true}>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>
                Last Campaign Performance
              </p>
            </CardBody>
            <CardFooter chart={true}>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart={true}>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>
                Last Campaign Performance
              </p>
            </CardBody>
            <CardFooter chart={true}>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      */}

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <TableComponent
            classes={classes}
            color="danger"
            title="Lista de casos por país"
            tableHead={["País", "Recuperados", "Confirmados", "Casos", "Mortes"]}
            tableData={
              covidCountries.map((covidCountries: CovidCountry) => {
                return [
                  covidCountries.country, 
                  covidCountries.recovered, 
                  covidCountries.confirmed, 
                  covidCountries.cases, 
                  covidCountries.deaths]
              })
            }
            updatedAt={covidBrazil.updated_at}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <TableComponent
            classes={classes}
            color="danger"
            title="Lista de casos por estado"
            tableHead={["Estado", "Suspeitos", "Descartados", "Casos", "Mortes"]}
            tableData={
              covidStates.map((covidStates: CovidState) => {
                return [
                  covidStates.uf,
                  covidStates.suspects,
                  covidStates.refuses,
                  covidStates.cases,
                  covidStates.deaths
                ];
              })
            }
            updatedAt={covidBrazil.updated_at}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(dashboardStyle)(Dashboard);
