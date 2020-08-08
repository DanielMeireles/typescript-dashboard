import React from 'react';
import DateRange from "@material-ui/icons/DateRange";
import Icon from "@material-ui/core/Icon";

import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardFooter from '../Card/CardFooter';
import CardIcon from '../Card/CardIcon';

import { Classes } from '../../views/Dashboard/Dashboard';

interface CardComponentProps {
  classes: Classes,
  color: string,
  icon: string,
  category: string,
  number: number,
  updatedAt: Date
}

const CardComponent: React.FC<CardComponentProps> = ({ classes, color, icon, category, number, updatedAt, children }) => {
  const { cardCategory, cardTitle, stats } = classes;
  return (
    <Card>
      <CardHeader color={color} stats={true} icon={true}>
      <CardIcon color={color}>
        <Icon>{icon}</Icon>
      </CardIcon>
        <p className={cardCategory}>{category}</p>
        <h3 className={cardTitle}>{number}</h3>
      </CardHeader>
      <CardFooter stats={true}>
        <div className={stats}>
          <DateRange />
          Última atualização {new Date(updatedAt).toLocaleTimeString()}
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;