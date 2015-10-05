/*global module*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'ftp-deploy': {
      build: {
        auth: {
          host: 'nirelbaz.com',
          port: 21,
          authKey: 'nirelbaz.com'
        },
        src: 'api/',
        dest: '/notejs/api',
        exclusions: ['build/api/Slim/**']
      }
    }
  });

  grunt.loadNpmTasks('grunt-ftp-deploy');

  grunt.registerTask('default', []);

};
