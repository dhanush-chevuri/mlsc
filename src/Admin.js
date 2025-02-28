// import React, { useState, useEffect } from 'react';
// import './hack.css'
// import kalasalingam from "./assets/download.jpeg"
// import mlsc from "./assets/mlsckare_logo.jpeg"
// import mlsa from "./assets/Picture1.png"
// import k7 from "./assets/k7.png"

// function Admin() {
//   const [selectedCount, setSelectedCount] = useState(0);
//   const [navActive, setNavActive] = useState(false);
//   const [showInfoMessage, setShowInfoMessage] = useState(false);
//   const [showWarningMessage, setShowWarningMessage] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [showBackToTop, setShowBackToTop] = useState(false);

//   // Listen for scroll to show back to top button
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.pageYOffset > 300) {
//         setShowBackToTop(true);
//       } else {
//         setShowBackToTop(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleSelectProblem = () => {
//     if (selectedCount === 0) {
//       setSelectedCount(1);
//       setShowInfoMessage(true);
//       setTimeout(() => setShowInfoMessage(false), 3000);
//     } else {
//       setShowWarningMessage(true);
//       setTimeout(() => setShowWarningMessage(false), 3000);
//     }
//   };

//   const resetSelections = () => {
//     setSelectedCount(0);
//     setShowInfoMessage(false);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <div className="App">
//       <header>
//         <nav className="navbar">
//           <a href="#" className="logo">
//             <i className="fas fa-code logo-icon"></i>
//             <span className="logo-text-hack">Hack</span>
//             <span className="logo-text-xcelerate">Xcelerate</span>
//           </a>
//           <button 
//             className="menu-toggle" 
//             onClick={() => setNavActive(!navActive)}
//           >
//             <i className="fas fa-bars"></i>
//           </button>
//           <div className={`nav-links ${navActive ? 'active' : ''}`}>
//             <a href="#domains">Domains</a>
//             <a href="#problems">Problems</a>
//             <a href="#">Sign in</a>
//           </div>
//         </nav>
//       </header>

//       <div className="sponsors-section">
//         <div className="sponsors-container">
//           <div className="sponsors-row">
//             <img src={kalasalingam} alt="Sponsor 1" className="sponsor-logo" />
//             <img src={mlsc} alt="Sponsor 2" className="sponsor-logo" />
//             <img src={mlsa} alt="Sponsor 3" className="sponsor-logo" />
//             <img src={k7} alt="Sponsor 4" className="sponsor-logo" />
//           </div>
//         </div>
//       </div>

//       <main>
//         <section className="hero">
//           <h1>Hackathon Problem Statements</h1>
//           <p>Explore innovative challenges across various domains and find the perfect problem statement to showcase your skills and creativity.</p>
//         </section>

       

//         {showInfoMessage && (
//           <div className="info-message">
//             You have successfully selected a problem statement. Submit your selection or reset to choose a different problem.
//           </div>
//         )}
//         {showWarningMessage && (
//           <div className="warning-message">
//             You can only select one problem statement per team.
//           </div>
//         )}

//         <section id="domains">
//           <div className="filter-container">
//             <div className="filter-group">
//               <button 
//                 className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
//                 onClick={() => setActiveFilter('all')}
//               >
//                 All Domains
//               </button>
//             </div>
//           </div>

//           <div className="domains-grid">
//             <DomainCard 
//               title="AI & Machine Learning"
//               description="Solve complex problems using artificial intelligence, deep learning, and machine learning techniques to create next-generation solutions."
//               problemCount={7}
//               category="ai-ml"
//             />
//             <DomainCard 
//               title="Data Science"
//               description="Extract insights and knowledge from structured and unstructured data through various scientific methods, processes, algorithms, and systems."
//               problemCount={8}
//               category="data-science"
//             />
//             <DomainCard 
//               title="Cybersecurity"
//               description="Develop innovative solutions to protect systems, networks, and programs from digital attacks and ensure data privacy and security."
//               problemCount={3}
//               category="cybersecurity"
//             />
//             <DomainCard 
//               title="Web/App Development"
//               description="Create innovative web applications and mobile apps that solve real-world problems and provide seamless user experiences."
//               problemCount={11}
//               category="Web/App Development"
//             />
//           </div>
//         </section>

//         <section id="problems" className="problems-section">
//           <div className="section-header">
//             <h2>Problem Statements</h2>
//           </div>

//           <div id="ai-ml-problems">
//             <h3>AI & Machine Learning</h3>
//             <div className="problems-list">
//             <ProblemCard 
//                 title="Advanced Visual Quality Control in Manufacturing"
//                 description="Develop an automated visual inspection system to detect subtle defects in manufacturing lines. This system should improve accuracy, reduce waste, and increase the speed of quality control compared to manual methods."
//                 tags={['Python', 'TensorFlow/PyTorch', 'OpenCV']}
//                 teamCount={5}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Automated Visual Inspection for Component Assembly"
//                 description="Create an automated system that visually inspects component assembly on a production line. This system should verify the presence and correct placement of parts, flagging misassemblies and missing components in real time to minimize errors."
//                 tags={['Python', 'YOLOv5/v8P', 'OpenCV']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="AI-Powered Safety Gear Compliance Monitor"
//                 description="Design a system that automatically monitors worker compliance with safety gear regulations. This system should use computer vision to detect whether workers are wearing required equipment (helmets, vests, etc.), providing real-time alerts for non-compliance."
//                 tags={['Python', 'OpenCV', 'TensorFlow/PyTorch']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Energy Consumption Optimization in Manufacturing"
//                 description="Develop a system to predict and optimize energy consumption in a manufacturing facility. This involves forecasting short-term energy demand, identifying periods of excessive usage, and suggesting corrective actions to reduce waste and costs."
//                 tags={['Python/R', 'Prophet/ARIMA', 'Pandas/NumPy']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Intelligent Contract Clause Extraction and Compliance Checker"
//                 description="Create an intelligent system to automatically extract relevant clauses from industrial contracts and verify their compliance with established regulations. The system should highlight missing or non-compliant clauses, generating comprehensive assessment reports."
//                 tags={['Python', 'spaCy/NLTK', 'Hugging Face']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Real-Time Technical Support Chatbot for Industrial Systems"
//                 description="Build an AI-powered chatbot to provide real-time technical support for industrial systems. The chatbot should understand user queries, detect urgency based on sentiment, and provide context-aware responses, improving customer satisfaction."
//                 tags={['Python', 'Rasa/Dialogflow', 'NLP tools']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Automated Grading of Student Essays Using Advanced NLP and Machine Learning"
//                 description="Build an AI-powered chatbot to provide real-time technical support for industrial systems. The chatbot should understand user queries, detect urgency based on sentiment, and provide context-aware responses, improving customer satisfaction."
//                 tags={['Python', 'NLTK/spaCy', 'Scikit-learn']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//             </div>
//           </div>

//           <div id="data-science-problems">
//             <h3>Data Science</h3>
//             <div className="problems-list">
//             <ProblemCard 
//                 title="Cybersecurity Threat Detection in Network Logs"
//                 description="Develop a system to detect and prevent cybersecurity threats by analyzing network logs in real-time. The system should identify malicious activity like DDoS attacks and phishing attempts, automatically blocking malicious IPs and preventing security breaches."
//                 tags={['Python', 'Pandas/NumPy/Scikit-learn', 'ELK stack']}
//                 teamCount={4}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Customer Retention Prediction and Optimization Platform"
//                 description="Create a platform to predict customer churn and provide actionable insights for improving retention. This involves identifying key factors that influence customer disengagement and generating personalized engagement strategies to reduce churn."
//                 tags={['Python/R', 'Pandas/NumPy', 'Scikit-learn']}
//                 teamCount={2}
//                 onSelect={handleSelectProblem}
//                 full={true}
//               />
//               <ProblemCard 
//                 title="Dynamic Customer Sentiment Analysis for Product Reviews"
//                 description="Develop a system to continuously monitor customer sentiment from product reviews in real-time. The system should categorize reviews as positive, neutral, or negative, alerting businesses to spikes in negative sentiment so they can respond quickly to address product problems."
//                 tags={['Python', 'NLTK/spaCy', 'Grafana']}
//                 teamCount={4}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="AI-Driven Fake Scientific Research Detection"
//                 description="Develop an AI-driven system to detect fraudulent scientific studies and AI-generated content. The system should analyze research papers, identify plagiarism, detect citation anomalies, and assign credibility scores to ensure research integrity."
//                 tags={['Python', 'spaCy/NLTK', 'GraphDB/Neo4j']}
//                 teamCount={4}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Personalized Education Path Recommendation"
//                 description="Create a system to recommend personalized education paths for students based on their learning styles, strengths, and career goals. The system should analyze student performance and provide tailored course suggestions."
//                 tags={['Python', 'Pandas/NumPy', 'Scikit-learn']}
//                 teamCount={4}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="AI-Powered Chatbot for Tax Assistance and Personalized Guidance"
//                 description="Create an AI chatbot that provides personalized tax assistance to users. The chatbot should answer tax-related questions, guide users through filing procedures, and suggest relevant deductions and credits based on their individual circumstances."
//                 tags={['Python', 'Rasa/Dialogflow', 'NLP libraries']}
//                 teamCount={4}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Audio-Based Speech Tutor"
//                 description="Create an AI-powered system that acts as a personalized language and delivery tutor for public speakers. The system should analyze audio and video recordings of speeches to provide detailed feedback on various aspects."
//                 tags={['Python', 'spaCy/NLTK', 'OpenAI Whisper']}
//                 teamCount={4}
//                 onSelect={handleSelectProblem}
//               />
//             </div>
//           </div>

//           <div id="cybersecurity-problems">
//             <h3>Cybersecurity</h3>
//             <div className="problems-list">
//               <ProblemCard 
//                 title="Secure File Sharing System with Threat Detection"
//                 description="Traditional file-sharing methods lack strong encryption and real-time security, making them vulnerable to data breaches.Develop a secure file-sharing system that ensures encrypted transfers, detects unauthorized access, and alerts users of potential threats."
//                 tags={['Node.js/Python', 'PostgreSQL/Firebase', 'AES-256 encryption']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="AI-Powered Log Monitoring for Cyber Threats"
//                 description="Security teams struggle to manually analyze logs, making it hard to detect cyber threats in real-time.Build an AI-driven log monitoring system that detects unusual activity, identifies potential attacks, and sends alerts"
//                 tags={['Fluentd/Logstash', 'Apache Kafka', 'Elasticsearch']}
//                 teamCount={6}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Phishing Detection & Email Security Assistant"
//                 description="Many users fall victim to phishing emails because they struggle to identify fraudulent links, fake senders, and malicious attachments."
//                 tags={['Postfix/Exim', 'Apache Kafka', 'Elasticsearch/PostgreSQL']}
//                 teamCount={6}
//                 onSelect={handleSelectProblem}
//               />
//             </div>
//           </div>
//           <div id="Web/App Development">
//             <h3>Web/App Development</h3>
//             <div className="problems-list">
//             <ProblemCard 
//                 title="Real-Time Collaborative Whiteboard"
//                 description="Create a real-time collaborative whiteboard using WebSockets. Multiple users can collaboratively draw, add sticky notes, and chat.Develop a real-time, multi-user collaborative whiteboard that enables teams and educators to brainstorm, teach, and work together efficiently without lag."
//                 tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Sustainable E-Commerce for Second-Hand Goods"
//                 description="A website for buying & selling second-hand items while promoting sustainability.Develop an eco-friendly e-commerce platform for buying and selling second-hand goods, while promoting sustainability awareness through eco-scores and responsible logistics."
//                 tags={['Vue.js/React.js', 'Node.js(Express)', 'PostgreSQL/Firebase']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Multi-Stop Delivery Planner for E-Commerce"
//                 description="E-commerce logistics face challenges in optimizing multiple deliveries, leading to inefficient routes, delays, and increased fuel costs. Customers also lack flexibility in scheduling deliveries, while delivery agents struggle with poorly optimized routes."
//                 tags={['Node.js/Express.js', 'PostgreSQL/MongoDB', 'Google Maps API']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Personalized Financial Planning Tool with AI Recommendations"
//                 description="Create a web application that helps users manage their finances and achieve their financial goals. The platform should use AI/ML to analyze user data, provide personalized recommendations, and generate financial reports."
//                 tags={['MongoDB/PostgreSQL', 'Python(Flask/Django)', 'Alpha Vantage API']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="AI-Powered Personalized News Aggregator"
//                 description="The web platform should analyze news articles, categorize them based on topics, and recommend articles that are most relevant to each user.Develop a web-based AI-powered news aggregator that learns user preferences and delivers personalized, diverse, and unbiased news content by analyzing and categorizing articles using Natural Language Processing (NLP)."
//                 tags={['React.js/Next.js', 'FastAPI/Django', 'MongoDB/PostgreSQL']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Smart Medication Adherence System"
//                 description="Many patients forget to take their medication on time, leading to poor treatment outcomes. Developing an intelligent system that reminds patients about their medication and ensures adherence."
//                 tags={['React Native', 'Node.js/Flask', 'MongoDB/PostgreSQL']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="AI-Powered Personalized Diet and Nutrition Planner"
//                 description="Individuals struggle to maintain a proper diet due to a lack of personalized meal recommendations based on health conditions.Developing an AI-powered Website that recommends diet plans based on health conditions, preferences, and allergies."
//                 tags={['React.js/Flutter', 'FastAPI/Django', ' PostgreSQL/Firebase']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Appointment Scheduling and Management System"
//                 description="Patients often struggle with long waiting times and poor appointment management at hospitals.Build a web-based appointment scheduling system for hospitals and clinics"
//                 tags={['Angular/React.js', 'Node.js(Express.js)', 'MongoDB/PostgreSQL']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="AI-Free SEO Optimization for Blog Content"
//                 description="Most SEO tools rely on AI-generated suggestions, often making content generic and algorithm-driven rather than reader-friendly.Develop a web-based blogging assistant that helps bloggers optimize SEO manually without relying on AI-generated content."
//                 tags={['Vue.js/React.js', 'Django/Node.js', 'PostgreSQL/MySQL']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="Silent SOS: AI-Powered Safety for High-Risk Situations"
//                 description="In emergency situations like domestic abuse, stalking, or human trafficking, victims often cannot openly call for help. Existing safety apps require visible actions that may put victims at greater risk."
//                 tags={['Flutter/Kotlin', 'Firebase/AWS', 'Whisper AI/OpenAI']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//               <ProblemCard 
//                 title="AI-Powered Sign Language Translator"
//                 description="Communication barriers exist for individuals who are deaf or hard of hearing, making interactions with non-signers difficult in everyday situations.Develop a mobile app that translates real-time sign language gestures into text/audio and vice versa, enabling seamless communication between sign language users and non-signers."
//                 tags={['React.js/Next.js', 'PostgreSQL/MongoDB', 'TensorFlow/PyTorch']}
//                 teamCount={3}
//                 onSelect={handleSelectProblem}
//               />
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer>
//         <div className="content">
//           <div className="logo">
//             <i className="fas fa-code logo-icon"></i>
//             <span className="logo-text-hack">Hack</span>
//             <span className="logo-text-xcelerate">Xcelerate</span>
//           </div>
//           <div className="social-links">
//           <a href="https://chat.whatsapp.com/J9WfYwU8wUSIyduAkwEIA3" className=""><i className="fab fa-whatsapp"></i></a>
//           <a href="https://www.linkedin.com/company/mlsckare/" className=""><i className="fab fa-linkedin"></i></a>
//           <a href="https://www.instagram.com/mlsc_kare/" className=""><i className="fab fa-instagram"></i></a>
//           </div>
//           <p>©Follow us on Instagram,Linkedin and join Whatsapp group for more Updates.</p>
//         </div>
//       </footer>

//       {showBackToTop && (
//         <div className="back-to-top show" onClick={scrollToTop}>
//           <i className="fas fa-arrow-up"></i>
//         </div>
//       )}
//     </div>
//   );
// }

// function DomainCard({ title, description, problemCount, category }) {
//   return (
//     <div className="domain-card" data-category={category}>
//       <div className="domain-header">
//         <h3>{title}</h3>
//       </div>
//       <div className="domain-body">
//         <p>{description}</p>
//       </div>
//       <div className="domain-footer">
//         <span className="problems-count">{problemCount} Problems</span>
//         <a href={`#${category}-problems`} className="explore-btn">Explore</a>
//       </div>
//     </div>
//   );
// }

// function ProblemCard({ title, description, tags, teamCount, onSelect, selected = false, full = false }) {
//   const cardClass = `problem-card ${selected ? 'selected' : ''} ${full ? 'full' : ''}`;
//   const buttonClass = `select-btn ${selected ? 'selected' : ''} ${full ? 'full' : ''}`;
//   const buttonText = selected ? 'Selected' : full ? 'Full' : 'Select';

//   return (
//     <div className={cardClass}>
//       <div className="problem-header">
//         <h3>{title}</h3>
//         <div className="problem-tags">
//           {tags.map((tag, index) => (
//             <span key={index} className="tag">{tag}</span>
//           ))}
//         </div>
//       </div>
//       <div className="problem-body">
//         <p>{description}</p>
//       </div>
//       <div className="problem-footer">
//         <div className="problem-stats">
//           <i className="fas fa-users"></i> {teamCount} teams working on this
//         </div>
//         <button className={buttonClass} onClick={onSelect} disabled={full || selected}>
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Admin;


// import { useState, useEffect, useContext } from 'react';
// import './hack.css';
// import kalasalingam from "./assets/download.jpeg";
// import mlsc from "./assets/mlsckare_logo.jpeg";
// import mlsa from "./assets/Picture1.png";
// import k7 from "./assets/k7.png";

// import { Modal, Button } from "react-bootstrap";

// import { AuthContext } from './Auth';

// import { ref, get, update, serverTimestamp, onValue } from "firebase/database";

// import { database } from './firebase';

// function Hack() {
//   const [selectedCount, setSelectedCount] = useState(0);
//   const [navActive, setNavActive] = useState(false);
//   const [showInfoMessage, setShowInfoMessage] = useState(false);
//   const [infoMessage, setInfoMessage] = useState("");
//   const [showWarningMessage, setShowWarningMessage] = useState(false);
//   const [warningMessage, setWarningMessage] = useState("");
//   const [showErrorMessage, setShowErrorMessage] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showSignInModal, setShowSignInModal] = useState(false);

//   const { user, signInWithGoogle , logOut } = useContext(AuthContext);
//   const [data, setData] = useState({
//     Problems: {
//       AI: {},
//       "Data Science": {},
//       Cybersecurity: {},
//       "Web/App Development": {}
//     }
//   });
//   const [loading, setLoading] = useState(true);
//   const [userSelection, setUserSelection] = useState(null);

//   // Fetch all problem data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const dbRef = ref(database, "Problems");
//         console.log("Fetching problem data...");

//         const snapshot = await get(dbRef);
//         if (snapshot.exists()) {
//           const fetchedData = snapshot.val();
//           console.log("Fetched Problem Data:", fetchedData);
//           setData({ Problems: fetchedData });
//         } else {
//           console.log("No problem data found");
//         }
//       } catch (error) {
//         console.error("Error fetching problem data:", error);
//         setErrorMessage("Failed to load problem statements. Please refresh the page.");
//         setShowErrorMessage(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Listen for user's current selection
//   useEffect(() => {
//     if (!user) {
//       setUserSelection(null);
//       return;
//     }

//     const userSelectionsRef = ref(database, UserSelections/${user.uid});
    
//     // Set up listener
//     const unsubscribe = onValue(userSelectionsRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const selection = snapshot.val();
//         console.log("User selection:", selection);
//         setUserSelection(selection);
//       } else {
//         setUserSelection(null);
//       }
//     });
    
//     // Clean up listener
//     return () => unsubscribe();
//   }, [user]);

//   // Display messages
//   useEffect(() => {
//     if (infoMessage) {
//       setShowInfoMessage(true);
//       const timer = setTimeout(() => {
//         setShowInfoMessage(false);
//         setInfoMessage("");
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [infoMessage]);

