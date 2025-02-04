import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import axios from 'axios';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^[A-Za-z\d@#$]{8,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const FIRSTNAME_REGEX = /^[A-Za-z]+$/;
const LASTNAME_REGEX = /^[A-Za-z]+$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PHONE_REGEX.test(phoneNumber);
        setValidPhoneNumber(result);
    }, [phoneNumber]);

    useEffect(() => {
        const result = FIRSTNAME_REGEX.test(firstName);
        setValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        const result = LASTNAME_REGEX.test(lastName);
        setValidLastName(result);
    }, [lastName]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPwd(result);
        const match = password === confirmPassword;
        setValidMatch(match);
    }, [password, confirmPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [password, email, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
        } else {
            try {
                const response = await axios.post('http://localhost:4000/api/v1/auth/register', {
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    password,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                if (response.status === 200) {
                    alert('Registration successful');
                    setSuccess(true);
                    navigate('/login');
                } else {
                    alert('Registration failed');
                }
            } catch (error) {
                alert('There was an error registering: ' + (error.response ? error.response.data.message : error.message));
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='flex gap-5'>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:
                                <span className={validFirstName ? "valid text-green-500 ml-2" : "hide"}>
                                    {validFirstName ? <FontAwesomeIcon icon={faCheck} /> : ""}
                                </span>
                                <span className={validFirstName || !firstName ? "hide" : "invalid text-red-500 ml-2"}>
                                    {!validFirstName || !firstName ? <FontAwesomeIcon icon={faTimes} /> : ""}
                                </span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                ref={userRef}
                                required
                                aria-invalid={validFirstName ? "false" : "true"}
                                aria-describedby='uidnote'
                                onFocus={() => setFirstNameFocus(true)}
                                onBlur={() => setFirstNameFocus(false)}
                                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p id='uidnote' className={firstNameFocus && firstName && !validFirstName ? "instructions text-sm text-gray-600 mb-4" : "offscreen"} />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:
                                <span className={validLastName ? "valid text-green-500 ml-2" : "hide"}>
                                    {validLastName ? <FontAwesomeIcon icon={faCheck} /> : ""}
                                </span>
                                <span className={validLastName || !lastName ? "hide" : "invalid text-red-500 ml-2"}>
                                    {!validLastName || !lastName ? <FontAwesomeIcon icon={faTimes} /> : ""}
                                </span>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                required
                                aria-invalid={validLastName ? "false" : "true"}
                                aria-describedby='uidnote'
                                onFocus={() => setLastNameFocus(true)}
                                onBlur={() => setLastNameFocus(false)}
                                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p id='uidnote' className={lastNameFocus && lastName && !validLastName ? "instructions text-sm text-gray-600 mb-4" : "offscreen"} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:
                            <span className={validEmail ? "valid text-green-500 ml-2" : "hide"}>
                                {validEmail ? <FontAwesomeIcon icon={faCheck} /> : ""}
                            </span>
                            <span className={validEmail || !email ? "hide" : "invalid text-red-500 ml-2"}>
                                {!validEmail || !email ? <FontAwesomeIcon icon={faTimes} /> : ""}
                            </span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby='uidnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p id='uidnote' className={userFocus && email && !validEmail ? "instructions text-sm text-gray-600 mb-4" : "offscreen"} />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:
                            <span className={validPhoneNumber ? "valid text-green-500 ml-2" : "hide"}>
                                {validPhoneNumber ? <FontAwesomeIcon icon={faCheck} /> : ""}
                            </span>
                            <span className={validPhoneNumber || !phoneNumber ? "hide" : "invalid text-red-500 ml-2"}>
                                {!validPhoneNumber || !phoneNumber ? <FontAwesomeIcon icon={faTimes} /> : ""}
                            </span>
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            required
                            aria-invalid={validPhoneNumber ? "false" : "true"}
                            aria-describedby='uidnote'
                            onFocus={() => setPhoneNumberFocus(true)}
                            onBlur={() => setPhoneNumberFocus(false)}
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p id='uidnote' className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions text-sm text-gray-600 mb-4" : "offscreen"} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:
                            <span className={validPwd ? "valid text-green-500 ml-2" : "hide"}>
                                {validPwd ? <FontAwesomeIcon icon={faCheck} /> : ""}
                            </span>
                            <span className={validPwd || !password ? "hide" : "invalid text-red-500 ml-2"}>
                                {!validPwd || !password ? <FontAwesomeIcon icon={faTimes} /> : ""}
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby='pwdnote'
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions text-sm text-gray-600 mb-4" : "offscreen"}>
                            { !validPwd ? <FontAwesomeIcon icon={faInfoCircle} /> : ""}  
                            { !validPwd ? "8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character." : ""}  
                        </p>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:
                            <span className={validMatch && confirmPassword ? "valid text-green-500 ml-2" : "hide"}>
                                {validMatch && confirmPassword ? <FontAwesomeIcon icon={faCheck} /> : ""}
                            </span>
                            <span className={validMatch || !confirmPassword ? "hide" : "invalid text-red-500 ml-2"}>
                                {!validMatch || !confirmPassword ? <FontAwesomeIcon icon={faTimes} /> : ""}
                            </span>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby='confirmnote'
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p id='confirmnote' className={matchFocus && !validMatch ? "instructions text-sm text-gray-600 mb-4" : "offscreen"}>
                            {!validMatch ? <FontAwesomeIcon icon={faInfoCircle} /> : ""}
                            {!validMatch ? "Must match the first password input field." : ""}
                        </p>
                    </div>
                    <button disabled={!validEmail || !validPwd || !validMatch} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400">
                        Sign Up
                    </button>
                    {success && <p className="text-green-500 mt-4">Registration successful!</p>}
                    <div className="text-center">
                        Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

// import React from 'react'
// import { useRef, useEffect, useState } from 'react';
// import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const PASSWORD_REGEX = /^[A-Za-z\d@#$]{8,}$/;
// const PHONE_REGEX = /^[0-9]{10}$/;

// const FIRSTNAME_REGEX = /^[A-Za-z]+$/;
// const LASTNAME_REGEX = /^[A-Za-z]+$/;

// Example: "Password1", "Passw0rd@", "1234abcd#", "Abcdefgh1"

// function Register() {
//     const userRef = useRef();
//     const errRef = useRef();

//     const [email, setEmail] = useState('');
//     const [validEmail, setValidEmail] = useState(false);
//     const [userFocus, setUserFocus] = useState(false);

//     const [firstName, setFirstName] = useState('');
//     const [validFirstName, setValidFirstName] = useState(false);
//     const [FirstNameFocus, setFirstNameFocus] = useState(false);

//     const [lastName, setLastName] = useState('');
//     const [validLastName, setValidLastName] = useState(false);
//     const [LastNameFocus, setLastNameFocus] = useState(false);

//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [validPhoneNumber, setValidPhoneNumber] = useState(false);
//     const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

//     const [password, setPassword] = useState('');
//     const [validPwd, setValidPwd] = useState(false);
//     const [PwdFocus, setPwdFocus] = useState(false);

//     const [matchPwd, setmatchPwd] = useState('');
//     const [validMatch, setValidMatch] = useState(false);
//     const [MatchFocus, setMatchFocus] = useState(false);

//     const [errMsg, setErrMsg] = useState('');
//     const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, []);

    // useEffect(() => {
    //     const result = EMAIL_REGEX.test(email);
    //     setValidEmail(result);
    // }, [email]);

    // useEffect(() => {
    //     const result = PHONE_REGEX.test(phoneNumber);
    //     setValidPhoneNumber(result);
    // }, [phoneNumber]);

    // useEffect(() => {
    //     const result = FIRSTNAME_REGEX.test(firstName);
    //     setValidFirstName(result);
    // }, [firstName]);

    // useEffect(() => {
    //     const result =  LASTNAME_REGEX.test(lastName);
    //     setValidLastName(result);
    // }, [lastName]);

    // useEffect(() => {
    //     const result = PASSWORD_REGEX.test(password);
    //     setValidPwd(result);
    //     const match = pwd === matchPwd;
    //     setValidMatch(match);
    // }, [pwd, matchPwd]);

    // useEffect(() => {
    //     setErrMsg('');
    // }, [pwd, email, matchPwd]);

  
//    const handelSubmit = async (e) => {
//          e.preventDefault();
//          if (password !== confirmPassword) {
//              console.log('Passwords do not match');
//         } else {
//                          try {
//              const response = await axios.post('http://localhost:4000/register', {
//                    firstName,
//                   lastName,
//                    email,
//                    phoneNumber,
//                    password,
//                },
//                {
//                     headers: {
//                      "Content-Type": "application/json",
//                  },
//                     withCredentials: true,
//                 });
//                 if (response.status === 200) {
//                     alert('Registration successful');
//                                 } else {
//        alert('Registration failed');
//                }
//            } catch (error) {
//                 alert('There was an error registering: ' + (error.response ? error.response.data.message : error.message));
//             }
//       }
//     };

//     return (
//         <> {
//             success? (
//                 <section>
//                 <h1>Signin</h1>
//                 </section>
//             ) :(

       
//         <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <p ref={errRef} className={errMsg ? "errmsg text-red-500 mb-4" : "offscreen"} aria-live='assertive'>
//                 {errMsg}
//             </p>
//             <h1 className="text-4xl font-bold mb-8 text-gray-800">Register</h1>
//             <form onSubmit={handelSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

                {/* email  */}

                {/* <label htmlFor='email' className="block text-gray-700 font-semibold mb-2"> */}
                    {/* Email: */}
                    {/* <span className={validEmail ? "valid text-green-500 ml-2" : "hide"}>
                        {validEmail ? <FontAwesomeIcon icon={faCheck} /> : ""}
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid text-red-500 ml-2"}>
                        {!validEmail || !email ? <FontAwesomeIcon icon={faTimes} /> : ""}
                    </span> */}
                {/* </label>
                <input
                    type='email'
                    id='useremail'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)} required */}
                {/* //     aria-invalid={validEmail ? "false" : "true"}
                //     aria-describedby='uidnote'
                //     onFocus={() => setUserFocus(true)}
                //     onBlur={() => setUserFocus(false)}
                //     className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                // />
                // <p id='uidnote' className={userFocus && email && !validEmail ? "instructions text-sm text-gray-600 mb-4" : "offscreen"} /> */}
                {/* <label htmlFor='PhoneNumber' className="block text-gray-700 font-semibold mb-2">
                    phoneNumber:
                    <span className={validPhoneNumber ? "valid text-green-500 ml-2" : "hide"}>
                       
                        {validPhoneNumber ? <FontAwesomeIcon icon={faCheck} /> :""}
                    </span>
                    <span className={validPhoneNumber|| !phoneNumber ? "hide" : "invalid text-red-500 ml-2"}>
                        
                        {!validPhoneNumber || !phoneNumber ? <FontAwesomeIcon icon={faTimes} />: ""}
                    </span>
                </label>
                <input
                    type='tel'
                    id='PhoneNumber'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setPhoneNumber(e.target.value)} required
                    aria-invalid={validPhoneNumber ? "false" : "true"}
                    aria-describedby='uidnote'
                    onFocus={() => setPhoneNumberFocus(true)}
                    onBlur={() => setPhoneNumberFocus(false)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p id='uidnote' className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions text-sm text-gray-600 mb-4" : "offscreen"} /> */}
       
       
                {/* <label htmlFor='FirstName' className="block text-gray-700 font-semibold mb-2">
                    FirstName:
                    <span className={validFirstName ? "valid text-green-500 ml-2" : "hide"}>
                       
                        {validFirstName ? <FontAwesomeIcon icon={faCheck} /> :""}
                    </span>
                    <span className={validFirstName || !FirstName? "hide" : "invalid text-red-500 ml-2"}>
                        
                        {!validFirstName || !FirstName ? <FontAwesomeIcon icon={faTimes} />: ""}
                    </span>
                </label>
                <input
                    type='text'
                    id='FirstName'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setFirstName(e.target.value)} required
                    aria-invalid={validFirstName ? "false" : "true"}
                    aria-describedby='uidnote'
                    onFocus={() => setFirstNameFocus(true)}
                    onBlur={() => setFirstName(false)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p id='uidnote' className={FirstNameFocus && FirstName && !validFirstName ? "instructions text-sm text-gray-600 mb-4" : "offscreen"} /> */}




{/* 
                <label htmlFor='userLastName' className="block text-gray-700 font-semibold mb-2">
                    LastName:
                    <span className={validLastName ? "valid text-green-500 ml-2" : "hide"}>
                       
                        {validLastName? <FontAwesomeIcon icon={faCheck} /> :""}
                    </span>
                    <span className={validLastName || !LastName? "hide" : "invalid text-red-500 ml-2"}>
                        
                        {!validLastName || !LastName ? <FontAwesomeIcon icon={faTimes} />: ""}
                    </span>
                </label>
                <input
                    type='text'
                    id='userLastName'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setLastName(e.target.value)} required
                    aria-invalid={validLastName ? "false" : "true"}
                    aria-describedby='uidnote'
                    onFocus={() => setLastNameFocus(true)}
                    onBlur={() => setLastNameFocus(false)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p id='uidnote' className={LastNameFocus && LastName && !validLastName ? "instructions text-sm text-gray-600 mb-4" : "offscreen"} /> */}




                {/* password */}
                {/* <label htmlFor='password' className="block text-gray-700 font-semibold mb-2">
                    Password:
                    <span className={validPwd ? "valid text-green-500 ml-2" : "hide"}>
                       
                        { validPwd?  <FontAwesomeIcon icon={faCheck} />: ""}
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid text-red-500 ml-2"}>
                        
                        {!validPwd ||  !pwd? <FontAwesomeIcon icon={faTimes} />: " "}
                    </span>
                </label> 
                <input
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby='pwdnote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p id='pwdnote' className={PwdFocus && !validPwd ? "instructions text-sm text-gray-600 mb-4" : "offscreen"}>
            
                    { !validPwd ? <FontAwesomeIcon icon={faInfoCircle} />:""}  
                  { !validPwd ? "8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.":""}  
                </p>

                {/* confirm_pwd */}
                // <label htmlFor='confirm_pwd' className="block text-gray-700 font-semibold mb-2">
                    {/* Confirm Password:
                    <span className={validMatch && matchPwd ? "valid text-green-500 ml-2" : "hide"}>
                        
                        {validMatch && matchPwd ? <FontAwesomeIcon icon={faCheck} />: ""}
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid text-red-500 ml-2"}>
                        
                        {!validMatch || !matchPwd ? <FontAwesomeIcon icon={faTimes} />: "" }
                    </span>
                </label>
                <input
                    type='password'
                    id='confirm_pwd'
                    onChange={(e) => setmatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby='confirmnote'
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p id='confirmnote' className={MatchFocus && !validMatch ? "instructions text-sm text-gray-600 mb-4" : "offscreen"}>
                {!validMatch ?   <FontAwesomeIcon icon={faInfoCircle} />:""}
                  {!validMatch ?   "Must match the first password input field.":""}
                </p> */}
//                 <button disabled={!validEmail || !validPwd || !validMatch} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400">
//                     Sign Up
//                 </button>
//                 {success && <p className="text-green-500 mt-4">Registration successful!</p>}
//                 <p>
//                 already registered?
                
//             </p>
//             <span>
//                     <a href='#'>signin</a>
//                 </span>
//             </form>
         
//         </section>
//              )
//             }
//             </>
//     );
// }

// export default Register */}

