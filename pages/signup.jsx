
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const router = useRouter();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [mes, setMes] = React.useState();
    const [errorMes, setErrorMes] = React.useState();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setErrorOpen(false);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email: e.currentTarget.email.value,
            firstname: e.currentTarget.firstName.value,
            lastname: e.currentTarget.lastName.value,
            password: e.currentTarget.password.value,

        };
        // console.log("body-------",body);
        const res = await fetch('/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const res2 = await res.json()
        if (res2.error) {
            setErrorMes(res2.error)
            setErrorOpen(true)
        }
        else {
            router.push('/')
            setMes(res2.message)
            setOpen(true);
        }

    };
    return (
        <>
            <Container component="main" maxWidth="xs">
            <div style={{ 'marginTop': '64px', 'flexDirection': 'column', 'alignItems': 'center', display: 'flex' }}>

                <h1>Sign up</h1>
                <form style={{ 'marginTop': '24px','width':'100%'}} onSubmit={handleSubmit} noValidate>
               
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                                autoComplete="fname"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item >
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                 </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
                             </Link>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {mes}
                    </Alert>
                </Snackbar>
                <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {errorMes}
                    </Alert>
                </Snackbar>
            </div>
           
            </Container>
                </>
    );
}