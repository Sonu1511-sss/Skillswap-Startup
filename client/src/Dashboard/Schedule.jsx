import React, { useState, useEffect, useContext } from "react";
import { CalendarDays, Video, Filter, Plus, X ,CheckCircle } from "lucide-react";
import { SiGooglemeet } from "react-icons/si";
import { useLocation } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday, addDays } from 'date-fns';
import { AuthContext } from "../context/AuthContext";
import NewSessionModal from "./NewSessionModal";
import ReviewModal from "./ReviewModal";
import { toast } from "react-hot-toast";

export default function Schedule() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { user: loggedInUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSwaps, setActiveSwaps] = useState([]);
  const [reviewModalData, setReviewModalData] = useState(null);


  const location = useLocation();

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const startDate = format(startOfMonth(currentDate), 'yyyy-MM-dd');
        const endDate = format(endOfMonth(currentDate), 'yyyy-MM-dd');

        const [sessionsRes, swapsRes] = await Promise.all([
          fetch(`/api/sessions/me?startDate=${startDate}&endDate=${endDate}`, { credentials: 'include' }),
          fetch('/api/swaps/me', { credentials: 'include' })
        ]);

        const sessionsData = await sessionsRes.json();
        if (sessionsData.success) {
          const formattedSessions = sessionsData.data.map(session => ({ ...session, scheduledAt: new Date(session.scheduledAt) }));
          setSessions(formattedSessions);
        } else {
          throw new Error(sessionsData.message || 'Failed to fetch sessions');
        }
        
        const swapsData = await swapsRes.json();
        if (swapsData.success) {
          setActiveSwaps(swapsData.data.filter(swap => swap.status === 'accepted'));
        } else {
          throw new Error(swapsData.message || 'Failed to fetch active swaps');
        }

      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentDate]);
  
  // Checks for incoming state from other pages to open the modal
  useEffect(() => {
    const swapIdFromState = location.state?.swapToScheduleId;
    if (swapIdFromState) {
      setIsModalOpen(true);
    }
  }, [location.state]);


  // --- HANDLER FUNCTIONS ---
  const handleSessionCreated = (newSession) => {
    const formattedSession = { ...newSession, scheduledAt: new Date(newSession.scheduledAt) };
    setSessions(prevSessions => [...prevSessions, formattedSession].sort((a, b) => a.scheduledAt - b.scheduledAt));
  };

   const handleUpdateSession = async (sessionId, newStatus) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      
      toast.success(data.message);
      const updatedSession = { ...data.data, scheduledAt: new Date(data.data.scheduledAt) };
      setSessions(prev => prev.map(s => s._id === sessionId ? updatedSession : s));

      // After completing, open the review modal
      if (newStatus === 'completed') {
        setReviewModalData(updatedSession);
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to cancel this session?")) {
      return;
    }
    try {
      const res = await fetch(`/api/sessions/${sessionId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }
      toast.success(data.message);
      setSessions(prevSessions => prevSessions.filter(session => session._id !== sessionId));
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  const changeMonth = (amount) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + amount);
    setCurrentDate(newDate);
  };

  // --- DATA FILTERING ---
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });
  const startingDayIndex = getDay(startOfMonth(currentDate));
  const today = new Date();
  const todaysSessions = sessions.filter(s => isSameDay(s.scheduledAt, today));
  const upcomingSessions = sessions.filter(s => s.scheduledAt > addDays(today, -1) && !isSameDay(s.scheduledAt, today)).sort((a,b) => a.scheduledAt - b.scheduledAt);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Schedule...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl pt-[6rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📅 Schedule</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your upcoming and past skill exchange sessions</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-medium"><Filter className="w-4 h-4" /> Filter</button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-sm font-medium"><Plus className="w-4 h-4" /> New Session</button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-indigo-600" /> Calendar</h3>
            <div className="flex items-center justify-between mb-3 text-sm font-medium">
              <button onClick={() => changeMonth(-1)} className="text-gray-500 hover:text-gray-700">{"<"}</button>
              <span>{format(currentDate, 'MMMM yyyy')}</span>
              <button onClick={() => changeMonth(1)} className="text-gray-500 hover:text-gray-700">{">"}</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 font-bold mb-2">{daysOfWeek.map((day, index) => <div key={index}>{day}</div>)}</div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-700">
              {Array.from({ length: startingDayIndex }).map((_, i) => <div key={`empty-${i}`}></div>)}
              {daysInMonth.map((day) => {
                const isSessionDay = sessions.some(s => isSameDay(s.scheduledAt, day));
                return (<div key={day.toString()} className={`py-2 rounded-lg cursor-pointer transition ${isToday(day) ? "bg-indigo-600 text-white font-bold shadow" : "hover:bg-gray-100"} ${isSessionDay && !isToday(day) ? 'font-bold text-indigo-700 ring-2 ring-indigo-200' : ''}`}>{format(day, 'd')}</div>);
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-8">
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Today’s Schedule</h3>
          <div className="space-y-4 text-sm">
            {todaysSessions.length > 0 ? todaysSessions.map(session => (
              // --- FIX 1: Pass the onUpdateSession handler to ScheduleItem ---
              <ScheduleItem 
                key={session._id} 
                session={session} 
                currentUser={loggedInUser} 
                onDeleteSession={handleDeleteSession}
                onUpdateSession={handleUpdateSession}
              />
            )) : <p className="text-gray-500">No sessions scheduled for today.</p>}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Upcoming Sessions</h3>
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map(session => 
              // --- FIX 2: Pass the onUpdateSession handler to UpcomingSessionCard ---
              <UpcomingSessionCard 
                key={session._id} 
                session={session} 
                currentUser={loggedInUser} 
                onDeleteSession={handleDeleteSession}
                onUpdateSession={handleUpdateSession}
              />)
          ) : <p className="text-gray-500">No upcoming sessions scheduled.</p>}
        </div>
      </div>
      </div>
      
      <NewSessionModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); window.history.replaceState({}, document.title) }}
        activeSwaps={activeSwaps}
        onSessionCreated={handleSessionCreated}
        defaultSwapId={location.state?.swapToScheduleId}
      />
       <ReviewModal 
        isOpen={!!reviewModalData}
        onClose={() => setReviewModalData(null)}
        sessionData={reviewModalData}
        currentUser={loggedInUser}
      />
    </div>
  );
}

// --- Helper Components ---

const ScheduleItem = ({ session, currentUser, onDeleteSession , onUpdateSession  }) => {
  const otherUser = session.swapId.requester._id === currentUser.id ? session.swapId.receiver : session.swapId.requester;
  const isPast = new Date(session.scheduledAt) < new Date();

  return (
    <div className="group flex items-center justify-between border rounded-xl px-4 py-3 hover:bg-gray-50 transition">
      <div>
        <p className="font-medium text-gray-800">{format(session.scheduledAt, 'p')}</p>
        <p className="text-gray-600">{session.title}</p>
        <p className="text-xs text-gray-500 mt-1">with {otherUser.name}</p>
      </div>
      <div className="flex items-center gap-3">
        {session.meetingLink && (<a href={session.meetingLink} target="_blank" rel="noopener noreferrer" title="Join Google Meet"><SiGooglemeet className="w-5 h-5 text-gray-500 hover:text-green-600 transition" /></a>)}
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{session.durationInMinutes}min</span>
        <button onClick={() => onDeleteSession(session._id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition" title="Cancel Session"><X className="w-4 h-4" /></button>
      </div>
        {/* 'Mark as Complete' button appears for past, scheduled sessions */}
        {isPast && session.status === 'scheduled' && (
          <div className="mt-3 pt-3 border-t flex justify-end">
            <button 
              onClick={() => onUpdateSession(session._id, 'completed')}
              className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-green-200"
            >
              Mark as Complete
            </button>
          </div>
        )}
         {/* You can add a "Leave Review" button here for completed sessions if you want */}
        {session.status === 'completed' && (
             <div className="mt-3 pt-3 border-t flex justify-end">
                <p className="text-green-600 text-xs font-semibold">Session Completed ✔</p>
             </div>
        )}
    </div>
  );
};

const UpcomingSessionCard = ({ session, currentUser, onDeleteSession ,onUpdateSession  }) => {
    if (!session || !session.swapId || !currentUser) return null;
    const otherUser = session.swapId.requester._id === currentUser.id ? session.swapId.receiver : session.swapId.requester;
    if (!otherUser) return null;

    const isPast = new Date(session.scheduledAt) < new Date();

    return (
        <div className="border rounded-xl p-5 hover:shadow-lg transition mb-4">
            <div className="flex items-center gap-3">
                <img src={otherUser.profilePicture || `https://ui-avatars.com/api/?name=${otherUser.name}`} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                <div>
                    <h4 className="font-semibold">{session.title}</h4>
                    <p className="text-gray-500 text-xs">with {otherUser.name} on {format(session.scheduledAt, 'eee, MMM d')}</p>
                </div>
                <span className="ml-auto text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium">{session.status}</span>
            </div>
            <div className="flex gap-3 mt-5">
                <button className="flex-1 border px-3 py-2 rounded-lg text-sm hover:bg-gray-50">Message</button>
                <a href={session.meetingLink || '#'} target="_blank" rel="noopener noreferrer" className={`flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition ${!session.meetingLink && 'opacity-50 cursor-not-allowed'}`}>
                  <Video className="w-4 h-4" /> Join Session
                </a>
                <button onClick={() => onDeleteSession(session._id)} className="border border-red-200 text-red-500 p-2 rounded-lg text-sm hover:bg-red-50" title="Cancel Session">
                  <X className="w-5 w-5" />
                </button>
            </div>
            {isPast && session.status === 'scheduled' && (
              <div className="mt-3 pt-3 border-t">
                <button onClick={() => onUpdateSession(session._id, 'completed')} className="w-full bg-green-100 text-green-700 font-semibold py-2 rounded-lg hover:bg-green-200 transition">
                  Mark as Complete
                </button>
              </div>
            )}
        </div>
    );
};