// Generated on 2013-07-13 using generator-ember 0.4.0
'use strict';
var lrSnippet     = require( 'grunt-contrib-livereload/lib/utils' ).livereloadSnippet;
var proxySnippet  = require('grunt-connect-proxy/lib/utils').proxyRequest;
var mountFolder = function ( connect, dir ) {
  return connect.static( require( 'path' ).resolve( dir ) );
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function ( grunt ) {
  // load all grunt tasks
  require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

  // configurable paths
  var yeomanConfig = {
    build: 'dev', // can be set with setBuild task ( ie. setBuild:dist )
    app : 'app',
    dist : 'public'
  };

  grunt.initConfig( {
    pkg: grunt.file.readJSON( 'package.json' ),
    yeoman : yeomanConfig,
    watch : {
      emberTemplates : {
        files : '<%= yeoman.app %>/templates/{,*/}*.hbs',
        tasks : ['emberTemplates'],
        options: {
          livereload: true
        }
      },
      neuter : {
        files : ['<%= yeoman.app %>/scripts/{,*/}{,*/}*.js'],
        tasks : ['neuter'],
        options: {
          livereload: true
        }
      },
      livereload : {
        files : [
          '<%= yeoman.app %>/*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks : ['livereload']
      },
      less : {
        files : '<%= yeoman.app %>/styles/**/*.less',
        tasks : ['less:development'],
        options : {
          interrupt : true,
          livereload: true
        }
      }
    },
    connect : {
      options : {
        port : 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname : 'localhost'
      },
      proxies: [
        {
          context: '/api',
          host: "<%= pkg.apps.development.ip %>",
          port: "<%= pkg.apps.development.port %>",
          https: false,
          changeOrigin: false,
          rewrite: {
            '^/api': '' // rewrite the url because the api doesn't have prefix
          }
        }
      ],
      livereload : {
        options : {
          middleware : function ( connect ) {
            return [
              lrSnippet,
              mountFolder( connect, '.tmp' ),
              mountFolder( connect, 'app' ),
              proxySnippet
            ];
          }
        }
      },
      test : {
        options : {
          middleware : function ( connect ) {
            return [
              mountFolder( connect, '.tmp' ),
              mountFolder( connect, 'test' ),
              proxySnippet
            ];
          }
        }
      },
      dist : {
        options : {
          middleware : function ( connect ) {
            return [
              mountFolder( connect, 'dist' ),
              proxySnippet
            ];
          }
        }
      }
    },
    open : {
      server : {
        path : 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean : {
      dist : {
        files : [
          {
            dot : true,
            src : [
              '.tmp',
              '<%= yeoman.dist %>/*',
              '!<%= yeoman.dist %>/.git*'
            ]
          }
        ]
      },
      server : '.tmp'
    },
    jshint : {
      options : {
        jshintrc : '.jshintrc'
      },
      all : [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    mocha : {
      all : {
        options : {
          run : true,
          urls : ['http://localhost:<%= connect.options.port %>/index.html']
        }
      }
    },
    less : {
      development : {
        options : {
          paths : ['<%= yeoman.app %>/styles/' ]
        },
        files : {
          '<%= yeoman.app %>/styles/style.css' : '<%= yeoman.app %>/styles/style.less'
        }
      },
      production : {
        options : {
          paths : ['<%= yeoman.app %>/styles/' ],
          yuicompress : true
        },
        files : {
          '<%= yeoman.app %>/styles/style.min.css' : '<%= yeoman.app %>/styles/style.less'
        }
      }
    },
    rev : {
      dist : {
        files : {
          src : [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare : {
      html : '<%= yeoman.app %>/index.html',
      options : {
        dest : '<%= yeoman.dist %>'
      }
    },
    usemin : {
      html : ['<%= yeoman.dist %>/{,*/}*.html'],
      css : ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options : {
        dirs : ['<%= yeoman.dist %>']
      }
    },
    imagemin : {
      dist : {
        files : [
          {
            expand : true,
            cwd : '<%= yeoman.app %>/images',
            src : '{,*/}*.{png,jpg,jpeg}',
            dest : '<%= yeoman.dist %>/images'
          }
        ]
      }
    },
    svgmin : {
      dist : {
        files : [
          {
            expand : true,
            cwd : '<%= yeoman.app %>/images',
            src : '{,*/}*.svg',
            dest : '<%= yeoman.dist %>/images'
          }
        ]
      }
    },
    cssmin : {
      dist : {
        files : {
          '<%= yeoman.dist %>/styles/main.css' : [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin : {
      dist : {
        options : {
        },
        files : [
          {
            expand : true,
            cwd : '<%= yeoman.app %>',
            src : '*.html',
            dest : '<%= yeoman.dist %>'
          }
        ]
      }
    },
    // Put files not handled in other tasks here
    copy : {
      dist : {
        files : [
          {
            expand : true,
            dot : true,
            cwd : '<%= yeoman.app %>',
            dest : '<%= yeoman.dist %>',
            src : [
              '*.{ico,txt}',
              '.htaccess',
              'images/{,*/}*.{webp,gif}',
              'styles/fonts/*'
            ]
          }
        ]
      }
    },
    concurrent : {
      server : [
        'emberTemplates',
        'less:development'
      ],
      test : [
        'emberTemplates'
      ],
      dist : [
        'emberTemplates',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    karma : {
      unit : {
        configFile : 'karma.conf.js'
      }
    },
    emberTemplates : {
      options : {
        templateName : function ( sourceFile ) {
          var templatePath = yeomanConfig.app + '/templates/';
          return sourceFile.replace( templatePath, '' );
        }
      },
      dist : {
        files : {
          '.tmp/scripts/compiled-templates.js' : '<%= yeoman.app %>/templates/{,*/}*.hbs'
        }
      }
    },
    neuter : {
      app : {
        options : {
          filepathTransform : function ( filepath ) {
            return 'app/' + filepath;
          }
        },
        src : '<%= yeoman.app %>/scripts/app.js',
        dest : '.tmp/scripts/combined-scripts.js'
      },
      config: {
        src : '<%= yeoman.app %>/scripts/config/<%= yeoman.build %>.js',
        dest : '.tmp/scripts/config.js'
      }
    }
  } );

  grunt.registerTask( "setBuild", "Set the build.", function ( val ) {
    grunt.config.set( 'yeoman.build', val );
  });

  grunt.registerTask('start-api-server', 'Start api server', function() {
    grunt.log.writeln( 'Starting API server on ' + grunt.config( 'pkg.apps.development.domain' ) + ':' + grunt.config( 'pkg.apps.development.port') );
    require('./main');
  });

  grunt.registerTask( 'server', function ( target ) {
    if ( target === 'dist' ) {
      return grunt.task.run( [ 'build', 'open', 'connect:dist:keepalive'] );
    }

    grunt.task.run( [
      'clean:server',
      'concurrent:server',
      'neuter:config',
      'neuter:app',
      'configureProxies',
      'start-api-server',
      'connect:livereload',
      'open',
      'watch'
    ] );
  } );

  grunt.registerTask( 'test', [
    'clean:server',
    'concurrent:test',
    'neuter:config',
    'neuter:app',
    'mocha'
  ] );

  grunt.registerTask( 'build', [
    'clean:dist',
    'setBuild:dist',
    'useminPrepare',
    'concurrent:dist',
    'neuter:config',
    'neuter:app',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'rev',
    'usemin'
  ] );

  grunt.registerTask( 'default', [
    'jshint',
    'test',
    'build'
  ] );

};
