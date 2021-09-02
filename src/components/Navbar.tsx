import {
    AppBar,
    Box,
    Button,
    FormControl,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    Chip,
} from '@material-ui/core';
import WelcomeMessage from './WelcomeMessage';
import { useState, ChangeEvent, useEffect, useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ProgressContext } from '../contexts/ProgressContext';
import { ThemeContext } from '../contexts/ThemeContext';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        positionSelect: {
            color: 'white',
            borderBottom: '1px solid white',
        },
    })
);

const Navbar = () => {
    // styles
    const classes = useStyles();

    // context
    const { lastTime, status } = useContext(ProgressContext);

    const [position, setPosition] = useState<string>('Full-stack Developer');
    const [time, setTime] = useState<Date>(() => new Date(Date.now()));
    const { theme } = useContext(ThemeContext);

    // useEffect
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date(Date.now())), 1000);
        return () => clearInterval(timer);
    }, []);

    const onPositionChange = (
        e: ChangeEvent<{
            value: unknown;
        }>
    ) => {
        setPosition(e.target.value as string);
    };
    return (
        <AppBar position='static' color={theme}>
            <Toolbar>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignContent='center'
                    width={1}
                    py={2}
                >
                    <Typography variant='h6'>Favorite Films</Typography>
                    <Box textAlign='center'>
                        <WelcomeMessage position={position} />
                        <Chip
                            label={`Last time working on this project: ${lastTime} - Status: ${status}`}
                        />
                        <Box mt={1}>
                            <FormControl>
                                <Select
                                    value={position}
                                    onChange={onPositionChange}
                                    className={classes.positionSelect}
                                >
                                    <MenuItem value='Full-stack Developer'>
                                        Full-stack Developer
                                    </MenuItem>
                                    <MenuItem value='Front-end Developer'>
                                        Front-end Developer
                                    </MenuItem>
                                    <MenuItem value='Back-end Developer'>
                                        Back-end Developer
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box textAlign='center'>
                        <Box my={1}>
                            <Typography variant='h6'>
                                {time.toUTCString()}
                            </Typography>
                        </Box>
                        <Button variant='contained'>LOGIN</Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
