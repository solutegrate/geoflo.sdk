module.exports = {
  organizationName: "solutegrate",
  title: "GeoFlo SDK",
  tagline: "Documentation for GeoFlo SDK",
  url: "https://docs.geoflo.pro",
  baseUrl: "/geoflo.sdk/",
  projectName: "geoflo.sdk", // Your repository name
  trailingSlash: false,
  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs", // Build from the `/docs` folder
          sidebarPath: require.resolve("./docs/sidebars.js"),
          routeBasePath: "/docs",
        },
        blog: {
          path: "docs/blog",
          routeBasePath: "/blog",
        },
      }
    ],
  ],
  themeConfig: {
    navbar: {
      title: "GeoFlo SDK",
      logo: {
        alt: "GeoFlo Logo",
        src: "https://geoflo.s3.amazonaws.com/logos/logo_full_white.png",
      },
      items: [
        { to: "/docs/intro", label: "Docs", position: "left" },
        { to: "/docs/api", label: "API", position: "left" },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/solutegrate/geoflo.sdk",
          label: "GitHub",
          position: "right",
        },
      ],
    },
  },
};
