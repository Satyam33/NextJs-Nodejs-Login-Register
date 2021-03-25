import React, {  useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'

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

export default function Dashboard() {

    const cookieuser = parseCookies()
    const user =  cookieuser.user ? JSON.parse(cookieuser.user) : ""
    console.log("=user",user);
    const router = useRouter();

    const handleLogout = async () => {
		cookie.remove('token')
		cookie.remove('user')
        router.push('/');

	};

    return (
        <Container component="main" maxWidth="xs">
            <div style={{ 'marginTop': '64px', 'flexDirection': 'column', 'alignItems': 'center', display: 'flex' }}>
                <h1>Welcome {user.firstname} {user.lastname}</h1>
                <Button variant="contained" onClick={handleLogout} color="primary">
                    LogOut
                </Button>
             
            </div>
        </Container>
    );
}

export async function getServerSideProps(ctx){
    const {token} = parseCookies(ctx)
    if(!token){
        const {res} = ctx
        res.writeHead(302,{Location:"/"})
        res.end() 
    }
  
    return {
        props:{}
    }
  }