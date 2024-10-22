import React from 'react';
import '../styles/About.css';

const About = () => {
  // Function to format code blocks while preserving whitespace
  const formatCode = (code) => {
    return code.trim();
  };

  const codeBlocks = {
    userInput: `
const [filters, setFilters] = useState({
  brand: '',
  minPrice: '',
  maxPrice: '',
  transmission: '',
  bodyType: '',
  seatingCapacity: '',
  fuelType: '',
});`,
    dataFetching: `
const fetchRecommendations = async (filters) => {
  const response = await axios.post('/api/recommendations', filters);
  return response.data;
};`,
    displayResults: `
<RecommendationsTable recommendations={recommendations} />`,
    navigation: `
const [currentPage, setCurrentPage] = useState('home');
const renderPage = () => {
  switch(currentPage) {
    case 'home':
      return <HomePage />;
    case 'about':
      return <About />;
    case 'login':
      return <Login />;
    default:
      return <NotFound />;
  }
};`
  };

  return (
    <div className="about-page">
      <h1>About Car Finder</h1>
      <p>Car Finder is a React-based web application designed to help users find their perfect car match. Here's how it works:</p>
      
      <section className="code-section">
        <h2>1. User Input</h2>
        <p>Users can specify their preferences using a form:</p>
        <pre className="code-block">
          <code className="language-javascript">
            {formatCode(codeBlocks.userInput)}
          </code>
        </pre>
      </section>

      <section className="code-section">
        <h2>2. Data Fetching</h2>
        <p>We fetch car data from our API based on user filters:</p>
        <pre className="code-block">
          <code className="language-javascript">
            {formatCode(codeBlocks.dataFetching)}
          </code>
        </pre>
      </section>

      <section className="code-section">
        <h2>3. Displaying Results</h2>
        <p>The fetched data is then displayed in a table format:</p>
        <pre className="code-block">
          <code className="language-javascript">
            {formatCode(codeBlocks.displayResults)}
          </code>
        </pre>
      </section>

      <section className="code-section">
        <h2>4. Navigation</h2>
        <p>We use a simple state-based routing system:</p>
        <pre className="code-block">
          <code className="language-javascript">
            {formatCode(codeBlocks.navigation)}
          </code>
        </pre>
      </section>

      <p>This application is built with React and uses modern JavaScript features to provide a smooth, interactive experience for finding your ideal car.</p>
    </div>
  );
};

export default About;
