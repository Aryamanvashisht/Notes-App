import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste, updateToPaste } from "../redux/pasteSlice";
import { RWebShare } from "react-web-share";
import { Link } from "react-router-dom";
import { MdModeEditOutline, MdDelete, MdShare } from "react-icons/md";
import { IoMdEye, IoIosCopy } from "react-icons/io";
import toast from "react-hot-toast";

const Paste = () => {
  const [input, setInput] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter(paste=>paste.title.toLowerCase().includes(input.toLowerCase()))

  function handleEdit(paste) {
    dispatch(updateToPaste(paste));
  }

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  function handleCopy(paste) {
    navigator.clipboard.writeText(paste?.content);
    toast.success("Copied to clipboard")
  }

  return (
    <div>
      <div>
        <input
          className="rounded-2xl pl-3 border-2 border-black mt-10 ml-[25%] w-[50%] p-2 bg-gray-300"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search the value"
        />
      </div>

      <div className="mt-4 flex flex-col w-[51%] ml-[24%]">
        {filteredData.length >= 0 &&
          filteredData.map((paste) => (
            <div
              className="bg-gray-300 border-2 border-black mt-4 rounded-xl p-3 ml-3 w-[98%] font-semibold"
              key={paste._id}
            >
              <p className="pl-[10%] text-3xl w-fit">{paste.title}</p>
              <p className="pl-[10%] text-xl mt-2">{paste.content}</p>
              <button
                className="border-2 border-black p-2 rounded-xl ml-[10%] mt-3 hover:bg-white"
                onClick={() => handleEdit(paste)}
              >
                <Link to={`/?pasteId=${paste?._id}`}><MdModeEditOutline/></Link>
              </button>
              <button
                className="border-2 border-black p-2 rounded-xl ml-2  hover:bg-white"
                onClick={() => handleDelete(paste?._id)}
              >
                <MdDelete/>{" "}
              </button>

              <RWebShare
                data={{
                  text: "Web Share - NotesSaving",
                  url: "http://localhost:3000",
                  title: "NotesSaving",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <button className="border-2 border-black p-2 rounded-xl ml-2  hover:bg-white">
                  <MdShare />
                </button>
              </RWebShare>

              <button className="border-2 border-black p-2 rounded-xl ml-2  hover:bg-white">
                <Link to={`/pastes/${paste?._id}`}><IoMdEye/></Link>
              </button>

              <button
                className="border-2 p-2 border-black rounded-xl ml-2  hover:bg-white"
                onClick={() => handleCopy(paste)}
              >
                <IoIosCopy/>
              </button>
              <p className="pl-16 mt-2 ml-[1%]">
                {new Date(paste.createdAt).toDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
