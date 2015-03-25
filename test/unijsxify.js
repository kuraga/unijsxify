var assert     = require('assert');
var browserify = require('browserify');
var unijsxify  = require('../index');

describe('unijsxify', function() {

  function bundle(entry, cb) {
    return browserify(entry, { basedir: __dirname, debug: true })
      .transform(unijsxify)
      .bundle(cb);
  };

  function normalizeWhitespace(src) {
    return src.toString().replace(/\n/g, '').replace(/ +/g, '');
  }

  function assertContains(bundle, code) {
    code = normalizeWhitespace(code);
    bundle = normalizeWhitespace(bundle);
    assert(bundle.indexOf(code) > -1, "bundle does not contain: " + code);
  }

  it('works for *.js with pragma', function(done) {
    bundle('./fixtures/main.js', function(err, result) {
      assert(!err);
      assert(result);
      assertContains(result, 'h(\'h1\', null, ["Hello, world!"])');
      done();
    });
  });

  it('works for *.jsx', function(done) {
    bundle('./fixtures/main.jsx', function(err, result) {
      assert(!err);
      assert(result);
      assertContains(result, 'h(\'h1\', null, ["Hello, world!"])');
      done();
    });
  });

  it('works for plain *.js', function(done) {
    bundle('./fixtures/simple.js', function(err, result) {
      assert(!err);
      assert(result);
      assertContains(result, 'h(\'h1\', null, ["Hello, world!"])');
      done();
    });
  });

  it('returns error on invalid JSX', function(done) {
    bundle('./fixtures/invalid.js', function(err, result) {
      assert(err);
      assertContains(String(err), 'Parse Error: Line 4: Unexpected token');
      assert(!result);
      done();
    });
  });

  it('includes embedded source map', function(done) {
    bundle('./fixtures/main.jsx', function(err, result) {
      assert(!err);
      assert(result);
      assertContains(result, '//# sourceMappingURL=data:application/json;base64');
      done();
    });
  });

  describe('transforming files with extensions other than .js/.jsx', function() {

    it('activates via extension option', function(done) {
      browserify('./fixtures/main.jsnox', {basedir: __dirname})
        .transform({extension: 'jsnox'}, unijsxify)
        .bundle(function(err, result) {
          assert(!err);
          assert(result);
          assertContains(result, 'h(\'h1\', null, ["Hello, world!"])');
          done();
        });
    });

    it('activates via x option', function(done) {
      browserify('./fixtures/main.jsnox', {basedir: __dirname})
        .transform({x: 'jsnox'}, unijsxify)
        .bundle(function(err, result) {
          assert(!err);
          assert(result);
          assertContains(result, 'h(\'h1\', null, ["Hello, world!"])');
          done();
        });
    });

    it('activates via everything option', function(done) {
      browserify('./fixtures/main.jsnox', {basedir: __dirname})
        .transform({everything: true}, unijsxify)
        .bundle(function(err, result) {
          assert(!err);
          assert(result);
          assertContains(result, 'h(\'h1\', null, ["Hello, world!"])');
          done();
        });
    });
  });

});
