import React, { useEffect, useState } from 'react';
import { getCollections } from '../services/api';

const Collection = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await getCollections();
      setCollections(data);
    };
    fetchCollections();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Collections</h2>
      <ul className="mt-4">
        {collections.map((collection) => (
          <li key={collection.id} className="border-b py-2">
            {collection.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collection;
