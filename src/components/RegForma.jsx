import React, { Component } from "react"
import Service from "../services/service"



export default class CadReq extends Component {
  constructor(props) {
    super(props);
    this.onChangeKeyword = this.onChangeKeyword.bind(this);
    this.saveReq = this.saveReq.bind(this);
    this.newReq = this.newReq.bind(this);

    

    this.state = {
        keyword: "",
        id: null,

        submitted: false
    };
  }

  onChangeKeyword(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  saveReq() {
    const data = {
      keyword: this.state.keyword,
      id: this.state.id
    };
    

    Service.create(data)
      .then(response => {
        this.setState({
            id: response.data.id,
            
            submitted: true
          })
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

    newReq() {
      this.setState({
          keyword: "",
          id: null,

          submitted: false
      });
    }

  render() {
    return (
        <div>
          <h4>Create Req</h4>
            {this.state.submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <button onClick={this.newReq}>
                    Add
                </button>
                <div>
                  <p>keyword: { this.state.keyword }</p>
                  <p>Id: { this.state.id }</p>
                </div>
            </div>
            ):(
            <div>
              <div>
              <label htmlFor="keyword">Keyword</label>
              <br/>
              <input
                  type="text"
                  className="form"
                  required
                  value={this.state.keyword}
                  onChange={this.onChangeKeyword}
                  name="keyword"
              />
              </div>


              <button onClick={this.saveReq} >
                  Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}