const API_KEY = 'tVdQN1hjTXGNnKm3AwJPfQ';

const numberedIcon = (number) => L.divIcon({
    className: 'map-icon',
    iconSize: null,

    html: number,
});

var map = L.Nextzen.map(
    'map',
    {
        apiKey: API_KEY,
        attribution: '<a href="https://github.com/tangrams" target="_blank">Tangram</a> | <a href="http://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a> | <a href="https://www.nextzen.org/" target="_blank">Nextzen</a>',
        tangramOptions: {
            scene: {
                import: [
                    'https://www.nextzen.org/carto/refill-style/11/refill-style.zip',
                    'https://www.nextzen.org/carto/bubble-wrap-style/10/themes/label-10.zip',
                ],
                sources: {
                    mapzen: {
                        url: 'https://tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt',
                        url_subdomains: ['a', 'b', 'c', 'd'],
                        url_params: {
                            api_key: API_KEY,
                        },
                        tile_size: 512,
                        max_zoom: 16,
                    },
                },
            },
        },
    },
);

// L.Nextzen.hash({map: map});
