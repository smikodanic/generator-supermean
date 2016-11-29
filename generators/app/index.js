var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


module.exports = yeoman.Base.extend({
    constructor: function () {
        'use strict';
        yeoman.Base.apply(this, arguments);
    },

    // (1) Prompting
    prompting: function () {
        'use strict';

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the great ' + chalk.red('generator-smtemplate') + ' generator!'
        ));

        var done = this.async();
        this.prompt([{
            type: 'list',
            name: 'repo',
            message: 'What do you want to install?',
            choices: [
                {
                    name: 'Supermean API',
                    value: 'supermean-api'
                }, {
                    name: 'Supermean SPA (Single Page App)',
                    value: 'supermean-spa'
                }, {
                    name: 'Supermean MPA (Multi Page App)',
                    value: 'supermean-mpa'
                }
            ]
        }]).then(function (answers) {
            this.repo = answers.repo;
            done();
        }.bind(this));
    },


    writing: function () {
        'use strict';
        var done = this.async();

        this.remote('smikodanic', this.repo, 'master', function (err, cacheObj) {
            if (err) console.log(chalk.red('ERROR: ', JSON.stringify(err, null, 2)));

            if (cacheObj) {
                //console.log(cacheObj.cachePath); ///home/frob/.cache/yeoman/smikodanic/supermean-api/master
                cacheObj.directory('.', '.');
            } else {
                console.log(chalk.red('ERROR: Repo does not exists or has repo URL.'));
            }

            done();
        });
    },

    // install: function () {
    //     'use strict';
    //     this.installDependencies();
    // }
});
