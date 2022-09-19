import React from 'react'

function Form() {
    const [formData, setFormData] = React.useState(
        {
            registration:"",
            email:"",
            github:"",
            name:""
        }
            
    )
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
        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const name = String;
        return regName.test(name)
    }
    
    function handleSubmit(event:any){
        event.preventDefault()
        if(validName(formData.name) && validGithub(formData.github) && validEmail(formData.email) && validRegister(formData.registration))
        {
            console.log(formData)
        }
    }
    
    return(
        <div className='lg:w-1/4 md:w-2/4 md:h-96 items-center w-auto p-4 py-4 rounded-lg shadow-xl bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg'>
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
                
            <input className='mt-16 bg-blue-900 p-2 w-4/6 hover:bg-blue-600 text-center duration-150 cursor-pointer text-white rounded-full ' 
            type="submit" 
            value="Send Information">
            </input>
        </form>
        </div>
    )
  
}

export default Form