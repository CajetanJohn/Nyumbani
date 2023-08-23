import React, { useState, useEffect } from 'react';

const Step3 = ({ onSubmit, onPrev, formData }) => {
  const [amenitiesSuggestions, setAmenitiesSuggestions] = useState([
    'wifi', 'pets', 'water', 'pool', 'socials', // Add more amenities...
  ]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [contactPlatformSuggestions, setContactPlatformSuggestions] = useState([
    'WhatsApp', 'Instagram', 'Facebook', // Add more contact platforms...
  ]);
  const [selectedContacts, setSelectedContacts] = useState({});
  const [contactPlatformDetail, setContactPlatformDetail] = useState('');

  const [pricing, setPricing] = useState({
    price: '',
    rentDueDate: '',
    fineIfRentExceeded: '',
  });

  const [rentFine, setRentFine] = useState(false);
  const [agency, setAgency] = useState(false);
  const [agencyDetails, setAgencyDetails] = useState('');

  const [rulesText, setRulesText] = useState('');
  const [decodedRules, setDecodedRules] = useState([]);

  const [houseCategorySuggestions, setHouseCategorySuggestions] = useState([
    'Single Room', 'Bedsitter', 'Two Rooms', 'One Bedroom', // Add more house categories...
  ]);
  const [houseCategory, setHouseCategory] = useState('');

  useEffect(() => {
    if (rulesText) {
      const rules = rulesText.split('\n').map(rule => rule.trim());
      setDecodedRules(rules.filter(rule => rule.startsWith('#')));
    }
  }, [rulesText]);

  const handleAmenitiesChange = (event) => {
    const amenity = event.target.value;
    if (amenity && amenitiesSuggestions.includes(amenity)) {
      setSelectedAmenities([...selectedAmenities, amenity]);
      setAmenitiesSuggestions(amenitiesSuggestions.filter(item => item !== amenity));
      event.target.value = '';
    }
  };

  const handleRemoveAmenity = (amenity) => {
    setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
    setAmenitiesSuggestions([...amenitiesSuggestions, amenity]);
  };

  
  const selectContactPlartform = (event) => {
    const platform = event.target.value
    setContactPlatformDetail('');
    if (platform && contactPlatformSuggestions.includes(platform)) {
      setSelectedContacts({...selectedContacts, [platform]: contactPlatformDetail,
      });
      setContactPlatformSuggestions(contactPlatformSuggestions.filter(item => item !== platform));
      setContactPlatformDetail('');
    }
  };

  const handleRemoveContactPlatform = (platform) => {
    const updatedContacts = { ...selectedContacts };
    delete updatedContacts[platform];
    setSelectedContacts(updatedContacts);
    setContactPlatformSuggestions([...contactPlatformSuggestions, platform]);
  };

  const handleContactPlatformDetailChange = (event) => {
    setContactPlatformDetail(event.target.value);
  };

  
  const handleSubmit = () => {
    const parsedRules = decodedRules.map(rule => rule.slice(1)); // Remove '#'
    const updatedInformation = {
      amenities: selectedAmenities,
      rules: parsedRules,
      pricing,
      details: {
        agency: agency ? 'ABC Rentals' : '',
        contact: selectedContacts,
        agencyLink: 'https://www.abcrentals.com',
      },
    };
    if (agency) {
      updatedInformation.details.agencyDetails = agencyDetails;
    }
    onSubmit(updatedInformation);
  };

  useEffect(() => {
    if (!rulesText || rulesText.endsWith('\n')) {
      setRulesText(prevText => prevText + '# '); // Append '#' when going to next line
    }
  }, [rulesText]);

  return (
    <div className="form-step">
      <h2>Step 3: Information</h2>
      
      <div className="amenities">
        <h3>Amenities</h3>
        <input type="text" onChange={handleAmenitiesChange} placeholder="Add Amenities" list="amenities-suggestions"/>
        <datalist id="amenities-suggestions">
          {amenitiesSuggestions.map((amenity, index) => (
            <option key={index} value={amenity} />
          ))}
        </datalist>
        <div className="amenities-list">
          {selectedAmenities.map((amenity, index) => (
            <span key={index}>
              {amenity} <button onClick={() => handleRemoveAmenity(amenity)}>Remove</button>
            </span>
          ))}
        </div>
      </div>
      
      
      <div className="contact">
        <h3>Contact</h3>
        <input type="text" onChange={selectContactPlartform} list="contact-suggestions" placeholder="Select Contact Platform"/>
        <datalist id="contact-suggestions">
          {contactPlatformSuggestions.map((platform, index) => (
            <option key={index} value={platform} />
          ))}
        </datalist>
        
          <div className="selected-contacts">
            {Object.keys(selectedContacts).map((platform, index) => (
              <div key={index} className="contact-platform">
                {platform}
                <button onClick={() => handleRemoveContactPlatform(platform)}>Remove</button>
                <input type="text" value={selectedContacts[platform]} onChange={(e) => setSelectedContacts({ ...selectedContacts, [platform]: e.target.value })}placeholder={`enter ${platform} details`} />
              </div>
            ))}
          </div>
      </div>
      
      <div className="pricing">
        <h3>Pricing</h3>
        <div>
          <label>Price:</label>
          <input type="number" value={pricing.price} onChange={(e) => setPricing({ ...pricing, price: e.target.value })} />
        </div>
        <div>
          <label>Rent Due Date:</label>
          <input type="text" value={pricing.rentDueDate} onChange={(e) => setPricing({ ...pricing, rentDueDate: e.target.value })} />
        </div>
        <div>
          <label> <input type="checkbox" checked={rentFine} onChange={() => setRentFine(!rentFine)} /> Rent Fine </label>
        </div>
        {rentFine && (
         <div>
          <label>Fine if Rent Exceeded:</label>
          <input type="number" value={pricing.fineIfRentExceeded} onChange={(e) => setPricing({ ...pricing, fineIfRentExceeded: e.target.value })} />
         </div> )}
      </div>
      
      <div className="agency">
        <h3>Agency</h3>
        <div>
          <label>
          <input type="checkbox" checked={agency} onChange={() => setAgency(!agency)} />ABC Rentals </label>
        </div>
        {agency && ( 
          <div>
            <input type="text" value={agencyDetails} onChange={(e) => setAgencyDetails(e.target.value)} placeholder="Agency Details"/>
          </div> )}
      </div>
      
      
      <div className="rules">
        <h3>Rules</h3>
        <div>
          <label></label>
          <textarea rows="4" value={rulesText} onChange={(e) => setRulesText(e.target.value)}></textarea>
        </div>
      </div>
      
      <div className="house-category">
        <h3>House Category</h3>
        <div>
          <label></label>
          <input type="text" value={houseCategory} onChange={(e) => setHouseCategory(e.target.value)} list="house-suggestions" />
          <datalist id="house-suggestions"> {houseCategorySuggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
          </datalist>
        </div>
      </div>
      
      <div className="step-buttons">
        <button onClick={onPrev}>Previous</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
    
  );
};

export default Step3;
