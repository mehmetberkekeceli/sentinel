import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n";

interface LanguageState {
  language: "tr" | "en";
}

const initialState: LanguageState = {
  language: "tr",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
