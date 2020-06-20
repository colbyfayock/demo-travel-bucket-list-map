import React from 'react';
import { Helmet } from 'react-helmet';
import { Marker, Popup } from 'react-leaflet';

import { useDestinations } from 'hooks';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

const LOCATION = {
  lat: 38.9072,
  lng: -77.0369,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {
  const { destinations } = useDestinations();

  console.log( 'destinations', destinations );

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   */

  async function mapEffect({ leafletElement } = {}) {
    if ( !leafletElement ) return;
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'Mapbox',
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}>
        { destinations.map(( destination ) => {
          const { id, name, location } = destination;
          return (
            <Marker key={id} position={[location.latitude, location.longitude]}>
              <Popup>{ name }</Popup>
            </Marker>
          );
        }) }
      </Map>

      <Container type="content" className="text-center home-destinations">
        <h2>Destinations</h2>
        <ul>
          { destinations.map(( destination ) => {
            const { id, name } = destination;
            return <li key={id}>{ name }</li>;
          }) }
        </ul>
      </Container>

      <Container type="content-full" className="text-center home-start">
        <h2>Want to create your own mapping app?</h2>
        <p>Run the following in your terminal!</p>
        <pre>
          <code>gatsby new [directory] https://github.com/colbyfayock/gatsby-starter-leaflet</code>
        </pre>
        <p className="note">Note: Gatsby CLI required globally for the above command</p>
      </Container>
    </Layout>
  );
};

export default IndexPage;
