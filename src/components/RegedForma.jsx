import React, { Component } from "react";
import Service from "../services/service";


export default class CallReq extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.getReq = this.getReq.bind(this);
    this.newSearch = this.newSearch.bind(this);



    this.state = {
        id: "",
        currentReq: {
          id: "",
          status: "",
          urls: "" 
        }
    };
  }


  onChangeId(e) {
    const id = e.target.value;
  
    this.setState({
      id: id
    })
  }




  getReq() {
    Service.get(this.state.id)
      .then(response => {
        this.setState({
          id: "",
          submitted: true,
          currentReq: {
            id: this.state.id,
            status: response.data.status,
            urls: response.data.urls.length
          }
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSearch() {
    this.setState({
        id: "",

        submitted: false
    });
  }


  render() {
    const { id } = this.state;

    return (
      <div>
        <div>
          <h4>Search Req</h4>
          {this.state.submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <button onClick={this.newSearch}>
                    New Search
                </button>
                <div>
                  <p>Id: { this.state.currentReq.id }</p>
                  <p>Status: { this.state.currentReq.status }</p>
                  <p>Urls qty: { this.state.currentReq.urls }</p>
                </div>
            </div>
            ):(
              <div>
                <div>
                  <label htmlFor="id">Id</label>
                  <br/>
                  <input
                    type="text"
                    id="id"
                    value={ id }
                    onChange={this.onChangeId}
                  />
                </div>

                <div >
                  <button
                    type="button"
                    onClick={this.getReq}
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    )
  }
}
