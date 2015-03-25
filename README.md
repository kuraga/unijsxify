# unijsxify

[Browserify][] plugin for [jsx-transform][].

## Installation

    npm install unijsxify

## Usage

Save JSX code as `main.js` and then produce a bundle with the following command:

    browserify -t unijsxify main.js

`unijsxify` transform activates for files with either `.js` or `.jsx` extensions.

If you want to unijsxify modules with other extensions, pass an `-x /
--extension` option:

    browserify -t coffeeify -t [ unijsxify --extension coffee ] main.coffee

If you don't want to specify extension, just pass `--everything` option:

    browserify -t coffeeify -t [ unijsxify --everything ] main.coffee

## Bugs

<https://github.com/kuraga/unijsxify/issues>

## Test

    npm install
    npm test

## Author

Alexander Kurakin <<kuraga333@mail.ru>>

## License

MIT

[Browserify]: http://browserify.org
[jsx-transform]: https://github.com/alexmingoia/jsx-transform
