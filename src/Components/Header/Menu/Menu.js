import React from 'react';
import './Style.css';
import {Icons} from '../../../Assets/Icons/Icons'

export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Options',
    };
  }

  handleItemClick = (item) => {
    if (this.state.activeItem === item) {
      if (item === 'Options') {
        this.props.toggleMenu();
      } else {
        this.setState({ activeItem: 'Options' });
      }
    } else {
      this.setState({ activeItem: item });
    }
  };

  renderMenuItemContent = () => {
    const { activeItem } = this.state;

    switch (activeItem) {
      case 'Options':
        return (
          <div className='options'>
            <div onClick={() => this.handleItemClick('Recently viewed')} className={activeItem === 'Recently viewed' ? 'active' : ''}>
              Recently viewed <img className='icon' src={Icons.right}/>
            </div>
            <div onClick={() => this.handleItemClick('Help and support')} className={activeItem === 'Help and support' ? 'active' : ''}>
              Help and support <img className='icon' src={Icons.right} />
            </div>
            <div onClick={() => this.handleItemClick('Affiliation')} className={activeItem === 'Affiliation' ? 'active' : ''}>
              Affiliation <img className='icon' src={Icons.right} />
            </div>
            <div onClick={() => this.handleItemClick('Settings')} className={activeItem === 'Settings' ? 'mar active' : 'mar'}>
              <b>Settings</b>
            </div>
            <div onClick={() => this.handleItemClick('Account Settings')} className={activeItem === 'Account Settings' ? 'active' : ''}>
              Account Settings <img className='icon' src={Icons.right}/>
            </div>
            <div onClick={() => this.handleItemClick('Language')} className={activeItem === 'Language' ? 'active' : ''}>
              Language 
            </div>
            <div onClick={() => this.handleItemClick('Log out')} className={activeItem === 'Log out' ? 'active' : ''}>
              <b>Log out</b>
            </div>
          </div>
        );
      case 'Language':
        return <LanguageComponent />;
      case 'Account Settings':
        return <AccountSettingsComponent />;
      case 'Recently viewed':
        return <RecentlyReviewedComponent />;
      case 'Help and support':
        return <HelpAndSupportComponent />;
      case 'Log out':
        return <LogOutComponent />;
      case 'Affiliation':
        return <AffiliationComponent />;
      default:
        return null;
    }
  };

  render() {
    const { screen, toggleMenu } = this.props;

    return (
      <div className={`menu ${screen}`}>
        <div className='menu-header'>
          <span onClick={() => this.handleItemClick('Options')} className='menu-close-button dashed'>
            <img className='icon' src={Icons.close} alt="Icon 1" />
          </span>
          <h5 className='menu-header-heading'>Menu</h5>
        </div>
        <div className='menu-body'>
          {this.renderMenuItemContent()}
        </div>
      </div>
    );
  }
}

// Example components to render when menu items are clicked
const LanguageComponent = () => <div>
  <h5> Language </h5>
</div>;
const AccountSettingsComponent = () => <div>
  <h5> Account Settings</h5>
  <div className='form'>
    <span>Personal Information</span>
    
  </div>
</div>;
const RecentlyReviewedComponent = () => <div>
  <h5>Recently Reviewed</h5>
</div>;
const HelpAndSupportComponent = () => <div>
  <h5>Help and Support</h5>
</div>;
const LogOutComponent = () => <div>Log Out Component</div>;
const AffiliationComponent = () => <div>
  <h5>Affiliation </h5>
</div>;
