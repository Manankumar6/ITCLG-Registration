import React, { useState } from 'react'
import DisplayData from '../components/DisplayData'
import { toast } from 'react-toastify'

const StudentData = () => {
    const [data, setData] = useState()
    const [card, setCard] = useState({
        cardId: ""
    })
    const handleInput = (e) => {
        const { name, value } = e.target
        setCard({
            ...card,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            const URL = " https://itclg-api.onrender.com/api"
            const fetchStudentData = await fetch(`${URL}/getstudent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(card)
            })
            const response = await fetchStudentData.json()
            
            if (fetchStudentData.ok) {
                
                setData(response)
                toast.success( "Student Found " + response.student.name )

              
            }else{
                toast.error(response.message)
            }
        } catch (error) {
           console.log( error)
            toast.error("Internal Server Error")
        }

    }


    return (
        <div>
            <div className="container my-2 " style={{minHeight:'80vh'}}>
                <form onSubmit={handleSubmit}>

                   
                        <div className="row my-4 mx-5">
                            <div className="col-md-10 ">
                                <input className='form-control' type="text" placeholder='Enter Card-ID' name='cardId' onChange={handleInput} value={card.cardId} />
                            </div>
                            <div className="col-md-2   ">

                                <button className='btn btn-danger align-content-center' type='submit'>Search</button>
                            </div>
                        </div>
                   
                </form>
                    {
                        data && <DisplayData data={data}/>
                    }
                
            </div>
        </div>
    )
}

export default StudentData;
