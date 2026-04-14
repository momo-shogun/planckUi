'use strict';

/**
 * Docs-only stub: real @gorhom/portal pulls React Native Fabric sources that
 * break Next.js SSR. Previews only need a pass-through host.
 */
function PortalProvider({ children }) {
  return children;
}

function Portal() {
  return null;
}

module.exports = {
  PortalProvider,
  Portal,
};
