import {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import {getUser} from '../api.js';

const UserEmail = () => {
    const params = useParams();
    const [user, setUser] = useState({});

    useEffect(()=>{
        if(params.userId){
            const userResponse = async ()=>{
                const user = await getUser(params.userId);
                setUser(user || {});
            }
    
            userResponse();
        }
    },[params.userId]);
    
console.log('user', user);
console.log('params', params.userId);

    return <div>UserEmail</div>;
}

export default UserEmail;