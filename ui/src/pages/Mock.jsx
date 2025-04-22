import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MockSideNav from '../components/MockSideNav';
import MockCreate from '../components/MockCreate';
import RequestResponse from '../components/RequestResponse';
import { getCollectionsMocks } from '../services/collectionService';

const Mock = () => {
  const [expanded, setExpanded] = useState(null);
  const [selectedMock, setSelectedMock] = useState(null);
  const [view, setView] = useState(''); // "create", "request-response", or "collection"
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCollectionsMocks();
        setCollections(data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };
    fetchData();
  }, []);

  const renderRightPanel = () => {
    switch (view) {
      case 'create':
        return <MockCreate  collections={collections} selectedMock={selectedMock} />;
      case 'request-response':
        return <RequestResponse />;
      default:
        return <MockCreate collections={collections} selectedMock={selectedMock} />;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white flex p-6">
        <MockSideNav
          expanded={expanded}
          setExpanded={setExpanded}
          selectedMock={selectedMock}
          setSelectedMock={setSelectedMock}
          setView={setView}
          collections={collections}
        />
        <div className="w-3/4 pl-4">{renderRightPanel()}</div>
      </div>
      <Footer />
    </>
  );
};

export default Mock;
