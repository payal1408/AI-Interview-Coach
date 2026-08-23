// import { useContext, useEffect } from "react";
// import { AuthContext } from "../services/auth.context";
// import { login, register, getMe, logout } from "../services/auth.api";

// export const useAuth = () => {
//     const context = useContext(AuthContext)

//     const { loading, user, setLoading, setUser } = context


//     const handleLogin = async ({ email, password }) => {
//         setLoading(true)
//         try {
//             const data = await login({ email, password })
//             setUser(data.user)
//         }
//         catch (err) {
//             console.log(err)
//         } finally {
//             setLoading(false)
//         }

//     }

//     const handleRegister = async ({ username, email, password }) => {
//         setLoading(true);
//         try {
//             const data = await register({ username, email, password });
//             setUser(data.user)
//         }
//         catch (err) {
//             console.log(err)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleLogout = async () => {
//         setLoading(true)
//         try {
//             const data = await logout()
//             setUser(null)
//         } catch (err) {
//             console.log(err)
//         } finally {
//             setLoading(false)
//         }
//     }
//     useEffect(() => {
//         const getAndSetUser = async () => {
//             try {
//                 const data = await getMe()
//                 setUser(data.user)
//             } catch (err) {
//                 console.log(err)
//             } finally {
//                 setLoading(false)
//             }

//         }
//     }, [])
//     return (
//         { handleLogin, handleLogout, handleRegister }
//     )

// }


import { useContext, useEffect } from "react";
import { AuthContext } from "../services/auth.context";
import {
    login,
    register,
    getMe,
    logout,
} from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const {
        loading,
        user,
        setLoading,
        setUser,
    } = context;

    // =========================
    // LOGIN
    // =========================
    const handleLogin = async ({ email, password }) => {
        setLoading(true);

        try {
            const data = await login({
                email,
                password,
            });

            console.log("Login API Response:", data);

            if (data?.user) {
                setUser(data.user);
            }

            // IMPORTANT
            return data;
        } catch (err) {
            console.error(
                "Login Error:",
                err.response?.data || err.message
            );

            throw err;
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // REGISTER
    // =========================
    const handleRegister = async ({
        username,
        email,
        password,
    }) => {
        setLoading(true);

        try {
            const data = await register({
                username,
                email,
                password,
            });

            console.log("Register API Response:", data);

            if (data?.user) {
                setUser(data.user);
            }

            // IMPORTANT
            return data;
        } catch (err) {
            console.error(
                "Register Error:",
                err.response?.data || err.message
            );

            throw err;
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // LOGOUT
    // =========================
    const handleLogout = async () => {
        setLoading(true);

        try {
            const data = await logout();

            setUser(null);

            return data;
        } catch (err) {
            console.error(
                "Logout Error:",
                err.response?.data || err.message
            );

            throw err;
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // GET CURRENT USER
    // =========================
    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();

                console.log("Get Me Response:", data);

                if (data?.user) {
                    setUser(data.user);
                }
            } catch (err) {
                console.error(
                    "Get Me Error:",
                    err.response?.data || err.message
                );

                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        // IMPORTANT: actually call the function
        getAndSetUser();
    }, [setLoading, setUser]);

    return {
        user,
        loading,
        handleLogin,
        handleLogout,
        handleRegister,
    };
};