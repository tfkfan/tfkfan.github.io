import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Awards = () => (
  <NavItem>
    <NavLink tag={Link} to="/awards" className="d-flex align-items-center">
      <FontAwesomeIcon icon="award" />
      <span>
        <Translate contentKey="global.menu.awards">Awards</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Publications = () => (
  <NavItem>
    <NavLink tag={Link} to="/publications" className="d-flex align-items-center">
      <FontAwesomeIcon icon="file-pen" />
      <span>
        <Translate contentKey="global.menu.publications">Publications</Translate>
      </span>
    </NavLink>
  </NavItem>
);


export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <span className="brand-title">
      <Translate contentKey="global.title">Portfolio</Translate>
    </span>
    <span className="navbar-version"> <Translate contentKey="global.subtitle">Portfolio</Translate></span>
  </NavbarBrand>
);
