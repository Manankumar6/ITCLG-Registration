import React, { useState } from 'react'
import DisplayData from '../components/DisplayData'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const StudentData = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        e.preventDefault();
        if (!card.cardId) {
            toast.error("Fill Input Field Properly")
            setLoading(false)
            setData('')
        } else {


            try {


                const URL = process.env.REACT_APP_API_URL;
                const fetchStudentData = await fetch(`${URL}/api/getstudent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(card)
                })
                const response = await fetchStudentData.json()

                if (fetchStudentData.ok) {
                    setCard({
                        cardId: ""
                    })
                    setLoading(false)
                    setData(response)
                    // toast.success("Student Found " + response.student.name)


                } else {
                    setLoading(false)
                    setData("")
                    toast.error(response.message)
                }
            } catch (error) {
                console.log(error)
                toast.error("Internal Server Error")
            }
        }

    }


    return (
        <div>



            <div className="container my-2 " style={{ minHeight: '80vh' }}>
                <div className='d-flex justify-content-center'>

                    <h1 className='text-center bg-danger w-75 text-light rounded-2'>Online Attendence Portal - ITCLG  </h1>
                </div>
                <form onSubmit={handleSubmit}>


                    <div className="row my-4 mx-5">
                        <div className="col-md-10 ">
                            <input className='form-control' type="text" placeholder='Enter Card-ID' name='cardId' onChange={handleInput} value={card.cardId} />
                        </div>
                        <div className="col-md-2   ">

                            <button className='btn btn-danger mt-2 mt-md-0 align-content-center' type='submit'>Search</button>
                        </div>
                    </div>

                </form>
                {loading ?
                    <Loading /> :
                    <>
                        {
                            data && <DisplayData data={data} />
                        }
                    </>

                }
            </div>
        </div>
    )
}

export default StudentData;
