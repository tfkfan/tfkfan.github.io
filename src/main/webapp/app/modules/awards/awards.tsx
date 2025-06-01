import './awards.scss';

import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, Col, Row} from 'reactstrap';
import {Translate} from "react-jhipster";

export const Awards = () => <Row>
  <Col md="12">
    <div className="awards-container">
      <Card>
        <img alt="hack" src="content/images/hack.jpg"/>
        <CardBody>
          <CardTitle tag="h5">
            <Translate contentKey="awards.hack.title"></Translate>
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            <Translate contentKey="awards.hack.subtitle"></Translate>
          </CardSubtitle>
        </CardBody>
      </Card>
    </div>
  </Col>
</Row>
export default Awards;
