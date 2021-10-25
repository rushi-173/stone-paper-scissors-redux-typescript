import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./../styles/Navbar.css";
import { logout } from "../features/user/userSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
function Navbar(): JSX.Element {
	const user = useAppSelector((state) => state.user);
	const navigate = useNavigate();

	const [hamburgerStyles, setHamburgerStyles] = useState<string>(
		"hamburger-menu pointer"
	);
	const [menuStyles, setMenuStyles] = useState<string>("menu hide-menu");

	const dispatch = useAppDispatch();

	const handleLogout = () => {
		localStorage.removeItem("spsUser");
		dispatch(logout());
		navigate("/signin");
	};

	const hamburgerClickHandler = () => {
		if (hamburgerStyles.includes("click")) {
			setHamburgerStyles("hamburger-menu pointer");
			setMenuStyles("menu hide-menu");
		} else {
			setHamburgerStyles("hamburger-menu pointer click");
			setMenuStyles("menu show-menu");
		}
	};

	const menuHandler = () => {
		setHamburgerStyles("hamburger-menu pointer");
		setMenuStyles("menu hide-menu");
	};

	return (
		<>
			<nav className="navbar">
				<div className="container-center">
					<div
						className={hamburgerStyles}
						onClick={hamburgerClickHandler}
						id="menu-open-button"
						role="button"
					>
						<span className="hamburger-menu-line"></span>
						<span className="hamburger-menu-line"></span>
						<span className="hamburger-menu-line"></span>
					</div>

					<Link to="/" className="container-center brand-logo">
						<p className="brand-name">RO-PA-SC</p>
					</Link>
				</div>

				<ul className={menuStyles} onClick={menuHandler} id="menu">
					{user.loggedInUser ? (
						<>
							<li className="menu-item">
								<b>
									<Link to="/">Home</Link>
								</b>
							</li>
							<li className="menu-item">
								<b>
									<Link to="/scoreboard">Scoreboard</Link>
								</b>
							</li>
							<li className="menu-item">
								<b onClick={() => handleLogout()}>
									<Link to="/">Logout</Link>
								</b>
							</li>
						</>
					) : (
						<li className="menu-item">
							<b>
								<Link to="/signin">SignIn/SignUp</Link>
							</b>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
