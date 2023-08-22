import { useState, useEffect } from 'react';
import './Style.css';
import './Loading.css';

export const FeedInfo = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/api/info/`);
        const jsonData = await response.json();
        setData(jsonData[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div feed={loading && 'loading'} className='feed-information'>
      <div className='feed-info-details'>
        {!loading && (
          <>
            <div className='amenities'>
              <h3>Amenities:</h3>
              <ul>
                {Object.keys(data.information.amenities).map(amenity => (
                  <li key={amenity}>{amenity}: {data.information.amenities[amenity] ? 'Yes' : 'No'}</li>
                ))}
              </ul>
            </div>
            <div className='details'>
              <h3>Details:</h3>
              <span>Agency: {data.information.details.agency}</span>
              <span>Contact Email: {data.information.details.contact.email}</span>
              <span>Contact Phone: {data.information.details.contact.phone}</span>
              <span>Agency Link: <a href={data.information.details.agencyLink} target='_blank' rel='noopener noreferrer'>{data.information.details.agencyLink}</a></span>
              <span>House Category: {data.information.details.houseCategory}</span>
              <span>Vacant: {data.information.details.vacant ? 'Yes' : 'No'}</span>
              <span>Number of Houses Vacant: {data.information.details.numberOfHousesVacant}</span>
            </div>
            <div className='rules'>
              <h3>Rules:</h3>
              <ul>
                {data.information.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
