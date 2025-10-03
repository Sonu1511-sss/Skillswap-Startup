// client/src/Dashboard/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import UserCard from './UserCard'; // Reuse the UserCard component

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // Get the search query from the URL
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${query}`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        }
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]); 

  if (loading) return <div className="p-8 text-center">Searching...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* <h1 className="text-3xl font-bold">Search Results for "{query}"</h1> */}

      {results && (
        <>
          {/* User Results */}
          {results.users.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Users</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.users.map(user => <UserCard key={user.id} user={user} onOpenModal={() => {}} />)}
              </div>
            </section>
          )}

          {/* Swap Results (You can create a SwapCard component for this) */}
          {results.swaps.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Swaps</h2>
              <div className="space-y-4">
                {results.swaps.map(swap => (
                  <div key={swap._id} className="bg-white p-4 rounded-lg shadow-sm border">
                    <p>{swap.skillOffered} ↔ {swap.skillWanted}</p>
                    <p className="text-sm text-gray-500">Status: {swap.status}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {results.users.length === 0 && results.swaps.length === 0 && (
            <p className="text-center text-gray-500">No results found for your search.</p>
          )}
        </>
      )}
    </div>
  );
}