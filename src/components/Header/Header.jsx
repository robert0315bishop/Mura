import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactModal from "react-modal";
import { showSignModal, showSignUpModal, signData, signoutData, signupData } from "../../store/Admin";
import { useState } from "react";
import MenuComponent from "../Menu/Menu";
import "./style_header.css";

const Header = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const modal_open = useSelector((state) => state.admin.isOpenModal);
    const signup_modal_open = useSelector((state) => state.admin.isOpenSignupModal);
    const sign_state = useSelector((state) => state.admin.isSign);

    const onAdmin = (e) => {
        dispatch(showSignModal());
    }

    const onShowSignUpModal = (e) => {
        dispatch(showSignUpModal());
    }

    const closeModal = (e) => {
        dispatch(showSignModal());
    }

    const closesignupModal = (e) => {
        dispatch(showSignUpModal());
    }

    const onEmail = (e) => {
        setEmail(e.target.value);
    }

    const onPassword = (e) => {
        setPassword(e.target.value);
    }

    const onSignIn = (e) => {
        let data = { email: email, password: password };
        dispatch(signData(data));
    }

    const onSignUp = (e) => {
        let data = { email: email, password: password };
        dispatch(signupData(data));
    }

    const onSignOut = (e) => {
        dispatch(signoutData());
    }

    return (
        <>
        <nav className="bg-[#F5ECE6]">
            <div className="flex justify-end items-center">
            {
                sign_state ? null :
                    <NavLink
                        className="text-{2F2F2F} lg:mt-6 lg:mr-6 mt-2 mr-2 px-6 py-2 border border-1 border-black rounded-md text-base font-weight-500 text-center"
                        onClick={onAdmin}
                    >
                    SIGN IN
                    </NavLink>
            }
            </div>
            <div className="flex lg:flex-row flex-col lg:items-end items-center lg:mx-40 mx-1 pt-12 justify-center">
                <div className="ml-4 flex lg:flex-row flex-col items-center">
                    <NavLink to="/">
                        <img className="w-60 max-w-none lg:mr-20 mr-0" src="assets/Logo/logo.png" alt="Mura" />
                    </NavLink>
                    <MenuComponent />
                    <NavLink
                        to="/brand"
                        className="text-black hover:text-[#CBBAAB] px-12 py-2 rounded-md text-normal font-weight-500 text-center hover:underline"
                    >
                    BRAND STORY
                    </NavLink>
                    <NavLink
                        to="/news"
                        className="text-black hover:text-[#CBBAAB] px-12 py-2 rounded-md text-base font-weight-500 text-center hover:underline"
                    >
                        NEWS/EVENT
                    </NavLink>
                    <NavLink
                        to="/faq"
                        className="text-black hover:text-[#CBBAAB] px-12 py-2 rounded-md text-base font-weight-500 text-center hover:underline"
                    >
                        FAQS
                    </NavLink>
                    <NavLink
                        to="/careers"
                        className="text-black hover:text-[#CBBAAB] px-12 py-2 rounded-md text-base font-weight-500 text-center hover:underline"
                    >
                    CAREERS
                    </NavLink>
                    {/* <NavLink
                        onClick={onShowSignUpModal}
                        className="text-black px-12 py-2 rounded-md text-base font-weight-500 text-center"
                    >
                    SignUp
                    </NavLink> */}
                    {
                    sign_state ?
                        <>
                        <NavLink
                            to="/candidate"
                            className="text-black hover:text-[#CBBAAB] px-12 py-2 rounded-md text-base font-weight-500 text-center hover:underline"
                        >
                        CANDIDATES
                        </NavLink>
                        <NavLink
                            to="/manage"
                            className="text-black hover:text-[#CBBAAB] px-12 py-2 rounded-md text-base font-weight-500 text-center hover:underline"
                        >
                        MANAGEMENT
                        </NavLink>
                        </> : null
                    }
                </div>
            </div>
        </nav>
        {
        modal_open ?
        <ReactModal
            isOpen={modal_open}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            preventScroll={true}
            bodyOpenClassName={"ReactModal__Body--open"}
            htmlOpenClassName={"ReactModal__Html--open"}
            shouldFocusAfterRender={true}
            shouldReturnFocusAfterClose={true}
            ariaHideApp={false}
            parentSelector={() => document.body }
            className="MyModal"
            overlayClassName="MyOverlay"
        >
            <div className="bg-white">
                <div className="flex justify-end cursor-pointer" onClick={closeModal}>
                    <img src="assets/close.svg" alt="close"/>
                </div>
                <div className="lg:px-5 px-2 py-6 flex flex-col items-center">
                    <p className="font-bold text-black lg:text-3xl text-xl text-center">
                        Enter Your Information
                    </p>
                    <div className="flex flex-col w-full items-center mt-6">
                        <div className="w-full flex flex-col">
                            <p>Your Email<b className="pl-1 text-[#FF0000]">*</b></p>
                            <input
                                type="email"
                                value={email}
                                placeholder="your email@gmail.com"
                                className="w-full mt-3 bg-[#D9D9D9] text-base p-2 border-none rounded-md"
                                onChange={onEmail}
                            />
                        </div>
                        <div className="w-full flex flex-col mt-2">
                            <p>Password<b className="pl-1 text-[#FF0000]">*</b></p>
                            <input
                                type="password"
                                value={password}
                                className="w-full mt-3 bg-[#D9D9D9] text-base p-2 border-none rounded-md"
                                onChange={onPassword}
                            />
                        </div>
                    </div>
                    <input
                        type="button"
                        value="Sign In"
                        className="lg:mt-8 mt-8 lg:w-60 w-32 lg:h-12 bg-[#F38117] cursor-pointer lg:text-xl text-white text-base p-3 border-none text-center rounded-md"
                        onClick={onSignIn}
                    />
                </div>
            </div>
        </ReactModal> : null
        }
        {
        signup_modal_open ?
        <ReactModal
            isOpen={signup_modal_open}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            preventScroll={true}
            bodyOpenClassName={"ReactModal__Body--open"}
            htmlOpenClassName={"ReactModal__Html--open"}
            shouldFocusAfterRender={true}
            shouldReturnFocusAfterClose={true}
            ariaHideApp={false}
            parentSelector={() => document.body }
            className="MyModal"
            overlayClassName="MyOverlay"
        >
            <div className="bg-white">
                <div className="flex justify-end cursor-pointer" onClick={closesignupModal}>
                    <img src="assets/close.svg" alt="close"/>
                </div>
                <div className="px-10 py-6 flex flex-col items-center">
                    <p className="font-bold text-black lg:text-3xl text-xl text-center">
                        Enter Your Information
                    </p>
                    <div className="flex flex-col w-full items-center mt-6">
                        <div className="lg:w-96 flex flex-col">
                            <p>Your Email<b className="pl-1 text-[#FF0000]">*</b></p>
                            <input
                                type="email"
                                value={email}
                                placeholder="your email@gmail.com"
                                className="w-full mt-3 bg-[#D9D9D9] text-base p-2 border-none rounded-md"
                                onChange={onEmail}
                            />
                        </div>
                        <div className="lg:w-96 flex flex-col mt-2">
                            <p>Password<b className="pl-1 text-[#FF0000]">*</b></p>
                            <input
                                type="password"
                                value={password}
                                className="w-full mt-3 bg-[#D9D9D9] text-base p-2 border-none rounded-md"
                                onChange={onPassword}
                            />
                        </div>
                    </div>
                    <input
                        type="button"
                        value="Sign Up"
                        className="lg:mt-8 mt-2 lg:w-60 lg:h-12 bg-[#F38117] cursor-pointer lg:text-xl text-white text-base p-3 border-none text-center rounded-md"
                        onClick={onSignUp}
                    />
                </div>
            </div>
        </ReactModal> : null
        }
        </>
    )
}

export default Header;