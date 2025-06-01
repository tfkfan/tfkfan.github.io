import React from 'react';
import { Route } from 'react-router';

import Home from 'app/modules/home/home';
import Awards from 'app/modules/awards/awards';
import Publications from 'app/modules/publications/publications';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PageNotFound from 'app/shared/error/page-not-found';

const loading = <div>loading ...</div>;
const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="*" element={<PageNotFound />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
