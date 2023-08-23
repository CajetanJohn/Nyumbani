import React, { Component } from 'react';
import axios from 'axios';

class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      formData: {
        name: '',
        location: {
          latitude: '',
          longitude: '',
          residence: '',
        },
      },
      currentImage: { Image: '', links: {} },
      images: [],
      amenitiesSuggestions: [
        'wifi',
        'pets',
        'water',
        'pool',
        'socials',
        // Add more amenities...
      ],
      selectedAmenities: [],
      contactPlatformSuggestions: [
        'WhatsApp',
        'Instagram',
        'Facebook',
        // Add more contact platforms...
      ],
      selectedContacts: {},
      contactPlatformDetail: '',
      pricing: {
        price: '',
        rentDueDate: '',
        fineIfRentExceeded: '',
      },
      rentFine: false,
      agency: false,
      agencyDetails: '',
      rulesText: '',
      decodedRules: [],
      houseCategory: '',
      houseCategorySuggestions: [
        'Single Room',
        'Bedsitter',
        'Two Rooms',
        'One Bedroom',
        // Add more house categories...
      ],
    };
  }

  handleInputChange = (field, value) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [field]: value,
      },
    }));
  };

  handleLocationChange = (field, value) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        location: {
          ...prevState.formData.location,
          [field]: value,
        },
      },
    }));
  };

  handleImageChange = event => {
    const image = event.target.files[0];
    this.setState(prevState => ({ currentImage: { Image: image, links: {}, }, }));
    };
  
  handleAddLink = () => {
    const { links } = this.state.currentImage;
    const linkCount = Object.keys(links).length;
    if (linkCount < 5) {
      this.setState(prevState => ({
        currentImage: { ...prevState.currentImage, links: { ...prevState.currentImage.links, [`link${linkCount + 1}`]: '', }, }, }));
    } 
  };

  handleLinkChange = (key, value) => {
    this.setState(prevState => ({
      currentImage: {
        ...prevState.currentImage,
        links: {
          ...prevState.currentImage.links,
          [key]: value,
        },
      },
    }));
  };

  handleRemoveLink = key => {
    const { [key]: _, ...remainingLinks } = this.state.currentImage.links; this.setState(prevState => ({ currentImage: { ...prevState.currentImage, links: remainingLinks, }, })); }; 

  handleUploadImage = () => {
    const { currentImage } = this.state;
    if (currentImage.Image) {
      this.setState(prevState => ({
        images: [...prevState.images, currentImage],
        currentImage: { Image: '', links: {} },
      }));
    }
  };

  handleRemoveImage = index => {
    const updatedImages = this.state.images.filter((_, i) => i !== index);
    this.setState({
      images: updatedImages,
    });
  };

  handleAmenitiesChange = event => {
    const amenity = event.target.value;
    if (amenity && this.state.amenitiesSuggestions.includes(amenity)) {
      this.setState(prevState => ({
        selectedAmenities: [...prevState.selectedAmenities, amenity],
        amenitiesSuggestions: prevState.amenitiesSuggestions.filter(
          item => item !== amenity
        ),
      }));
      event.target.value = '';
    }
  };

  handleRemoveAmenity = amenity => {
    this.setState(prevState => ({
      selectedAmenities: prevState.selectedAmenities.filter(
        item => item !== amenity
      ),
      amenitiesSuggestions: [...prevState.amenitiesSuggestions, amenity],
    }));
  };

  selectContactPlatform = event => {
    const platform = event.target.value; this.setState({ contactPlatformDetail: '', }); if (platform && this.state.contactPlatformSuggestions.includes(platform)) { this.setState(prevState => ({ selectedContacts: { ...prevState.selectedContacts, [platform]: '', }, contactPlatformSuggestions: prevState.contactPlatformSuggestions.filter( item => item !== platform ), contactPlatformDetail: '', })); } }; 
    
  handleRulesTextChange = event => {
  this.setState({
    rulesText: event.target.value,
  });
};

  handleRemoveContactPlatform = platform => {
    const updatedContacts = { ...this.state.selectedContacts };
    delete updatedContacts[platform];
    this.setState(prevState => ({
      selectedContacts: updatedContacts,
      contactPlatformSuggestions: [
        ...prevState.contactPlatformSuggestions,
        platform,
      ],
    }));
  };

  handleContactPlatformDetailChange = (platform, value) => {
    this.setState(prevState => ({ selectedContacts: { ...prevState.selectedContacts, [platform]: value, }, })); };
    
  handlePricingChange = (field, value) => {
    this.setState(prevState => ({
      pricing: {
        ...prevState.pricing,
        [field]: value,
      },
    }));
  };

  handleRentFineChange = () => {
    this.setState(prevState => ({
      rentFine: !prevState.rentFine,
    }));
  };

  handleAgencyChange = () => {
    this.setState(prevState => ({
      agency: !prevState.agency,
    }));
  };

  handleAgencyDetailsChange = value => {
    this.setState({
      agencyDetails: value,
    });
  };

  handleRulesTextChange = event => {
    const newText = event.target.value.replace(/^# /gm, ''); const formattedText = newText .split('\n') .map(line => `# ${line}`) .join('\n'); this.setState({ rulesText: formattedText, }); };
    
  handleHouseCategoryChange = value => {
    this.setState({
      houseCategory: value,
    });
  };

  handleNextStep = data => {
    const { step } = this.state;
    const isStepValid = this.validateStep(step);
    if (isStepValid) {
      this.setState({
        formData: { ...this.state.formData, ...data },
        step: step + 1,
      });
    }
  };

  handlePrevStep = () => {
    this.setState(prevState => ({
      step: prevState.step - 1,
    }));
  };

  validateStep = step => {
    const inputs = document.querySelectorAll(`.form-step.step${step} [data-needed='required']`);
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value) {
        isValid = true;
        input.classList.add('invalid-input');
      } else {
        input.classList.remove('invalid-input');
      }
    });

    return isValid;
  };

  handleSubmit = () => {
    const parsedRules = this.state.decodedRules.map(rule => rule.slice(1)); // Remove '#'
    const updatedInformation = {
      amenities: this.state.selectedAmenities,
      rules: parsedRules,
      pricing: this.state.pricing,
      details: {
        agency: this.state.agency ? 'ABC Rentals' : '',
        contact: this.state.selectedContacts,
        agencyLink: 'https://www.abcrentals.com',
      },
    };
    if (this.state.agency) {
      updatedInformation.details.agencyDetails = this.state.agencyDetails;
    }

    // Send data to API endpoint
    axios
      .post('API_ENDPOINT_URL', updatedInformation)
      .then(response => {
        alert('Form submitted successfully!');
        console.log(response.data);
      })
      .catch(error => {
        alert('An error occurred while submitting the form.');
        console.error(error);
      });
  };

  componentDidMount() {
    this.setState({
      rulesText: '# ',
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.rulesText !== this.state.rulesText) {
      const rules = this.state.rulesText.split('\n').map(rule => rule.trim());
      const decodedRules = rules.filter(rule => rule.startsWith('#'));
      this.setState({
        decodedRules,
      });
    }
  }

  render() {
  const { step, formData, currentImage, images, amenitiesSuggestions, selectedAmenities,  contactPlatformSuggestions, selectedContacts, pricing, rentFine, agency, agencyDetails, rulesText, houseCategory, houseCategorySuggestions } = this.state;

  return (
    <div className="create-form-container">
      {step === 1 && (
        <div className="form-step step1">
          <h3>Rental Information</h3>
          <input data-needed="required" type="text" placeholder="Name" value={formData.name} onChange={(e) => this.handleInputChange('name', e.target.value)} />
          <input data-needed="required" type="text" placeholder="Latitude" value={formData.location.latitude} onChange={(e) => this.handleLocationChange('latitude', e.target.value)} />
          <input data-needed="required" type="text" placeholder="Longitude" value={formData.location.longitude} onChange={(e) => this.handleLocationChange('longitude', e.target.value)} />
          <input data-needed="required" type="text" placeholder="Residence" value={formData.location.residence} onChange={(e) => this.handleLocationChange('residence', e.target.value)} />
          <button onClick={() => this.handleNextStep(1)}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="form-step step2">
          <h2>Upload images of the rental</h2>
          <div className="image-upload">
            <input data-needed="required" hidden id='image-upload' type="file" accept="image/*" onChange={this.handleImageChange} />
            <label className='input-label' htmlFor='image-upload'>Click to upload an image</label>
            <button className='upload-button' onClick={this.handleUploadImage}>Upload Image</button>
          </div>
          {currentImage.Image && (
            <div className="image-data">
              <img src={URL.createObjectURL(currentImage.Image)} alt="Uploaded" />
              <div className="link-inputs">
                {Object.entries(currentImage.links).map(([key, value], index) => (
                  <div key={key}>
                    <input data-needed="required" type="text" placeholder={`Link ${index + 1}`} value={value} onChange={(e) => this.handleLinkChange(key, e.target.value)} />
                    <button onClick={() => this.handleRemoveLink(key)}>Remove</button>
                  </div>
                ))}
                <button className='image-link' onClick={this.handleAddLink}>Add Link</button>
              </div>
            </div>
          )}
          <div className="uploaded-images">
            {images.length > 0 && (
              <>
                <h3>Uploaded Images: {images.length}</h3>
                {images.map((image, index) => (
                  <div key={index} className="uploaded-image">
                    <img src={URL.createObjectURL(image.Image)} alt={`Image ${index + 1}`} />
                    {Object.entries(image.links).map(([key, value], linkIndex) => (
                      <p key={key}>Link {linkIndex + 1}: {value}</p>
                    ))}
                    <p>Date: {image.Date}</p>
                    <p>srcUser: {image.srcUser}</p>
                    <button onClick={() => this.handleRemoveImage(index)}>Remove</button>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="step-buttons">
            <button onClick={this.handlePrevStep}>Previous</button>
            <button onClick={() => this.handleNextStep(2)}>Next</button>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="form-step step3">
          <h2>Step 3: Information</h2>
          <div className="amenities">
            <h3>Amenities</h3>
            <input type="text" onChange={this.handleAmenitiesChange} placeholder="Add Amenities" list="amenities-suggestions" data-needed="required" />
            <datalist id="amenities-suggestions">
            {amenitiesSuggestions.map((amenity, index) => (
            <option key={index} value={amenity} />))}
            </datalist>
            <div className="amenities-list">
              {selectedAmenities.map((amenity, index) => (<span key={index}> {amenity} 
              <button onClick={() => this.handleRemoveAmenity(amenity)}> Remove </button>
              </span> ))}
            </div>
          </div>
          
          <div className="contact">
            <h3>Contact</h3>
            <input type="text" onChange={this.selectContactPlatform} list="contact-suggestions" placeholder="Select Contact Platform" data-needed="required" />
            <datalist id="contact-suggestions">
              {contactPlatformSuggestions.map((platform, index) => ( <option key={index} value={platform} /> ))}
            </datalist>
            <div className="selected-contacts">
            {Object.keys(selectedContacts).map((platform, index) => (
              <div key={index} className="contact-platform">
              {platform}
                <button onClick={() => this.handleRemoveContactPlatform(platform)}> Remove </button>
                <input type="text" value={selectedContacts[platform]} onChange={(e) =>
                this.handleContactPlatformDetailChange(platform, e.target.value)} placeholder={`Enter ${platform} details`} data-needed="required"/>
              </div> ))}
            </div>
          </div>
          
          <div className="pricing">
            <h3>Pricing</h3>
            <div>
              <label>Price:</label>
              <input type="number" value={pricing.price} onChange={(e) =>this.handlePricingChange("price", e.target.value) } data-needed="required" />
            </div>
            
            <div>
              <label>Rent Due Date:</label>
              <input type="text" value={pricing.rentDueDate} onChange={(e) => this.handlePricingChange("rentDueDate", e.target.value) } data-needed="required" />
            </div>
            
            <div>
              <label>
                <input type="checkbox" checked={rentFine} onChange={this.handleRentFineChange} /> Rent Fine </label>
            </div>
            {rentFine && (
              <div>
                <label>Fine if Rent Exceeded:</label>
                <input type="number" value={pricing.fineIfRentExceeded} onChange={(e) => this.handlePricingChange("fineIfRentExceeded", e.target.value)} data-needed="required" />
              </div>
            )}
          </div>
          
          
          <div className="agency">
            <h3>Agency</h3>
            <div>
              <label> <input type="checkbox" checked={agency} onChange={this.handleAgencyChange} /> ABC Rentals
              </label>
            </div>
            {agency && (
              <div>
                <input type="text" value={agencyDetails} onChange={(e) => this.handleInputChange("agencyDetails", e.target.value)} placeholder="Agency Details" data-needed="required"/>
              </div>
            )}
        </div>
        
        <div className="rules">
          <h3>Rules</h3>
          <div>
            <label>Rules:</label>
            <textarea rows="4" value={rulesText} onChange={this.handleRulesTextChange} data-needed="required"></textarea>
          </div>
        </div>
        
        <div className="house-category">
          <h3>House Category</h3>
          <div>
            <label>House Category:</label>
            <input type="text" value={houseCategory}
            onChange={(e) =>this.handleInputChange("houseCategory", e.target.value)}list="house-suggestions"data-needed="required" />
            <datalist id="house-suggestions"> {houseCategorySuggestions.map((suggestion, index) => ( <option key={index} value={suggestion} />))}
            </datalist>
          </div>
        </div>
        
        <div className="step-buttons">
          <button onClick={this.handlePrevStep}>Previous</button>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>)}

    </div>
  );
}

}

export default CreateForm;
