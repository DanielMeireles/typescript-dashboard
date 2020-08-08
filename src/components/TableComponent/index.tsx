import React from 'react';

import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import Table from '../Table/Table';

import { Classes } from '../../views/Dashboard/Dashboard';

interface TableComponentProps {
  classes: Classes,
  color: string,
  title: string,
  tableHead: string[],
  tableData: (string | number)[][],
  updatedAt: Date
}

const TableComponent: React.FC<TableComponentProps> = ({ classes, color, title, tableHead, tableData, updatedAt }) => {
  const { cardTitleWhite, cardCategoryWhite } = classes;
  return (
    <Card>
      <CardHeader color={color}>
        <h4 className={cardTitleWhite}>{title}</h4>
        <p className={cardCategoryWhite}>
          Última atualização {new Date(updatedAt).toLocaleTimeString()}
        </p>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor={color}
          tableHead={tableHead}
          tableData={tableData}
        />
      </CardBody>
    </Card>
  );
}


export default TableComponent;