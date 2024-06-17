import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { z } from 'zod';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import {getAllergies, createUsers} from '../api.js';

const userSchema = z.object({
    name: z.string().min(3, {message: 'Username must be at least 3 characters'}),
    email: z.string().min(6, {message: 'Email is required'}).email('Invalid email address'),
    phoneNumber: z.number().min(6, {message: 'phone number must be at least 6 digite'}),
    allergies: z.array(z.string().min(2, {message: 'You havent selected any option.'}))
  })

const User = () => {
    const [allergies, setAllergies] = useState([]);
    const [errors, setErrors] = useState({});
    const [selectedAllergy, setSelectedAllergy] = useState('');

    const handleChange = (event) => {
        console.log(event.target.value);
        setSelectedAllergy(event.target.value);
    };

    useEffect(()=>{
        const usersResponse = async()=>{
            const allergies = await getAllergies();
            setAllergies(allergies);
        }

        usersResponse();
    },[]);

    const createNewUser = async (data) => {
        const result = await createUsers(data);
        console.log({result});
        if (result?.id) {
            return redirect("/");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            name: data.get('name'),
            email: data.get('email'),
            phone: Number(data.get('phone')) || '',
            allergies: [data.get('allergies')],
        }

        const isValidData = userSchema.safeParse(userData);
    
        if (!isValidData.success) {
            console.log("Validation failed:", isValidData.error?.issues);
            const issues = isValidData.error?.issues || [];
            console.log(issues, typeof issues)
            const formErrors = {};
            issues.forEach(issue => {
                const {path, message} = issue;
                formErrors[path[0]] = message;
             });

             setErrors(formErrors);
        }

        createNewUser(userData);
      };


    return (
        <Box container="true">
            <Grid container spacing={2}>
                <Grid item xs={8} sx={{displey: 'flex'}}>
                    <Typography variant="h4">Add new Users</Typography>
                </Grid>                
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={8} sx={{displey: 'flex'}}>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            error={errors?.name}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoFocus
                            helperText={errors?.name}
                        />
                        <TextField
                            error={errors?.email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            helperText={errors?.email}
                        />
                        <TextField
                            error={errors?.phone}
                            margin="normal"
                            required
                            fullWidth
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            name="phone"
                            label="Phone number"
                            id="phone"
                            helperText={errors?.phone}
                        />
                        <FormControl fullWidth error={errors?.allergies}>
                            <InputLabel id="user-allergies" key="user-allergies">Allergies</InputLabel>
                            <Select
                                labelId="user-alergies"
                                value={selectedAllergy}
                                label="allergies"
                                name="allergies"
                                onChange={handleChange}
                                multiline
                            >
                                {allergies.map(allergy => (<MenuItem key={allergy} value={allergy}>{allergy}</MenuItem>))}
                            </Select>
                            {!!errors?.allergies && <FormHelperText>{errors?.allergies}</FormHelperText>}
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add
                        </Button> 
                    </Box>
                </Grid>                
            </Grid>
        </Box>
    );
}

export default User;