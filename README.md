# A statically generated portfolio site using Next.js and Headless WordPress CMS

This website showcases my freelance projects using Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature and a headless [WordPress](https://wordpress.org) CMS as the data source.

## Production Site

### [https://brightseed.io](https://brightseed.io)

The site utilizes Next.js' "getStaticProps" and "getStaticPaths" methods to generate pre-rendered HTML of all content, allowing for high rendering speeds and a great user experience. All content is served via GraphQL endpoint from WordPress CMS.

The "Posts" page is rendered with a fallback layout (using getStaticPaths' "fallback" key), in cases where new blog posts have been added. This enables new blog posts to be rendered server-side on first request.

A contact form is included, using GraphQL mutation to send email, and is protected by Google reCAPTCHA v3. The contact form is constructed using Formik and, Yup is used for input validation.

The site has been styled using TailwindCSS and custom SCSS. Framer-Motion has been used to style page transistions, with WOW.js used to animate certain elements.

ESLint is employed to maintain AirBnB coding standards, with Husky ensuring that all code is linted before commit via pre-commit hook.
