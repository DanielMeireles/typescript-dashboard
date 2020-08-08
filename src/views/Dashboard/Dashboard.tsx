import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import CheckIcon from '@material-ui/icons/Check';
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import Button from '../../components/CustomButtons/Button';
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

import { bugs, website, server } from "../../variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import CustomInput from "../../components/CustomInput/CustomInput";
import Success from "../../components/Typography/Success";

import CardComponent from '../../components/CardComponent';

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

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { 
    cardCategory,
    cardTitle, 
    stats,
    successText,
    upArrowCardCategory,
    cardTitleWhite,
    cardCategoryWhite,
    messages
  } = props.classes;

  const classes = props.classes;

  const [value, setValue] = useState(0);
  const [creatingMessage, setCreatingMessage] = useState(false);
  const [messageFailed, setMessageFailed] = useState(true);
  const [messageSuccess, setMessageSuccess] = useState(true);

  const [covidBrazil, setCovidBrazil] = useState<CovidCountry>({
    country: "Brazil",
    cases: 0,
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    updated_at: new Date()
  });

  function getDataFromApi() {
    api.get('brazil').then(response => {
      setCovidBrazil(response.data.data);
      console.log(covidBrazil)
    });
  }

  useEffect(() => {
    getDataFromApi();
  }, []);

  function handleChange(value: number) {
    setValue(value);
  };

  function handleChangeIndex(index: number) {
    setValue(index);
  };

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
            category="Mortos"
            number={covidBrazil.deaths}
            updatedAt={covidBrazil.updated_at}
          />
        </GridItem>
      </GridContainer>

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
              <h4 className={cardTitle}>Daily Sales</h4>
              <p className={cardCategory}>
                <span className={successText}>
                  <ArrowUpward className={upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart={true}>
              <div className={stats}>
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
              <h4 className={cardTitle}>Email Subscriptions</h4>
              <p className={cardCategory}>
                Last Campaign Performance
              </p>
            </CardBody>
            <CardFooter chart={true}>
              <div className={stats}>
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
              <h4 className={cardTitle}>Completed Tasks</h4>
              <p className={cardCategory}>
                Last Campaign Performance
              </p>
            </CardBody>
            <CardFooter chart={true}>
              <div className={stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={cardTitleWhite}>Employees Stats</h4>
              <p className={cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
        <Card>
            <CardHeader color="success">
              <div className={messages}>
                <h4 className={cardTitleWhite}>Mensagens Positivas</h4>
                {!creatingMessage && (
                  <Button 
                    color="transparent" 
                    variant="outlined" 
                    onClick={() => setCreatingMessage(true)}
                  >
                    Enviar Mensagem
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardBody>
              {!creatingMessage 
                ? <React.Fragment>
                    <h5 className={cardTitle}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac est pulvinar, tempor turpis id, 
                      vehicula magna.
                    </h5>
                    <p className={cardCategory}>
                      Jane Doe
                    </p>
                  </React.Fragment> 
                : <React.Fragment>
                    <GridContainer>
                      <GridItem xs={12}>
                        <CustomInput
                          labelText="Nome"
                          id="name"
                          color="success"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12}>
                      <CustomInput
                        labelText="Mensagem"
                        id="message"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5
                        }}
                      />
                      </GridItem>
                    </GridContainer>
                  </React.Fragment>
              }
            </CardBody>
            {creatingMessage && (
              <CardFooter>
                <Button color="danger" onClick={() => setCreatingMessage(false)} >Cancelar</Button>
                <Button color="success">Enviar Mensagem</Button>
              </CardFooter>
            )}
            {messageFailed && (
              <CardFooter>
                <div className={stats}>
                  <Danger>
                    <Warning />
                    Falha ao enviar mensagem
                  </Danger>
                </div>
              </CardFooter>
            )}
            {messageSuccess && (
              <CardFooter>
                <div className={stats}>
                  <Success>
                    <CheckIcon />
                    Mensagem enviada com sucesso
                  </Success>
                </div>
              </CardFooter>
            )}
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(dashboardStyle)(Dashboard);
