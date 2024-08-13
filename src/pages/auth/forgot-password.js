import { Box, Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import * as Yup from 'yup';

const Page = () => {
  const router = useRouter();
  const { signIn, signOut } = useAuth();
  const theme = useTheme();
  const emailPrams = router.query.email;
  const formik = useFormik({
    initialValues: {
      email: emailPrams || '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await signIn(values.email, values.password);
        router.push(router.query.continueUrl ?? '/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      if (router.query?.auth === 'false') {
        signOut();
      }
    })();
  }, [signOut, router.query?.auth]);

  return (
    <>
      <Head>
        <title>Forgot password | Cjtronics Admin</title>
      </Head>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.navy,
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%',
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h3" color="white">
                Forgot password
              </Typography>
              <Typography variant="p" color="white">
                Enter your email the form below to reset your password
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <Link
                  href={`/auth/login${formik.values.email ? `?email=${formik.values.email}` : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography color="neutral.400">I remember my password</Typography>
                </Link>
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
