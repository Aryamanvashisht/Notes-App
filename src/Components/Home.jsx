import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from '../redux/pasteSlice'
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState("");
  const [searchParams,setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch()
  const allPastes = useSelector(state => state.paste.pastes)
  const navigate = useNavigate()
  

  useEffect(() => {
    if (pasteId)
    {
      const paste = allPastes.find(item => item._id === pasteId)
      setTitle(paste?.title)
      setValue(paste?.content)
    }
    
  },[pasteId])

  function createPaste()
  {

    if (title !== '' && value !== '')
    {
      const paste = {
        _id: pasteId || Date.now().toString(36),
        title: title,
        content: value,
        createdAt:new Date().toISOString()
      }
  
      pasteId ? dispatch(updateToPaste(paste)) : dispatch(addToPaste(paste));
  
      setTitle('')
      setValue('')
      setSearchParams({})
      pasteId ? toast.success("Paste updated") : toast.success("Paste created")
      setTimeout(() => {
        navigate('/pastes')
      }, 500);
    }
  }

  return (
    <div className=" mt-12 ml-[27%] font-semibold">
      <input
        className="bg-gray-300 rounded-2xl p-2 mt-10 w-[60%] border-2 border-black"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="h-10 ml-10 border-2 border-black rounded-2xl bg-slate-800 text-white p-2 px-[12px]" onClick={createPaste}>
        {pasteId ? "Update Paste" : "Create Paste"}
      </button>
      <div>
        <textarea
          className="bg-gray-300 mt-4 rounded-2xl p-2 min-w-[500px] w-[60%] border-2 border-black"
          rows={15}
          cols={25}
          placeholder="Enter content here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
