import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Components/Login_Style/Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://shawr1999.pythonanywhere.com//api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw new Error(data.error); });
                }
                return response.json();
            })
            .then(data => {
                if (data.access) {
                    // Storing data in local storage
                    localStorage.setItem('token', data.access);
                    localStorage.setItem('role', data.is_superuser ? 'superuser' : data.is_staff ? 'staff' : 'user');
                    localStorage.setItem('userEmail', data.User_Info);
                    localStorage.setItem('userRoleId', data.User_Role_Id);
                    localStorage.setItem('Curr_User', data.Curr_User);
                    localStorage.setItem('Curr_Emp_id', data.Curr_Emp_id);
                    console.log(data.Curr_Emp_name,"name")
                    localStorage.setItem('Curr_Emp_name', data.Curr_Emp_name);
                    

                    // Navigating based on user role
                    switch (data.Curr_User) {
                        case 'admin':
                            console.log('its admin');
                            navigate('/manager-dashboard');
                            break;
                        case 'Hr':
                            navigate('/hr-dashboard');
                            break;
                        case 'manager':
                            navigate('/manager-dashboard');
                            break;
                        default:
                            navigate('/emp-dashboard');
                    }
                }
            })
            .catch(err => setError(err.message));
    };

    return (

        <>
            
        {/* <form onSubmit={handleSubmit}>
            <input
                name="username"
                onChange={handleChange}
                required
                placeholder="Username"
                value={credentials.username}
            />
            <input
                name="password"
                type="password"
                onChange={handleChange}
                required
                placeholder="Password"
                value={credentials.password}
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
            
        </form> */}


        <div class="main_back">

        <section class="sign-in">
            <div class="login_container">
                <div class="signin-content">
                    <div class="signin-image">
                        <iframe src="https://lottie.host/embed/e4a36c9b-0193-4707-82e7-164fc1f8a8e4/B7pApkHqgZ.json" style={{height:"100%"}}></iframe>
                        {/* <a href="#" class="signup-image-link">Create an account</a> */}
                    </div>

                    <div class="signin-form">   
                        <h2 class="form-title">Sign up</h2>
                        <form method="POST" class="register-form" id="login-form" onSubmit={handleSubmit}>
                            <div class="login_form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input
                name="username"
                onChange={handleChange}
                required
                placeholder="Username"
                value={credentials.username}
            />
                            </div>
                            <div class="login_form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input
                name="password"
                type="password"
                onChange={handleChange}
                required
                placeholder="Password"
                value={credentials.password}
            />
                            </div>
                            <div class="login_form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div class="login_form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/>
                            </div>
                        </form>
                        {/* <div class="social-login">
                            <span class="social-label">Or login with</span>
                            <ul class="socials">
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>

            </div>
            </>
    );
};

export default Login;
