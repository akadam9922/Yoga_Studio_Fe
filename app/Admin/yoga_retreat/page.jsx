"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function YogaRetreat() {
  const [yogaRetreats, setYogaRetreats] = useState([
    { id: 1, name: "Hatha Yoga Retreat", date: "2024-04-01", ancillary_activity: "meditation", meal: "vegitables", price: "10" },
    { id: 2, name: "Vinyasa Yoga Retreat", date: "2024-05-15", ancillary_activity: "drawing", meal: "vegitables", price: "20" },
    { id: 3, name: "Ashtanga Yoga Retreat", date: "2024-06-20", ancillary_activity: "singing", meal: "fruit platter", price: "30" }
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newRetreat, setNewRetreat] = useState({ name: "", date: "", ancillary_activity: "", meal: "", price: "" });
  const [selectedRetreat, setSelectedRetreat] = useState(null);

  const handleDeleteYogaRetreat = (id) => {
    setYogaRetreats(yogaRetreats.filter(retreat => retreat.id !== id));
  };

  const handleUpdateYogaRetreat = () => {
    setYogaRetreats(yogaRetreats.map(retreat => {
      if (retreat.id === selectedRetreat.id) {
        return { ...retreat, ...newRetreat };
      } else {
        return retreat;
      }
    }));
    setShowPopup(false);
    setSelectedRetreat(null);
    setNewRetreat({ name: "", date: "", ancillary_activity: "", meal: "", price: "" }); // Clear form fields
  };
  

  const handleAddYogaRetreat = () => {
    setYogaRetreats([...yogaRetreats, { id: Date.now(), ...newRetreat }]);
    setShowPopup(false);
    setNewRetreat({ name: "", date: "", ancillary_activity: "", meal: "", price: "" });
  };

  const openUpdatePopup = (retreat) => {
    setSelectedRetreat(retreat);
    setNewRetreat({ ...retreat }); // Load selected retreat data into the form
    setShowPopup(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Yoga Retreat</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {yogaRetreats.map(retreat => (
            <div key={retreat.id} className="bg-white rounded-lg shadow p-4">
              <img src='https://media.istockphoto.com/id/1074959548/photo/beautiful-attractive-asian-woman-practice-yoga-lotus-pose-on-the-pool-above-the-mountain-peak.jpg?s=612x612&w=0&k=20&c=BkoQJJ_GyeXMPXnahQWtnhObFCVxWCuenUznnU3emAI=' alt="Yoga Retreat" className="w-full h-auto mb-4 rounded-md" />
              <h2 className="text-xl font-semibold mb-2">{retreat.name}</h2>
              <p>Date: {retreat.date}</p>
              <p>ancillary_activity: {retreat.ancillary_activity}</p>
              <p>Meal: {retreat.meal}</p>
              <p>Price: {retreat.price}</p>
              <div className="text-right mt-2">
                <button onClick={() => handleDeleteYogaRetreat(retreat.id)} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={() => openUpdatePopup(retreat)} className="text-blue-500 hover:text-blue-700">Update</button>
              </div>
            </div>
          ))}
         
          <div className="fixed bottom-8 right-8">
            <button onClick={() => { setShowPopup(true); setSelectedRetreat(null); setNewRetreat({ name: "", date: "", ancillary_activity: "", meal: "", price: "" }); }} className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add 
            </button>
          </div>

        </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{selectedRetreat ? "Update" : "Add New"} Yoga Retreat</h2>
            <input type="text" placeholder="Name of the yoga retreat" className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full" value={newRetreat.name} onChange={(e) => setNewRetreat({ ...newRetreat, name: e.target.value })} />
            <input type="date" placeholder="Date" className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full" value={newRetreat.date} onChange={(e) => setNewRetreat({ ...newRetreat, date: e.target.value })} />
            <textarea placeholder="ancillary_activity" className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full" value={newRetreat.ancillary_activity} onChange={(e) => setNewRetreat({ ...newRetreat, ancillary_activity: e.target.value })}></textarea>
            <textarea placeholder="meal" className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full" value={newRetreat.meal} onChange={(e) => setNewRetreat({ ...newRetreat, meal: e.target.value })}></textarea>
            <textarea placeholder="price" className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full" value={newRetreat.price} onChange={(e) => setNewRetreat({ ...newRetreat, price: e.target.value })}></textarea>
            <button onClick={selectedRetreat ? handleUpdateYogaRetreat : handleAddYogaRetreat} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">{selectedRetreat ? "Update" : "Add"} Retreat</button>
            <button onClick={() => { setShowPopup(false); setSelectedRetreat(null); setNewRetreat({ name: "", date: "", ancillary_activity: "", meal: "", price: "" }); }} className="bg-gray-300 text-gray-800 ml-2 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
