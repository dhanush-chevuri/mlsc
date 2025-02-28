import { useState, useEffect, useContext } from 'react';
import './hack.css';
import kalasalingam from "./assets/download.jpeg";
import mlsc from "./assets/mlsckare_logo.jpeg";
import mlsa from "./assets/Picture1.png";
import k7 from "./assets/k7.png";

import { Modal, Button, Toast, ToastContainer } from "react-bootstrap";

import { AuthContext } from './Auth';

import { ref, get, update, serverTimestamp, onValue } from "firebase/database";

import { database } from './firebase';


function Hack() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [navActive, setNavActive] = useState(false);
  const [showInfoMessage, setShowInfoMessage] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState('all');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const { user, signInWithGoogle, logOut } = useContext(AuthContext);
  const [data, setData] = useState({
    Problems: {
      AI: {},
      "Data Science": {},
      Cybersecurity: {},
      "Web_App Development": {}
    }
  });
  const [loading, setLoading] = useState(true);
  const [userSelection, setUserSelection] = useState(null);

  // Fetch all problem data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database, "Problems");
        console.log("Fetching problem data...");

        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          console.log("Fetched Problem Data:", fetchedData);
          setData({ Problems: fetchedData });
        } else {
          console.log("No problem data found");
        }
      } catch (error) {
        console.error("Error fetching problem data:", error);
        setErrorMessage("Failed to load problem statements. Please refresh the page.");
        setShowErrorMessage(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Listen for user's current selection
  useEffect(() => {
    if (!user) {
      setUserSelection(null);
      return;
    }

    const userSelectionsRef = ref(database, `UserSelections/${user.uid}`);

    // Set up listener
    const unsubscribe = onValue(userSelectionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const selection = snapshot.val();
        console.log("User selection:", selection);
        setUserSelection(selection);
      } else {
        setUserSelection(null);
      }
    });

    // Clean up listener
    return () => unsubscribe();
  }, [user]);

  // Display messages
  useEffect(() => {
    if (infoMessage) {
      setShowInfoMessage(true);
      const timer = setTimeout(() => {
        setShowInfoMessage(false);
        setInfoMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [infoMessage]);

  useEffect(() => {
    if (warningMessage) {
      setShowWarningMessage(true);
      const timer = setTimeout(() => {
        setShowWarningMessage(false);
        setWarningMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [warningMessage]);

  useEffect(() => {
    if (errorMessage) {
      setShowErrorMessage(true);
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Function to handle problem selection
  const handleSelectProblem = async (category, problemId) => {
    if (!user) {
      // User is not signed in, prompt them to sign in
      setShowSignInModal(true);
      return;
    }

    // Reference to the problem in Firebase
    const problemRef = ref(database, `Problems/${category}/${problemId}`);
    const userSelectionsRef = ref(database, `UserSelections/${user.uid}`);

    try {
      // Check if problem exists and isn't full
      const problemSnapshot = await get(problemRef);

      if (!problemSnapshot.exists()) {
        setErrorMessage("Problem statement not found.");
        return;
      }

      const problemData = problemSnapshot.val();
      const teamCount = problemData.teamCount || 0;
      const maxTeams = problemData.maxTeams || 2; // Default max teams

      if (teamCount >= maxTeams) {
        setWarningMessage("This problem statement has reached its maximum number of teams.");
        return;
      }

      // Check if user has already selected a problem
      const userSelectionsSnapshot = await get(userSelectionsRef);

      if (userSelectionsSnapshot.exists()) {
        const userSelection = userSelectionsSnapshot.val();

        // Set toast message and show it
        setToastMessage("Please deselect your current problem first before selecting a new one.");
        setShowToast(true);

        // Check if it's the same problem
        if (userSelection.problemId === problemId && userSelection.category === category) {
          setInfoMessage("You have already selected this problem statement.");
        }

        return;
      }

      // Create updates object for transaction
      const updates = {};

      // Increment team count for the problem
      updates[`Problems/${category}/${problemId}/teamCount`] = teamCount + 1;

      // Record user's selection
      updates[`UserSelections/${user.uid}`] = {
        problemId,
        category,
        selectedAt: serverTimestamp(),
        teamName: user.displayName || "Unnamed Team",
        teamEmail: user.email
      };

      // Add user to the problem's selected teams
      updates[`Problems/${category}/${problemId}/selectedTeams/${user.uid}`] = {
        teamName: user.displayName || "Unnamed Team",
        selectedAt: serverTimestamp()
      };

      // Perform the update transaction
      await update(ref(database), updates);

      setInfoMessage("You have successfully selected this problem statement.");
    } catch (error) {
      console.error("Error selecting problem:", error);
      setErrorMessage("Failed to select problem. Please try again.");
    }
  };



  // Function to deselect a problem
  const deselectProblem = async () => {
    setShowModal(true);
  };

  // Function to deselect a problem
  const handledeselectProblem = async () => {
    if (!user || !userSelection) return;

    setShowModal(false);

    try {
      const { category, problemId } = userSelection;

      // Get current problem data
      const problemRef = ref(database, `Problems/${category}/${problemId}`);
      const problemSnapshot = await get(problemRef);

      // Create updates object for transaction
      const updates = {};

      if (problemSnapshot.exists()) {
        const problemData = problemSnapshot.val();
        const teamCount = problemData.teamCount || 0;

        // Decrement team count
        updates[`Problems/${category}/${problemId}/teamCount`] = Math.max(0, teamCount - 1);
        // Remove user from problem's selected teams
        updates[`Problems/${category}/${problemId}/selectedTeams/${user.uid}`] = null;
      }

      // Remove user's selection
      updates[`UserSelections/${user.uid}`] = null;

      // Perform the update transaction
      await update(ref(database), updates);


      setInfoMessage("You have deselected the problem statement.");

    } catch (error) {
      console.error("Error deselecting problem:", error);
      setErrorMessage("Failed to deselect problem. Please try again.");
    }
  };

  const handleSignIn = async () => {
    setShowSignInModal(false);
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        console.log('Sign-in successful:', result.user);
      } else {
        console.error('Sign-in failed:', result.error);
        setErrorMessage("Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setErrorMessage("Sign-in error. Please try again.");
    }
  };

  // Listen for scroll to show back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const enterFullscreen = () => {
    // Call the actual deselect function
    handledeselectProblem();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading problem statements...</p>
      </div>
    );
  }

  // Count problems in each category
  const getCountByCategory = (category) => {
    try {
      const categoryData = data.Problems[category];
      return categoryData ? Object.keys(categoryData).length : 0;
    } catch (error) {
      console.error(`Error counting problems for ${category}:`, error);
      return 0;
    }
  };

  const aiCount = getCountByCategory("AI");
  const dataCount = getCountByCategory("Data Science");
  const securityCount = getCountByCategory("Cybersecurity");
  const webCount = getCountByCategory("Web_App Development");

  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <a href="#" className="logo">
            <i className="fas fa-code logo-icon"></i>
            <span className="logo-text-hack">Hack</span>
            <span className="logo-text-xcelerate">Xcelerate</span>
          </a>
          <button
            className="menu-toggle"
            onClick={() => setNavActive(!navActive)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className={`nav-links ${navActive ? 'active' : ''}`}>
            <a href="#domains">Domains</a>
            <a href="#problems">Problems</a>
            {user ? (
              <div className="user-info dropdown">
                <Button
                  className="btn btn-primary dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.displayName}
                </Button>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <Button className="dropdown-item" onClick={logOut}>Logout</Button>
                  </li>
                  {userSelection && (
                    <li>
                      <Button className="dropdown-item" onClick={deselectProblem}>
                        Deselect Problem
                      </Button>
                    </li>
                  )}
                </ul>
              </div>
            ) : (
              <Button className="btn btn-primary" onClick={() => setShowSignInModal(true)}>
                Sign in
              </Button>
            )}

          </div>
        </nav>
      </header>

      <div className="sponsors-section">
        <div className="sponsors-container">
          <div className="sponsors-row">
            <img src={kalasalingam} alt="Sponsor 1" className="sponsor-logo" />
            <img src={mlsc} alt="Sponsor 2" className="sponsor-logo" />
            <img src={mlsa} alt="Sponsor 3" className="sponsor-logo" />
            <img src={k7} alt="Sponsor 4" className="sponsor-logo" />
          </div>
        </div>
      </div>

      <main>
        <section className="hero">
          <h1>Hackathon Problem Statements</h1>
          <p>Explore innovative challenges across various domains and find the perfect problem statement to showcase your skills and creativity.</p>
          {userSelection && (
            <div className="user-selection-banner">
              <p>You have selected a problem in the {userSelection.category} category.</p>
              <Button className="view-btn" onClick={() => {
                // Scroll to the selected problem
                const element = document.getElementById(`problem-${userSelection.category}-${userSelection.problemId}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}>View Selection</Button>
            </div>
          )}
        </section>

        {showInfoMessage && (
          <div className="info-message">
            {infoMessage}
          </div>
        )}
        {showWarningMessage && (
          <div className="warning-message">
            {warningMessage}
          </div>
        )}
        {showErrorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <section id="domains">
          <div className="filter-container">
            <div className="filter-group">
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Domains
              </button>
            </div>
          </div>

          <div className="domains-grid">
            <DomainCard
              title="AI & Machine Learning"
              description="Solve complex problems using artificial intelligence, deep learning, and machine learning techniques to create next-generation solutions."
              problemCount={aiCount}
              category="ai-ml"
            />
            <DomainCard
              title="Data Science"
              description="Extract insights and knowledge from structured and unstructured data through various scientific methods, processes, algorithms, and systems."
              problemCount={dataCount}
              category="data-science"
            />
            <DomainCard
              title="Cybersecurity"
              description="Develop innovative solutions to protect systems, networks, and programs from digital attacks and ensure data privacy and security."
              problemCount={securityCount}
              category="cybersecurity"
            />
            <DomainCard
              title="Web_App Development"
              description="Create innovative web applications and mobile apps that solve real-world problems and provide seamless user experiences."
              problemCount={webCount}
              category="Web_App Development"
            />
          </div>
        </section>

        <section id="problems" className="problems-section">
          <div className="section-header">
            <h2>Problem Statements</h2>
          </div>

          <div id="ai-ml-problems">
            <h3>AI & Machine Learning</h3>
            <div className="problems-list">
              <EnhancedProblemCard
                category="AI"
                problemId="Advanced_Visual_Quality_Control_in_Manufacturing"
                title="Advanced Visual Quality Control in Manufacturing"
                description="Develop an automated visual inspection system to detect subtle defects in manufacturing lines. This system should improve accuracy, reduce waste, and increase the speed of quality control compared to manual methods."
                tags={['Python', 'TensorFlow/PyTorch', 'OpenCV']}
                teamCount={data.Problems.AI["Advanced_Visual_Quality_Control_in_Manufacturing"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("AI", "Advanced_Visual_Quality_Control_in_Manufacturing")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />
              <EnhancedProblemCard
                category="AI"
                problemId="Automated_Visual_Inspection_for_Component_Assembly"
                title="Automated Visual Inspection for Component Assembly"
                description="Create an automated system that visually inspects component assembly on a production line. This system should verify the presence and correct placement of parts, flagging misassemblies and missing components in real time to minimize errors."
                tags={['Python', 'YOLOv5/v8P', 'OpenCV']}
                teamCount={data.Problems.AI["Automated_Visual_Inspection_for_Component_Assembly"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("AI", "Automated_Visual_Inspection_for_Component_Assembly")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />
              <EnhancedProblemCard
                category="AI"
                problemId="Intelligent_Contract_Clause_Extraction_and_Compliance_Checker"
                title="Intelligent Contract Clause Extraction and Compliance Checker"
                description="Create an intelligent system to automatically extract relevant clauses from industrial contracts and verify their compliance with established regulations. The system should highlight missing or non-compliant clauses, generating comprehensive assessment reports."
                tags={['Python', 'spaCy/NLTK', 'Hugging Face']}
                teamCount={data.Problems.AI["Intelligent_Contract_Clause_Extraction_and_Compliance_Checker"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("AI", "Intelligent_Contract_Clause_Extraction_and_Compliance_Checker")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />
              <EnhancedProblemCard
                category="AI"
                problemId="Real_Time_Technical_Support_Chatbot_for_Industrial_Systems"
                title="Real-Time Technical Support Chatbot for Industrial Systems"
                description="Build an AI-powered chatbot to provide real-time technical support for industrial systems. The chatbot should understand user queries, detect urgency based on sentiment, and provide context-aware responses, improving customer satisfaction."
                tags={['Python', 'Rasa/Dialogflow', 'NLP tools']}
                teamCount={data.Problems.AI["Real_Time_Technical_Support_Chatbot_for_Industrial_Systems"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("AI", "Real_Time_Technical_Support_Chatbot_for_Industrial_Systems")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />
              <EnhancedProblemCard
                category="AI"
                problemId="Automated_Grading_of_Student_Essays"
                title="Automated Grading of Student Essays Using Advanced NLP and Machine Learning"
                description="Design a system that automatically grades student essays based on content, grammar, style, and originality. The system should provide accurate and consistent scores, freeing up teachers' time and providing students with timely feedback."
                tags={['Python', 'NLTK/spaCy', 'Scikit-learn']}
                teamCount={data.Problems.AI["Automated_Grading_of_Student_Essays"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("AI", "Automated_Grading_of_Student_Essays")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />
              <EnhancedProblemCard
                category="AI"
                problemId="Audio_Based_Speech_Tutor"
                title="Audio-Based Speech Tutor"
                description="Create an AI-powered system that acts as a personalized speech tutor for public speakers by analyzing audio recordings. The system will provide detailed feedback on grammar, vocabulary, fluency, and clarity, while offering targeted recommendations for exercises to improve speech delivery."
                tags={['Python', 'OpenAI/Whisper', 'PyTorch/TensorFlow']}
                teamCount={data.Problems.AI["Audio_Based_Speech_Tutor"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("AI", "Audio_Based_Speech_Tutor")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="AI"
                problemId="Personalized_Education_Path_Recommendation"
                title="Personalized Education Path Recommendation"
                description="Create a system to recommend personalized education paths for students based on their learning styles, strengths, and career goals. The system should analyze student performance and provide tailored course suggestions."
                tags={['Python', 'Pandas/NumPy', 'GraphDB/Neo4j']}
                teamCount={data.Problems.AI["Personalized_Education_Path_Recommendation"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("AI", "Personalized_Education_Path_Recommendation")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />
              <EnhancedProblemCard
                category="AI"
                problemId="AI_Powered_Chatbot_for_Tax_Assistance_and_Personalized_Guidance"
                title="AI-Powered Chatbot for Tax Assistance and Personalized Guidance"
                description=" Create an AI chatbot that provides personalized tax assistance to users. The chatbot should answer tax-related questions, guide users through filing procedures, and suggest relevant deductions and credits based on their individual circumstances."
                tags={['Python', 'Rasa/Dialogflow', 'spaCy/NLTK']}
                teamCount={data.Problems.AI["AI_Powered_Chatbot_for_Tax_Assistance_and_Personalized_Guidance"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("AI", "AI_Powered_Chatbot_for_Tax_Assistance_and_Personalized_Guidance")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />
              <EnhancedProblemCard
                category="AI"
                problemId="AI_Driven_Solutions_for_Real_World_Challenges_in_Healthcare_and_Agriculture"
                title="AI-Driven Solutions for Real-World Challenges in Healthcare and Agriculture"
                description="Innovative AI implementations using TensorFlow, PyTorch, OpenCV, or other frameworks to solve domain-specific problems.Integration of AI with IoT, cloud computing, and edge AI for real-time decision-making.User-friendly interfaces for easy adoption in healthcare and farming communities.Scalability and feasibility for large-scale deployments."
                tags={['Python', 'TensorFlow/PyTorch', 'OpenCV']}
                teamCount={data.Problems.AI["AI_Driven_Solutions_for_Real_World_Challenges_in_Healthcare_and_Agriculture"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("AI", "AI_Driven_Solutions_for_Real_World_Challenges_in_Healthcare_and_Agriculture")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />
              <EnhancedProblemCard
                category="AI"
                problemId="AI_Powered_Safety_Gear_Compliance_Monitor"
                title="AI-Powered Safety Gear Compliance Monitor"
                description="Design a system that automatically monitors worker compliance with safety gear regulations. This system should use computer vision to detect whether workers are wearing required equipment (helmets, vests, etc.), providing real-time alerts for non-compliance."
                tags={['Python', ' OpenCV', 'TensorFlow/PyTorch']}
                teamCount={data.Problems.AI["AI_Powered_Safety_Gear_Compliance_Monitor"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("AI", "AI_Powered_Safety_Gear_Compliance_Monitor")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />
              {/* Add remaining problem cards in this section */}
            </div>
          </div>

          <div id="data-science-problems">
            <h3>Data Science</h3>
            <div className="problems-list">
              <EnhancedProblemCard
                category="Data Science"
                problemId="Cybersecurity_Threat_Detection"
                title="Cybersecurity Threat Detection in Network Logs"
                description="Develop a system to detect and prevent cybersecurity threats by analyzing network logs in real-time. The system should identify malicious activity like DDoS attacks and phishing attempts, automatically blocking malicious IPs and preventing security breaches."
                tags={['Python', 'Pandas/NumPy/Scikit-learn', 'ELK stack']}
                teamCount={data.Problems["Data Science"]?.["Cybersecurity_Threat_Detection"]?.teamCount || 0}
                maxTeams={4}
                onSelect={() => handleSelectProblem("Data Science", "Cybersecurity_Threat_Detection")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Data Science"
                problemId="Energy_Consumption_Optimization"
                title="Energy Consumption Optimization in Manufacturing"
                description="Develop a system to predict and optimize energy consumption in a manufacturing facility. This involves forecasting short-term energy demand, identifying periods of excessive usage, and suggesting corrective actions to reduce waste and costs."
                tags={['Python/R', 'Prophet/ARIMA', 'Pandas/NumPy']}
                teamCount={data.Problems["Data Science"]?.["Energy_Consumption_Optimization"]?.teamCount || 0}
                maxTeams={4}
                onSelect={() => handleSelectProblem("Data Science", "Energy_Consumption_Optimization")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Data Science"
                problemId="Customer_Retention_Prediction"
                title="Customer Retention Prediction and Optimization Platform"
                description="Create a platform to predict customer churn and provide actionable insights for improving retention. This involves identifying key factors that influence customer disengagement and generating personalized engagement strategies to reduce churn."
                tags={['Python/R', 'Pandas/NumPy', 'Streamlit/Tableau']}
                teamCount={data.Problems["Data Science"]?.["Customer_Retention_Prediction"]?.teamCount || 0}
                maxTeams={4}
                onSelect={() => handleSelectProblem("Data Science", "Customer_Retention_Prediction")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Data Science"
                problemId="AI_Fake_Research_Detection"
                title="AI-Driven Fake Scientific Research Detection"
                description="Develop an AI-driven system to detect fraudulent scientific studies and AI-generated content. The system should analyze research papers, identify plagiarism, detect citation anomalies, and assign credibility scores to ensure research integrity."
                tags={['Python', 'spaCy/NLTK', 'SciPy']}
                teamCount={data.Problems["Data Science"]?.["AI_Fake_Research_Detection"]?.teamCount || 0}
                maxTeams={4}
                onSelect={() => handleSelectProblem("Data Science", "AI_Fake_Research_Detection")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              {/* Add remaining problem cards in this section */}
            </div>
          </div>

          <div id="cybersecurity-problems">
            <h3>Cybersecurity</h3>
            <div className="problems-list">
              <EnhancedProblemCard
                category="Cybersecurity"
                problemId="Secure_File_Sharing_System"
                title="Secure File Sharing System with Threat Detection"
                description="Traditional file-sharing methods lack strong encryption and real-time security, making them vulnerable to data breaches. Develop a secure file-sharing system that ensures encrypted transfers, detects unauthorized access, and alerts users of potential threats."
                tags={['Node.js/Python', 'PostgreSQL/Firebase', 'AES-256 encryption']}
                teamCount={data.Problems.Cybersecurity?.["Secure_File_Sharing_System"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Cybersecurity", "Secure_File_Sharing_System")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Cybersecurity"
                problemId="AI_Log_Monitoring"
                title="AI-Powered Log Monitoring for Cyber Threats"
                description="Security teams struggle to manually analyze logs, making it hard to detect cyber threats in real-time. Build an AI-driven log monitoring system that detects unusual activity, identifies potential attacks, and sends alerts."
                tags={['Apache Kafka', 'Elasticsearch', 'Grafana']}
                teamCount={data.Problems.Cybersecurity?.["AI_Log_Monitoring"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Cybersecurity", "AI_Log_Monitoring")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Cybersecurity"
                problemId="Phishing_Detection_Email_Security"
                title="Phishing Detection & Email Security Assistant"
                description="Many users fall victim to phishing emails because they struggle to identify fraudulent links, fake senders, and malicious attachments. Develop a browser extension or mobile app that scans incoming emails, detects phishing attempts using AI, and warns users before they click on suspicious links."
                tags={['Apache Kafka', 'Elasticsearch', 'Grafana/Kibana']}
                teamCount={data.Problems.Cybersecurity?.["Phishing_Detection_Email_Security"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Cybersecurity", "Phishing_Detection_Email_Security")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              {/* Add remaining problem cards in this section */}
            </div>
          </div>

          <div id="Web_App Development">
            <h3>Web/App Development</h3>
            <div className="problems-list">
              <EnhancedProblemCard
                category="Web_App Development"
                problemId="Real_Time_Collaborative_Whiteboard"
                title="Real-Time Collaborative Whiteboard"
                description="Create a real-time collaborative whiteboard using WebSockets. Multiple users can collaboratively draw, add sticky notes, and chat. Develop a real-time, multi-user collaborative whiteboard that enables teams and educators to brainstorm, teach, and work together efficiently without lag."
                tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
                teamCount={data.Problems["Web_App Development"]?.["Real_Time_Collaborative_Whiteboard"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Web/App Development", "Real_Time_Collaborative_Whiteboard")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Web/App Development"
                problemId="Blogging_Platform_SEO"
                title="Build a Simple Blogging Platform with SEO Optimization"
                description="SEO optimization is crucial for a blogging platform to achieve visibility. The platform should focus on SEO-friendly features like URLs, meta tags, and server-side rendering."
                tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
                teamCount={data.Problems["Web/App Development"]?.["Blogging_Platform_SEO"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Web/App Development", "Blogging_Platform_SEO")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Web/App Development"
                problemId="Stock_Trading_Platform"
                title="Build a Stock Trading Platform"
                description="A stock trading simulation platform should provide real-time data fetching, user authentication, and trading functionalities for a realistic experience."
                tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
                teamCount={data.Problems["Web/App Development"]?.["Stock_Trading_Platform"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Web/App Development", "Stock_Trading_Platform")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Web/App Development"
                problemId="Sustainable_ECommerce"
                title="Sustainable E-Commerce for Second-Hand Goods"
                description="Develop an eco-friendly e-commerce platform for buying and selling second-hand goods while promoting sustainability awareness through eco-scores and responsible logistics."
                tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
                teamCount={data.Problems["Web/App Development"]?.["Sustainable_ECommerce"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Web/App Development", "Sustainable_ECommerce")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Web/App Development"
                problemId="Fitness_Tracker"
                title="Create a Fitness Tracker"
                description="Tracking fitness activities helps users stay motivated and reach their health goals. The application should monitor various activities and offer data visualization."
                tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
                teamCount={data.Problems["Web/App Development"]?.["Fitness_Tracker"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Web/App Development", "Fitness_Tracker")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Web/App Development"
                problemId="Payment_Gateway_Integration"
                title="Design a Payment Gateway Integration"
                description="Integrating a payment gateway involves handling transactions securely while providing a smooth user experience during the checkout process."
                tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
                teamCount={data.Problems["Web/App Development"]?.["Payment_Gateway_Integration"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Web/App Development", "Payment_Gateway_Integration")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Web/App Development"
                problemId="Calendar_Scheduling_System"
                title="Calendar Scheduling System"
                description="Intuitive calendar view for adding events, scheduling meetings, and reminders. Handling recurring events, time zone adjustments, and notifications."
                tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
                teamCount={data.Problems["Web/App Development"]?.["Calendar_Scheduling_System"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Web/App Development", "Calendar_Scheduling_System")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Web/App Development"
                problemId="URL_Shortener"
                title="Design a URL Shortener Service"
                description="Managing and sharing long URLs can be inconvenient and cluttered. A URL shortener service reduces the length of URLs while maintaining redirection to the original destination, enabling better management, sharing, and analytics."
                tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
                teamCount={data.Problems["Web/App Development"]?.["URL_Shortener"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Web/App Development", "URL_Shortener")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Web_App Development"
                problemId="Create_a _logging_Platform"
                title="Create a Blogging Platform"
                description="A blogging platform allows users to write, comment, and interact with posts,necessitating both user-friendly front-end and scalable back-end development."
                tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
                teamCount={data.Problems["Web_App Development"]?.["Create_a _logging_Platform"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Web_App Development", "Create_a _logging_Platform")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              <EnhancedProblemCard
                category="Web_App Development"
                problemId="Sustainable_E_Commerce_for_Second_Hand_Goods"
                title="Sustainable E-Commerce for Second-Hand Goods"
                description="Develop an eco-friendly e-commerce platform for buying and selling second-hand goods while promoting sustainability awareness through eco-scores and responsible logistics."
                tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
                teamCount={data.Problems["Web_App Development"]?.["Sustainable_E_Commerce_for_Second_Hand_Goods"]?.teamCount || 0}
                maxTeams={2}
                onSelect={() => handleSelectProblem("Web_App Development", "Sustainable_E_Commerce_for_Second_Hand_Goods")}
                onDeselect={deselectProblem}
                userSelection={userSelection}
              />

              {/* Add remaining problem cards in this section */}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="content">
          <div className="logo">
            <i className="fas fa-code logo-icon"></i>
            <span className="logo-text-hack">Hack</span>
            <span className="logo-text-xcelerate">Xcelerate</span>
          </div>
          <div className="social-links">
            <a href="https://chat.whatsapp.com/J9WfYwU8wUSIyduAkwEIA3" className=""><i className="fab fa-whatsapp"></i></a>
            <a href="https://www.linkedin.com/company/mlsckare/" className=""><i className="fab fa-linkedin"></i></a>
            <a href="https://www.instagram.com/mlsc_kare/" className=""><i className="fab fa-instagram"></i></a>
          </div>
          <p>©Follow us on Instagram, LinkedIn and join WhatsApp group for more Updates.</p>
        </div>
      </footer>

      {/* Toast Container - positioned with higher z-index */}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 1070 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
          bg="warning"
        >
          <Toast.Header>
            <strong className="me-auto">Action Required</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Sign In Modal */}
      <Modal show={showSignInModal} onHide={() => setShowSignInModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to sign in to select a problem statement.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSignInModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSignIn}>
            Sign In with Google
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Deselect Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Unselect Current Problem Statement?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={enterFullscreen}>
            Unselect
          </Button>
        </Modal.Footer>
      </Modal>

      {showBackToTop && (
        <div className="back-to-top show" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </div>
      )}
    </div>
  );
}

function DomainCard({ title, description, problemCount, category }) {
  return (
    <div className="domain-card" data-category={category}>
      <div className="domain-header">
        <h3>{title}</h3>
      </div>
      <div className="domain-body">
        <p>{description}</p>
      </div>
      <div className="domain-footer">
        <span className="problems-count">{problemCount} Problems</span>
        <a href={`#${category}-problems`} className="explore-btn">Explore</a>
      </div>
    </div>
  );
}

// Enhanced Problem Card with Firebase integration
function EnhancedProblemCard({
  category,
  problemId,
  title,
  description,
  tags,
  teamCount = 0,
  maxTeams = 2,
  onSelect,
  onDeselect,
  userSelection
}) {
  const isSelected = userSelection &&
    userSelection.category === category &&
    userSelection.problemId === problemId;

  const isFull = teamCount >= maxTeams && !isSelected;

  const cardClass = `problem-card ${isSelected ? 'selected' : ''} ${isFull ? 'full' : ''}`;
  const buttonClass = `select-btn ${isSelected ? 'selected' : ''} ${isFull ? 'full' : ''}`;
  const buttonText = isSelected ? 'Selected' : isFull ? 'Full' : 'Select';

  const handleClick = () => {
    if (isSelected) {
      onDeselect();
    } else if (!isFull) {
      onSelect();
    }
  };

  return (
    <div id={`problem-${category}-${problemId}`} className={cardClass}>
      <div className="problem-header">
        <h3>{title}</h3>
        <div className="problem-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="problem-body">
        <p>{description}</p>
      </div>
      <div className="problem-footer">
        <div className="problem-stats">
          <i className="fas fa-users"></i> {teamCount} teams working on this
          {maxTeams && <span className="max-teams"> (max: {maxTeams})</span>}
        </div>
        <button
          className={buttonClass}
          onClick={handleClick}
          disabled={isFull && !isSelected}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

// Add some CSS styles for the new components
const additionalStyles = `
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.deselect-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.deselect-btn:hover {
  background-color: #ff5252;
}

.user-selection-banner {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view-btn {
  background-color: white;
  color: #4caf50;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.view-btn:hover {
  background-color: #f1f1f1;
}

.info-message {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 10px 0;
  text-align: center;
}

.warning-message {
  background-color: #ff9800;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 10px 0;
  text-align: center;
}

.error-message {
  background-color: #f44336;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 10px 0;
  text-align: center;
}

.max-teams {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-left: 5px;
}

.problem-card.selected {
  border: 2px solid #4caf50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
}

.problem-card.full:not(.selected) {
  opacity: 0.8;
}

.select-btn.selected {
  background-color: #4caf50;
}

.select-btn.full:not(.selected) {
  background-color: #9e9e9e;
  cursor: not-allowed;
}

/* Toast styling */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
}
`;

export default Hack;