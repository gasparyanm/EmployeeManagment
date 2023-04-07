import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./features/employee/EmployeeList";
import EmployeeCreate from "./features/employee/EmployeeCreate";
import "./App.css";

const App = () => {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Employee Management
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/employees"} className="nav-link">
                                Employees
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/employees/create"} className="nav-link">
                                Create Employee
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="mx-4 mt-3">
                    <Routes>
                        <Route path="/employees" element={<EmployeeList />} />
                        <Route path="/employees/create" element={<EmployeeCreate />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
