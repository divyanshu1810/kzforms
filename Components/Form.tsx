import React from 'react'
import axios from 'axios';
function Form() {
    const [valid,setValid] = React.useState(false);
    const [formError,setFormError] = React.useState('')
    const [formData, setFormData] = React.useState(
        {
            registration:"",
            email:"",
            github:"",
            name:""
        }      
    ) 
    function validGithub(String:string){
        let url;
        try {
        url = new URL(String);
        } catch (_) {
            return false;  
        }
         return url.protocol === "http:" || url.protocol === "https:";
    }
    function validRegister(String:string){
        const initial = String.substring(0,2);
        const rest = String.substring(2);
        if(initial=='RA' && String.length==15 && (rest.match(/^\d{13}$/)))
        {
            return true;
        }
        return false;
    }
    function validEmail(String:string){
       return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(String))
    }
    function validName(String:string){
        const regName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        const name = String;
        return regName.test(name)
    }
    function handleChange(event:any){
        const {name,value} = event.target
        event.persist();
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]:value
            }
        })
    }
    function handleSubmit(event:any){
        event.preventDefault()
        if(validName(formData.name) && validGithub(formData.github) && validEmail(formData.email) && validRegister(formData.registration))
        {
            axios.post(`${process.env.NEXT_PUBLIC_URL}`, {
                registration: formData.registration,
                github: formData.github,
                email: formData.email,
                name: formData.name,
              })
              .then(function (response) {
                console.table(formData);
                setValid(!valid);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else{
            if(formData.name.length==0 || formData.github.length==0 || formData.email.length==0 || formData.registration.length==0)
            {
                setFormError('Please fill all the details properly')
            }
            else if(!validEmail(formData.email))
            {
                setFormError('Please enter a valid email address')
            }
            else if(!validName(formData.name))
            {
                setFormError('Please enter a valid name')
            }else if(!validRegister(formData.registration))
            {
                setFormError('Please enter a valid Registration Number')
            }else if(!validGithub(formData.github))
            {
                setFormError('Please enter a valid Github')
            }
        }
    }
    
    return(
        <>
        {!valid && <div className='lg:w-1/4 md:w-2/4 md:h-96 items-center w-auto p-4 py-4 rounded-lg shadow-xl bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg'>
            <form name='myForm' onSubmit={handleSubmit} id="myForm" className="flex flex-col md:pt-10 items-center">
            <input 
            className='p-2 rounded-full lg:w-5/6 font-semibold text-center'
            type="text"
            placeholder="Registration Number"
            onChange={handleChange}
            name="registration"    
            value={formData.registration}
            />
            <input 
            type="email"
            className='p-2 rounded-full lg:w-5/6 font-semibold text-center mt-1'
            placeholder="SRMIST email ID"
            onChange={handleChange}
            name="email"
            value={formData.email}    
            />
            <input 
            type="text"
            className='p-2 rounded-full lg:w-5/6 font-semibold text-center mt-1'
            placeholder="Github"
            onChange={handleChange}
            name="github"   
            value={formData.github} 
            />
            <input 
            type="text"
            className='p-2 rounded-full lg:w-5/6 font-semibold text-center mt-1'
            placeholder="Name"
            onChange={handleChange}
            name="name"   
            value={formData.name} 
            />
            {formError && <div className='mt-6 -mb-4 duration-150 bg-opacity-80 backdrop-blur-lg drop-shadow-lg text-white rounded-full bg-red-600 font-bold px-4 py-1'>{formError}</div>}
            <input className='mt-10 bg-blue-900 p-2 w-4/6 hover:bg-blue-600 text-center duration-150 cursor-pointer text-white rounded-full ' 
            type="submit" 
            value="Send Information">
            </input>
        </form>
        </div>}
        {valid && <div className='lg:w-1/4 mx-8 md:w-2/4 h-auto items-center w-auto p-4 pt-4 rounded-lg shadow-xl bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg'>
        <div className=' text-white text-2xl font-mono font-semibold text-center'>You have Succesfully Submitted the Form !🥳🪄</div>        
            <div className='text-center md:text-lg mt-8 text-sm text-white'>
                <div>Name : {formData.name}</div>        
                <div>Registration Number : {formData.registration}</div>        
                <div>Email ID : {formData.email}</div>        
                <div>Github : {formData.github}</div>
            </div>        
        </div>}
        </>
    )
  
}

export default Form