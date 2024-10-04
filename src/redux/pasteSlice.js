import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const pasteSlice = createSlice({
  name: "pastes",
  initialState: {
    pastes:localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")):[]
  },
  reducers: {

    addToPaste: (state,action) => {
      const paste = action.payload
      //state.pastes.push(paste) -> {}
      state.pastes = [paste,...state.pastes] //lastes wala uppar aa jayega
      
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },


    updateToPaste: (state,action) => {
      const paste = action.payload
      const index = state.pastes.findIndex(item => item._id === paste._id)
      
      if (index >= 0)
      {
        state.pastes[index] = paste
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
      }
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload
      
      state.pastes = state.pastes.filter((item) => item._id !== pasteId);
      
      localStorage.setItem("pastes",JSON.stringify(state.pastes))
      toast.success("Paste deleted")
    },
    resetAllPastes: (state, action) => {
      state.pastes = []
      localStorage.removeItem("pastes")
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, removeFromPaste, resetAllPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
