import { useState, useEffect } from 'react';
import { mock } from './Constant'; 

function Form(){
    const [input, setinput]  = useState('');
    const [suggestion, setsuggestion] = useState([])

    function handleChange(e){
        let userInput = e.target.value;
        setinput(userInput)
        const resValue = mock.filter(ele =>  ele.suggestion.toLowerCase().includes(userInput.toLowerCase()))
        setsuggestion(resValue)
        
    }



    useEffect(() => {
        // const resValue = mock.filter(ele =>  ele.suggestion.includes(input))
        // // console.log(userInput, resValue);
        // setsuggestion(resValue)
    }, [input])

    return(
        <div>
            <form>
                <input type='text' name='mt_field' onChange={handleChange} placeholder='enter the word'/>
            </form>
            <ul>
                {suggestion.map((e) => <li key={e.id}>{e.suggestion}</li>)}
            </ul>

        </div>
    )

}

export default Form