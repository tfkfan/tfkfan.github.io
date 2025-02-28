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
        <div className="line"></div>
        <p>
          <Translate contentKey="about.accomplishments.title"></Translate>
        </p>
        <p>
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
        <p>
          <Translate contentKey="about.publications.title"></Translate>
        </p>
        <p>
          <ul>
            <li><a href="https://habr.com/ru/articles/774322/">
              <Translate contentKey="about.publications.one"></Translate></a></li>
            <li><a href="https://habr.com/ru/articles/800689/">
              <Translate contentKey="about.publications.two"></Translate></a></li>
            <li><a href="https://habr.com/ru/articles/771630/">
              <Translate contentKey="about.publications.three"></Translate></a></li>
            <li><a href="https://habr.com/ru/articles/803969/">
              <Translate contentKey="about.publications.four"></Translate></a></li>
          </ul>
        </p>
        <div className="line"></div>
        <p>
          <Translate contentKey="about.skills.title"></Translate>
        </p>
        <p>
          Java 22, Kotlin 1.9, C/C++, JavaScript, TypeScript, VertX, Spring, Micronaut, Quarkus, HTML, CSS, Phaser 3,
          React, Angular, NodeJS, Webpack, NPM, Hibernate, JPA, PostgreSQL, MySQL, MSSQL, MongoDB, ClickHouse, Redis,
          Kafka, RabbitMQ, OpenAPI, GraphQL, SOAP, Websocket, HTTP/HTTPS, TLS/SSL, OIDC, Oauth2, OpenAPI generator,
          JHipster generator, Linux, Docker, Docker-Compose, Kubernetes, HELM, Ansible
        </p>
        <div className="line"></div>
        <p>
          <Translate contentKey="about.orbital.title"></Translate>
        </p>
        <a href="https://github.com/tfkfan/orbital"><img src="content/images/orbital-full.svg" width={300}
                                                         height={100}/></a>
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
