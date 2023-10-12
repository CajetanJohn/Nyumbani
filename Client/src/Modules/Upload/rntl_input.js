import React,{useState, useRef,useEffect, useCallback} from 'react';
import './Form.css';
import ImageUpload from './ImageUpload'

export function ContactPlatform({name, type, label, disabled, value, required, validity, onChange, options}) {
  const [inputValue, setInputValue] = useState('');
  const [valid, setValidity] = useState(validity);
  const [suggestions, setSuggestions] = useState(options);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  useEffect(() => {
    if(valid.isValid){
    onChange(name, selectedSuggestions);}
  }, [name, selectedSuggestions, inputValue, valid, onChange]);

  useEffect(() => {
    setSuggestions(options);
  }, [options]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (suggestions.includes(value)) {
      const updatedSuggestions = suggestions.filter((suggestion) => suggestion !== value);
      setSuggestions(updatedSuggestions);

      const newContactPlatform = {
        contactPlartform: value,
        contactDetails: '', // Initialize an empty text field
      };

      setSelectedSuggestions([...selectedSuggestions, newContactPlatform]);

      setInputValue('');
    }
  };

  const handleRemoveSelected = (selected) => {
    const updatedSelected = selectedSuggestions.filter((item) => item !== selected);
    setSuggestions([...suggestions, selected.contactPlartform]); // Add the removed suggestion back to the list
    setSelectedSuggestions(updatedSelected);
  };

  const handleTextChange = (name, value, index) => {
    const updatedSelected = [...selectedSuggestions];
    updatedSelected[index].contactDetails = value;
    setSelectedSuggestions(updatedSelected);
  };
  
  const Contacttype = (contact)=>{
    switch(contact){
      case 'Whatsapp', 'Phone': return 'number'; break;
      case 'Website', 'Instagram' , 'Facebook', 'Twitter', 'Linkedin', 'Tiktok': return 'url'; break;
      default: return 'number'; break;
    }
  }

  return (
    <div className='optional-inputs'>
      <div className={`form-input-container with-options ${!valid.isValid && 'invalid'}`}>
        <input name={name} type="text" data_required={required || false} disabled={disabled|| false} value={inputValue} onChange={handleInputChange} list="suggestions"/>
        <label>{label}: {!valid.isValid && valid.message}</label>
        <datalist id="suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
        </datalist>
      </div>
      {selectedSuggestions.length !==0 && (
        <div className='options'>
          <ul>
            {selectedSuggestions.map((selected, index) => (
              <li key={index}>
                <FormInput name='rentalName' label={selected.contactPlartform} type={() =>{Contacttype(selected.contactPlartform)}} value={selected.contactDetails} onChange={(name, value)=>{handleTextChange(name, value, index)}} validity = {{isValid: false, message:''}}/>
                <button type='button' onClick={() => handleRemoveSelected(selected)}>Remove</button>
            </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function AutoInput({name, type, label, disabled, value, required, validity, onChange, options}){
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState(options);
  const [valid, setValidity] = useState(validity);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  
  useEffect(()=>{
    if(valid.isValid){
    onChange(name, selectedSuggestions)}
  },[name, selectedSuggestions, inputValue, valid, onChange])
  
  useEffect(()=>{
    setSuggestions(options)
  },[options])
  
  useEffect(()=>{
    setValidity(validity)
  },[validity])

  const handleInputChange = async (e) => {
    const value = e.target.value;
    await setInputValue(value);
    await setValidity(Validate(name, type, required, e.target.value));
    if (suggestions.includes(value)) {
      const updatedSuggestions = suggestions.filter((suggestion) => suggestion !== value);
      await setSuggestions(updatedSuggestions);

      await setSelectedSuggestions([...selectedSuggestions, value]);
      setInputValue('');
    }
  };

  const handleRemoveSelected = (selected) => {
    const updatedSelected = selectedSuggestions.filter((item) => item !== selected);
    setSelectedSuggestions(updatedSelected);
    setSuggestions([...suggestions, selected]);
  };

  return (
    <div className="optional-inputs">
      <div className={`form-input-container with-options${!valid.isValid && 'invalid'}`}>
        <input type={type} name={name} value={inputValue} onChange={handleInputChange} list="suggestions"/>
        <label>{label}: {!valid.isValid && valid.message}</label>
        <datalist id="suggestions">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
      </div>
      {selectedSuggestions.length !== 0 && (
        <div className="options">
          <ul>
            {selectedSuggestions.map((selected, index) => (
              <li key={index}>
                {selected}
                <button className="selection-remove-button" type="button" onClick={() => handleRemoveSelected(selected)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function TextareaRulesInput({name, type, label, disabled, value, required, validity, onChange}){
  const maxCharacters = 100;
  const [text, setText] = useState('# ');
  const [rules, setRules] = useState([]);
  const [characterCount, setCharacterCount] = useState(maxCharacters);
  const textareaRef = useRef(null);
  const [valid, setValidity] = useState(validity);
  
  useEffect(()=>{
    if(valid.isValid){
      onChange(name, rules);
    }
  },[name, rules, valid, onChange])
  
  useEffect(()=>{
    setValidity(validity)
  },[validity])
  
  const handleTextareaChange = async (e) => {
    const inputValue = e.target.value;
    const remainingCharacters = maxCharacters - inputValue.length;
    
    if (inputValue.trim() === '') {
      setText('# ');
    } else {
      setText(inputValue);
    }

    const lines = inputValue.split('\n');
    const filteredRules = lines
      .filter((line) => line.trim() !== '' && line.trim().startsWith('#'))
      .map((rule) => rule.trim().substring(1));
    await setRules(filteredRules);
    await setCharacterCount(remainingCharacters);
    setValidity(Validate(name, type, required, e.target.value));
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setText(text + '\n# ');
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={`form-input-container textarea${!valid.isValid && 'invalid'}`}>
      <textarea ref={textareaRef} value={text} name={name} onChange={handleTextareaChange} type={type} onKeyDown={handleEnterPress} data_required={required || false} disabled={value !== '' && true || false} placeholder="# Start typing your rules here..." style={{ overflowY: 'hidden' }} maxLength={maxCharacters} />
      <label>{label}: {!valid.isValid && valid.message} {characterCount}/{maxCharacters} chr</label>
     {/* <div>
        <p>Derived Rules:</p>
        <ul>
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>*/}
    </div>
  );
}

export function FileUpload({name, type, label, disabled, value, required, validity, onChange}) {
  const [inputValue, setInputValue] = useState(null);
  const [error, setError] = useState(null);
  const [valid, setValidity] = useState(validity);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setValidity(Validate(name, type, required, file));

    if (!file) {
      setInputValue(null);
      setError('No file selected.');
      return;
    }

    const maxSizeInBytes = 1024 * 1024; // 1 MB
    if (file.size > maxSizeInBytes) {
      setInputValue(null);
      setError('File size exceeds the limit (1 MB).');
      return;
    }

    setInputValue(file);
    setError(null);
  };

  useEffect(()=>{
    if(valid.isValid){
    onChange(name, inputValue)}
  },[name, inputValue, valid, onChange])

  useEffect(()=>{
    setValidity(validity)
  },[validity])

  return (
    <div className={`form-input-container ${!valid.isValid && 'invalid'}`}>
      <label htmlFor='file-upload-input' className='file-upload'>{label}: {!valid.isValid && valid.message}</label>
      <input hidden id="file-upload-input" type="file" name={name} accept=".pdf,.doc,.docx" onChange={handleFileChange} data_required={required || false} disabled={disabled|| false}/>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export function OptionalInputs({ name, type, label, disabled, value, required, validity, onChange, options }) {
  
  const [InputData, setInputData] = useState({});
  const [valid, setValidity] = useState(validity);

  const handleChange = async (inputName, value) => {
    await setInputData((prevInputData) => ({
      ...prevInputData,
      [inputName]: type === 'checkbox' ? !prevInputData[inputName] : value,
    }));
    await setValidity(Validate(name, type, required, value));
  };

  useEffect(() => {
    if (valid.isValid) {
      onChange(name, InputData);
    }
  }, [name, InputData, valid]);

  useEffect(() => {
    setValidity(validity);
  }, [validity]);

  return (
    <div>
      <label>
        <input type="checkbox" name="Deadline" onChange={(e) => handleChange(e.target.name, e.target.checked)} />
        {label}
      </label>
      {InputData.Deadline&&(
      options.map((option) => (
        <div key={option}>
          <FormInput name={option} label={option} type={option === 'amount' ? 'number' : 'text'} value={InputData[option]} required onChange={handleChange} disabled={!InputData.Deadline} validity={{ isValid: false, message: '' }} />
        </div>
      )))}
    </div>
  );
}

export function FormInput({ name, type, label, disabled, value, required, validity, onChange }) {
  const [valid, setValidity] = useState(validity);
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const validation = Validate(name, type, required, newValue);
    setValidity(validation);
    onChange(name, newValue);
  };
  
  useEffect(()=>{
    setValidity(valid)
  }, [valid]);

  return (
    <div className={`form-input-container ${valid.message && 'invalid'}`}>
      <input disabled={disabled || false} name={name} type={type} value={inputValue} data-required={required || false} onChange={handleInputChange}/>
      <label>{label} {valid.message}</label>
    </div>
  );
}

export function Review({name, type, label, disabled, value, required, validity, onChange}) {
  const maxCharacters = 200;
  const [reviewData, setReviewData] = useState({
    review: '',
    rating: 0, // Add state for rating
    reviewerUsername: '', // Add state for userEmail
  });
  const isTextareaFull = reviewData.review.length >= maxCharacters;
  const [valid, setValidity] = useState(validity);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setReviewData({ ...reviewData, [name]: value });
    setValidity(Validate(name, type, required, e.target.value));
  };
  const handleNestedInputs = (name, value) =>{
    setReviewData({ ...reviewData, [name]: value });
  }

  useEffect(() => {
    if(valid.isValid){
    onChange(name, reviewData);}
  }, [name, reviewData, onChange]);
  
  useEffect(()=>{
    setValidity(validity)
  },[validity])

  return (
    <>
    <div className={`form-input-container textarea ${!valid.isValid && 'invalid'}`}>
      <textarea name="review" value={reviewData.review} onChange={handleChange} maxLength={maxCharacters} data_required={required || false} disabled={disabled|| false} className={isTextareaFull ? 'invalid' : ''}/>
      <label>{label}: {reviewData.review.length}/{maxCharacters}</label>
    </div>
    
    <FormInput name='rating' label='Rating (x.x/10)' type='number' value={reviewData.rating} required onChange={handleNestedInputs} validity = {{isValid: false, message:''}}/>
    <FormInput name='reviewerUsername' label='Username / email' type='text' value={reviewData.reviewerUsername} onChange={handleNestedInputs} required disabled={reviewData.reviewerUsername? true : false} validity = {{isValid: false, message:''}}/>
    </>
  );
}

function Validate(inputName, type, required, value) {
  const error = { isValid: true, message: '' };

  if (required && !value) {
    error.isValid = false;
    error.message = ': Required';
    return error;
  }

  if (value) {
    const validators = {
      email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      text: /^[A-Za-z\s]+$/,
      date: /^(\d{4}-\d{2}-\d{2})$/,
      number: /^\d+$/,
      url: /^(ftp|http|https):\/\/[^ "]+$/
    };

    const regex = validators[type];
    if (regex && !regex.test(value)) {
      error.isValid = false;
      error.message = `: Invalid ${type} format!`;
      return error;
    }
  }

  return error;
}

export function RentalForm() {
  const [formData, setFormData] = useState({
    rentalName:'',
    rentalPrice:'',
    rentalLocation:'',
    rentalRules:[],
    rentalAmenities:[],
    rentalCategory:'',
    rentalImages:[],
    rentalManagement:{},
    rentalContract:'',
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (inputName, value) => {
    setFormData({ ...formData, [inputName]: value });
  };
  
  const handleNextStep = (e) => {
    e.preventDefault();
    const currentStepInputs = document.querySelectorAll(`[data-step="${currentStep}"] [data-required=true]`);
    let valid = true;
    currentStepInputs.forEach(input => {
      if (!formData[input.name]) {valid = false;}
    })
    if (valid) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };
  
  const handlePrevStep = (e) => {
     e.preventDefault();
    setCurrentStep(currentStep - 1);
  }



  const renderStepInputs = (step) => {
    const step1Inputs = (
      <div data-step="1">
        <ContactPlatform name='contactDetails' label='Agent Contact details' options={['Whatsapp', 'Instagram', 'Phone', 'Facebook', 'Website']} onChange={handleChange} validity={{ isValid: true, message: '' }}/>
        <FileUpload name='tenantAgreementContract' label='Tenant Agreement' required onChange={handleChange} validity={{ isValid: true, message: '' }}/>
        <FormInput name='rentalName' label='Arp/Flat Name' type='text' value={formData.rnt_name} onChange={handleChange} message="" validity={{ isValid: false, message: '' }} required/>
      </div>
    );

    const step2Inputs = (
      <div data-step="2">
        <AutoInput name='rentalCategory' label='House Category' type='text' value={formData.rnt_type} options={['bedsitter', 'one bedroom']} onChange={handleChange} validity={{ isValid: true, message: '' }} />
        <FormInput name='rentalName' label='Arp/Flat Name' type='text' value={formData.rnt_name} onChange={handleChange} message="" validity={{ isValid: false, message: '' }}/>
        <FormInput name='rentalPricing' label='Rental pricing' type='number' value={formData.rnt_pricing || ''} onChange={handleChange} required validity={{ isValid: false, message: '' }}/>
      </div>
    );

    const step3Inputs = (
      <div data-step="3">
        <TextareaRulesInput name='rentalRules' type='text' label='House Rules' value={formData.rnt_rules || ''} onChange={handleChange} validity={{ isValid: true, message: '' }}/>
        <OptionalInputs name='RentDue' label='Fine for late payment' options={['date', 'amount']} onChange={handleChange} validity={{ isValid: true, message: '' }} value={formData.dueRent} />
        <Review name='userReviews' label="User Review" value={formData.review} type='text' onChange={handleChange} required validity={{ isValid: true, message: ''}}/>
      </div>
    );

    switch (step) {
      case 1:
        return step1Inputs;
      case 2:
        return step2Inputs;
      case 3:
        return step3Inputs;
      default:
        return null;
    }
  };

  return (
    <form>
      {renderStepInputs(currentStep)}
      <div className="form-control">
        {currentStep > 1 && <button className="prev-button" type="button" onClick={handlePrevStep}>Back</button>}
        {currentStep !== 3 ?
          (<button className='next-button' type='button' onClick={handleNextStep}>Next</button>) :
          (<button className='next-button' type='submit'>Submit</button>)
        }
      </div>
    </form>
  );
}

export function FormDisplay({ formData, error }) {
  return (
    <div>
      <h2>Form Data:</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre>

      <h2>Errors:</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}

export default RentalForm;



