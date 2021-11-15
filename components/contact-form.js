import { useCallback } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import toastHandler from '../utils/toastHandler';

export default function ContactForm({ title }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('*A contact name is required'),
    email: Yup.string()
      .email('*The email entered is invalid')
      .required('*A contact email is required'),
    subject: Yup.string().required('*Please enter a subject'),
    message: Yup.string().required('*Please enter your message'),
    acceptTerms: Yup.bool().oneOf(
      [true],
      '*Please accept the Terms & Conditions',
    ),
  });

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      /* recpatcha script not ready, bail out */
      return {};
    }
    return executeRecaptcha();
  }, []);

  return (
    <div role="form" className="wpcf7">
      {title && (
        <h1 className="font-bold text-center leading-tight">{title}</h1>
      )}
      <Formik
        initialValues={{
          name: '',
          email: '',
          subject: '',
          message: '',
          acceptTerms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: values.name,
              email: values.email,
              subject: values.subject,
              message: values.message,
              recaptcha: await handleReCaptchaVerify(),
            }),
          };

          await fetch('/api/contact', requestOptions).then((response) => response.json().then((data) => {
            if (response.ok) {
              /* contact email was sent successfully */
              toastHandler('success', data.message);
            } else {
              /* contact email failure */
              toastHandler('failure', data.message);
            }
          }));
        }}
      >
        {({
          values, errors, touched, isSubmitting, dirty,
        }) => (
          <Form className="wpcf7-form init">
            <div className="grid grid-cols-2">
              <div className="col-span-2 md:col-span-1 md:pr-2">
                <Field
                  type="text"
                  name="name"
                  placeholder="Your Name..."
                  value={values.name}
                  className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                />
                {errors.name && touched.name ? (
                  <div className="absolute text-red-500 pl-6 text-sm">
                    {errors.name}
                  </div>
                ) : null}
              </div>
              <div className="col-span-2 md:col-span-1 md:pl-2">
                <Field
                  type="email"
                  name="email"
                  placeholder="Your Email..."
                  value={values.email}
                  className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required"
                />
                {errors.email && touched.email ? (
                  <div className="absolute text-red-500 pl-6 text-sm">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div className="col-span-2">
                <Field
                  type="text"
                  name="subject"
                  placeholder="Enter a subject..."
                  value={values.subject}
                  className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                />
                {errors.subject && touched.subject ? (
                  <div className="absolute text-red-500 pl-6 text-sm">
                    {errors.subject}
                  </div>
                ) : null}
              </div>
              <div className="col-span-2">
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Enter a message..."
                  value={values.message}
                  className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required"
                />
                {errors.message && touched.message ? (
                  <div className="absolute text-red-500 pl-6 text-sm">
                    {errors.message}
                  </div>
                ) : null}
              </div>
              <div className="col-span-2 mx-auto mt-10">
                <label htmlFor="acceptTerms">
                  {'I accept the '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    <b className="color-brand">Terms & Conditions</b>
                  </a>
                </label>
                <Field
                  type="checkbox"
                  name="acceptTerms"
                  className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required"
                />
                {errors.acceptTerms && touched.acceptTerms ? (
                  <div className="absolute text-red-500 text-sm px-5">
                    <p>{errors.acceptTerms}</p>
                  </div>
                ) : null}
              </div>
              <div className="col-span-2 mx-auto mt-8 google-privacy text-center">
                <p>This site is protected by Google reCAPTCHA v3.</p>
              </div>
              <div className="col-span-2 mx-auto google-privacy text-center">
                <p>
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Privacy Policy
                  </a>
                  {' | '}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Terms of Use
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="btn btn-secondary btn-effect"
                disabled={isSubmitting || !dirty}
              >
                {!isSubmitting && 'Send'}
                {isSubmitting && (
                <ImSpinner2
                  size={17}
                  className="text-white hover:text-blue active:text-blue icon-spin"
                />
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
