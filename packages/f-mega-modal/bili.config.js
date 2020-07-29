import path from 'path';
import magicImporter from 'node-sass-magic-importer';

const config = {
    plugins: {
        vue: {
            style: {
                preprocessOptions: {
                    scss: {
                        importer: magicImporter()
                    }
                }
            }
        }
    }
};

export default config;
