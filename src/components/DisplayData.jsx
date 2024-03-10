import React from 'react'

const DisplayData = (props) => {

    const { name, address, course, session, fname, image, city } = props.data.student
    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return (
        <div>
            <div className="container ">


                <div className="card my-2 p-5">
                    <div className="row text-center">
                        <div className="row">

                            <p className='fs-2 '>Student Details</p>
                        </div>

                        <div className='col-md-4 '>
                            <img src={image} alt="profileimage" className='rounded-circle img-thumbnail' style={{ width: "15rem" }} />
                        </div>
                        <div className='col-md-4 align-self-center' >
                            <p className='text-danger fw-bold'>Name:</p>
                            <h4>{capitalize(name)}</h4>

                        </div>
                        <div className='col-md-4 align-self-center'>
                            <p className='text-danger fw-bold'>Course:</p>
                            <h4>{capitalize(course)}</h4>

                        </div>
                    </div>
                    <div className="row mx-md-3 text-center my-1">
                        <div className="col-md-3">
                            <p className='text-danger fw-bold'>Session:</p>
                            <h4>{capitalize(session)}</h4>
                        </div>
                        <div className="col-md-3 align-self-start">
                            <p className='text-danger fw-bold'>Father Name:</p>
                            <h4>{capitalize(fname)}</h4>
                        </div>
                        <div className="col-md-3">
                            <p className='text-danger fw-bold'>Address:</p>
                            <h4>{capitalize(address)}</h4>
                        </div>
                        <div className="col-md-3">
                            <p className='text-danger fw-bold'>City:</p>
                            <h4>{capitalize(city)}</h4>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default DisplayData
