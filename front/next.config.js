const { webpack } = require('next/dist/compiled/webpack/webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {

};

module.exports = {
  reactStrictMode: true,
  // webpack5 : true,
  // webpack : (config) => {
  //   config.resolve.fallback = {fs : false, child_process : false, critters : false};
  //   return config;
  // },

  //  // Can be safely removed in newer versions of Next.js
  //  future: {

  //   // by default, if you customize webpack config, they switch back to version 4.
  //   // Looks like backward compatibility approach.
  //   webpack5: true,   
  // },

  // webpack(config) {
  //   config.resolve.fallback = {

  //     // if you miss it, all the other options in fallback, specified
  //     // by next.js will be dropped.
  //     ...config.resolve.fallback,  

  //     fs: false, // the solution
  //   };
  //   return config
// }
}
