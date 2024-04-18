import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "", id: "" })
  const [data, setData] = useState([])

  const btn = useRef(null)
  const passwordref = useRef(null)
  useEffect(() => {
    let password = localStorage.getItem("password")
    if (password) {
      setData(JSON.parse(password))
    }
  }, [])


  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const saveForm = () => {
    if (form.username == "" && form.password == "" && form.site == "") {
      toast.error("Input cannot be empty", {
        duration: 2000,
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
          padding: "10px"
        }
      })
    } else {
      setData([...data, { ...form, id: uuidv4() }])
      localStorage.setItem("password", JSON.stringify([...data, form]))
      setForm({ site: "", username: "", password: "" })
      toast.success("Saved Successfully", {
        duration: 2000,
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
          padding: "10px"
        }
      })
    }
  }
  // console.log(data.length)

  const showpassword = () => {
    // console.log(btn.current.getAttribute('src'));
    if (btn.current.getAttribute('src').includes("Icons/eye-close.svg")) {
      btn.current.setAttribute('src', "Icons/eye.svg");
      passwordref.current.type = "text"
    } else {
      btn.current.setAttribute('src', "Icons/eye-close.svg");
      passwordref.current.type = "password"
    }
  };

  const handleedit = (id) => {
    setData(data.filter(item => item.id != id))
    setForm(data.filter(item => item.id === id)[0])
  }
  const handledelete = (id) => {
    // console.log(id)
    setData(data.filter(item => item.id != id))
    localStorage.setItem("password", JSON.stringify(data.filter(item => item.id != id)))
    toast.success("Successfully Deleted", {
      duration: 2000,
      style: {
        borderRadius: '15px',
        background: '#333',
        color: '#fff',
        padding: "10px"
      }
    })
  }
  const handlecopy = (params) => {
    navigator.clipboard.writeText(params)
    toast.success("Copied to Clipboard", {
      duration: 2000,
      style: {
        borderRadius: '15px',
        background: '#333',
        color: '#fff',
        padding: "10px"
      }
    })
  }



  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="inputs flex flex-col items-center sm: w-full px-2 md:w-3/4 lg:w-1/2 m-auto gap-3 text-sm sm:text-lg">
        <input value={form.site} onChange={handlechange} className='border border-black w-full px-2 py-1 rounded-xl  italic' type="text" placeholder='Enter site url' name='site' />
        <div className="user flex flex-col md:flex-row w-full gap-5 justify-between ">
          <input value={form.username} onChange={handlechange} className='border border-black w-full px-2 py-1 rounded-xl italic' type="text" placeholder='Enter username' name='username' />
          <div className='flex gap-2'>
            <input ref={passwordref} value={form.password} onChange={handlechange} className='border border-black w-full px-2 py-1 rounded-xl italic  ' type="password" placeholder='Enter password' name='password' />
            <img ref={btn} className="cursor-pointer h-7 m-auto" src="Icons/eye-close.svg" alt="" onClick={showpassword} />
          </div>
        </div>
        <button onClick={saveForm} className='bg-violet-500 py-1 px-8 rounded-full font-semibold text-white text-lg flex justify-center gap-2'>Save <lord-icon
          src="https://cdn.lordicon.com/jgnvfzqg.json"
          trigger="hover"
          style={{ "width": "30px", "height": "30px" }}>
        </lord-icon></button>
      </div>

      <div className="flex justify-center items-center my-10">
        {data.length == 0 && <span className='text-xl font-semibold italic'>No Saved Passwords</span>
        }
        {data.length > 0 && <div className="overflow-x-auto">
          <table className="w-full table-auto overflow-hidden rounded-lg shadow-2xl shadow-black">
            <thead className='bg-violet-600 text-white text-sm md:text-lg font-semibold'>
              <tr>
                <th className='p-2 md:p-3'>Site</th>
                <th className='p-2 md:p-3'>Username</th>
                <th className='p-2 md:p-3'>Password</th>
                <th className='p-2 md:p-3'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-purple-100'>
              {data.map((item) => {
                return (
                  <tr key={uuidv4()}>
                    <td className='p-2 md:p-3'><div className='flex justify-center gap-2 items-center'>{item.site}</div></td>
                    <td className='p-2 md:p-3'><div className='flex justify-center gap-2 items-center'>{item.username}</div></td>
                    <td className='p-2 md:p-3'><div className='flex  justify-center gap-2 items-center'>{"*".repeat(item.password.length)} 
                  <img src="Icons/copy.svg" alt="" className='cursor-pointer w-4 h-4' onClick={()=>handlecopy(item.password)}/>
                  </div></td>
                    <td className='p-2 md:p-3 flex justify-center items-center md:gap-3 gap-2'>
                      <div onClick={() => handleedit(item.id)} className='flex flex-col items-center cursor-pointer justify-center font-semibold text-sm'>
                        <lord-icon
                          src="https://cdn.lordicon.com/ogkflacg.json"
                          trigger="hover"
                          style={{ "width": '20px', "height": '20px' }}>
                        </lord-icon>
                        {/* <span>Edit</span> */}
                      </div>
                      <div onClick={() => handledelete(item.id)} className='flex flex-col items-center text-sm font-semibold justify-between cursor-pointer'>
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ "width": "20px", "height": "20px" }}>
                        </lord-icon>
                        {/* <span>Delete</span> */}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>}

      </div>
    </>
  )
}

export default Manager