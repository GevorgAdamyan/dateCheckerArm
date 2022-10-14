exports.config = {
    specs: [
        './test/specs/**/*.js'
    ],

    exclude: [

    ],

    maxInstances: 10,

    capabilities: [{

        maxInstances: 5,
        //
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions':{
        args: ['--headless', '--disable-gpu']
        }
    }],

    logLevel: 'info',

    bail: 0,

    baseUrl: 'http://localhost',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    services: ['chromedriver'],

    framework: 'mocha',

    reporters: [
        'spec',
        ['junit',
            {
                outputDir: './reports',
                outputFileFormat: function (options) { // optional
                    return `results-${options.cid}.${options.capabilities}.xml`;
                }
            }
        ]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 300000
    },

}
