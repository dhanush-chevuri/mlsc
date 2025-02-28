import React, { useState, useEffect } from 'react';
import { ref, get, onValue } from "firebase/database";
import { database } from './firebase'; // Using your existing firebase setup
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const [data, setData] = useState({
    problems: {},
    userSelections: {}
  });
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [statistics, setStatistics] = useState({
    totalProblems: 0,
    totalRegistrations: 0,
    categoryCounts: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch problems
        const problemsRef = ref(database, "Problems");
        const userSelectionsRef = ref(database, "UserSelections");
        
        const problemsSnapshot = await get(problemsRef);
        const userSelectionsSnapshot = await get(userSelectionsRef);
        
        const problems = problemsSnapshot.exists() ? problemsSnapshot.val() : {};
        const userSelections = userSelectionsSnapshot.exists() ? userSelectionsSnapshot.val() : {};
        
        setData({
          problems,
          userSelections
        });
        
        // Calculate statistics
        calculateStatistics(problems, userSelections);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Real-time updates for user selections
    const userSelectionsRef = ref(database, "UserSelections");
    const unsubscribe = onValue(userSelectionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const userSelections = snapshot.val();
        setData(prevData => ({
          ...prevData,
          userSelections
        }));
        calculateStatistics(data.problems, userSelections);
      }
    });

    return () => unsubscribe();
  }, [data.problems]);

  const calculateStatistics = (problems, userSelections) => {
    const categoryCounts = {};
    let totalProblems = 0;
    
    // Count problems by category
    Object.keys(problems).forEach(category => {
      const categoryProblems = problems[category];
      const count = Object.keys(categoryProblems).length;
      categoryCounts[category] = { 
        total: count,
        registered: 0
      };
      totalProblems += count;
    });
    
    // Count registrations by category
    const userSelectionsList = Object.values(userSelections || {});
    userSelectionsList.forEach(selection => {
      if (categoryCounts[selection.category]) {
        categoryCounts[selection.category].registered += 1;
      }
    });
    
    setStatistics({
      totalProblems,
      totalRegistrations: userSelectionsList.length,
      categoryCounts
    });
  };

  // Group user selections by problem
  const getUsersByProblem = () => {
    const problemUsers = {};
    
    Object.entries(data.userSelections || {}).forEach(([userId, selection]) => {
      const key = `${selection.category}_${selection.problemId}`;
      if (!problemUsers[key]) {
        problemUsers[key] = [];
      }
      problemUsers[key].push({
        userId,
        teamName: selection.teamName,
        email: selection.teamEmail,
        selectedAt: selection.selectedAt
      });
    });
    
    return problemUsers;
  };

  const filteredProblems = () => {
    const problemUsers = getUsersByProblem();
    const result = [];
    
    Object.keys(data.problems || {}).forEach(category => {
      if (activeCategory !== 'All' && activeCategory !== category) {
        return;
      }
      
      const categoryProblems = data.problems[category];
      Object.keys(categoryProblems).forEach(problemId => {
        const problem = categoryProblems[problemId];
        const searchMatch = problem.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           problemId.toLowerCase().includes(searchTerm.toLowerCase());
                           
        if (searchTerm && !searchMatch) {
          return;
        }
        
        const key = `${category}_${problemId}`;
        const registeredUsers = problemUsers[key] || [];
        
        result.push({
          category,
          problemId,
          title: problem.title || problemId.replace(/_/g, ' '),
          teamCount: problem.teamCount || 0,
          maxTeams: problem.maxTeams || 2,
          registeredUsers
        });
      });
    });
    
    return result;
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="fs-4 fw-semibold text-secondary">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <div className="d-flex align-items-center">
            <i className="fas fa-code fs-5 me-2"></i>
            <span className="fw-bold fs-5">HackXcelerate</span>
            <span className="ms-2 fs-5">Admin</span>
          </div>
          <div className="d-flex">
            <ul className="navbar-nav">
              <li className="nav-item me-3">
                <a href="#" className="nav-link">Dashboard</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="container py-4">
        {/* Stats Overview */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted small">Total Problems</h6>
                <p className="fs-2 fw-bold">{statistics.totalProblems}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted small">Total Registrations</h6>
                <p className="fs-2 fw-bold">{statistics.totalRegistrations}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted small">Problem Utilization</h6>
                <p className="fs-2 fw-bold">
                  {statistics.totalProblems > 0 
                    ? Math.round((statistics.totalRegistrations / statistics.totalProblems) * 100) 
                    : 0}%
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted small">Most Popular Category</h6>
                <p className="fs-2 fw-bold">
                  {Object.entries(statistics.categoryCounts).sort((a, b) => 
                    b[1].registered - a[1].registered
                  )[0]?.[0] || 'None'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category breakdown */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4">Category Breakdown</h5>
            <div className="row">
              {Object.entries(statistics.categoryCounts).map(([category, counts]) => (
                <div key={category} className="col-md-3 mb-3">
                  <div className="border rounded p-3">
                    <h6 className="fw-medium">{category}</h6>
                    <div className="row mt-2">
                      <div className="col-6">
                        <p className="small text-muted mb-0">Problems</p>
                        <p className="fs-5 fw-semibold">{counts.total}</p>
                      </div>
                      <div className="col-6">
                        <p className="small text-muted mb-0">Registered</p>
                        <p className="fs-5 fw-semibold">{counts.registered}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6 mb-3 mb-md-0">
                <h5 className="card-title">Problem Statements</h5>
                <p className="text-muted small">View all problem statements and registrations</p>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6 mb-2 mb-md-0">
                    <select 
                      className="form-select"
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      {Object.keys(data.problems || {}).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Search problems..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Problem Statements Table */}
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-3 py-3">Problem Statement</th>
                    <th className="px-3 py-3">Category</th>
                    <th className="px-3 py-3">Registration</th>
                    <th className="px-3 py-3">Registered Teams</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProblems().map((problem) => (
                    <tr key={`${problem.category}_${problem.problemId}`}>
                      <td className="px-3 py-3">
                        <div className="fw-medium">{problem.title}</div>
                        <div className="small text-muted">ID: {problem.problemId}</div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="badge bg-primary rounded-pill px-3 py-2">
                          {problem.category}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="small text-muted">
                          {problem.teamCount} / {problem.maxTeams} teams
                        </div>
                        <div className="progress mt-1" style={{ height: "6px" }}>
                          <div 
                            className="progress-bar bg-primary" 
                            role="progressbar"
                            style={{ width: `${(problem.teamCount / problem.maxTeams) * 100}%` }}
                            aria-valuenow={(problem.teamCount / problem.maxTeams) * 100}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        {problem.registeredUsers.length > 0 ? (
                          <ul className="list-unstyled small text-muted mb-0">
                            {problem.registeredUsers.map((user) => (
                              <li key={user.userId} className="mb-2 pb-2 border-bottom">
                                <div className="fw-medium">{user.teamName}</div>
                                <div className="small">{user.email}</div>
                                <div className="small text-muted">
                                  {user.selectedAt ? new Date(user.selectedAt).toLocaleString() : 'Date not available'}
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="small text-muted">No registrations yet</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  
                  {filteredProblems().length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-3">
                        <span className="text-muted">No problem statements found matching your criteria</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <i className="fas fa-code fs-5 me-2"></i>
                <span className="fw-bold fs-5">HackXcelerate</span>
                <span className="ms-2 fs-5">Admin</span>
              </div>
              <p className="text-muted small mt-2 mb-0">Problem Statement Management System</p>
            </div>
            <div className="col-md-6 text-md-end">
              <a href="#" className="text-muted me-3">
                <i className="fab fa-whatsapp fs-5"></i>
              </a>
              <a href="#" className="text-muted me-3">
                <i className="fab fa-linkedin fs-5"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="fab fa-instagram fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Admin;