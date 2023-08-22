import React from 'react';
export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false,
    };
  }

  toggleMap = () => {
    this.setState({ showMap: !this.state.showMap });
  }

  render() {
    const { showMap } = this.state;
    const { toggleModal } = this.props;

    return (
      <div>
        {/*showMap && <Feed toggleModal={toggleModal} />*/}
        mapped
        <button onClick={this.toggleMap}>Toggle Map</button>
      </div>
    );
  }
}
