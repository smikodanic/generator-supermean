var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var rimraf = require('rimraf');


module.exports = yeoman.Base.extend({
    constructor: function () {
        'use strict';
        yeoman.Base.apply(this, arguments);
    },

    // (1) Prompting
    prompt_writing: function () {
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

        var self = this;

        this.remote('smikodanic', this.repo, 'master', function (err, cacheObj) {
            if (err) console.log(chalk.red('ERROR: ', JSON.stringify(err, null, 2)));

            if (cacheObj) {
                //console.log(cacheObj.cachePath); ///home/frob/.cache/yeoman/smikodanic/supermean-api/master
                self.fs.copy(cacheObj.cachePath, '.');
            } else {
                console.log(chalk.red('ERROR: Repo does not exists or has repo URL.'));
            }

            //delete cached files
            rimraf(cacheObj.cachePath, function () {
                console.log(chalk.magenta('Cache dir is deleted.'));
            });

            done();
        });
    },


    prompt_installation: function () {
        var prompts = [{
            type: 'confirm',
            name: 'wantInstall',
            message: 'Do you want to install packages (npm and bower) ?',
            default: true
        }];

        return this.prompt(prompts).then(function (props) {
          this.props = props;
        }.bind(this));
    },

    install: function () {
        'use strict';
        // console.log(JSON.stringify(this.props, null, 2)); //{wantInstall: true}
        if (this.props.wantInstall) {
            this.installDependencies();
        }
    }
});
