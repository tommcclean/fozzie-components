import path from 'path';
import sass from 'node-sass';
import magicImporter from 'node-sass-magic-importer';

const config = {
    plugins: {
        vue: {
            css: true,
            style: {
                preprocessOptions: {
                    scss: {
                        implementation: sass,
                        importer: magicImporter(),
                        // eslint-disable-next-line quotes
                        data: `@import "./src/assets/scss/common.scss";`
                    }
                }
            }
        }
    }
};

export default config;
