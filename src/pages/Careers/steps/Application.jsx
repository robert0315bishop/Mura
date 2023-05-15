import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { resumeModal, resumeUpload, uploadButton } from "../../../store/Upload";
import ReactModal from "react-modal";
import { modal_open, submit_appliction } from "../../../store/Career";

const Application = () => {
    const role = useSelector((state) => state.career.role);
    const resumeModalOpen = useSelector((state) => state.upload.resume_modal_open);
    const uploadbtn = useSelector((state) => state.upload.upload_button);
    const uploadApplication = useSelector((state) => state.upload.upload_application);

    const dispatch = useDispatch();

    const [coverletter, setCoverletter] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [resume, setResume] = useState();

    const onCoverletter = (e) => {
        let letter = e.target.value;
        setCoverletter(letter);
    }
    const onPhone = (e) => {
        let phone = e.target.value;
        setPhone(phone);
    }
    const onEmail = (e) => {
        let email = e.target.value;
        setEmail(email);
    }

    const handleUpload = () => {
        dispatch(resumeModal());
    }

    const closeModal = () => {
        dispatch(resumeModal());
    }

    const onFileUpload = (e) => {
        let files = e.target.files;
        setResume(files[0].name);
        dispatch(uploadButton());
    }

    const lastUpload = (e) => {
        dispatch(resumeUpload({file_name: resume}));
    }

    const onSubmitApplication = (e) => {
        dispatch(submit_appliction());
        dispatch(modal_open());
    }

    return (
        <>
        <div className="lg:px-12 lg:py-8 px-8 py-4">
            <div className="flex flex-col justify-start">
                <p className="text-black text-3xl font-bold">Application</p>
                <p className="text-black text-normal font-normal lg:pb-6 lg:mt-4 pb-2 mt-2 border-b-2 border-solid border-[#ACABAB]">{"General " + role + " Position"}</p>
            </div>
            <div className="lg:mt-8 mt-4 pb-4 border-b-2 border-solid border-[#ACABAB]">
                <div className="grid lg:grid-cols-5 grid-cols-1 flex items-center">
                    <p className="col-start-1 col-span-1 text-black text-xl font-bold">Resume</p>
                    <input
                        type="button"
                        value="Upload Resume"
                        className="col-start-2 col-span-4 lg:w-80 lg:h-12 bg-[#F38117] cursor-pointer lg:text-xl text-base p-3 border-none text-center rounded-md"
                        onClick={handleUpload}
                    />
                </div>
                {
                    uploadApplication ?
                    <div className="mt-3 grid lg:grid-cols-5 grid-cols-1 flex items-center">
                        <div className="col-start-2 col-span-4 w-full h-12 px-5 flex flex-row justify-between items-center bg-[#DAD6D3] rounded">
                            <p>{resume}</p>
                            <input
                                type="button"
                                value="Delete"
                                className="cursor-pointer underline"
                            />
                        </div>
                    </div> :
                    null
                }
            </div>
            <div className="lg:mt-8 mt-4">
                <div className="grid lg:grid-cols-5 grid-cols-1 flex pb-4 border-b-2 border-solid border-[#ACABAB]">
                    <div>
                        <p className="col-start-1 col-span-1 text-black text-xl font-bold">Cover Letter</p>
                        <p className="text-left">(optional)</p>
                    </div>
                    <textarea
                        value={coverletter}
                        className="col-start-2 col-span-4 w-full h-32 bg-[#D9D9D9] text-base p-2 border-none rounded-md resize-none"
                        onChange={onCoverletter}
                    />
                </div>
            </div>
            <div className="lg:mt-8 mt-4">
                <div className="grid lg:grid-cols-5 grid-cols-2 flex pb-4 border-b-2 border-solid border-[#ACABAB]">
                    <p className="col-start-1 col-span-1 text-black text-xl font-bold">Your Contact Information</p>
                    <div className="col-start-2 col-span-4 grid lg:grid-cols-5 grid-col-2">
                        <div className="col-start-1 col-span-2">
                            <p>Phone number<b className="pl-1 text-[#FF0000]">*</b></p>
                            <input
                                type="text"
                                value={phone}
                                className="w-full mt-3 bg-[#D9D9D9] text-base p-2 border-none rounded-md"
                                onChange={onPhone}
                            />
                        </div>
                        <div className="ml-3 col-start-3 col-span-3">
                            <p>Email<b className="pl-1 text-[#FF0000]">*</b></p>
                            <input
                                type="email"
                                value={email}
                                className="w-full mt-3 bg-[#D9D9D9] text-base p-2 border-none rounded-md"
                                onChange={onEmail}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:mt-8 mt-4">
                <div className="grid lg:grid-cols-5 grid-cols-2 flex pb-4 border-b-2 border-solid border-[#ACABAB]">
                    <p className="col-start-1 col-span-3 text-black text-base font-bold flex justify-end pr-6">
                        Are you legally authorized to work in U.S.?<b className="pl-1 text-[#FF0000]">*</b>
                    </p>
                    <div className="col-start-4 col-span-1">
                            <div className="flex flex-row">
                                <input type="radio" id="yes" name="authorization" value="Yes" />
                                <label className="pl-3 text-base font-bold">Yes</label>
                            </div>
                            <div className="flex flex-row">
                                <input type="radio" id="no" name="authorization" value="No" />
                                <label className="pl-3 text-base font-bold">No</label>
                            </div>
                    </div>
                </div>
            </div>
            <div className="lg:mt-8 mt-4 flex justify-center">
                <input
                    type="button"
                    value="Submit Application"
                    className="lg:w-80 lg:h-12 bg-[#F38117] cursor-pointer lg:text-xl text-base p-3 border-none text-center rounded-md"
                    onClick={onSubmitApplication}
                />
            </div>
        </div>
        {
        resumeModalOpen ?
        <ReactModal
            isOpen={resumeModalOpen}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            preventScroll={true}
            overlayClassName={"ReactModal__Overlay"}
            bodyOpenClassName={"ReactModal__Body--open"}
            htmlOpenClassName={"ReactModal__Html--open"}
            shouldFocusAfterRender={true}
            shouldReturnFocusAfterClose={true}
            ariaHideApp={false}
            parentSelector={() => document.body }
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgb(0, 0, 0)',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)'
                },
                content: {
                    position: 'absolute',
                    zIndex: 2,
                    top: '20%',
                    left: '25%',
                    right: '25%',
                    bottom: '40%',
                    border: '1px solid black',
                    background: '#fff',
                    WebkitOverflowScrolling: 'touch',
                    outline: 'none',
                    padding: '20px'
                }
            }}
            >
                <div>
                    <div className="flex justify-end cursor-pointer" onClick={closeModal}>
                        <img src="assets/close.svg" alt="close"/>
                    </div>
                    <div className="flex flex-col justify-start lg:mt-6 mt-3 lg:mx-6 mx-3 lg:pb-6 pb-3 border-b-2 border-solid border-[#ACABAB]">
                        <p className="text-black text-3xl font-bold">Upload Resume</p>
                    </div>
                    <div className="lg:mx-6 mx-3 lg:mt-4 mt-2 lg:pb-6 pb-3 border-b-2 border-solid border-[#ACABAB]">
                        <p className="text-black text-base font-semibold">Upload a resume for this application</p>
                        {
                            !uploadbtn ?
                            <div className="grid lg:grid-cols-5 grid-cols-1 mt-1">
                                <div className="col-start-1 col-span-2">
                                    <input 
                                        accept="image/*" 
                                        id="icon-button-file" 
                                        type="file"
                                        className="hidden"
                                        onChange={onFileUpload}
                                        required={true} 
                                    />
                                    <label htmlFor="icon-button-file">
                                        <div className="bg-white border-2 border-solid border-black rounded-sm">
                                            <p className="text-black font-bold text-base text-center p-3">Upload File</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="col-start-3 col-span-3 bg-[#D9D9D9] rounded-sm" />
                            </div> :
                            <div className="mt-4">
                                <div className="flex flex-row">
                                    <p>{resume}</p>
                                    <input
                                        type="button"
                                        value="Delete"
                                        className="cursor-pointer underline ml-6"
                                    />
                                </div>
                                <div className="">
                                    <p>File Uploaded Successfully!</p>
                                </div>
                            </div>
                        }
                        <p className="text-base font-semibold mt-2">Supported file formats: pdf, doc, and docx. Maximum file size is 5MB.</p>
                    </div>
                    <div className="lg:mx-6 mx-3 lg:mt-4 mt-2 lg:mb-6 mb-3 flex justify-end">
                        {
                            uploadbtn ?
                            <input
                                type="button"
                                value="Upload Resume"
                                className="col-start-2 col-span-4 lg:w-80 lg:h-12 bg-[#F38117] cursor-pointer lg:text-xl text-base p-3 border-none text-center rounded-md"
                                onClick={lastUpload}
                            /> :
                            <input
                                type="button"
                                value="Upload Resume"
                                className="col-start-2 col-span-4 lg:w-80 lg:h-12 bg-[#D9D9D9] cursor-pointer lg:text-xl text-base text-white p-3 border-none text-center rounded-md"
                                onClick={lastUpload}
                                disabled
                            />
                        }
                    </div>
                </div>
        </ReactModal> : null
        }
        </>
    )
}

export default Application;