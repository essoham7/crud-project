import { createContext, useState } from "react";
import axios from 'axios';
import { useToast } from '@chakra-ui/react'

export const GlobalContext =createContext();

export default function Wrapper({children} ){
    
    const[users, setUsers] = useState([]);
    const toast = useToast()
    
    const FetchUsers = () =>{
        axios
        .get('/api/users')
        .then((res) => {
            setUsers(res.data)
        })
        .catch((err) => {
            console.log(err.response.data)
        });
    };


        const Search = (query) =>{
            axios
            .post(`/api/users/search?key=${query}`)
            .then((res) =>{
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
        };

        const Delete = (id) =>{
            axios
            .delete(`/api/users/${id}`)
            .then(res=>{
                setUsers(users.filter(u =>u._id != id));
                toast({
                    title: 'UserDelete.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  })
            })
            .catch((err) => {
                console.log(err.response.data);
            });
        };
    
    return <GlobalContext.Provider value={{ FetchUsers, Search, Delete, users }}>
               {children}
           </GlobalContext.Provider>;
}