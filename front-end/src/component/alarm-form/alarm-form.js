import React from 'react';

const emptyState = {
  accessCode: '',
  armOrDisarm: '',
};

class AlarmForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
  }

  handleChange = (event) => {
    let { name, value } = event.target;

    value = Number(value);
    if( name === 'accessCode' && value !== 'NaN' && !Number(value)){
      this.setState({ accessCode: ''});
      return '';
    }
    this.setState =({[name]: value});
  };
  handleSubmit = (event) =>{
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  };

  render() {
    return(
      <React.Fragement>
      <form onSubmit={this.handleSubmit}>
        <input
          name='accessCode'
          placeholder='access code'
          value={this.state.accessCode}
          onChange={this.handleChange}
          />
      </form>
    </React.Fragement>
    );
  }
}

export default AlarmForm;