//   useEffect(() => {
//     if (warningMessage) {
//       setShowWarningMessage(true);
//       const timer = setTimeout(() => {
//         setShowWarningMessage(false);
//         setWarningMessage("");
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [warningMessage]);

//   useEffect(() => {
//     if (errorMessage) {
//       setShowErrorMessage(true);
//       const timer = setTimeout(() => {
//         setShowErrorMessage(false);
//         setErrorMessage("");
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [errorMessage]);

//   // Function to handle problem selection
//   const handleSelectProblem = async (category, problemId) => {
//     if (!user) {
//       // User is not signed in, prompt them to sign in
//       setShowSignInModal(true);
//       return;
//     }
    
//     // Reference to the problem in Firebase
//     const problemRef = ref(database, Problems/${category}/${problemId});
//     const userSelectionsRef = ref(database, UserSelections/${user.uid});
    
//     try {
//       // Check if problem exists and isn't full
//       const problemSnapshot = await get(problemRef);
      
//       if (!problemSnapshot.exists()) {
//         setErrorMessage("Problem statement not found.");
//         return;
//       }
      
//       const problemData = problemSnapshot.val();
//       const teamCount = problemData.teamCount || 0;
//       const maxTeams = problemData.maxTeams || 3; // Default max teams
      
//       if (teamCount >= maxTeams) {
//         setWarningMessage("This problem statement has reached its maximum number of teams.");
//         return;
//       }
      
