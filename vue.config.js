module.exports = {
    configureWebpack:{
        optimization: {
            splitChunks: {
                chunks:"all"
            }
        },
        // module:{
        //     rules: [
        //         {
        //             test: /\.css$/,
        //             use: ['postcss-loader']
        //         }
        //     ]
        // }
    }
};
