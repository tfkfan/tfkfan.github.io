import './home.scss';

import React from 'react';
import {Translate} from 'react-jhipster';
import {Badge, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row} from 'reactstrap';

export const Home = () => {

  return (
    <Row>
      <Col md="12">
        <h4>
          <img src="content/images/liss1.png" width={70}/> <Translate contentKey="about.title">This is your
          homepage</Translate>
        </h4>

        <p className="lead">
        <Translate contentKey="about.subtitle">This is your homepage</Translate>
        </p>

        <p>
          <Translate contentKey="about.main"></Translate>
        </p>
        <div className="line"></div>
        <p className="subtitle">
          <Translate contentKey="about.accomplishments.title"></Translate>
        </p>
        <p>
          <ul>
            <li><Translate contentKey="about.accomplishments.author"></Translate></li>
            <li><Translate contentKey="about.accomplishments.expert"></Translate></li>
            <li><Translate contentKey="about.accomplishments.community"></Translate>&nbsp;<a
              href="https://forgamedev.ru/">forgamedev.ru</a></li>
            <li><Translate contentKey="about.accomplishments.projects"></Translate></li>
            <li><Translate contentKey="about.accomplishments.game"></Translate></li>
            <li><Translate contentKey="about.accomplishments.hack"></Translate></li>
            <li><a
              href="https://github.com/tfkfan/orbital">Orbital</a> &nbsp;<Translate
              contentKey="about.accomplishments.framework"></Translate></li>
          </ul>
        </p>
        <div className="line"></div>

        <p>
        <Translate contentKey="about.skills.title"></Translate>
        </p>
        <p className="skills">
          <span>Java</span>, <span>Kotlin</span>, C/C++, Golang, JavaScript, TypeScript, <span>VertX</span>, <span>Spring</span>, Micronaut, <span>Quarkus</span>,
          RxJava, GraalVM, HTML, CSS, Phaser 3,
          React, Angular, NodeJS, Webpack, NPM, Hibernate, JPA, QueryDSL, Panache, PostgreSQL, MySQL, MSSQL, MongoDB, ClickHouse, Debezium,
          Redis, Infinispan, Hazelcast, ElasticSearch, Lucene, <span>Apache Kafka Ecosystem (schema registry, connectors, ksql, streams)</span>, RabbitMQ, Apache Flink, MQTT, STOMP, OpenAPI, GraphQL, SOAP, Websocket, HTTP/HTTPS, TLS/SSL, OIDC, Oauth2, OpenAPI generator,
          JHipster generator, Linux, Docker, Docker-Compose, <span>Kubernetes</span>, Helm, Helmfile, Ansible, CICD,
          Camunda, Istio/Linkerd, ArchiMate, BPMN, C4
        </p>
        <div className="line"></div>
        <p className="subtitle">
          <Translate contentKey="about.orbital.title"></Translate>
        </p>
        <a href="https://github.com/tfkfan/orbital"><img src="content/images/orbital-full.svg" width={300} height={100}/></a>
        <p> <Badge color="success"><Translate contentKey="about.orbital.version"></Translate></Badge></p>
        <p className="subtitle">
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
          <li><Translate contentKey="about.orbital.features.geometry"></Translate></li>
          <li><Translate contentKey="about.orbital.features.cluster"></Translate></li>
          <li><Translate contentKey="about.orbital.features.monitoring"></Translate>
            &nbsp;<a href="https://github.com/tfkfan/orbital-monitor">link</a></li>
          <li><Translate contentKey="about.orbital.features.routes"></Translate></li>
          <li><Translate contentKey="about.orbital.features.objects"></Translate></li>
          <li><Translate contentKey="about.orbital.features.oidc"></Translate></li>
          <li><Translate contentKey="about.orbital.features.payments"></Translate></li>
          <li><Translate contentKey="about.orbital.features.admin"></Translate></li>
          <li><Translate contentKey="about.orbital.features.graalvm"></Translate></li>
        </ul>

        <div className="line"></div>
        <p className="subtitle">
        <Translate contentKey="about.portfolio.title"></Translate>
        </p>

        <Row>
          {/*   <Col md={6}> */}
          <Card className="portfolio-card">
            <img alt="game" src="content/images/game_v2_2.png"/>
            <img alt="game" src="content/images/game_v2_3.png"/>
            <CardBody>
              <CardTitle tag="h5"> <Translate contentKey="about.portfolio.game.title"></Translate></CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                <Translate contentKey="about.portfolio.game.description"></Translate>
              </CardSubtitle>
            </CardBody>
          </Card>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
