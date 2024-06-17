const apiUrl = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
    try{
        return (await fetch(`${apiUrl}/users`)).json();
    }catch(e){
        console.log('error', e)
    }
}

export const getUser = async (id) => {
    try{
        const response = (await fetch(`${apiUrl}/users`)).json();
        return response.find(user => user.id === id);
    }catch(e){
        console.log('error', e)
    }
}

export const createUsers = async (data) => {
    try{
        return (await fetch(`${apiUrl}/addUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
        }));
    }catch(e){
        console.log('error', e)
    }
}

export const getAllergies = async () => {
    try{
        return (await fetch(`${apiUrl}/allergies`)).json();
    }catch(e){
        console.log('error', e)
    }
}
