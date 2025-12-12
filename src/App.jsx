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
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setShowAuth(false);
      }
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

  return (
    <imperialContext.Provider value={{ imperial, setImperial }}>
      {showAuth && !user ? (
        <Auth onClose={() => setShowAuth(false)} />
      ) : (
        <div className="m-8 mx-auto max-w-[1200px]">
          <Header user={user} onShowAuth={() => setShowAuth(true)} />
          <MainContent user={user} onShowAuth={() => setShowAuth(true)} />
        </div>
      )}
    </imperialContext.Provider>
  );
}

export default App;
