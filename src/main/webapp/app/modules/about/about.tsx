import './about.scss';

import React from 'react';
import {Translate} from 'react-jhipster';
import {Col, Row} from 'reactstrap';

export const About = () => {

  return (
    <Row>
      <Col md="12">
        <h4>
          <Translate contentKey="about.title">This is your homepage</Translate>
        </h4>

        <p className="lead">
          <Translate contentKey="about.subtitle">This is your homepage</Translate>
        </p>

        <p>
          <Translate contentKey="about.main"></Translate>
        </p>
        <p>
          <Translate contentKey="about.accomplishments.title"></Translate>
          <ul>
            <li><Translate contentKey="about.accomplishments.author"></Translate></li>
            <li><Translate contentKey="about.accomplishments.community"></Translate>&nbsp;<a
              href="https://forgamedev.ru/">forgamedev.ru</a></li>
            <li><Translate contentKey="about.accomplishments.projects"></Translate></li>
            <li><Translate contentKey="about.accomplishments.game"></Translate></li>
            <li><Translate contentKey="about.accomplishments.framework"></Translate>&nbsp;<a
              href="https://github.com/tfkfan/orbital">Orbital</a></li>
          </ul>
        </p>
        <div className="line"></div>
        <a href="https://github.com/tfkfan/orbital"><img src="/content/images/orbital-full.svg" width={300} height={100}/></a>
        <p style={{marginTop: "20px", fontWeight: "500"}}>
          <Translate contentKey="about.orbital.main"></Translate>
        </p>
        <p>
          <Translate contentKey="about.orbital.subtext"></Translate>
        </p>

        <h5><Translate contentKey="about.orbital.features.title"></Translate></h5>
        <ul>
          <li><Translate contentKey="about.orbital.features.room"></Translate></li>
          <li><Translate contentKey="about.orbital.features.vertx"></Translate></li>
          <li><Translate contentKey="about.orbital.features.support"></Translate></li>
          <li><Translate contentKey="about.orbital.features.management"></Translate></li>
          <li><Translate contentKey="about.orbital.features.geometry"></Translate></li>
          <li><Translate contentKey="about.orbital.features.routes"></Translate></li>
          <li><Translate contentKey="about.orbital.features.objects"></Translate></li>
        </ul>
      </Col>
    </Row>
  );
};

export default About;
