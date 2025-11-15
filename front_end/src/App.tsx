import React, { useState } from "react";
import "./App.css";
import Tabs from "./Tabs";
import TabPanel from "./TabPanel";
import Tiptap from "./Tiptap";

const App: React.FC = () => {
  // Separate states for each tab
  const [summaryData, setSummaryData] = useState({
    paper_title: "",
    authors: "",
  });
  const [queryData, setQueryData] = useState({
    paper_title: "",
    query: "",
  });

  const [summaryResponse, setSummaryResponse] = useState<string>("");
  const [queryResponse, setQueryResponse] = useState<string>("");

  const [summaryLoading, setSummaryLoading] = useState(false);
  const [queryLoading, setQueryLoading] = useState(false);

  const [showSummary, setShowSummary] = useState(true);
  const [showQuery, setShowQuery] = useState(true);


  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
    const { name, value } = e.target;
    setSummaryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQueryData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSummarySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSummaryLoading(true);
    setSummaryResponse("");

    const params = new URLSearchParams(summaryData);
    try {
      const response = await fetch(
        `http://localhost:8000/papers/summary/?${params.toString()}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setSummaryResponse(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error("Error:", err);
      setSummaryResponse("Error fetching summary.");
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQueryLoading(true);
    setQueryResponse("");

    const params = new URLSearchParams(queryData);
    try {
      const response = await fetch(
        `http://localhost:8000/papers/query/?${params.toString()}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
	  console.log("result", result)
      setQueryResponse(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error("Error:", err);
      setQueryResponse("Error fetching query results.");
    } finally {
      setQueryLoading(false);
    }
  };


  return (
    <div className="card">
      <Tabs>
      <TabPanel label="Research Papers">
        <Tabs>
        <TabPanel label="Summarize">
          <form onSubmit={handleSummarySubmit}>
          <table>
          <tbody>
          <tr>
           <td> <label>Paper Title</label> </td>
           <td> <input
                type="text"
                name="paper_title"
                placeholder="Enter title"
                value={summaryData.paper_title}
                onChange={handleSummaryChange}
              /></td></tr>
             <tr><td><label>Authors</label></td>
              <td><input
                type="text"
                name="authors"
                placeholder="Enter authors"
                value={summaryData.authors}
                onChange={handleSummaryChange}
              /></td></tr>
            <tr><td colspan={2} align="center">
            <input type="submit" value="Submit" /></td></tr>
            </tbody></table>
          </form>

          {summaryLoading && <p>Loading summary...</p>}
          {!summaryLoading && summaryResponse && (
            <div className="response-box">
              <button
                className="toggle-btn"
                onClick={() => setShowSummary((prev) => !prev)}
              >
              {showSummary ? "Hide" : "Show"}
              </button>
              {showSummary && (
                <div className="scrollable-response">
                  <h3>Summary</h3>
                  <pre>{summaryResponse}</pre>
                </div>
              )}
            </div>
          )}
        </TabPanel>

        <TabPanel label="Get Answers">
          <form onSubmit={handleQuerySubmit}>
              <label>Paper Title</label>
              <input
                type="text"
                name="paper_title"
                placeholder="Enter title"
                value={queryData.paper_title}
                onChange={handleQueryChange}
              />
              <label>Question</label>
              <input
                type="text"
                name="query"
                placeholder="Ask your question"
                value={queryData.query}
                onChange={handleQueryChange}
              />

            <input type="submit" value="Submit" />
          </form>

          {queryLoading && <p>Loading answer...</p>}
          {!queryLoading && queryResponse && (
            <div className="response-box">
              <button
                className="toggle-btn"
                onClick={() => setShowQuery((prev) => !prev)}
              >
                {showQuery ? "Hide" : "Show"}
              </button>
              {showQuery && (
                <div className="scrollable-response">
                  <h3>Answer</h3>
                  <pre>{queryResponse}</pre>
                </div>
              )}
            </div>
          )}
      </TabPanel>
        <TabPanel label="Generate Ideas"></TabPanel>
        </Tabs>
        </TabPanel>
      <TabPanel label="Artifacts"></TabPanel>
      </Tabs>
      </div>
  );
};

export default App;
