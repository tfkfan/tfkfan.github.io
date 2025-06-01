import './publications.scss';

import React from 'react';
import {Col, Row} from 'reactstrap';
import {Translate} from "react-jhipster";

export const Publications = () => <Row>
  <Col md="12">
    <h3 className="subtitle">
      <Translate contentKey="publications.title"></Translate>
    </h3>
    <p>
      <ul>
        <li><a href="https://habr.com/ru/articles/774322/">
          <Translate contentKey="publications.one"></Translate></a></li>
        <li><a href="https://habr.com/ru/articles/800689/">
          <Translate contentKey="publications.two"></Translate></a></li>
        <li><a href="https://habr.com/ru/articles/771630/">
          <Translate contentKey="publications.three"></Translate></a></li>
        <li><a href="https://habr.com/ru/articles/803969/">
          <Translate contentKey="publications.four"></Translate></a></li>
      </ul>
    </p>
  </Col>
</Row>
export default Publications;
