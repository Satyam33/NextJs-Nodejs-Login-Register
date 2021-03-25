import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import cookie from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useRouter } from 'next/router';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const router = useRouter();
    const classes = useStyles();

    const [errorOpen, setErrorOpen] = React.useState(false);
    const [errorMes, setErrorMes] = React.useState();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,

        };
        const res = await fetch('/api/users/login', {
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
            cookie.set('token',res2.token)
            cookie.set('user',res2.user)
            router.push('/dashboard')
          
        }

    };

    return (
        <Container component="main" maxWidth="xs">
            <div style={{ 'marginTop': '64px', 'flexDirection': 'column', 'alignItems': 'center', display: 'flex' }}>

                <h1>Sign In</h1>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                 </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>

                <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {errorMes}
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    );
}