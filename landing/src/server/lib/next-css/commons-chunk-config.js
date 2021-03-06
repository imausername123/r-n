module.exports = (config, test = /\.p?css$/) => {
  // Extend the default CommonsChunkPlugin config
  config.plugins = config.plugins.map((plugin) => { // eslint-disable-line
    if (
      plugin.constructor.name === 'CommonsChunkPlugin'
      && typeof plugin.minChunks !== 'undefined'
    ) {
      const defaultMinChunks = plugin.minChunks;
      plugin.minChunks = (module, count) => { // eslint-disable-line
        // Move all styles to commons chunk so they can be extracted to a single file
        if (module.resource && module.resource.match(test)) {
          return true;
        }
        // Use default minChunks for non-style modules
        return typeof defaultMinChunks === 'function'
          ? defaultMinChunks(module, count)
          : count >= defaultMinChunks;
      };
    }
    return plugin;
  });
  return config;
};
