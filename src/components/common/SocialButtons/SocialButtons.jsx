import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import styles from "./SocialButtons.module.css";

export default function SocialButtons({
disabled = false,
}) {

const navigate =
useNavigate();

const { login } =
useAuth();

const googleLogin =
useGoogleLogin({

onSuccess:
async (
tokenResponse
) => {

try {

const res =
await axios.post(
"http://localhost:3000/api/auth/google",
{
access_token:
tokenResponse.access_token,
}
);

if (
res.data.success
) {

const user =
res.data.data;

login(
res.data.token,
user
);

if (
user.role ===
"admin"
) {

navigate(
"/admin"
);

} else if (
user.role ===
"driver"
) {

navigate(
"/driver-form"
);

} else if (
user.role ===
"placeOwner"
) {

navigate(
"/organization-profile"
);

} else {

navigate(
"/"
);

}

}

} catch (
err
) {

console.log(
err
);

alert(
"Google login failed"
);

}

},

onError:
() => {

alert(
"Google login failed"
);

},

});

return (

<div className="row g-2">

<div className="col">

<button
type="button"
disabled={
disabled
}
onClick={() =>
googleLogin()
}
className={`btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 py-2 shadow-none ${styles.socialButton}`}
>

<FaGoogle
className={
styles.googleIcon
}
/>

Continue with Google

</button>

</div>

</div>

);

}