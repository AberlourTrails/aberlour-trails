// map.setView([57.4709, -3.2206], 15.1750);

const LOCATIONS = [
    {
        name: 'Fleming Hospital',
        coordinates: [57.46895, -3.22308],
    },
    {
        name: 'Dunleigh',
        coordinates: [57.46988, -3.22396],
    },
    {
        name: 'Walker\'s Shop',
        coordinates: [57.47036, -3.22574],
    },
    {
        name: 'Gasworks',
        coordinates: [57.47214, -3.22113],
    },
    {
        name: 'St Margaret\'s Episcopal Church',
        coordinates: [57.47416, -3.21790],
    },
    {
        name: 'Fisherton',
        coordinates: [57.47517, -3.21263],
    },
];

const MARKERS = LOCATIONS.map((location, i) => {
    const marker = L.marker(location.coordinates, {icon: numberedIcon(i + 1)});
    marker.addTo(map);
    return marker;
});

map.fitBounds((new L.featureGroup(MARKERS)).getBounds().pad(0.5));
