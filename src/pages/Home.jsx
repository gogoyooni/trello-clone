import React, { useEffect, useRef, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useAnimate, animate } from "framer-motion";
import useUserStore from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PulseLoader } from "react-spinners";
import { MdOutlineArrowForward } from "react-icons/md";

import useRefreshToken from "../hooks/useRefreshtoken";
// import { _createWorkspace } from "../features/workspace/workspaceService";

import "./styles/Home.css";

export default function Home() {
  const refresh = useRefreshToken();

  const [scope, animate] = useAnimate();
  const [isToggled, setIsToggled] = useState(true);
  // form index
  // const [formIndex, setFormIndex] = useState(1);
  const formIndexRef = useRef(0);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const loginUsernameRef = useRef();

  // @desc _id
  // const _id = useUserStore((state) => state._id);

  const [isLoading, setIsLoading] = useState(true);

  const [isSignedUp, setIsSignedUp] = useState(false);
  const [signupisLoading, setSignupIsLoading] = useState(false);
  const [signupUsername, setSingupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  // signup refs
  const signupUsernameRef = useRef();
  const signupPasswordRef = useRef();

  // @desc workspace name

  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceIsCreated, setWorkspaceIsCreated] = useState(false);

  const createWorkspace = useUserStore((state) => state.createWorkspace);

  const workspaceNameRef = useRef();
  // const workspaceisLoading

  // const loginUsername = useUserStore((state) => state.loginUsername);
  // const loginPassword = useUserStore((state) => state.loginPassword);
  const username = useUserStore((state) => state.username);

  // const setUsername = useUserStore((state) => state.setUsername);
  // const setPassword = useUserStore((state) => state.setPassword);
  const login = useUserStore((state) => state.login);

  const accessToken = useUserStore((state) => state.accessToken);
  const setAccessToken = useUserStore((state) => state.setAccessToken);

  // @ user signup - username, password input

  // const setSignupUSERNAME = useUserStore((state) => state.setSignupUSERNAME);
  // const setSignupPW = useUserStore((state) => state.setSignupPW);
  const signup = useUserStore((state) => state.signup);
  // before making a workspace name, check if the user has signed up
  // const isSignedUp = useUserStore((state) => state.isSignedUp);
  // const setIsSignedUp = useUserStore((state) => state.setIsSignedUp);

  // const globalSignupUsername = useUserStore((state) => state.signupUsername);
  // const setGlobalSignupUsername = useUserStore(
  //   (state) => state.setSignupUsername
  // );

  //navigate user according to username
  const navigate = useNavigate();

  useEffect(() => {
    loginUsernameRef.current.focus();
  }, []);

  const onLogin = async (e) => {
    // alert("click");
    e.preventDefault();

    // try {
    const response = await login({ loginUsername, loginPassword });
    console.log("response:", response);

    if (response.status === 200) {
      // setUsername(loginUsername);
      // setPassword(loginPassword);
      // console.log(20000);
      toast.success("🦄 Logged in successfully", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //여기서 이 해당 유저의 boards를 가져오는 axios를 써준다.
      // navigate(`/w/${username}`);
      setTimeout(() => {
        // alert(username);
        // console.log(username);
        // navigate(`/w/${loginUsername}`); 이게 원래 하던대로 하던거
        navigate(`/u/${loginUsername}/boards`);
        // redirect(`/w/${username}`);
        // navigate("/w", {
        //   state: {
        //     userId: username,
        //   },
        // });
      }, 3000);
    } else if (response?.status === 500) {
      // setMessage("No Response. Try again soon");
      toast.error(`😓 No Response. Try again soon`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (response?.status === 401) {
      // setMessage("The username doesn't exist");
      toast.info(`🤔 Password is not correct`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (response?.status === 404) {
      // setMessage("The username doesn't exist");
      toast.info(`🤔 The username doesn't exist`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // }
  };

  const onSignup = async (e) => {
    e.preventDefault();
    // setSignupUSERNAME(signupUsername);
    // setSignupPW(signupPassword);
    setSignupIsLoading(true);
    // try {

    const response = await signup({ signupUsername, signupPassword });

    console.log("response:", response);

    if (response?.status === 201) {
      setSignupIsLoading(false);
      setIsSignedUp(true);
      // I can use this signupusername when a user signs up and make a workspace name
      // setGlobalSignupUsername(globalSignupUsername);
      setTimeout(() => {
        toast.success("👏 Welcome! Your account has been created! ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 500);

      // make user to make a workspace name
      moveForm();
    } else if (response?.status === 500) {
      setSignupIsLoading(false);
      setTimeout(() => {
        toast.error(`😓 No Response. Try again soon`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 500);
    } else if (response?.status === 409) {
      setSignupIsLoading(false);
      setTimeout(() => {
        toast.error(`🙄 This username already exists`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 500);
    } else if (response?.status === 400) {
      setSignupIsLoading(false);
      setTimeout(() => {
        toast.error(`🤔 Enter both username and password`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 500);
    }

    // } catch (e) {
    //   console.log(e);
    // }
  };
  // console.log(isToggled);
  // console.log(formIndex);
  const increaseFormIndex = () => {
    // setFormIndex((prevNumber) => prevNumber + 1);
    formIndexRef.current += 1;
  };

  // console.log("formIndex: ", formIndex);
  const moveForm = () => {
    increaseFormIndex();
    console.log(formIndexRef.current);
    if (formIndexRef.current === 0) {
      loginUsernameRef.current.focus();
    } else if (formIndexRef.current === 1) {
      animate(
        scope.current,
        { marginLeft: "-50px" },
        { duration: 0.4, type: "spring" }
      );
      signupUsernameRef.current.value = "";
      signupPasswordRef.current.value = "";

      signupUsernameRef.current.focus();
    } else if (formIndexRef.current === 2) {
      animate(
        scope.current,
        { marginLeft: "-1500px" },
        { duration: 0.4, type: "spring" }
      );
      signupUsernameRef.current.value = "";
      signupPasswordRef.current.value = "";
      workspaceNameRef.current.focus();
    } else if (formIndexRef.current >= 3) {
      formIndexRef.current = 0;
      animate(
        scope.current,
        { marginLeft: "0px" },
        { duration: 0.4, type: "spring" }
      );
      workspaceNameRef.current.value = "";
    }
  };

  const onCreateWorkspace = (e) => {
    e.preventDefault();

    if (isSignedUp) {
      // _createWorkspace(`/api/user/${_id}`, workspaceName, accessToken);
      createWorkspace(workspaceName);
      navigate(`/u/${username}/boards`); // 이거 어떻게 할까 음..
    } else {
      alert("you haven't signed up yet. Please sign up first!");
    }
  };

  // const toggleMoveForm = () => {
  //   if (isToggled) {
  //     signupUsernameRef.current.value = "";
  //     signupPasswordRef.current.value = "";

  //     signupUsernameRef.current.focus();

  //     animate(
  //       scope.current,
  //       { marginLeft: "600px" },
  //       { duration: 0.3, type: "spring" }
  //     );
  //     setIsToggled(!isToggled);
  //   } else {
  //     loginUsernameRef.current.focus();
  //     animate(
  //       scope.current,
  //       { marginLeft: "-50px" },
  //       { duration: 0.3, type: "spring" }
  //     );
  //     setIsToggled(!isToggled);
  //   }
  // };

  // useEffect(() => {
  //   // moveForm();
  // }, [formIndexRef.current]);

  return (
    <div id="home-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "350px" }}
      />
      <div id="home-inner">
        <div id="left">
          <div id="ad-container">
            <div id="ad-bg"></div>
            <div id="ad-inner">
              <div id="ad-btn-text">
                <h3 id="ad-heading">
                  Bring the <span id="colored">Power</span> to
                  <br />
                  Your Team
                </h3>
                <p id="add-subheading">
                  Keep tracking of your works and projects.{loginUsername} /{" "}
                  <button onClick={increaseFormIndex}>Formindex</button>
                  {/* {message} */}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="right">
          {/* <a href="">로고</a> */}
          <div ref={scope} className="form-inner login-wrapper">
            <h4 className="welcome-msg">Hey, hello 👋</h4>
            <p className="instruction-msg">
              Enter the information you entered while signing up
            </p>
            <div className="form-wrapper">
              <form className="login-form" onSubmit={onLogin}>
                <div className="username-input-wrapper">
                  <label htmlFor="username">Username</label>
                  <input
                    className="login-username-input"
                    type="text"
                    name="username"
                    value={loginUsername}
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setLoginUsername(e.target.value);
                    }}
                    ref={loginUsernameRef}
                    required
                  />
                </div>
                <div className="password-input-wrapper">
                  <label htmlFor="password">Password</label>
                  <input
                    className="login-password-input"
                    type="password"
                    name="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                {/* <div id="forgot-pw">
                  <Link to={"/"}>Forgot password?</Link>
                </div> */}
                <button id="login" type="submit">
                  Login
                </button>
              </form>
              <div id="signup">
                {/* <Link to={"/"}> */}
                Don'g have an account?{" "}
                <span id="signup-colored" onClick={moveForm}>
                  Sign up
                </span>
                {/* </Link> */}
              </div>
              {/* <div id="signup">
                Don'g have an account?{" "}
                <span id="signup-colored" onClick={toggleMoveForm}>
                  Sign up
                </span>
              </div> */}
            </div>
          </div>
          {/* sign up */}
          <div className="form-inner signup-wrapper">
            <div className="form-header">
              <h4 className="welcome-msg">Sign up</h4>
              <span>⌨️</span>
            </div>

            {/* <p id="instruction-msg"></p> */}
            <div className="form-wrapper">
              <form className="signup-form" onSubmit={onSignup}>
                <div className="username-input-wrapper">
                  <label htmlFor="signup-username">Username</label>
                  <input
                    className="signup-username-input"
                    type="text"
                    name="signup-username"
                    ref={signupUsernameRef}
                    onChange={(e) => {
                      setSingupUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="password-input-wrapper">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    className="signup-password-input"
                    type="password"
                    name="signup-password"
                    required
                    ref={signupPasswordRef}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>
                {/* <div id="forgot-pw">
                  <Link to={"/"}>Forgot password?</Link>
                </div> */}
                <button className="confirm" type="submit">
                  {signupisLoading ? <PulseLoader color="#fff" /> : "Confirm"}
                </button>
              </form>
              <div id="next">
                Ready to make your workspace?{" "}
                <span id="workspace-colored" onClick={moveForm}>
                  <MdOutlineArrowForward className="arrow" />
                </span>
              </div>
              {/* <div id="back">
                Ready to login?{" "}
                <span id="login-colored" onClick={toggleMoveForm}>
                  Login
                </span>
              </div> */}
            </div>
          </div>

          {/* after signup - type workspace name */}
          <div className="form-inner workspace-name-wrapper">
            <div className="workspace-name-header">
              <h4 className="welcome-msg">Workspace 📂</h4>
            </div>

            {/* <p id="instruction-msg"></p> */}
            <div className="form-wrapper">
              <form className="workspace-form" onSubmit={onCreateWorkspace}>
                <div className="workspace-input-wrapper">
                  <label htmlFor="workspace-name">Name</label>
                  <input
                    className="workspace-input"
                    type="text"
                    name="workspace-name"
                    ref={workspaceNameRef}
                    onChange={(e) => {
                      setWorkspaceName(e.target.value);
                    }}
                  />
                </div>
                <button className="create" type="submit">
                  {workspaceIsCreated ? <PulseLoader color="#fff" /> : "Create"}
                </button>
              </form>
              <div id="back">
                Ready to login?{" "}
                <span id="login-colored" onClick={moveForm}>
                  Login
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Home</h2>
      <p>여기서 로그인하게끔 하기</p>
      {/* <button onClick={() => refresh()}>Refresh!!!!!!!!!!!!!!!!!</button> */}
      <Link to="/b">워크스페이스로</Link>
    </div>
  );
}
