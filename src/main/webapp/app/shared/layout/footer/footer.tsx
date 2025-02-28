import './footer.scss';

import React from 'react';
import {Translate} from 'react-jhipster';
import {Col, Row} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faTelegram} from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col md={6}>
        <div>
        <h5><Translate contentKey="global.title">Artem Baltser</Translate></h5>

        <ul className="contacts-list">
          <li className="p-name"><Translate contentKey="global.title">Artem Baltser</Translate></li>
          <li><a href="mailto:abaltser13111@gmail.com">abaltser13111@gmail.com</a></li>
        </ul>
        </div>
      </Col>
      <Col md={6}  className="row-centered">
        <ul className="social-list">
          <li>
            <a href="https://github.com/tfkfan" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub}/><span>tfkfan</span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/tfkfan" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin}/><span>tfkfan</span>
            </a>
          </li>
          <li>
            <a href="https://t.me/tfkfan" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTelegram}/><span>tfkfan</span>
            </a>
          </li>
        </ul>
      </Col>
    </Row>
  </div>
);

export default Footer;
