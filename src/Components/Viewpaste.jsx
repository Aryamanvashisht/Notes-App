import React, { useEffect } from "react";
import {useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const Viewpaste = () => {
  const [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState("");
  const allPastes = useSelector((state) => state.paste.pastes);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const paste = allPastes.find((item) => item._id === id);
      setTitle(paste?.title);
      setValue(paste?.content);
    }
  }, [id]);

  return (
    <div>
      <input
        className="rounded-2xl pl-3 border-2 border-black mt-10 ml-[25%] w-[50%] p-2 bg-gray-300 text-xl font-semibold"
        type="text"
        disabled
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <textarea
          className="bg-gray-300 mt-4 rounded-2xl p-2 min-w-[500px] w-[50%] border-2 border-black ml-[25%] text-xl font-semibold"
          rows={10}
          cols={25}
          value={value}
          disabled
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Viewpaste;
