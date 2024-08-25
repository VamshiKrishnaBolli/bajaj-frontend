import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch('https://your-api-url.herokuapp.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert('Invalid JSON input');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions(prev =>
      checked ? [...prev, value] : prev.filter(option => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div>
      <h1>21BCT0249</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows={10}
        cols={50}
        placeholder='Enter JSON here'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <h2>Select Options</h2>
          <label>
            <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
            Alphabets
          </label>
          <label>
            <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
            Numbers
          </label>
          <label>
            <input type="checkbox" value="Highest lowercase alphabet" onChange={handleOptionChange} />
            Highest lowercase alphabet
          </label>
        </div>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
