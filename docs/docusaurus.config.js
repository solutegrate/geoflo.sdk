module.exports = {
  organizationName: "solutegrate",
  title: "GeoFlo SDK",
  tagline: "Documentation for GeoFlo SDK",
  url: "https://docs.geoflo.pro",
  baseUrl: "/geoflo.sdk/",
  projectName: "geoflo.sdk", // Repository name
  trailingSlash: false,
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "./", // Corrected path to use root-level docs
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          exclude: [
            "**/node_modules/**", // Exclude node_modules
            "**/*.test.md",       // Example: Exclude test files
            "**/*.spec.md",       // Example: Exclude spec files
          ]
        },
        blog: {
          path: "blog",
          routeBasePath: "/blog", // Blog served at /blog
        },
      },
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
        { to: "/intro", label: "Docs", position: "left" }, // Updated path
        { to: "/api", label: "API", position: "left" },   // Updated path
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
