module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript', '@babel/preset-react'
        // Add other presets like @babel/preset-react if needed for JSX
    ],
};
