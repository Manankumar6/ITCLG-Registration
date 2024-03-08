import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
    const [image, setImage] = useState('image/profile.webp')
    const [allowimg, setAllowimg] = useState(false)
    const [data, setData] = useState({
        card: "",
        name: "",
        session: "",
        fname: "",
        address: "",
        city: "",
        state: "",
        course: '',
        image: ""
    })

    const fileInputRef = useRef(null);

    useEffect(() => {

        const isFormVaild = Object.values(data).every(value => value.trim() !== "")
       
        setAllowimg(isFormVaild)

    }, [data])


    const uploadImgae = (e) => {
        const file = e.target.files[0]

        if (file) {
            const fileSizeKB = file.size / 1024
            if (fileSizeKB <= 40) {
                let render = new FileReader();
                render.readAsDataURL(file);
                render.onload = () => {
                    setImage(render.result)
                    setData({
                        ...data,
                        image: render.result
                    })

                }
            } else {
                setAllowimg(false)
                toast.error("File size Should be less than 40kb", { autoClose: 4000 })

            }
        }
    }
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!allowimg) {
                // Display an error message or take appropriate action
                toast.error('Please fill in all fields.');
                return;
            }

            const URL = 'https://itclg-api.onrender.com'
            const fetchdata = await fetch(`${URL}/api/createstudent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const response = await fetchdata.json();
          
            if (fetchdata.ok) {
                 setData({
                    card: '',
                    name: "",
                    session: "",
                    fname: "",
                    address: "",
                    city: "",
                    state: "",
                    course: '',
                    image: ""
                });
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setImage('image/profile.webp');
                toast.success(response.message)
            } else {
                toast.error(response.errors[0].msg)
            }
        } catch (error) {
           console.log(error)
            toast.error("Request Not Send")
        }
    }
    return (
        <div className='container-fluid py-5' style={{ background: "#f1fff2" }}>
            <h1 className='text-center'>Student Registration Form </h1>
            <form className='my-5 container border ' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <div className="row">
                        <div className=" col-md-6">

                            <label htmlFor="cardnumber" className="form-label fw-bold">I-card Number</label>
                            <input onChange={handleInput} name='card' value={data.card} type="number" className="form-control" id="cardnumber" required />
                        </div>
                        <div className=" col-md-6">

                            <label htmlFor="name" className="form-label fw-bold">Student Name</label>
                            <input onChange={handleInput} name='name' value={data.name} type="text" className="form-control" id="name" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">

                            <label htmlFor="session" className="form-label fw-bold">Session</label>
                            <input onChange={handleInput} name='session' value={data.session} type="text" className="form-control" id="session" required />
                        </div>
                        <div className="col-md-4">

                            <label htmlFor="fname" className="form-label fw-bold">Father Name</label>
                            <input onChange={handleInput} name='fname' value={data.fname} type="text" className="form-control" id="fname" required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="course" className="form-label fw-bold">Course</label>
                            <select className="form-select" aria-label="Default select example" id='course' onChange={handleInput} name='course' value={data.course}>
                            <option value="" disabled>Select Course</option>
                                <option value="ADIT">ADIT</option>
                                <option value="ADHN">ADHN</option>
                                <option value="HACKING">HACKING</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="address" className="form-label fw-bold">Address</label>
                            <input onChange={handleInput} name='address' value={data.address} type="text" className="form-control" id="address" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="city" className="form-label fw-bold">City</label>
                            <input onChange={handleInput} name='city' value={data.city} type="text" className="form-control" id="city" required />
                        </div>
                        <div className="col">
                            <label htmlFor="state" className="form-label fw-bold">State</label>
                            <select className="form-select" aria-label="Default select example" id='state' onChange={handleInput} name='state' value={data.state}>
                            <option value="" disabled>Select State</option>
                                <option value="U.P.">U.P.</option>
                                <option value="M.P.">M.P.</option>
                                <option value="JHARKHAND">JHARKHAND</option>
                                <option value="DELHI">DELHI</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="input-group mb-3 my-3 ">
                                <input type="file" className="form-control fw-bold " id="inputGroupFile02" name='image' onChange={uploadImgae} ref={fileInputRef} />

                            </div>
                        </div>
                        <div className="col-md-4 my-3">
                            <div className="card mx-auto" style={{ width: "15rem" }}>


                                <img src={image} className="card-img-top " alt="..." />

                            </div>
                        </div>
                    </div>
                    <div className="row mx-5">



                        <button disabled={!allowimg} type="submit" className="btn btn-warning ">Submit</button>


                    </div>
                </div>
            </form>

        </div>
    )
}

export default Home
