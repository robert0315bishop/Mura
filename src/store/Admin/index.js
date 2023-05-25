import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isOpenModal: false,
    isSign: false,
    email: "",
    password: "",
    candidates: [],
    coverletter_modal: false,
    coverletter: "",
}

export const signData = createAsyncThunk(
    "admin/signData",
    async (data, thunkAPI) => {
      try {
        const response = await axios.post("http://localhost:8080/sign", data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);

export const getData = createAsyncThunk(
    "admin/getData",
    async (thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:8080/candidates");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const downloadResume = createAsyncThunk(
    "admin/download",
    async (path, thunkAPI) => {
        try {
            let name = path.path.slice(8, path.path.length);
            const response = await axios.get(`http://localhost:8080/download/${name}`, { responseType: "blob" });

            // Create a temporary download link
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.setAttribute("download", name);
            document.body.appendChild(link);
            link.click();

            // Clean up the temporary download link
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        showSignModal: (state) => {
            if (!state.isSign) {
                state.isOpenModal = !state.isOpenModal;
            } else {
                state.isSign = false;
            }
        },
        showCoverletterModal: (state, action) => {
            state.coverletter_modal = true;
            state.coverletter = action.payload;
        },
        hideCoverletterModal: (state) => {
            state.coverletter_modal = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signData.pending, (state, action) => {
            state.isSign = false;
        });
        builder.addCase(signData.fulfilled, (state, action) => {
            if (action.payload === "Success!") {
                state.isOpenModal = !state.isOpenModal;
                state.isSign = true;
            }
        });
        builder.addCase(getData.pending, (state, action) => {

        });
        builder.addCase(getData.fulfilled, (state, action) => {
            state.candidates = action.payload.data;
        });
        builder.addCase(downloadResume.pending, (state, action) => {
        });
        builder.addCase(downloadResume.fulfilled, (state, action) => {
        });
    }
});

export const { showSignModal, showCoverletterModal, hideCoverletterModal } = adminSlice.actions;
export default adminSlice.reducer;