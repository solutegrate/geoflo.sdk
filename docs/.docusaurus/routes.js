import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', 'a50'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'f09'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '09a'),
            routes: [
              {
                path: '/api',
                component: ComponentCreator('/api', 'b19'),
                exact: true
              },
              {
                path: '/intro',
                component: ComponentCreator('/intro', 'aec'),
                exact: true
              },
              {
                path: '/sdk/Control',
                component: ComponentCreator('/sdk/Control', '73a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Draw',
                component: ComponentCreator('/sdk/Draw', 'fbf'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Events',
                component: ComponentCreator('/sdk/Events', '4b9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Exploring',
                component: ComponentCreator('/sdk/Exploring', 'abd'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Features',
                component: ComponentCreator('/sdk/Features', 'eec'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Gamepad',
                component: ComponentCreator('/sdk/Gamepad', 'be7'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Layers',
                component: ComponentCreator('/sdk/Layers', 'ac1'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Locate',
                component: ComponentCreator('/sdk/Locate', 'dc0'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Mesh',
                component: ComponentCreator('/sdk/Mesh', '38a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Options',
                component: ComponentCreator('/sdk/Options', 'c79'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Painting',
                component: ComponentCreator('/sdk/Painting', '348'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Pinning',
                component: ComponentCreator('/sdk/Pinning', '046'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Routing',
                component: ComponentCreator('/sdk/Routing', 'c7d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Select',
                component: ComponentCreator('/sdk/Select', '69a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Snapping',
                component: ComponentCreator('/sdk/Snapping', 'dca'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Statics',
                component: ComponentCreator('/sdk/Statics', 'ce2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Styles',
                component: ComponentCreator('/sdk/Styles', '7b2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/sdk/Utilities',
                component: ComponentCreator('/sdk/Utilities', '383'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
