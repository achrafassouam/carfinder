import React from 'react';
import '../styles/About.css';

const About = () => {
  const highlightSyntax = (code) => {
    return code
      .replace(/(const|let|var|async|await|return)/g, '<span class="keyword">$1</span>')
      .replace(/(useState|useEffect|axios\.post|RecommendationsTable)/g, '<span class="function">$1</span>')
      .replace(/(\'[^\']*\'|\"[^\"]*\")/g, '<span class="string">$1</span>')
      .replace(/(\d+)/g, '<span class="number">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
      .replace(/([{}[\]()<>])/g, '<span class="bracket">$1</span>');
  };

  return (
    <div className="about-page">
      <h1>About Car Finder</h1>
      <p>Car Finder is a React-based web application designed to help users find their perfect car match. Here's how it works:</p>

      <section>
        <h2>1. User Input</h2>
        <p>Users can specify their preferences using a form:</p>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(`
const [filters, setFilters] = useState({
  brand: '',
  minPrice: '',
  maxPrice: '',
  transmission: '',
  bodyType: '',
  seatingCapacity: '',
  fuelType: '',
});
          `) }} />
        </pre>
      </section>

      <section>
        <h2>2. Data Fetching</h2>
        <p>We fetch car data from our API based on user filters:</p>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(`
const fetchRecommendations = async (filters) => {
  const response = await axios.post('/api/recommendations', filters);
  return response.data;
};
          `) }} />
        </pre>
      </section>

      <section>
        <h2>3. Displaying Results</h2>
        <p>The fetched data is then displayed in a table format:</p>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(`
<RecommendationsTable recommendations={recommendations} />
          `) }} />
        </pre>
      </section>

      <section>
        <h2>4. Navigation</h2>
        <p>We use a simple state-based routing system:</p>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(`
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
};
          `) }} />
        </pre>
      </section>

      <p>This application is built with React and uses modern JavaScript features to provide a smooth, interactive experience for finding your ideal car.</p>
    </div>
  );
};

export default About;