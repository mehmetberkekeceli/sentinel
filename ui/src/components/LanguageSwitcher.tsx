import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../redux/slices/languageSlice";
import { RootState } from "../redux/store";
import { Box, MenuItem, Select } from "@mui/material";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);

  return (
    <Box sx={{ position: "absolute", top: 10, right: 10 }}>
      <Select
        value={language}
        onChange={(e) => dispatch(changeLanguage(e.target.value))}
        sx={{
          color: "#fff",
          backgroundColor: "#3A3A3A",
          borderRadius: 2,
          p: 0.5,
        }}
      >
        <MenuItem value="tr">🇹🇷 Türkçe</MenuItem>
        <MenuItem value="en">🇺🇸 English</MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageSwitcher;
