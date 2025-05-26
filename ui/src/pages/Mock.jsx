import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MockSideNav from '../components/MockSideNav';
import MockCreate from '../components/MockCreate';
import RequestResponse from '../components/RequestResponse';
import { getCollectionsMocks, renameCollection, deleteCollection } from '../services/collectionService';

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

  const fetchCollections = async () => {
    try {
      const data = await getCollectionsMocks();
      setCollections(data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const renderRightPanel = () => {
    switch (view) {
      case 'create':
        return <MockCreate collections={collections} selectedMock={selectedMock}
          refreshCollections={fetchCollections}
          setExpanded={setExpanded} />;
      case 'request-response':
        return <RequestResponse />;
      default:
        return <MockCreate collections={collections} selectedMock={selectedMock}
          refreshCollections={fetchCollections}
          setExpanded={setExpanded} />;
    }
  };
  const handleRenameCollection = async (index, newName) => {
    try {
      const collection = collections[index];
      if (!collection) return;

      await renameCollection(collection.id, newName);
      await fetchCollections(); // Refresh after successful rename
    } catch (error) {
      console.error('Error renaming collection:', error);
    }
  };
  const handleDeleteCollection = async (index) => {
    try {
      const collection = collections[index];
      if (!collection) return;

      await deleteCollection(collection.id);  
      await fetchCollections();                
    } catch (error) {
      console.error('Error deleting collection:', error);
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
          onRenameCollection={handleRenameCollection}
          refreshCollections={fetchCollections}
          onDeleteCollection={handleDeleteCollection}
        />
        <div className="w-3/4 pl-4">{renderRightPanel()}</div>
      </div>
      <Footer />
    </>
  );
};

export default Mock;
