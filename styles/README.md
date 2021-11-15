# Theme Sass

This is the project's Sass structure using the [7-1 architecture pattern](http://sass-guidelin.es/#architecture) and sticking to [Sass Guidelines](http://sass-guidelin.es) writing conventions.

Each folder of the project has its own `README.md` file to explain the purpose and add extra information.

## Using the indented syntax

### Sass conversion

This project does not provide a `.sass` version, however, it is very easy to convert this project to Sass indented syntax.

Once in the project run:

```
sass-convert -F scss -T sass -i -R ./  && find . -iname “*.scss” -exec bash -c 'mv "$0" “${0%\.scss}.sass"' {} \;
```

The main file (here labelled `main.scss`) should be the only Sass file from the whole code base not to begin with an underscore. This file should not contain anything but `@import` and comments.

Reference: [Sass Guidelines](http://sass-guidelin.es/) > [Architecture](http://sass-guidelin.es/#architecture) > [Main file](http://sass-guidelin.es/#main-file)
