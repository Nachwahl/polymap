const connection = require('../../mysql').getConnection();

export default (req, res) => {
    let resultKML = "";
    connection.query("SELECT * FROM `regions`", function (error, results, fields) {
        if (!error) {
            if(results.length === 0) {
                res.status(404).send("error: " + error)
                return ;
            }
            resultKML += "<?xml version=\"1.0\" encoding=\"UTF-8\"?> <kml xmlns=\"http://www.opengis.net/kml/2.2\" xmlns:gx=\"http://www.google.com/kml/ext/2.2\" xmlns:kml=\"http://www.opengis.net/kml/2.2\" xmlns:atom=\"http://www.w3.org/2005/Atom\"> <Document>";
            results.map((p) => {
                resultKML += `<Placemark><name>${p.city} - ${p.username}</name><Polygon><tessellate>1</tessellate><outerBoundaryIs><LinearRing><coordinates>`;
                JSON.parse(p.data).map((c) => {
                    resultKML += `${c[1]},${c[0]},0 `;
                })
                resultKML += "</coordinates></LinearRing></outerBoundaryIs></Polygon></Placemark>";
            });
            resultKML += `</Document></kml>`;
            res.send(resultKML);
        } else {
            res.send("error: " + error)
        }


    })
}
