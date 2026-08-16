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
            <li><Translate contentKey="about.accomplishments.expertise"></Translate></li>
            <li><Translate contentKey="about.accomplishments.projects"></Translate></li>
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
          <span>Golang</span>,&nbsp;<span>Java</span>,&nbsp;<span>Kotlin</span>,&nbsp;Gin,
          &nbsp;Echo,&nbsp;Gorilla,&nbsp;GORM,&nbsp;Quarkus,&nbsp;Micronaut,&nbsp;Spring framework,&nbsp;VertX,
          &nbsp;<span>Apache Kafka ecosystem (schema registry, connectors, ksql, streams)</span>,
          &nbsp;<span>kubernetes</span>,&nbsp;<span>AWS</span>,&nbsp;<span>helm</span>,&nbsp;<span>strimzi</span>,&nbsp;<span>Apache flink</span>,
          &nbsp;terraform,&nbsp;<span>platform solutions</span>,&nbsp;C/C++,&nbsp;Python,&nbsp;JavaScript,
          &nbsp;TypeScript,&nbsp;RxJava,&nbsp;GraalVM,&nbsp;HTML,&nbsp;CSS,&nbsp;Phaser 3,
          &nbsp;React,&nbsp;Angular,&nbsp;NodeJS,&nbsp;Webpack,&nbsp;NPM,&nbsp;Hibernate,&nbsp;JPA,
          &nbsp;QueryDSL,&nbsp;Panache,&nbsp;PostgreSQL,&nbsp;MySQL,&nbsp;MSSQL,&nbsp;MongoDB,
          &nbsp;ClickHouse, Debezium CDC, Greenplum, PySpark, Apache spark,
          &nbsp;Memcached,&nbsp;DynamoDB,&nbsp;Redis,&nbsp;Infinispan,&nbsp;Hazelcast,&nbsp;ElasticSearch,
          &nbsp;Lucene,&nbsp;S3,&nbsp;RabbitMQ,&nbsp;MQTT,&nbsp;gRPC,&nbsp;STOMP,&nbsp;OpenAPI,&nbsp;GraphQL,&nbsp;SOAP,
          &nbsp;Websocket,&nbsp;HTTP/HTTPS,&nbsp;TLS/SSL,&nbsp;OIDC,&nbsp;Oauth2,
          &nbsp;OpenAPI generators,&nbsp;AsyncAPI generators,&nbsp;Protobuf,&nbsp;Avro,
          &nbsp;JHipster generator, Linux,&nbsp;Docker,&nbsp;Docker-Compose,&nbsp;Helmfile,&nbsp;Ansible,
          &nbsp;CICD,&nbsp;Camunda,&nbsp;Istio/Linkerd,&nbsp;ArchiMate,&nbsp;BPMN,&nbsp;C4
        </p>
        <div className="line"></div>
        <p className="subtitle">
          <Translate contentKey="about.orbital.title"></Translate>
        </p>
        <a href="https://tfkfan.github.io/orbital"><img src="content/images/orbital-full.svg" width={300} height={100}/></a>
        <p>
          <a href="https://github.com/tfkfan/orbital">
            <img src="https://img.shields.io/badge/github-orbital-blue?logo=github" alt="github"></img>
          </a>
          &nbsp;
          <a href="https://opensource.org/licenses/MIT">
            <img src="https://img.shields.io/badge/License-MIT-greenbright.svg" alt="MIT"></img>
          </a>
          &nbsp;
          <a href="https://central.sonatype.com/artifact/io.github.tfkfan/orbital-core">
            <img src="https://img.shields.io/maven-central/v/io.github.tfkfan/orbital-core.svg"
                 alt="version unstable"></img>
          </a>
        </p>
        <p className="subtitle">
          <Translate contentKey="about.orbital.main"></Translate>
        </p>
        <p>
          <Translate contentKey="about.orbital.subtext"></Translate>
        </p>

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
