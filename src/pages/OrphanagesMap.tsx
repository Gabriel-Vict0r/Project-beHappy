import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mapMarkerImg from '../images/map-marker.svg'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import '../styles/pages/orphanages-map.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet, { popup } from 'leaflet'


import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import { NumericLiteral } from 'typescript';
import Orphanage from './Orphanage';

interface Orphanage { 
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}
function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    console.log(orphanages)

    useEffect(() => { 
        api.get('orphanages').then(response => {
            setOrphanages(response.data)
        })
     }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita:)</p>
                </header>

                <footer>
                    <strong>Barreiras</strong>
                    <span>Bahia</span>
                </footer>
            </aside>
            <Map
                center={[-12.14455, -44.9906726]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orphanages.map(orphanages => { 
                    return (
                        <Marker
                    key={orphanages.id}
                    icon={mapIcon}
                    position={[orphanages.latitude, orphanages.longitude]}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        {orphanages.name}
                        <Link to={`/orphanages/${orphanages.id}`}>
                            <FiArrowRight size={20} color="#FFF" />
                        </Link>
                    </Popup>
                </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>

        </div>
    )
}
export default OrphanagesMap;