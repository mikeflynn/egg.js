module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          'egg.min.js': ['egg.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['uglify']);
}
