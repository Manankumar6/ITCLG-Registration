import React from 'react'
import Skeleton , { SkeletonTheme }  from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Loading = () => {
    return (
             <SkeletonTheme baseColor="#e3f2fd" highlightColor="#e9edc9" borderRadius={20}>
        <div>

         
            <div className="container" >
                <div className="card my-2 p-5">
                    <div className="row text-center">
                        <div className="row">
                           

                        <p className='fs-2 '><Skeleton width={250}/></p>
                         

                        </div>

                        <div className='col-md-4 '>
                            <Skeleton circle={true} height={200} width={200} />
                        </div>
                        <div className='col-md-4 align-self-center' >
                            <p className='text-danger fw-bold'><Skeleton /></p>
                            <h4><Skeleton /></h4>

                        </div>
                        <div className='col-md-4 align-self-center'>
                            <p className='text-danger fw-bold'><Skeleton /></p>
                            <h4><Skeleton /></h4>

                        </div>
                    </div>
                    <div className="row mx-md-3 text-center my-1">
                        <div className="col-md-3">
                            <p className='text-danger fw-bold'><Skeleton /></p>
                            <h4><Skeleton /></h4>
                        </div>
                        <div className="col-md-3 align-self-start">
                            <p className='text-danger fw-bold'><Skeleton /></p>
                            <h4><Skeleton /></h4>
                        </div>
                        <div className="col-md-3">
                            <p className='text-danger fw-bold'><Skeleton /></p>
                            <h4><Skeleton /></h4>
                        </div>
                        <div className="col-md-3">
                            <p className='text-danger fw-bold'><Skeleton /></p>
                            <h4><Skeleton /></h4>
                        </div>
                    </div>


                </div>
            </div>
        </div>
            </SkeletonTheme>

    )
}

export default Loading
