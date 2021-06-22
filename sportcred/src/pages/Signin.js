import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '27ch',
        background: "white",
        borderRadius: "10px",
        margin: "auto"

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
        width: '25ch',
        paddingBottom: '1ch'
    },
    button: {
        width: '23ch',
        margin: "auto"

    },
    container: {
        width: '30ch',
        display: 'flex',
        flexDirection: 'column'
    },

}));

const Signin = () => {
    const styles = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        console.log("good stuff")
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div>
            <div className={styles.root}>
                <div className={styles.container}>
                    <TextField
                        label="Username"
                        id="filled-margin-none"
                        defaultValue=""
                        className={styles.textField}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        id="filled-password-input"
                        type="password"
                        autoComplete="current-password"
                        className={styles.textField}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={styles.button}
                        onClick={(e) => validateForm()}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Signin;