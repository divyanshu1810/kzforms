import React from 'react'
import axios from 'axios';
function Form() {
    // Hooks to handle the state of the valid entries, userData and formErrors
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
    // function to check the validity of the github url entered
    function validGithub(String:string){
        let url;
        try {
        url = new URL(String);
        } catch (_) {
            return false;  
        }
         return url.protocol === "http:" || url.protocol === "https:";
    }
    // function to check the validity of the Registration Number entered
    function validRegister(String:string){
        const initial = String.substring(0,2);
        const rest = String.substring(2);
        if(initial=='RA' && String.length==15 && (rest.match(/^\d{13}$/)))
        {
            return true;
        }
        return false;
    }
    // function to check the validity of the email entered
    function validEmail(String:string){
       return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(String))
    }
    // function to check the validity of the name entered
    function validName(String:string){
        const regName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        const name = String;
        return regName.test(name)
    }
    // fucntion to handle the input changes happening  
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
    // function to run when the user clicks on submit button
    function handleSubmit(event:any){
        event.preventDefault()
        if(validName(formData.name) && validGithub(formData.github) && validEmail(formData.email) && validRegister(formData.registration))
        {
            // axios call to post the data to a dummy api (formbackend used here)
            axios.post(`${process.env.NEXT_PUBLIC_URL}`, {
                registration: formData.registration,
                github: formData.github,
                email: formData.email,
                name: formData.name,
            })
            .then(function (response) {
                console.table(formData);
                // console.log(response)
                setValid(!valid);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else{
            if(formData.name.length==0 || formData.github.length==0 || formData.email.length==0 || formData.registration.length==0)
            {
                if(formData.registration.length==0)
                {
                    setFormError('Registration Number can\'t be empty');
                }
                else if(formData.email.length==0)
                {
                    setFormError('Email can\'t be empty');
                }
                else if(formData.github.length==0)
                {
                    setFormError('Github can\'t be empty');
                }
                else
                {
                    setFormError('Name can\'t be empty')
                }
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
        {!valid && <div className='lg:w-1/4 md:w-2/4 fold md:h-auto items-center bg-white w-auto py-4 rounded-xl shadow-xl '>
            <div className='flex justify-center mx-4 md:mb-4 '>
            <div className='text-xl font-semibold w-5/6 text-center  md:pt-4 border-blue-500 border-b-2 text-gray-600 pad'>Tell us about Yourself lad! 🥰</div>
            </div>
        {/* bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg */}
            <form name='myForm' onSubmit={handleSubmit} id="myForm" className=" flex flex-col  items-center">
            <input 
            className='p-2 lg:w-5/6 font-semibold outline-none text-left opacity-100 border-b-2 hover:border-blue-500'
            type="text"
            placeholder="Registration Number"
            onChange={handleChange}
            name="registration"    
            value={formData.registration}
            />
            <input 
            type="email"
            className='p-2 lg:w-5/6 outline-none font-semibold text-left mt-4 opacity-100 border-b-2 hover:border-blue-500'
            placeholder="SRMIST email ID"
            onChange={handleChange}
            name="email"
            value={formData.email}    
            />
            <input 
            type="text"
            className='p-2 lg:w-5/6 outline-none font-semibold text-left mt-4 opacity-100 border-b-2 hover:border-blue-500'
            placeholder="Github"
            onChange={handleChange}
            name="github"   
            value={formData.github} 
            />
            <input 
            type="text"
            className='p-2 lg:w-5/6 outline-none font-semibold text-left mt-4 opacity-100 border-b-2 hover:border-blue-500'
            placeholder="Name"
            onChange={handleChange}
            name="name"   
            value={formData.name} 
            />
            {formError && <div className='mt-6 -mb-4  text-gray-600 border-b-4 border-red-600 pb-2 font-bold px-4 py-1'>Error : {formError}</div>}
            <input className='mt-10 bg-blue-900 p-2 w-4/6 mb-6 hover:bg-blue-600 text-center duration-150 cursor-pointer text-white rounded-lg ' 
            type="submit" 
            value="Submit">
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