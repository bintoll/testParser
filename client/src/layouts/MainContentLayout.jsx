import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import querystring from 'querystring'


class componentName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }
  
  handleChange = (e) => {
    const data = e.target.files[0]
    const reader = new FileReader
    reader.onloadend = () => {
      const file = data
      data.text = reader.result
      this.setState({
        file
      })
    }
    reader.readAsBinaryString(data)
  }

  submit = () => {
    const body = querystring.stringify(this.state.file)
    fetch('/api/fileUpload', {  
      method: 'POST',  
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
      body: body
    })
    .then(res => res.json({}))  
      .then((data) => {
        console.log('Request succeeded with JSON response', data);
        this.setState({data: data.data})
    })  
      .catch((error) => {  
      console.log('Request failed', error);  
    });
  }

  render() {
    return (
      <div>
        <p>Upload your .txt file</p>
        <div className="form">
          <input type="file" onChange={this.handleChange} />
          <button onClick={this.submit}>Загрузить</button>
        </div>
        {
          this.state.data ?
            <div className="table">
              <table>
                <tbody>
                <tr>
                  <th>
                    #
                  </th>
                  {
                    this.state.data && Object.keys(this.state.data[0]).map(item => <th key={item}>{item}</th>)
                  }
                </tr>  
                  {
                    this.state.data && this.state.data.map((item, i) => <tr key={i}><td>{i}</td>{Object.values(item).map((item, i) => <td key={Object.keys(this.state.data[0])[i]}>{item ? item : '-'}</td>)}</tr>)
                  }
                </tbody>  
              </table>
            </div> : null
        }
      </div>
    )
  }
}

export default componentName