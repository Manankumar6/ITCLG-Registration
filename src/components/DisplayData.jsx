import React from 'react'

const DisplayData = (props) => {

    const {name,address,course,session,fname,image} = props.data.student
  return (
    <div>
        <div className="container ">

     
      <div className="card my-2 p-5">
                    <div className="row">
                        <div className='col-md-4'>

                            <img src={image} alt="profileimage" className='rounded img-thumbnail' style={{ width: "15rem" }} />
                        </div>
                        <div className='col-md-4 align-self-center' >
                            <p className='text-danger fw-bold'>Name:</p>
                            <h3>{name}</h3>

                        </div>
                        <div className='col-md-4 align-self-center'>
                            <p className='text-danger fw-bold'>Course:</p>
                            <h3>{course}</h3>

                        </div>
                    </div>
                    <div className="row mx-md-3">
                        <div className="col-md-4">
                            <p className='text-danger fw-bold'>Session:</p>
                            <h3>{session}</h3>
                        </div>
                        <div className="col-md-4 align-self-start">
                            <p className='text-danger fw-bold'>Father Name:</p>
                            <h3>{fname}</h3>
                        </div>
                        <div className="col-md-4">
                            <p className='text-danger fw-bold'>Address:</p>
                            <h3>{address}</h3>
                        </div>
                    </div>


                </div>
                </div>
    </div>
  )
}

export default DisplayData
