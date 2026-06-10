import {
 createContext,
 useContext,
 useState,
 useEffect,
} from "react";

const AuthContext =
createContext();

export function AuthProvider({
 children,
}) {

const [user, setUser] =
useState(null);

const [loading, setLoading] =
useState(true);

useEffect(() => {

const token =
localStorage.getItem(
"token"
);

if (!token) {
setLoading(false);
return;
}

fetch(
"http://localhost:3000/api/auth/me",
{
headers: {
Authorization:
`Bearer ${token}`,
},
}
)
.then((res) =>
res.json()
)
.then((data) => {

if (
data.success
) {
setUser(
data.data
);
} else {

localStorage.removeItem(
"token"
);

localStorage.removeItem(
"user"
);

}

})
.catch(() => {

localStorage.removeItem(
"token"
);

localStorage.removeItem(
"user"
);

})
.finally(() =>
setLoading(
false
)
);

}, []);

const login = (
token,
userData
) => {

localStorage.setItem(
"token",
token
);

localStorage.setItem(
"user",
JSON.stringify(
userData
)
);

setUser(
userData
);

};

const logout = () => {

localStorage.removeItem(
"token"
);

localStorage.removeItem(
"user"
);

setUser(
null
);

};

return (
<AuthContext.Provider
value={{
user,
loading,
login,
logout,
}}
>

{children}

</AuthContext.Provider>
);

}

export const useAuth =
() =>
useContext(
AuthContext
);