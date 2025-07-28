
module.exports = function tailwindPlugin(context, options) {
  return {
    name: 'tailwind-plugin',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins = [require('@tailwindcss/postcss')];
      postcssOptions.plugins.push(require("autoprefixer"));
      return postcssOptions
    }
  }
}