//       // Check if user has already selected a problem
//       const userSelectionsSnapshot = await get(userSelectionsRef);
      
//       if (userSelectionsSnapshot.exists()) {
//         const userSelection = userSelectionsSnapshot.val();
        
//         if (userSelection.problemId === problemId && userSelection.category === category) {
//           setInfoMessage("You have already selected this problem statement.");
//           return;
//         } else {
//           setWarningMessage("You can only select one problem statement at a time. Please deselect your current problem first.");
//           return;
//         }
//       }
      
//       // Create updates object for transaction
//       const updates = {};
      
//       // Increment team count for the problem
//       updates[Problems/${category}/${problemId}/teamCount] = teamCount + 1;
      
//       // Record user's selection
//       updates[UserSelections/${user.uid}] = {
//         problemId,
//         category,
//         selectedAt: serverTimestamp(),
//         teamName: user.displayName || "Unnamed Team",
//         teamEmail: user.email
//       };
      
//       // Add user to the problem's selected teams
//       updates[Problems/${category}/${problemId}/selectedTeams/${user.uid}] = {
//         teamName: user.displayName || "Unnamed Team",
//         selectedAt: serverTimestamp()
//       };
      
//       // Perform the update transaction
//       await update(ref(database), updates);
      
//       setInfoMessage("You have successfully selected this problem statement.");
//     } catch (error) {
//       console.error("Error selecting problem:", error);
//       setErrorMessage("Failed to select problem. Please try again.");
//     }
//   };

