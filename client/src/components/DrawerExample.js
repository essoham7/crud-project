import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Stack
  } from '@chakra-ui/react';
  import { useContext, useState, useEffect } from 'react';
  import { GlobalContext } from '../context/GlobalWrapper';
import InputsGroup from './InputsGroup';


function DrawerExample() {
    const { isOpen, onClose, Add, errors, setErrors, user, Update } = useContext(GlobalContext);
    const [form, setForm] = useState({});
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

   const onAdd = () => {
      Add(form, setForm);
   };

   const onUpdate = () => {
    Update(form,  setForm, form._id);
   };

   useEffect(()=>{
    setForm(user)
   },[user]);


    return (
      <>
       
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton onClick={()=>{
                onClose();
                setErrors({});
                setForm({})
            }}/>
            <DrawerHeader>Create / Update user</DrawerHeader>
  
            <DrawerBody>
              <Stack spacing={"24px"}>
                 <InputsGroup 
                 name="fullname" 
                 onChangeHandler={onChangeHandler} 
                 value={form?.fullname} 
                 errors={errors?.fullname}
                 />
                 <InputsGroup 
                 name="email" 
                 onChangeHandler={onChangeHandler} 
                 value={form?.email}
                 errors={errors?.email}
                 />
                 <InputsGroup 
                 name="age" 
                 onChangeHandler={onChangeHandler} 
                 value={form?.age}
                 errors={errors?.age}
                 />
                 <InputsGroup 
                 name="country" 
                 onChangeHandler={onChangeHandler} 
                 value={form?.country}
                 errors={errors?.country}
                 />
              </Stack>
            </DrawerBody>
  
            <DrawerFooter>
              <Button 
              variant='outline' 
              mr={3}
              onClick={() => {
                onClose();
                setErrors({});
                setForm({});
              }}
              >
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={() => (form._id ? onUpdate() : onAdd()) }>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default DrawerExample;