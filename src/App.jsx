// src/App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Auth from "./components/Auth";
import { imperialContext } from "./context/imperialContext";
import { supabase } from "./supabaseClient";

function App() {
  const [imperial, setImperial] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl dm-sans-regular">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <imperialContext.Provider value={{ imperial, setImperial }}>
      <div className="m-8 mx-auto max-w-[1200px]">
        <Header user={user} />
        <MainContent user={user} />
      </div>
    </imperialContext.Provider>
  );
}

export default App;