//   // Function to deselect a problem
//   const deselectProblem = async () => {
//     if (!user || !userSelection) return;
    
//     try {
//       const { category, problemId } = userSelection;
      
//       // Get current problem data
//       const problemRef = ref(database, Problems/${category}/${problemId});
//       const problemSnapshot = await get(problemRef);
      
//       // Create updates object for transaction
//       const updates = {};
      
//       if (problemSnapshot.exists()) {
//         const problemData = problemSnapshot.val();
//         const teamCount = problemData.teamCount || 0;
        
//         // Decrement team count
//         updates[Problems/${category}/${problemId}/teamCount] = Math.max(0, teamCount - 1);
//         // Remove user from problem's selected teams
//         updates[Problems/${category}/${problemId}/selectedTeams/${user.uid}] = null;
//       }
      
//       // Remove user's selection
//       updates[UserSelections/${user.uid}] = null;
      
//       // Perform the update transaction
//       await update(ref(database), updates);
      
//       setInfoMessage("You have deselected the problem statement.");
//     } catch (error) {
//       console.error("Error deselecting problem:", error);
//       setErrorMessage("Failed to deselect problem. Please try again.");
//     }
//   };

//   const handleSignIn = async () => {
//     setShowSignInModal(false);
//     try {
//       const result = await signInWithGoogle();
//       if (result.success) {
//         console.log('Sign-in successful:', result.user);
//       } else {
//         console.error('Sign-in failed:', result.error);
//         setErrorMessage("Sign-in failed. Please try again.");
//       }
//     } catch (error) {
//       console.error('Sign-in error:', error);
//       setErrorMessage("Sign-in error. Please try again.");
//     }
//   };

