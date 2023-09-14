import React,{useState, useRef,useEffect, useCallback} from 'react';

export function ContactPlatform({ name, options, onChange }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState(options);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  useEffect(() => {
    onChange(name, selectedSuggestions);
  }, [selectedSuggestions]);

  useEffect(() => {
    setSuggestions(options);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (suggestions.includes(value)) {
      const updatedSuggestions = suggestions.filter((suggestion) => suggestion !== value);
      setSuggestions(updatedSuggestions);

      const newContactPlatform = {
        name: value,
        text: '', // Initialize an empty text field
      };

      setSelectedSuggestions([...selectedSuggestions, newContactPlatform]);

      setInputValue('');
    }
  };

  const handleRemoveSelected = (selected) => {
    const updatedSelected = selectedSuggestions.filter((item) => item !== selected);
    setSuggestions([...suggestions, selected.name]); // Add the removed suggestion back to the list
    setSelectedSuggestions(updatedSelected);
  };

  const handleTextChange = (index, newText) => {
    const updatedSelected = [...selectedSuggestions];
    updatedSelected[index].text = newText;
    setSelectedSuggestions(updatedSelected);
  };

  return (
    <div>
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        list="suggestions"
        placeholder="Type here..."
      />
      <datalist id="suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
      <div>
        <p>Selected Suggestions:</p>
        <ul>
          {selectedSuggestions.map((selected, index) => (
            <li key={index}>
              {selected.name}
              <input
                type="text"
                value={selected.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                placeholder="Enter text..."
              />
              <button onClick={() => handleRemoveSelected(selected)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AutoInput({name, label, required, type, options, onChange}){
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState(options);
  const [validity, setValidity] = useState(required ? {isValid:false,message:''} : {isValid:true, message: ''});
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  
  useEffect(()=>{
    onChange(name, selectedSuggestions)
  },[selectedSuggestions])
  
  useEffect(()=>{
    setSuggestions(options)
  },[])
  

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (suggestions.includes(value)) {
      const updatedSuggestions = suggestions.filter((suggestion) => suggestion !== value);
      setSuggestions(updatedSuggestions);

      setSelectedSuggestions([...selectedSuggestions, value]);

      setInputValue('');
    }
    onChange(name, inputValue, validity)
  };

  const handleRemoveSelected = (selected) => {
    const updatedSelected = selectedSuggestions.filter((item) => item !== selected);
    setSelectedSuggestions(updatedSelected);

    setSuggestions([...suggestions, selected]);
  };

  return (
    <div>
      <input type="text" name={name} value={inputValue} onChange={handleInputChange} list="suggestions" placeholder="Type here..."/>
      <datalist id="suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
      <div>
        <p>Selected Suggestions:</p>
        <ul>
          {selectedSuggestions.map((selected, index) => (
            <li key={index}>
              {selected}
              <button onClick={() => handleRemoveSelected(selected)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function FormInput({name, type, value, label, required, onChange, disabled}) {
  const [valid, setValidity] = useState({isValid: false, message:''});
  const [inputValue, setInputValue] = useState(value);
  
  const handleInputChange=(e)=>{
    setInputValue(e.target.value);
    setValidity(Validate(name, type, required, e.target.value));
  }
  
  useEffect(()=>{
    onChange(name, inputValue);
  },[valid])
  
  return (
    <div className={`form-input-container ${!valid.isValid && 'invalid'}`}>
      <label>{label}: {!valid.isValid && valid.message}</label>
      <input disabled={disabled || false} name={name} type={type} value={inputValue} data_required={required || false} onChange={(e)=>{handleInputChange(e)}} />
    </div>
  );
}

export function TextareaRulesInput({name, defaultValue, label, required, onChange}){
  const maxCharacters = 100;
  const [text, setText] = useState('# ');
  const [rules, setRules] = useState([]);
  const [characterCount, setCharacterCount] = useState(maxCharacters);
  const textareaRef = useRef(null);
  const [validity, setValidity] = useState(required ? {isValid:false,message:''} : {isValid:true, message: ''});
  
  useEffect(()=>{
    onChange(name, rules, validity)
  },[rules, validity])

  const handleTextareaChange = (e) => {
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
    setRules(filteredRules);
    setCharacterCount(remainingCharacters);
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
    <div>
    <label>House rules:{characterCount}/{maxCharacters} chr</label>
      <textarea ref={textareaRef} value={text} name={name} onChange={handleTextareaChange} onKeyDown={handleEnterPress} placeholder="# Start typing your rules here..." style={{ overflowY: 'hidden' }} maxLength={maxCharacters} />
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

export function FileUpload({name, label, required, onChange, valid }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [validity, setValidity] = useState(required ? {isValid:false,message:''} : {isValid:true, message: ''});

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setSelectedFile(null);
      setError('No file selected.');
      return;
    }

    const maxSizeInBytes = 1024 * 1024; // 1 MB
    if (file.size > maxSizeInBytes) {
      setSelectedFile(null);
      setError('File size exceeds the limit (1 MB).');
      return;
    }

    setSelectedFile(file);
    setError(null);

    onChange(name, selectedFile, validity)
  };

  return (
    <div>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export function OptionalInputs ({ name, label, required, options, onChange }){
  const initialInputData = {
    [name]: false,
  };

  options.forEach((option) => {
    initialInputData[option] = '';
  });

  const [InputData, setInputData] = useState(initialInputData);
  const [validity, setValidity] = useState(required ? {isValid:false,message:''} : {isValid:true, message: ''});
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setInputData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  useEffect(() => {
    onChange(name, InputData, validity)
  }, [InputData, onChange]);

  return (
    <div>
      <label>
        <input type="checkbox" name={name} onChange={handleInputChange} checked={InputData[name]} />
        {label}
      </label>

      {options.map((option) => (
        <div key={option}>
          <label>
            {option}:
            <input type="text" name={option} value={InputData[option]} onChange={handleInputChange} disabled={!InputData[name]} />
          </label>
        </div>
      ))}
    </div>
  );
}

export function Review ({ name, type, label, required, onChange }){
  const maxCharacters = 200;
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const isTextareaFull = review.length >= maxCharacters;
  const [validity, setValidity] = useState(required ? {isValid:false,message:''} : {isValid:true, message: ''});

  const handleReviewChange = useCallback((e) => {
    const text = e.target.value;
    setReview(text);
  }, []);

  const handleRatingChange = useCallback((e) => {
    setRating(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e) => {
    setUserEmail(e.target.value);
  }, []);

  useEffect(() => {
    const reviewData = {
      review,
      rating,
      userEmail,
    };
    onChange(name, reviewData, validity)
  }, [validity, review, rating, userEmail]);

  return (
    <div>
      <textarea
        value={review}
        onChange={handleReviewChange}
        placeholder="Write your review..."
        maxLength={maxCharacters}
        className={isTextareaFull ? 'textarea-full' : ''}
      />
      <p>Character Count: {review.length}/{maxCharacters}</p>

      <label>
        Rating:
        <input
          type="text"
          value={rating}
          onChange={handleRatingChange}
          placeholder="e.g., 8.5/10"
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={userEmail}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
      </label>
    </div>
  );
};

function Validate(inputName, type, value) {
  const error = { isValid: false, message: '' };
  if(!required){
    return error;
  }
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const textRegex = /^[A-Za-z\s]+$/;
  const numberRegex = /^\d+$/;

  switch (type) {
    case 'email':
      if (!emailRegex.test(value)) {
        error.message = 'Invalid email format';
      } else {
        error.isValid = true;
      }
      break;

    case 'text':
      if (!textRegex.test(value)) {
        error.message = 'Invalid text format';
      } else {
        error.isValid = true;
      }
      break;

    case 'number':
      if (!numberRegex.test(value)) {
        error.message = 'Invalid number format';
      } else {
        error.isValid = true;
      }
      break;

    default:
      console.error('Invalid validation type');
  }

  return error;
}

  
export function RentalForm() {
  const [formData, setFormData] = useState({
    rnt_name:'',
    rnt_pricing:''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (inputName,value) => {
    setFormData({ ...formData, [inputName]: value });
  };
  

  return (
    <>
      <form >
        <FormInput name='rentalName' label='Arp/Flat Name' type='text' value={formData.rnt_name} onChange={handleChange} required/>
        <FormInput name='rentalPricing' label='Rental pricing' type='number' value={formData.rnt_pricing || ''} onChange={handleChange}/>
        {/*<FormInput name='rentalCategory' label='Rental Cartegory' type='text' onChange={handleChange} />
        <FormInput name='Agency' label='Agent involved' type='checkbox' onChange={handleChange} />
        <OptionalInputs name='RentDue' options={['date', 'amount']} onChange={handleChange}/>
        <AutoInput name='rentalType' options={['bedsitter','one bedroom']} onChange={handleChange}/>
        <FileUpload name='agreementContract' onChange={handleChange}/>
        <Review onChange={handleChange}/>
        <ContactPlatform name='contactDetails' options={['whatsapp','Instagram']} onChange={handleChange}/>
        <TextareaRulesInput name='rules' onChange={handleChange}/>*/}
        <button type="submit">Submit</button>
      </form>
      <FormDisplay formData={formData} error={errors}/>
    </>
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



