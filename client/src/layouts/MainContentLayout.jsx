import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import querystring from 'querystring'
import Radium from 'radium'

@Radium
class componentName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      gant: {
        min: null,
        max: null,
        all: null
      }
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
        this.findMinAndMax(data.data)
        this.setState({ data: data.data })
    })  
      .catch((error) => {  
      console.log('Request failed', error);  
    });
  }

  findMinAndMax = (data) => {
    const allDates = data.map(item => item && item.early_start_date ? new Date(item.early_start_date) : null).filter((item) => item !== null)
    const min = new Date(Math.min.apply(Math, allDates))
    const max = new Date(Math.max.apply(Math, allDates))
    const all =  Math.floor((max - min) / 86400000)
    const gant = { min, max, all }
    console.log(gant);
    this.setState({gant})
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
          this.state.data && Object.values(this.state.gant).every(item => !!item) ?
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
                    this.state.data && this.state.data.map((item, i) => {
                      const start = item.early_start_date && item.early_end_date ? (((new Date(item.early_start_date) - (new Date(this.state.gant.min))) / 86400000) / this.state.gant.all * 100).toFixed(2) : null
                      const end = item.early_start_date && item.early_end_date ? (100 - (((new Date(this.state.gant.max) - (new Date(item.early_end_date))) / 86400000) / this.state.gant.all * 100)).toFixed(2) : null
                      return (
                        <tr key={i}>
                          <td>{i}</td>
                          {
                            Object.values(item).map((item, i) => {
                              return (
                                <td key={Object.keys(this.state.data[0])[i]}>{item ? item : '-'}</td>
                              )
                            })
                          }
                          <td>
                            <div className="gant" style={[{ background: 'linear-gradient(to right, rgba(255,255,255,1) ' + start + '%,rgba(255,225,0,1) ' + start + '%,rgba(255,238,0,1) ' + end + '%,rgba(255,255,255,1) ' + end + '%,rgba(252,255,255,1) 100%)' }]}></div>
                          </td> 
                        </tr>
                      )
                    })
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