//   // Listen for scroll to show back to top button
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.pageYOffset > 300) {
//         setShowBackToTop(true);
//       } else {
//         setShowBackToTop(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const enterFullscreen = () => {
//     // Implementation for fullscreen if needed
//     setShowModal(false);
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <p>Loading problem statements...</p>
//       </div>
//     );
//   }

//   // Count problems in each category
//   const getCountByCategory = (category) => {
//     try {
//       const categoryData = data.Problems[category];
//       return categoryData ? Object.keys(categoryData).length : 0;
//     } catch (error) {
//       console.error(Error counting problems for ${category}:, error);
//       return 0;
//     }
//   };

//   const aiCount = getCountByCategory("AI");
//   const dataCount = getCountByCategory("Data Science");
//   const securityCount = getCountByCategory("Cybersecurity");
//   const webCount = getCountByCategory("Web/App Development");

//   return (
//     <div className="App">
//       <header>
//         <nav className="navbar">
//           <a href="#" className="logo">
//             <i className="fas fa-code logo-icon"></i>
//             <span className="logo-text-hack">Hack</span>
//             <span className="logo-text-xcelerate">Xcelerate</span>
//           </a>
//           <button 
//             className="menu-toggle" 
//             onClick={() => setNavActive(!navActive)}
//           >
//             <i className="fas fa-bars"></i>
//           </button>
//           <div className={nav-links ${navActive ? 'active' : ''}}>
//             <a href="#domains">Domains</a>
//             <a href="#problems">Problems</a>
//             {
//               user ? (
//                 <div className="user-info">
//                   <span>{user.displayName}</span>
//                   {userSelection && (
//                     <>
//                     <Button className="deselect-btn" onClick={deselectProblem}>
//                       Deselect Problem
//                     </Button>

//                     <Button onClick={ logOut }  >Logout</Button>

//                     </>
                    
//                   )}
//                 </div>
//               ) : (
//                 <Button onClick={() => setShowSignInModal(true)}>Sign in</Button>
//               )
//             }
//           </div>
//         </nav>
//       </header>

//       <div className="sponsors-section">
//         <div className="sponsors-container">
//           <div className="sponsors-row">
//             <img src={kalasalingam} alt="Sponsor 1" className="sponsor-logo" />
//             <img src={mlsc} alt="Sponsor 2" className="sponsor-logo" />
//             <img src={mlsa} alt="Sponsor 3" className="sponsor-logo" />
//             <img src={k7} alt="Sponsor 4" className="sponsor-logo" />
//           </div>
//         </div>
//       </div>

//       <main>
//         <section className="hero">
//           <h1>Hackathon Problem Statements</h1>
//           <p>Explore innovative challenges across various domains and find the perfect problem statement to showcase your skills and creativity.</p>
//           {userSelection && (
//             <div className="user-selection-banner">
//               <p>You have selected a problem in the {userSelection.category} category.</p>
//               <Button className="view-btn" onClick={() => {
//                 // Scroll to the selected problem
//                 const element = document.getElementById(problem-${userSelection.category}-${userSelection.problemId});
//                 if (element) {
//                   element.scrollIntoView({ behavior: 'smooth' });
//                 }
//               }}>View Selection</Button>
//             </div>
//           )}
//         </section>

//         {showInfoMessage && (
//           <div className="info-message">
//             {infoMessage}
//           </div>
//         )}
//         {showWarningMessage && (
//           <div className="warning-message">
//             {warningMessage}
//           </div>
//         )}
//         {showErrorMessage && (
//           <div className="error-message">
//             {errorMessage}
//           </div>
//         )}

//         <section id="domains">
//           <div className="filter-container">
//             <div className="filter-group">
//               <button 
//                 className={filter-btn ${activeFilter === 'all' ? 'active' : ''}}
//                 onClick={() => setActiveFilter('all')}
//               >
//                 All Domains
//               </button>
//             </div>
//           </div>

//           <div className="domains-grid">
//             <DomainCard 
//               title="AI & Machine Learning"
//               description="Solve complex problems using artificial intelligence, deep learning, and machine learning techniques to create next-generation solutions."
//               problemCount={aiCount}
//               category="ai-ml"
//             />
//             <DomainCard 
//               title="Data Science"
//               description="Extract insights and knowledge from structured and unstructured data through various scientific methods, processes, algorithms, and systems."
//               problemCount={dataCount}
//               category="data-science"
//             />
//             <DomainCard 
//               title="Cybersecurity"
//               description="Develop innovative solutions to protect systems, networks, and programs from digital attacks and ensure data privacy and security."
//               problemCount={securityCount}
//               category="cybersecurity"
//             />
//             <DomainCard 
//               title="Web/App Development"
//               description="Create innovative web applications and mobile apps that solve real-world problems and provide seamless user experiences."
//               problemCount={webCount}
//               category="Web/App Development"
//             />
//           </div>
//         </section>

//         <section id="problems" className="problems-section">
//           <div className="section-header">
//             <h2>Problem Statements</h2>
//           </div>

//           <div id="ai-ml-problems">
//             <h3>AI & Machine Learning</h3>
//             <div className="problems-list">
//               <EnhancedProblemCard 
//                 category="AI"
//                 problemId="01VQ"
//                 title="Advanced Visual Quality Control in Manufacturing"
//                 description="Develop an automated visual inspection system to detect subtle defects in manufacturing lines. This system should improve accuracy, reduce waste, and increase the speed of quality control compared to manual methods."
//                 tags={['Python', 'TensorFlow/PyTorch', 'OpenCV']}
//                 teamCount={data.Problems.AI["01VQ"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("AI", "01VQ")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="AI"
//                 problemId="02VI"
//                 title="Automated Visual Inspection for Component Assembly"
//                 description="Create an automated system that visually inspects component assembly on a production line. This system should verify the presence and correct placement of parts, flagging misassemblies and missing components in real time to minimize errors."
//                 tags={['Python', 'YOLOv5/v8P', 'OpenCV']}
//                 teamCount={data.Problems.AI["02VI"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("AI", "02VI")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="AI"
//                 problemId="02VI"
//                 title="AI-Powered Safety Gear Compliance Monitor"
//                 description="Design a system that automatically monitors worker compliance with safety gear regulations. This system should use computer vision to detect whether workers are wearing required equipment (helmets, vests, etc.), providing real-time alerts for non-compliance."
//                 tags={['Python', ' OpenCV', 'TensorFlow/PyTorch']}
//                 teamCount={data.Problems.AI["02VI"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("AI", "02VI")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="AI"
//                 problemId="02VI"
//                 title="Intelligent Contract Clause Extraction and Compliance Checker"
//                 description="Create an intelligent system to automatically extract relevant clauses from industrial contracts and verify their compliance with established regulations. The system should highlight missing or non-compliant clauses, generating comprehensive assessment reports."
//                 tags={['Python', 'spaCy/NLTK', 'Hugging Face']}
//                 teamCount={data.Problems.AI["02VI"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("AI", "02VI")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="AI"
//                 problemId="02VI"
//                 title="Real-Time Technical Support Chatbot for Industrial Systems"
//                 description=" Build an AI-powered chatbot to provide real-time technical support for industrial systems. The chatbot should understand user queries, detect urgency based on sentiment, and provide context-aware responses, improving customer satisfaction."
//                 tags={['Python', 'Rasa/Dialogflow', 'NLP tools']}
//                 teamCount={data.Problems.AI["02VI"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("AI", "02VI")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="AI"
//                 problemId="02VI"
//                 title="Automated Grading of Student Essays Using Advanced NLP and Machine Learning"
//                 description="Design a system that automatically grades student essays based on content, grammar, style, and originality. The system should provide accurate and consistent scores, freeing up teachers' time and providing students with timely feedback."
//                 tags={['Python', 'NLTK/spaCy', 'Scikit-learn']}
//                 teamCount={data.Problems.AI["02VI"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("AI", "02VI")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="AI"
//                 problemId="02VI"
//                 title="Audio-Based Speech Tutor"
//                 description="Create an AI-powered system that acts as a personalized speech tutor for public speakers by analyzing audio recordings. The system will provide detailed feedback on grammar, vocabulary, fluency, and clarity, while offering targeted recommendations for exercises to improve speech delivery."
//                 tags={['Python', 'OpenAI/Whisper', 'PyTorch/TensorFlow']}
//                 teamCount={data.Problems.AI["02VI"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("AI", "02VI")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="AI"
//                 problemId="02VI"
//                 title="Personalized Education Path Recommendation"
//                 description="Create a system to recommend personalized education paths for students based on their learning styles, strengths, and career goals. The system should analyze student performance and provide tailored course suggestions."
//                 tags={['Python', 'Pandas/NumPy', 'GraphDB/Neo4j']}
//                 teamCount={data.Problems.AI["02VI"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("AI", "02VI")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="AI"
//                 problemId="02VI"
//                 title="AI-Powered Chatbot for Tax Assistance and Personalized Guidance"
//                 description=" Create an AI chatbot that provides personalized tax assistance to users. The chatbot should answer tax-related questions, guide users through filing procedures, and suggest relevant deductions and credits based on their individual circumstances."
//                 tags={['Python', 'Rasa/Dialogflow', 'spaCy/NLTK']}
//                 teamCount={data.Problems.AI["02VI"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("AI", "02VI")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="AI"
//                 problemId="02VI"
//                 title="AI-Driven Solutions for Real-World Challenges in Healthcare and Agriculture"
//                 description="Innovative AI implementations using TensorFlow, PyTorch, OpenCV, or other frameworks to solve domain-specific problems.Integration of AI with IoT, cloud computing, and edge AI for real-time decision-making.User-friendly interfaces for easy adoption in healthcare and farming communities.Scalability and feasibility for large-scale deployments."
//                 tags={['Python', 'TensorFlow/PyTorch', 'OpenCV']}
//                 teamCount={data.Problems.AI["02VI"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("AI", "02VI")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               {/* Add remaining problem cards in this section */}
//             </div>
//           </div>

//           <div id="data-science-problems">
//             <h3>Data Science</h3>
//             <div className="problems-list">
//               <EnhancedProblemCard 
//                 category="Data Science"
//                 problemId="01CTD"
//                 title="Cybersecurity Threat Detection in Network Logs"
//                 description="Develop a system to detect and prevent cybersecurity threats by analyzing network logs in real-time. The system should identify malicious activity like DDoS attacks and phishing attempts, automatically blocking malicious IPs and preventing security breaches."
//                 tags={['Python', 'Pandas/NumPy/Scikit-learn', 'ELK stack']}
//                 teamCount={data.Problems["Data Science"]?.["01CTD"]?.teamCount || 0}
//                 maxTeams={4}
//                 onSelect={() => handleSelectProblem("Data Science", "01CTD")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Data Science"
//                 problemId="01CTD"
//                 title="Energy Consumption Optimization in Manufacturing"
//                 description="Develop a system to predict and optimize energy consumption in a manufacturing facility. This involves forecasting short-term energy demand, identifying periods of excessive usage, and suggesting corrective actions to reduce waste and costs."
//                 tags={['Python/R', 'Prophet/ARIMA', 'Pandas/NumPy']}
//                 teamCount={data.Problems["Data Science"]?.["01CTD"]?.teamCount || 0}
//                 maxTeams={4}
//                 onSelect={() => handleSelectProblem("Data Science", "01CTD")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Data Science"
//                 problemId="01CTD"
//                 title="Customer Retention Prediction and Optimization Platform"
//                 description=" Create a platform to predict customer churn and provide actionable insights for improving retention. This involves identifying key factors that influence customer disengagement and generating personalized engagement strategies to reduce churn."
//                 tags={['Python/R', 'Pandas/NumPy', 'Streamlit/Tableau']}
//                 teamCount={data.Problems["Data Science"]?.["01CTD"]?.teamCount || 0}
//                 maxTeams={4}
//                 onSelect={() => handleSelectProblem("Data Science", "01CTD")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Data Science"
//                 problemId="01CTD"
//                 title="AI-Driven Fake Scientific Research Detection"
//                 description="Develop an AI-driven system to detect fraudulent scientific studies and AI-generated content. The system should analyze research papers, identify plagiarism, detect citation anomalies, and assign credibility scores to ensure research integrity."
//                 tags={['Python', ' spaCy/NLTK', 'SciPy']}
//                 teamCount={data.Problems["Data Science"]?.["01CTD"]?.teamCount || 0}
//                 maxTeams={4}
//                 onSelect={() => handleSelectProblem("Data Science", "01CTD")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Data Science"
//                 problemId="01CTD"
//                 title="Customer Retention Prediction and Optimization Platform"
//                 description="Create a platform to predict customer churn and provide actionable insights for improving retention. This involves identifying key factors that influence customer disengagement and generating personalized engagement strategies to reduce churn."
//                 tags={['Python/R', 'Pandas/NumPy', 'Streamlit/Tableau']}
//                 teamCount={data.Problems["Data Science"]?.["01CTD"]?.teamCount || 0}
//                 maxTeams={4}
//                 onSelect={() => handleSelectProblem("Data Science", "01CTD")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               {/* Add remaining problem cards in this section */}
//             </div>
//           </div>

//           <div id="cybersecurity-problems">
//             <h3>Cybersecurity</h3>
//             <div className="problems-list">
//               <EnhancedProblemCard 
//                 category="Cybersecurity"
//                 problemId="01SFS"
//                 title="Secure File Sharing System with Threat Detection"
//                 description="Traditional file-sharing methods lack strong encryption and real-time security, making them vulnerable to data breaches. Develop a secure file-sharing system that ensures encrypted transfers, detects unauthorized access, and alerts users of potential threats."
//                 tags={['Node.js/Python', 'PostgreSQL/Firebase', 'AES-256 encryption']}
//                 teamCount={data.Problems.Cybersecurity?.["01SFS"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Cybersecurity", "01SFS")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Cybersecurity"
//                 problemId="01SFS"
//                 title="AI-Powered Log Monitoring for Cyber Threats"
//                 description="Security teams struggle to manually analyze logs, making it hard to detect cyber threats in real-time.Build an AI-driven log monitoring system that detects unusual activity, identifies potential attacks, and sends alerts."
//                 tags={['Apache Kafka', 'Elasticsearch', 'Grafana']}
//                 teamCount={data.Problems.Cybersecurity?.["01SFS"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Cybersecurity", "01SFS")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Cybersecurity"
//                 problemId="01SFS"
//                 title="Phishing Detection & Email Security Assistant"
//                 description="Many users fall victim to phishing emails because they struggle to identify fraudulent links, fake senders, and malicious attachments.Develop a browser extension or mobile app that scans incoming emails, detects phishing attempts using AI, and warns users before they click on suspicious links."
//                 tags={['Apache Kafka', 'Elasticsearch', 'Grafana/Kibana']}
//                 teamCount={data.Problems.Cybersecurity?.["01SFS"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Cybersecurity", "01SFS")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               {/* Add remaining problem cards in this section */}
//             </div>
//           </div>
          
//           <div id="Web/App Development">
//             <h3>Web/App Development</h3>
//             <div className="problems-list">
//               <EnhancedProblemCard 
//                 category="Web/App Development"
//                 problemId="01RCW"
//                 title="Real-Time Collaborative Whiteboard"
//                 description="Create a real-time collaborative whiteboard using WebSockets. Multiple users can collaboratively draw, add sticky notes, and chat. Develop a real-time, multi-user collaborative whiteboard that enables teams and educators to brainstorm, teach, and work together efficiently without lag."
//                 tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
//                 teamCount={data.Problems["Web/App Development"]?.["01RCW"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Web/App Development", "01RCW")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Web/App Development"
//                 problemId="01RCW"
//                 title="Build a Simple Blogging Platform with SEO Optimization"
//                 description="SEO optimization is crucial for a blogging platform to achieve visibility. Theplatform should focus on SEO-friendly features like URLs, meta tags, and server-side rendering."
//                 tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
//                 teamCount={data.Problems["Web/App Development"]?.["01RCW"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Web/App Development", "01RCW")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Web/App Development"
//                 problemId="01RCW"
//                 title="Build a Stock Trading Platform"
//                 description="A stock trading simulation platform should provide real-time data fetching,user authentication, and trading functionalities for a realistic experience."
//                 tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
//                 teamCount={data.Problems["Web/App Development"]?.["01RCW"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Web/App Development", "01RCW")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Web/App Development"
//                 problemId="01RCW"
//                 title="Sustainable E-Commerce for Second-Hand Goods"
//                 description="Develop an eco-friendly e-commerce platform for buying and selling second-hand goods while promoting sustainability awareness through eco-scores and responsible logistics."
//                 tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
//                 teamCount={data.Problems["Web/App Development"]?.["01RCW"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Web/App Development", "01RCW")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Web/App Development"
//                 problemId="01RCW"
//                 title="Create a Fitness Tracker"
//                 description="Tracking fitness activities helps users stay motivated and reach their health goals. The application should monitor various activities and offer data visualization."
//                 tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
//                 teamCount={data.Problems["Web/App Development"]?.["01RCW"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Web/App Development", "01RCW")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Web/App Development"
//                 problemId="01RCW"
//                 title="Design a Payment Gateway Integration"
//                 description="Integrating a payment gateway involves handling transactions securely while providing a smooth user experience during the checkout process."
//                 tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
//                 teamCount={data.Problems["Web/App Development"]?.["01RCW"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Web/App Development", "01RCW")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Web/App Development"
//                 problemId="01RCW"
//                 title="Calendar Scheduling System"
//                 description="Intuitive calendar view for adding events, scheduling meetings, andreminders.Handling recurring events, time zone adjustments, and notifications."
//                 tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
//                 teamCount={data.Problems["Web/App Development"]?.["01RCW"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Web/App Development", "01RCW")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Web/App Development"
//                 problemId="01RCW"
//                 title="Create a Blogging Platform"
//                 description="A blogging platform allows users to write, comment, and interact with posts,necessitating both user-friendly front-end and scalable back-end development."
//                 tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
//                 teamCount={data.Problems["Web/App Development"]?.["01RCW"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Web/App Development", "01RCW")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Web/App Development"
//                 problemId="01RCW"
//                 title="Design a URL Shortener Service"
//                 description="Managing and sharing long URLs can be inconvenient and cluttered. A URL shortener service reduces the length of URLs while maintaining redirection to the original destination, enabling better management, sharing, and analytics."
//                 tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
//                 teamCount={data.Problems["Web/App Development"]?.["01RCW"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Web/App Development", "01RCW")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               <EnhancedProblemCard 
//                 category="Web/App Development"
//                 problemId="01RCW"
//                 title="Sustainable E-Commerce for Second-Hand Goods"
//                 description="A website for buying & selling second-hand items while promoting sustainability.Develop an eco-friendly e-commerce platform for buying and selling second-hand goods, while promoting sustainability awareness through eco-scores and responsible logistics."
//                 tags={['React.js/Next.js', 'PostgreSQL/Firebase', 'WebSockets']}
//                 teamCount={data.Problems["Web/App Development"]?.["01RCW"]?.teamCount || 0}
//                 maxTeams={3}
//                 onSelect={() => handleSelectProblem("Web/App Development", "01RCW")}
//                 onDeselect={deselectProblem}
//                 userSelection={userSelection}
//               />
//               {/* Add remaining problem cards in this section */}
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer>
//         <div className="content">
//           <div className="logo">
//             <i className="fas fa-code logo-icon"></i>
//             <span className="logo-text-hack">Hack</span>
//             <span className="logo-text-xcelerate">Xcelerate</span>
//           </div>
//           <div className="social-links">
//             <a href="https://chat.whatsapp.com/J9WfYwU8wUSIyduAkwEIA3" className=""><i className="fab fa-whatsapp"></i></a>
//             <a href="https://www.linkedin.com/company/mlsckare/" className=""><i className="fab fa-linkedin"></i></a>
//             <a href="https://www.instagram.com/mlsc_kare/" className=""><i className="fab fa-instagram"></i></a>
//           </div>
//           <p>©Follow us on Instagram, LinkedIn and join WhatsApp group for more Updates.</p>
//         </div>
//       </footer>

//       {/* Sign In Modal */}
//       <Modal show={showSignInModal} onHide={() => setShowSignInModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Sign In Required</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>You need to sign in to select a problem statement.</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowSignInModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSignIn}>
//             Sign In with Google
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Other Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirmation</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want the test?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={enterFullscreen}>
//             Start Exam
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {showBackToTop && (
//         <div className="back-to-top show" onClick={scrollToTop}>
//           <i className="fas fa-arrow-up"></i>
//         </div>
//       )}
//     </div>
//   );
// }

// function DomainCard({ title, description, problemCount, category }) {
//   return (
//     <div className="domain-card" data-category={category}>
//       <div className="domain-header">
//         <h3>{title}</h3>
//       </div>
//       <div className="domain-body">
//         <p>{description}</p>
//       </div>
//       <div className="domain-footer">
//         <span className="problems-count">{problemCount} Problems</span>
//         <a href={#${category}-problems} className="explore-btn">Explore</a>
//       </div>
//     </div>
//   );
// }

// // Enhanced Problem Card with Firebase integration
// function EnhancedProblemCard({ 
//   category, 
//   problemId, 
//   title, 
//   description, 
//   tags, 
//   teamCount = 0, 
//   maxTeams = 3, 
//   onSelect, 
//   onDeselect, 
//   userSelection 
// }) {
//   const isSelected = userSelection && 
//                      userSelection.category === category && 
//                      userSelection.problemId === problemId;
  
//   const isFull = teamCount >= maxTeams && !isSelected;
  
//   const cardClass = problem-card ${isSelected ? 'selected' : ''} ${isFull ? 'full' : ''};
//   const buttonClass = select-btn ${isSelected ? 'selected' : ''} ${isFull ? 'full' : ''};
//   const buttonText = isSelected ? 'Selected' : isFull ? 'Full' : 'Select';

//   const handleClick = () => {
//     if (isSelected) {
//       onDeselect();
//     } else if (!isFull) {
//       onSelect();
//     }
//   };

//   return (
//     <div id={problem-${category}-${problemId}} className={cardClass}>
//       <div className="problem-header">
//         <h3>{title}</h3>
//         <div className="problem-tags">
//           {tags.map((tag, index) => (
//             <span key={index} className="tag">{tag}</span>
//           ))}
//         </div>
//       </div>
//       <div className="problem-body">
//         <p>{description}</p>
//       </div>
//       <div className="problem-footer">
//         <div className="problem-stats">
//           <i className="fas fa-users"></i> {teamCount} teams working on this
//           {maxTeams && <span className="max-teams"> (max: {maxTeams})</span>}
//         </div>
//         <button 
//           className={buttonClass} 
//           onClick={handleClick} 
//           disabled={isFull && !isSelected}
//         >
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );
// }

// // Add some CSS styles for the new components
// const additionalStyles = `
// .user-info {
//   display: flex;
//   align-items: center;
//   gap: 10px;
// }

// .deselect-btn {
//   background-color: #ff6b6b;
//   color: white;
//   border: none;
//   padding: 5px 10px;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 0.8rem;
// }

// .deselect-btn:hover {
//   background-color: #ff5252;
// }

// .user-selection-banner {
//   background-color: #4caf50;
//   color: white;
//   padding: 10px 15px;
//   border-radius: 4px;
//   margin-top: 20px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .view-btn {
//   background-color: white;
//   color: #4caf50;
//   border: none;
//   padding: 5px 10px;
//   border-radius: 4px;
//   cursor: pointer;
// }

// .view-btn:hover {
//   background-color: #f1f1f1;
// }

// .info-message {
//   background-color: #4caf50;
//   color: white;
//   padding: 10px 15px;
//   border-radius: 4px;
//   margin: 10px 0;
//   text-align: center;
// }

// .warning-message {
//   background-color: #ff9800;
//   color: white;
//   padding: 10px 15px;
//   border-radius: 4px;
//   margin: 10px 0;
//   text-align: center;
// }

// .error-message {
//   background-color: #f44336;
//   color: white;
//   padding: 10px 15px;
//   border-radius: 4px;
//   margin: 10px 0;
//   text-align: center;
// }

// .max-teams {
//   font-size: 0.8rem;
//   opacity: 0.8;
//   margin-left: 5px;
// }

// .problem-card.selected {
//   border: 2px solid #4caf50;
//   box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
// }

// .problem-card.full:not(.selected) {
//   opacity: 0.8;
// }

// .select-btn.selected {
//   background-color: #4caf50;
// }

// .select-btn.full:not(.selected) {
//   background-color: #9e9e9e;
//   cursor: not-allowed;
// }
// `;

// export default Hack;