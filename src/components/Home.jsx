import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {getUsers} from '../api.js';
import UserTable from "./UsareTable.jsx";

const Home = () => {
    const [usersData, setUsersData] = useState([]);

    useEffect(()=>{
        const usersResponse = async ()=>{
            const users = await getUsers();
            setUsersData(users || [])
        }

        usersResponse();
    },[]);

    return (
        <Box container="true">
            <Grid container>
                <Grid item xs={10} sx={{displey: 'flex'}}>
                    <Typography variant="h4">Users</Typography>
                </Grid>
                <Grid item xs={2} sx={{displey: 'flex', justifyContent: 'flex-end'}}>
                    <Link to="/user">
                        <Button variant="contained">Add user</Button>
                    </Link>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 2}}>
                <Grid item xs={12}>
                    {!!usersData.length && <UserTable users={usersData} />}
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;