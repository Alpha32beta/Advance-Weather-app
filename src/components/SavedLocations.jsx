// src/components/SavedLocations.jsx
const SavedLocations = ({ locations, onSelectLocation, onDeleteLocation }) => {
  return (
    <div className="w-full mb-6">
      <h2 className="text-lg dm-sans-semibold mb-3 text-gray-300">Your Saved Locations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-transparent-bg border border-transparent-bg-hover rounded-lg p-4 flex items-center justify-between hover:bg-transparent-bg-hover transition-colors cursor-pointer"
            onClick={() =>
              onSelectLocation(
                location.latitude,
                location.longitude,
                location.city_name,
                location.country
              )
            }
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-lightblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="dm-sans-semibold text-white">{location.city_name}</p>
                <p className="dm-sans-regular text-sm text-gray-400">{location.country}</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteLocation(location.id);
              }}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedLocations;